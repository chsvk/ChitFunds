<template>
    <div class="addGroup">
        <div class="card">
        <h1 class="heading">{{headtext}}</h1>
        <input type="text" v-model="name" placeholder="Enter Group Name">
        <input type="number" v-model="value" placeholder="Enter Chit Value">
        <input type="number" v-model="months" placeholder="Number of Months">
        <datepicker v-model="started"></datepicker>
        <div class="flex">
            <button @click="add">{{buttonText}}</button>
            <button @click="cancel">Cancel</button>
        </div>
        </div>
    </div>
</template>

<script>
import {db} from '../main'
import Datepicker from 'vuejs-datepicker';
import router from '../router'
export default {
    router,
    data(){
        return{
            name: '',
            value: '',
            months: '',
            started: '',
            buttonText: 'Add Group',
            id: localStorage.getItem('temp'),
            headtext: 'Add New Group'
        }
    },
    components: {
        Datepicker
    },
    mounted(){
        if(this.id){
            this.buttonText = "Update Group";
            this.headtext = 'Update Group'
        db.collection("Groups").doc(this.id).get().then((doc)=>{
            this.name = doc.data().name;
            this.value = doc.data().value;
            this.months = doc.data().months;
            this.started = doc.data().started;
        })
        }
    },
    methods: {
        add: function(){
            if((this.name || this.value || this.months)==""){
                alert('Fields Incomplete')
            }else{
                if(confirm('Are You Sure')){
                    if(this.id){
                db.collection("Groups").doc(this.id).update({
                    name: this.name,
                    value: this.value,
                    months: this.months
                }).then(()=>{
                    router.push({
                        name: 'groups'
                    })
                })
                }else{
                    db.collection("Groups").doc(this.name).set({
                    name: this.name,
                    value: this.value,
                    months: this.months,
                    started: String(this.started).substring(4,15)
                }).then(()=>{
                    router.push({
                        name: 'groups'
                    })
                    }).catch((e)=>{
                        console.log(e.message);
                })
                }
                }
            }
        },
        cancel: function(){
            localStorage.removeItem('temp');
            router.push({
                name: 'groups'
            })
        }
    }
}
</script>

<style lang="scss" scoped>

    .addGroup{
        background: rgba(0, 0, 0, 0.1);
        height: 100vh;
    }

    .flex{
        display: flex;
    }

    .card{
        position: relative;
        margin-left: 25%;
        top: 10%;
        width: 40%;
        padding: 1em;
        background: white;

        input{
            width: 70%;
            border: none;
            padding: 1em;
        }

        button{
            border: none;
            background: #2196F3;
            color: white;
            padding: 1em;
            margin: 0.6em;
        }
    }

</style>
