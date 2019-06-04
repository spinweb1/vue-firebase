<template>
  <div class="signup container">
     <form class="card-panel" @submit.prevent="signUp">
         <h2 class="center orange-text lighten-3">Signup</h2>
         <div class="field">
             <label for="email">Email:</label>
             <input type="email" name="email" v-model="email">
         </div>
         <div class="field">
             <label for="password">Password:</label>
             <input type="password" name="password" v-model="password">
         </div>
         <div class="field">
             <label for="alias">Alias:</label>
             <input type="text" name="alias" v-model="alias">
         </div>
         <div class="field center">
             <p class="red-text center" v-show="feedback">{{ feedback }}</p>
             <button class="btn orange">Signup</button>
         </div>
     </form>
  </div>   
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'Signup',
    data() {
        return {
            email: null,
            password: null,
            alias: null,
            feedback: null,
            slug: null
        }
    },
    methods: {
        signUp() {
            if (this.alias && this.email && this.password) {
                this.slug = slugify(this.alias, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                let ref = db.collection('users').doc(this.slug)
                ref.get().then(doc => {
                    if (doc.exists) {
                        this.feedback = "this alias already exists"
                    } else {
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then(user => {
                            ref.set({
                                alias: this.alias,
                                geolocation: null,
                                user_id: user.uid
                            })
                        }).then(() => {
                            this.$router.push({ name: 'GMap' })
                        })
                        .catch(err => {
                            console.log(err)
                            this.feedback = err.message
                            //console.log(err.message)
                        })
                      }
                    })
                    console.log(this.slug)
            } else {
                this.feedback = "You must enter all fields."
            }
        }
    }
}
</script>

<style>
.signup {
    max-width: 400px;
    margin-top: 60px;
}
.signup h2 {
    font-size: 2.4em;
}
.signup .field {
    margin-bottom: 16px;
}
</style>


