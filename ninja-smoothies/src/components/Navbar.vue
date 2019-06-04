<template>
    <div class="navbar">
        <nav class="nav-extended light-green darken-2">
            <div class="nav-content">
                <router-link :to="{ name: 'Index' }">
                    <span class="navbar font">Supersonic Smoothies</span>
                </router-link>
                <a href="" class="btn-floating btn-large halfway-fab orange lighten-3">
                    <router-link :to="{ name: 'AddSmoothie' }">
                        <i class="material-icons">add</i>
                    </router-link>
                </a>
            </div>    
        </nav>    
    </div>    
</template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {

            }
        }
    }
</script>

<style>
.navbar nav {
    padding: 10px 40px;
} 
.navbar .font {
    font-family: 'BioRhyme', serif;
    font-size: 2em;
}   
</style>