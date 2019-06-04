<template>
    <div class="new-message">
        <form @submit.prevent="addMessage">
            <label for="new-message">New Message (enter to add)</label>
            <p class="red-text" v-show="feedback">{{ feedback }}</p>
            <input type="text" name="new-message" v-model="newMessage">
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init';

export default {
    name: 'NewMessage',
    props: ['name'],
    data() {
        return {
            newMessage: null,
            feedback: null
        }
    },
    methods: {
        addMessage() {
            if (this.newMessage) {
                db.collection('messages').add({
                    content: this.newMessage,
                    name: this.name,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err)
                })
                this.newMessage = null
                this.feedback = null
            } else {
                this.feedback = "You must type a message before sending..."
            }
        }
    }
}
</script>

<style>

</style>
