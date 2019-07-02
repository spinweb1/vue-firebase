<template>
<!-- template for the modal component -->
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              where does this show?
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              Are you sure you want to delete {{ smoothieTitle }}? 
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn-small grey" @click="deleteSmoothie(smoothieId)">
                Yes
              </button>
              <button class="btn-small grey" @click="$emit('close')">
                <router-link :to="{ name: 'Index' }">
                   No
                </router-link>                
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
 
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Modal',
  props: ['smoothieId', 'smoothieTitle'],
  methods: {
    deleteSmoothie(id) {
        // delete record from firebase
        db.collection('smoothies').doc(id).delete()
            .then(() => {
                // delete record locally, too
                this.$emit('close')
                this.$emit('deleteSmoothie', {
                   id: this.smoothieId
            })
        })
    }
  }
}
</script>

<style>
a {
   color: #fff !important;
} 
</style>