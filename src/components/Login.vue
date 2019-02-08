<template>
    <div class="root">
    <div class="login card">
        <h1>Enter Password To Login</h1>
        <input type="password" v-model="password">
        <!-- <button style="margin-left: 1em;" @click="register">Register</button> -->
        <button @click="login">Login</button>
    </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import router from '../router'
export default {
    router,
    data(){
        return{
            password: ''
        }
    },
    methods: {
        login: function(){
            firebase.auth().signInWithEmailAndPassword("User@swio.in", this.password)
            .catch((err)=>{
                console.log(err.message);
            })
            .then((user)=>{
                if(firebase.auth().currentUser){
                    router.push('/')
                }
            })
        },
        register: function(){
            firebase.auth().createUserWithEmailAndPassword("User@swio.in", this.password)
             .catch((err)=>{
                console.log(err.message);
            }).then((user)=>{
                firebase.auth().signInWithEmailAndPassword("User@swio.in", this.password)
                 .catch((err)=>{
                console.log(err.message);
            }).then(()=>{
                    if(firebase.auth().currentUser){
                        router.push({
                        name: 'home'
                    })
                    }
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>

    .root{
        background: #B3E5FC;
        height: 100vh;
        width: 100vw;

        .login{
            width: 40vw;
            height: 40vh;
            background: white;
            position: absolute;
            top: 25%;
            left: 30%;

            h1{
                margin: 0.4em;
                text-align: center;
            }

            input{
                width: 80%;
                padding: 1em;
                margin: 1em;
                margin-left: 6.5%;
            }

            button{
                width: 45%;
                margin: 0.5em;
                padding: 1em;
                border: none;
                background: #00BCD4;
                color: white;

            }
        }
    }

                .card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container {
    padding: 2px 16px;
}


</style>
