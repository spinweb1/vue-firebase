<template>
    <div  v-if="smoothie" class="edit-smoothie container">
        <h2 class="center-align green-text lighten-3">Edit {{ smoothie.title }} Recipe</h2>
        <form @submit.prevent="EditSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="field">
                <label for="ingredient">Edit/Remove Ingredient:</label>
                <input type="text" name="ingredient" v-model="ingredient.name">
                <i class="material-icons delete" @click="RemoveIngredient(ingredient)">delete</i>
            </div>
            <div class="add-ingredient field">
                 <label for="add-ingredient">Add Ingredients: (press enter to save)</label><br>
                 <input type="text" name="add-ingredient" placeholder="ingredient" class="ingredient" ref="ingredientOne" @keydown.enter.prevent="AddIngredient" v-model="another.name">
                 <input type="text" name="add-ingredient" placeholder="amount" class="ingredient input" style="" @keydown.enter.prevent="AddIngredient(); setFocus();" v-model="another.amount">
            </div>
            <div class="field center-align">
                 <p v-if="feedback" class="red-text">{{ feedback }}</p>
                 <button class="btn green lighten-1" @click="setFocus()">Update Smoothie</button>
                 <router-link :to="{ name: 'Index' }">
                    <i class="close material-icons">close</i>
                 </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',
    data() {
        return {
            smoothie: '',
            another: {name: '', amount: ''},
            feedback: null
        }
    },
    methods: {
        AddIngredient() {
            if (this.another.name && this.another.amount) {
                this.smoothie.ingredients.push({name: this.another.name, amount: this.another.amount});
                //console.log(this.smoothie.ingredients)
                this.another = {name: '', amount: ''}
                this.feedback = null
            } else {
                this.feedback = 'You must type something to add an ingredient'
            }
        },
        RemoveIngredient(id) {
            console.log(id)
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient !== id
            }) 
        },
        EditSmoothie() {
            console.log(this.smoothie.title, this.smoothie.ingredients)
            if (this.smoothie.title) {
                this.feedback = null
                // add a slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                // add record to firebase
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
                })
                .then(() => {
                    // push user to homepage after record saved
                    this.$router.push({ name: 'Index' }) 
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.feedback = "You must enter a smoothie title"
            }
        },
        setFocus: function() {
            // Note, you need to add a ref="ingredientOne" attribute to your input.
            this.$refs.ingredientOne.focus();
        },
        toggleBodyClass(addRemoveClass, color) {
            const el = document.body;

            if (addRemoveClass === 'addClass') {
                el.classList.add('white');
            } else {
                el.classList.remove('grey');
            }
        }
    },
    created() {
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
        this.toggleBodyClass('removeClass', 'grey');
    },
    mounted() {
        this.toggleBodyClass('addClass', 'white');
    }
}
</script>

<style>
.edit-smoothie {
    margin-top: 10px;
    padding: 20px;
    max-width: 500px;
}  
.edit-smoothie h2 {
    font-size: 1.8em;
    margin: 20px auto;
} 
.edit-smoothie .field {
    margin: 20px auto;
    position: relative;
} 
.edit-smoothie .delete {
    position: absolute;
    cursor: pointer;
    color: #aaa;
    right: 0;
    bottom: 16px;
    font-size: 1.4em;
}
.edit-smoothie .close {
    color: #999;
    position: relative;
    bottom: 6px;
    left: 6px;
    font-size: 1.2em;
}  
.edit-smoothie .close:hover {
    color: rgb(241, 31, 31);
}
.edit-smoothie .delete:hover {
    color: rgb(241, 31, 31);
}
.edit-smoothie .input {
    margin-left: 40px !important;
}
.ingredient {
    display: inline;
    width: 45% !important;
}
::placeholder {
    color: #ffcc80;
    opacity: 1; /* Firefox */
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgb(93, 92, 99);
}
::-ms-input-placeholder { /* Microsoft Edge */
    color: rgb(93, 92, 99);
}
.white {
    background-color: #fff;
}
.grey {
    background-color: #9e9e9e;
}
@media only screen and (max-width: 468px) {
    .ingredient {
        width: 43% !important;
    }
    .edit-smoothie .input {
        margin-left: 30px !important;
    }
    .edit-smoothie h2 {
        font-size: 1.5em;
    }
}
</style>
