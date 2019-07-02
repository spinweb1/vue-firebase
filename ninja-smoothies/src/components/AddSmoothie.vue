<template>
    <div class="add-smoothie container">
        <h2 class="center-align green-text lighten-3">Add New Smoothie Recipe</h2>
        <form @submit.prevent="AddSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ingredient, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" v-model="ingredient.name">
                <i class="material-icons delete" @click="RemoveIngredient(ingredient); toggleBodyClass('removeClass', 'grey');">delete</i>
            </div>
            <div class="add-ingredient title">
                 <label for="add-ingredient">Add Ingredients: (press enter to save)</label><br>
                 <p v-show="feedback" class="red-text" v-bind="feedback">{{ feedback }}</p>
                 <input type="text" name="add-ingredient" placeholder="ingredient" ref="ingredientOne" class="ingredient" @keydown.enter.prevent="AddIngredient" v-model="another.name">
                 <input type="text" name="add-ingredient" placeholder="amount" class="ingredient" style="margin-left: 40px;" @keydown.enter.prevent="AddIngredient(); setFocus();" v-model="another.amount">
            </div>
            <div class="field center-align">
                 <button class="btn green lighten-1" @click="setFocus()">Add Smoothie</button>
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
    name: 'AddSmoothie',
    data() {
        return {
            title: null,
            another: {name: '', amount: ''},
            ingredients: [],
            feedback: null,
            slug: null,
            votes: null
        }
    },
    methods: {
        AddSmoothie() {
            if (this.title) {
                this.feedback = null
                // add a slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                // add record to firebase
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug,
                    votes: this.votes
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
        AddIngredient() {
            if (this.another.name && this.another.amount) {
                this.ingredients.push({name: this.another.name, amount: this.another.amount});
                console.log(this.ingredients)
                this.another = {name: '', amount: ''}
                this.feedback = null
            } else {
                this.feedback = "Please type something"
            }
        },
        RemoveIngredient(id) {
            console.log(id)
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient !== id
            }) 
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
        this.toggleBodyClass('removeClass', 'grey');
    },
    mounted() {
        this.toggleBodyClass('addClass', 'white');
    }
}
</script>

<style>
.white {
    background-color: #fff;
}
.grey {
    background-color: #9e9e9e;
}
.add-smoothie {
    margin-top: 10px;
    padding: 20px;
    max-width: 500px;
}  
.add-smoothie h2 {
    font-size: 1.8em;
    margin: 20px auto;
} 
.add-smoothie .field {
    margin: 20px auto;
    position: relative;
} 
.add-smoothie .delete {
    position: absolute;
    cursor: pointer;
    color: #aaa;
    right: 0;
    bottom: 16px;
    font-size: 1.4em;
}
.add-smoothie .close {
    color: #999;
    position: relative;
    bottom: 6px;
    left: 6px;
    font-size: 1.2em;
}
.add-smoothie .close:hover {
    color: rgb(241, 31, 31);
}
.add-smoothie .delete:hover {
    color: rgb(241, 31, 31);
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
@media only screen and (max-width: 468px) {
    .ingredient {
        width: 41% !important;
    }
    .add-smoothie .input {
        margin-left: 30px !important;
    }
    .add-smoothie h2 {
        font-size: 1.4em;
    }
}
</style>
