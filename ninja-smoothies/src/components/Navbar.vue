<template>
    <div class="navbar">
        <nav class="nav-extended light-green darken-2">
            <div class="nav-content">
                <router-link :to="{ name: 'Index' }">
                    <span class="navbar font">Supersonic Smoothies</span>
                </router-link>
                <a href="" class="btn-floating btn-large halfway-fab orange lighten-3 to-right" style="bottom: -25px;">
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
        },
        methods: {

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
.to-right {
    bottom: -35px !important;
} 
@media only screen and (max-width: 600px) {
    .navbar .font {
       font-size: 22px;
    }
    .to-right {
       right: 0px !important;
       bottom: -23px !important;
    }
}
@media only screen and (max-width: 468px) {
    .index h2 {
       font-size: 1.4em !important;
    }
    .btn-floating.btn-large {
       width: 40px !important;
       height: 40px !important;
    }
    .btn-floating.btn-large i {
       line-height: 41px;
    }
    .btn-floating.btn-large.halfway-fab {
       bottom: -18px;
    }
    .btn-large {
       height: 52px;
    }
    .navbar .font {
       font-size: 20px;
    }
    .navbar nav {
       padding: 5px 20px;
    }
}
</style>