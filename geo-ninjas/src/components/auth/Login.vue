<template>
 <div class="login container">
    <form @submit.prevent="logIn" class="card-panel">
        <h2 class="center orange-text lighten-3">Login</h2>
         <div class="field">
             <label for="email">Email:</label>
             <input type="email" name="email" v-model="email">
         </div>
         <div class="field">
             <label for="password">Password:</label>
             <input type="password" name="password" v-model="password">
         </div>
         <p v-show="feedback" class="center red-text">{{ feedback }}</p>
         <div class="field center">
             <button class="btn orange">Login</button>
         </div>
    </form>    
 </div>   
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'Login',
    data() {
        return {
            email: null,
            password: null,
            feedback: null
        }
    },
    methods: {
        logIn() {
            if (this.email && this.password) {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    console.log(user)
                    this.$router.push({ name: 'GMap' })
                })
                .catch(err => {
                    console.log(err)
                    this.feedback = err.message
                })
                this.feedback = null
            } else {
                this.feedback = "All fields must be filled out"
            }
        }
    }
}
</script>

<style>
.login {
    max-width: 400px;
    margin-top: 60px;
}
.login h2 {
    font-size: 2.4em;
}
.login .field {
    margin-bottom: 16px;
}
</style>


