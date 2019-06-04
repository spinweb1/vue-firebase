<template>
   <nav class="navbar">
       <ul>
           <li><router-link to="/">Home</router-link></li>
           <li><router-link :to="{ name: 'About' }">About</router-link></li>
       </ul> 
       <h2>User Profiles</h2>
       <ul>
           <li v-for="(userId, index) in userIds" :key="index">
               <router-link :to="{ name: 'ViewProfile', params: { user_id: userId } }">{{ userId }}'s Profile</router-link>
           </li>
       </ul>
       <h2>Navigation Controls</h2>
       <ul>
           <button @click="goBack">Go Back</button>
           <button @click="goHome" :to="{ name: 'Home' }">Go Home</button>
           <button @click="goForward">Go Forward</button>
       </ul>
   </nav>  
</template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {
                userIds: ['Angie', 'Liz', 'Jonna', 'Valerie']
            }
        },
        methods: {
            goBack() {
                this.$router.back(-1)
            },
            goHome() {
                this.$router.push({ name: 'Home' })
            },
            goForward() {
                this.$router.go(1)
            }
        }
    }
</script>

<style>
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline;
    padding: 8px;
    text-decoration: underline;
}    
a {
    color: #448a2b;
}
a.router-link-exact-active {
    color: purple;
}
</style>