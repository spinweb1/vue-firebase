<template>
    <div class="index container">
        <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
            <div class="card-content">
                <span class="btn-floating btn-large halfway-fab orange lighten-3">
                    <router-link :to="{ name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug}}">
                        <i class="material-icons edit orange lighten-3" @click="editSmoothie(smoothie.id)">edit</i>
                    </router-link>
                </span>
                <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
                <h2 class="orange-text lighten-3">{{ smoothie.title }}</h2>
                <ul class="ingredients">
                    <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                        <span class="chip">
                            {{ ingredient }}
                        </span>
                    </li>
                </ul>
                <div class="object-card__label">
                    <span @click="upvote(smoothie.id)">
                        <i class="object-card__icon object-card__icon--open material-icons">favorite</i>
                        <span class="likes">{{ smoothie.votes }}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'Index',
    data() {
        return {
            smoothies: []
        }
    },
    methods: {
        deleteSmoothie(id) {
            // delete record from firebase
            db.collection('smoothies').doc(id).delete()
               .then(() => {
                    // delete record locally, too
                    this.smoothies = this.smoothies.filter(smoothie => {
                        return smoothie.id !== id
                    }) 
            })
        },
        editSmoothie(id) {
            db.collection('smoothies').doc(id).set()
                .then(() => {

                })
        },
        upvote(id) {
            const smoothie = this.smoothies.find(
                smoothie => smoothie.id === id
            );
            smoothie.votes++;

            db.collection('smoothies').doc(smoothie.id).update({
                votes: smoothie.votes,
            });
        }   
    },
    created() {
        // fetch data from the firestore
        db.collection('smoothies').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    // console.log(doc.data())
                    let smoothie = doc.data()
                    smoothie.id = doc.id
                    this.smoothies.push(smoothie)
                })
            })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
}
.index h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
}
.index .ingredients {
    margin: 30px auto;
}
.index .ingredients li {
    display: inline-block;
}
.index .delete {
    position: absolute;
    top: 6px;
    right: 4px;
    cursor: pointer;
    color: rgb(219, 217, 217);
    font-size: 1.4em;
}
.material-icons {
    cursor: pointer;
}
.text-info {
    color: rgb(163, 160, 160);
}
.favorite {
    position: absolute;
    top: 182px;
    right: 358px;
    cursor: pointer;
    color: rgb(219, 217, 217);
    font-size: 0.9em;
}
i.left {
    margin-right: 0px;
}
i.object-card__icon {
    color: #D8DF7A;
    position: absolute;
    bottom: 6px;
    left: 6px;
    font-size: 1.4em;
}
.likes {
    color: #999;
    position: absolute;
    bottom: 6px;
    left: 28px;
    font-size: 0.9em;
}
@media only screen and (max-width: 600px) {
  .index {
    display: block !important; 
  }
  .card {
    margin: .5rem 0 2.6rem 0;
  }
} 
</style>