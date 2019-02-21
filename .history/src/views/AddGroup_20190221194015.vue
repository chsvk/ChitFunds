<template>
    <div class="addGroup">
        <div class="card">
        <h1 class="heading">{{headtext}}</h1>
        <input type="text" v-model="group.name" placeholder="Enter Group Name">
        <input type="number" v-model="group.value" placeholder="Enter Chit Value">
        <input type="number" v-model="group.months" placeholder="Number of Months">
        <datepicker v-model="group.started"></datepicker>
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
import Utils from '@/Mixins/Utils'
export default {
    mixins: [Utils],
    router,
    data(){
        return{
            group: {
                name: '',
                value: '',
                months: '',
                started: ''
            },
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
            this.group.name = doc.data().name;
            this.group.value = doc.data().value;
            this.group.months = doc.data().months;
            this.group.started = doc.data().started;
        })
        }
    },
    methods: {
        add: function(){
            var vm = this;
            this.group = {...this.group, started: String(this.group.started).substring(4,15)}
            if(!this.checkAllFields(this.group)){
                alert('Fields Incomplete')
            }else{
                if(confirm('Are You Sure')){
                    if(vm.id){
                db.collection("Groups").doc(vm.id).update(vm.group).then(()=>{
                    showFullSuccessAlert();
                    router.push({
                        name: 'groups'
                    })
                })
                }else{
                    db.collection("Groups").doc(vm.group.name).set(vm.group).then(()=>{
                        vm.showFullSuccessAlert();
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
