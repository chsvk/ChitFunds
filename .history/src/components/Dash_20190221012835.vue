<template>
    <div class="dash">
        <nav>
            <ul>
                <h1>Sri Laxmi Narayana & Balamani</h1>
                <hr>
                <li><a @click="daily">Daily Book</a></li>
                <li><a @click="groups">Groups</a></li>
                <li><a @click="balance">Balance Sheet</a></li>
                <li><a @click="members">Add Member</a></li>
                <li><a @click="interest">Interest Book</a></li>
                <li><a @click="today">Todays Payments</a> <status-indicator v-if="paymentExist" active pulse></status-indicator></li>
                <li><a @click="auction">Auction</a></li>
                <li><a @click="logout">Logout</a></li>
            </ul>
        </nav>
        <router-view class="router"/>
    </div>
</template>

<script>
import router from '../router'
import { StatusIndicator } from 'vue-status-indicator'
import {mapState} from 'vuex'
import firebase from 'firebase'
export default {
    router,
    components: {
        StatusIndicator
    },
    computed: {
        ...mapState([
            'paymentExist'
        ])
    },
    mounted(){
        // console.log(firebase.auth().currentUser)
        // console.log(this.paymentExist)
    },
    methods: {
        daily: function(){
            router.push("/");
        },
        groups: function(){
            localStorage.removeItem('temp');
            router.push('groups');
        },
        members: function(){
            router.push({
                name: 'addMember'
            })
        },
        interest: function(){
            router.push('interest')
        },
        auction: function()
        {
            router.push('auction')
        },
        balance: function()
        {
            router.push('balance')
        },
        today: function(){
            router.push('today')
        },
        logout: function(){
            firebase.auth().signOut().then(()=>{
                router.push('/')
            })
        }  
      }
    }
</script>

<style lang="scss" scoped>

    .dash{
        display: flex;
        nav{
            width: 15vw;
            height: 100vh;
            background: #B3E5FC;
            ul{
                list-style: none;

                h1{
                    text-align: center;
                    padding: 1em;
                }
                li{
                    margin: 1.5em 0;
                    a{
                        padding: 1.5em;
                        text-decoration: none;
                        color: black;
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .router{
        width: 85vw;
    }


</style>

