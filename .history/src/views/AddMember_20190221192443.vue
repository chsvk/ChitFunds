<template>
    <div class="addGroup">
        <div class="card">
        <h1 class="heading">{{headText}}</h1>
        <input type="text" v-model="member.name" placeholder="Enter Member Name">
        <input type="text" v-model="member.mid" placeholder="Enter Member ID">
        <input type="text" v-model="member.careOf" placeholder="Care of">
        <input type="number" v-model="member.number" placeholder="Enter Member Phone Number">
        <input type="number" v-model="member.monthlyDate" placeholder="Enter Monthly Date">
        <!-- <datePicker v-model="bday"></datePicker> -->
        <div class="flex">
            <button @click="add">{{buttonText}}</button>
            <button @click="cancel">Cancel</button>
        </div>
        </div>
    </div>
</template>

<script>
import {db} from '../main'
import router from '../router'
import datePicker from 'vuejs-datepicker'
import Utils from '@/Mixins/Utils'
export default {
    mixins: [Utils],
    router,
    data(){
        return{
            member: {
                name: '',
                mid: '',
                number: '',
                careOf: '',
                monthlyDate: ''
            },
            buttonText: 'Add Member',
            id: localStorage.getItem('temp'),
            bday:'',
            headText: 'Add New Member'
        }
    },
    components: {
        datePicker
    },
    mounted(){
        if(this.id){
            this.buttonText = "Update Member";
            this.headText = "Update Member"
        db.collection("Members").doc(this.id).get().then((doc)=>{
            this.member.name = doc.data().name;
            this.member.mid = doc.data().mid;
            this.member.number = doc.data().number;
            this.member.monthlyDate = doc.data().monthlyDate;
            this.member.careOf = doc.data().careOf;
            console.log(doc.data().careOf)
        })
        }
    },
    methods: {
        add: function(){
            var vm = this;
            if((this.name == "") || (this.mid == "" ) || ( this.monthlyDate =="" )){
                alert('Incomplete Fields')
            }else{
                if(confirm("Are you sure?")){
                    if(this.id){
                db.collection("Members").doc(vm.id).update(vm.member).then(()=>{
                    vm.showFullSuccessAlert();
                    router.push({
                        name: 'balance'
                    })
                })
                }else{
                    db.collection("Members").doc(vm.mid).set(vm.member).then(()=>{
                        vm.showFullSuccessAlert();
                        router.push({
                            name: 'balance'
                        })
                    }).catch((e)=>{
                        vm.$swal.fire({
                            title: 'Error!',
                            text: e.message,
                            type: 'error',
                            confirmButtonText: 'Okay'
                            })
                })
                }
                }
            }
        },
        cancel: function(){
            localStorage.removeItem('temp');
            router.push({
                name: 'balance'
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
