<template>
    <div class="index container">
        <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
            <div class="card-content">
                <span class="btn-floating btn-large halfway-fab orange lighten-3">
                    <router-link :to="{ name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug}}">
                        <i class="material-icons edit orange lighten-3" @click="editSmoothie(smoothie.id)">edit</i>
                    </router-link>
                </span>
                <i class="material-icons delete" @click="showModal = true; currentSmoothieId = smoothie.id; currentSmoothieTitle = smoothie.title;">delete</i>
                <h2 class="orange-text lighten-3">{{ smoothie.title }}</h2>
                <ul class="ingredients">
                    <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                        <span class="chip">
                            <label v-tooltip.top-center="ingredient.amount">{{ ingredient.name }}</label>
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
        <!-- use the modal component, pass in the prop -->
        <Modal v-if="showModal" @close="showModal = false" @deleteSmoothie="deleteSmoothie" :smoothie-id="currentSmoothieId" :smoothie-title="currentSmoothieTitle">
            <!--
            you can use custom content here to overwrite
            default content
            -->
            <h3 slot="header">Warning!</h3>
        </Modal>
    </div>
</template>

<script>
import db from '@/firebase/init'
import Modal from './Modal'

export default {
    name: 'Index',
    data() {
        return {
            smoothies: [],
            currentSmoothieId: '',
            //currentSmoothieTitle: '',
            //msg: "quantity/amount",
            showModal: false
        }
    },
    methods: {
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
        },
        deleteSmoothie(event) {
            this.smoothies = this.smoothies.filter(smoothie => {
                return smoothie.id !== event.id
            })
        },
        toggleBodyClass(addRemoveClass, grey) {
            const el = document.body;

            if (addRemoveClass === 'addClass') {
                el.classList.add('grey');
            } else {
                el.classList.remove('white');
            }
        }   
    },
    components: {
        Modal: Modal
    },
    created() {
        // fetch data from the firestore
        db.collection('smoothies').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    //console.log(doc.data())
                    let smoothie = doc.data()
                    smoothie.id = doc.id
                    this.smoothies.push(smoothie)
                })
            });
        this.toggleBodyClass('removeClass', 'white');
    },
    mounted() {
        this.toggleBodyClass('addClass', 'grey');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
    background-color: #efefef;
}
.index {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 50px;
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
.chip {
    line-height: 30px;
}
label {
    font-size: .9rem;
    color: #706f6f;
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
i.object-card__icon:hover {
    color:rgb(199, 90, 181);
}
.likes {
    color: #999;
    position: absolute;
    bottom: 6px;
    left: 28px;
    font-size: 0.9em;
}
.delete:hover {
    color: #999;
}
.tooltip {
	 display: block !important;
	 z-index: 10000;
}
.tooltip .tooltip-inner {
	 background: rgb(181, 220, 252);
	 color: rgb(110, 108, 108);
	 border-radius: 16px;
	 padding: 5px 10px 4px;
     font-size: 13px;
}
.tooltip .tooltip-arrow {
	 width: 0;
	 height: 0;
	 border-style: solid;
	 position: absolute;
	 margin: 5px;
	 border-color:  rgb(181, 220, 252);
}
.tooltip[x-placement^="top"] {
	 margin-bottom: 5px;
}
.tooltip[x-placement^="top"] .tooltip-arrow {
	 border-width: 5px 5px 0 5px;
	 border-left-color: transparent !important;
	 border-right-color: transparent !important;
	 border-bottom-color: transparent !important;
	 bottom: -5px;
	 left: calc(50% - 5px);
	 margin-top: 0;
	 margin-bottom: 0;
}
.tooltip[x-placement^="bottom"] {
	 margin-top: 5px;
}
.tooltip[x-placement^="bottom"] .tooltip-arrow {
	 border-width: 0 5px 5px 5px;
	 border-left-color: transparent !important;
	 border-right-color: transparent !important;
	 border-top-color: transparent !important;
	 top: -5px;
	 left: calc(50% - 5px);
	 margin-top: 0;
	 margin-bottom: 0;
}
.tooltip[x-placement^="right"] {
	 margin-left: 5px;
}
.tooltip[x-placement^="right"] .tooltip-arrow {
	 border-width: 5px 5px 5px 0;
	 border-left-color: transparent !important;
	 border-top-color: transparent !important;
	 border-bottom-color: transparent !important;
	 left: -5px;
	 top: calc(50% - 5px);
	 margin-left: 0;
	 margin-right: 0;
}
.tooltip[x-placement^="left"] {
	 margin-right: 5px;
}
.tooltip[x-placement^="left"] .tooltip-arrow {
	 border-width: 5px 0 5px 5px;
	 border-top-color: transparent !important;
	 border-right-color: transparent !important;
	 border-bottom-color: transparent !important;
	 right: -5px;
	 top: calc(50% - 5px);
	 margin-left: 0;
	 margin-right: 0;
}
.tooltip[aria-hidden='true'] {
	 visibility: hidden;
	 opacity: 0;
	 transition: opacity 0.15s, visibility 0.15s;
}
.tooltip[aria-hidden='false'] {
	 visibility: visible;
	 opacity: 1;
	 transition: opacity 0.15s;
}
label {
    text-shadow: 1px 1px #fff;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.modal-container {
  width: 380px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
  font-size: 1.5rem;
  text-align: center;
}

.modal-body {
  margin: 18px 0 24px 0;
}

.modal-default-button {
  float: right;
}

.modal-footer {
  text-align: center;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.delete:hover {
    color: rgb(241, 31, 31);
}

.card {
   border-radius: 4px; 
}

.grey {
   background-color: #9e9e9e !important;
}

.white {
   background-color: #fff !important;
}

@media only screen and (max-width: 600px) {
  .index {
    display: block !important; 
  }
  .card {
    margin: .5rem 0 2.6rem 0;
  }
  .modal-container {
    width: 280px;
  }
} 
</style>