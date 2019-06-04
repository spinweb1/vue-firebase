<template>
    <div class="view-profile container">
        <div v-if="profile" class="card">
            <h2 class="orange-text lighten-3 center">{{ profile.alias | capitalize }}'s Wall</h2>
            <ul class="comments collection">
                <li v-for="(comment, index) in comments" :key="index">
                    <div class="orange-text">{{ comment.from | capitalize }}</div> 
                    <div class="grey-text text-darken-2">{{ comment.content }}</div>
                </li>
            </ul>
            <form @submit.prevent="addComment">
                <div class="field">
                    <label for="comment">Add a Comment</label>
                    <input type="text" name="comment" v-model="newComment">
                </div>
                <p v-if="feedback" class="red-text center">{{ feedback }}</p>
            </form>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'ViewProfile',
    data() {
        return {
            profile: null,
            newComment: null,
            feedback: null,
            user: null,
            comments: []
        }
    },
    created() {
        let ref = db.collection('users')

        // get current user
        ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.user = doc.data()
                this.user.id = doc.id
            })
        })

        // profile data
        ref.doc(this.$route.params.id).get()
        .then(user => {
            this.profile = user.data()
            console.log(this.profile)
        })

        // fetch data from the firestore
        db.collection('comments').where('to', '==', this.$route.params.id)
            .onSnapshot((snapshot) => {
                snapshot.docChanges.forEach(change => {
                    if (change.type == 'added') {
                        this.comments.unshift({
                            from: change.doc.data().from,
                            content: change.doc.data().content
                        }) 
                    }
                })
            })
    },
    methods: {
        addComment() {
            if (this.newComment) {
                this.feedback = null
                // add record to firebase
                db.collection('comments').add({
                    content: this.newComment,
                    from: this.user.alias,
                    to: this.$route.params.id,
                    time: Date.now()
                })
                .then(() => {
                    // reset comment field
                    this.newComment = null 
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.feedback = "You must add a comment to post"
            }
        }
    },
    filters: {
        capitalize(value) {
            if (!value) return ''
            value = value.toString()
            return value.toLowerCase().split(' ').map((a) => a.charAt(0).toUpperCase() + a.substr(1)).join(' ');
        }
    }
}
</script>

<style>
.view-profile .card {
    padding: 20px;
    margin-top: 60px;
}
.view-profile h2 {
    font-size: 1.7em;
    margin-top: 0;
}
.view-profile li {
    padding: 10px;
    border-bottom: 1px solid #eee;
}
</style>
