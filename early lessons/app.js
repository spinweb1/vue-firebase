new Vue({
    el: '#app',
    data: {
        title: 'Eric\'s Title',
        wage: 10,
        coords: {
            x: 0,
            y: 0
        },
        name: false,
        h2: "dogs are great"
    },
    methods: {
        logEvent(e) {
            console.log(e);
        },
        getCoord(e){
            console.log(e.offsetX, e.offsetY);
            this.coords.x = e.offsetX;
            this.coords.y = e.offsetY;
        },
        updateField(e) {
            console.log(e.target.value);
            this.title = e.target.value
        },
        logMessage() {
            console.log("sad to see tumblr go!")
        },
        nameToggle() {
            this.name = !this.name
        },
        greet(arg) {
            return this.h2 + `arg`
        }
    }
})