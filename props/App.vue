<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <navbar></navbar>
    <all-friends :friends="friends" @delete="deleteFriend"></all-friends>
    <online-friends :friends="friends"></online-friends>
  </div>
</template>

<script>
import Navbar from './Navbar'
import AllFriends from './AllFriends'
import OnlineFriends from './OnlineFriends'

export default {
  name: 'app',
  data () {
    return {
      title: 'Welcome to Your Vue.js App',
      friends: [
          { name: 'Clayton', online: true },
          { name: 'Bosco', online: false },
          { name: 'Winston', online: true },
          { name: 'Skye', online: false }
      ]
    }
  },
  components: {
    'navbar': Navbar,
    'all-friends': AllFriends,
    'online-friends': OnlineFriends
  },
  methods: {
    deleteFriend(payload){
      // console.log(payload)
      this.friends = this.friends.filter(friend => {
        return friend.name !== payload.name
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
