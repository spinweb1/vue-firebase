<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
        <form @submit.prevent="AddSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ingredient, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="RemoveIngredient(ingredient)">delete</i>
            </div>
            <div class="add-ingredient title">
                 <label for="add-ingredient">Add Ingredient:</label>
                 <p v-show="feedback" class="red-text" v-bind="feedback">{{ feedback }}</p>
                 <input type="text" name="add-ingredient" @keydown.tab.prevent="AddIngredient" v-model="another">
            </div>
            <div class="field center-align">
                 <button class="btn pink">Add Smoothie</button>
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
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
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
                    slug: this.slug
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
            if (this.another) {
                this.ingredients.push(this.another);
                console.log(this.ingredients)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = "You gotta type something first, knucklehead"
            }
        },
        RemoveIngredient(id) {
            console.log(id)
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient !== id
            }) 
        }
    }
}
</script>

<style>
.add-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}  
.add-smoothie h2 {
    font-size: 2em;
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
</style>
