<template>
    <div class="addGroup">
        <div class="card">
        <h1 class="heading">Add New Interest</h1>
        <p v-if="CheckPressed">{{interest.name}}</p>
        <input type="text" v-model="interest.mid" placeholder="Enter Member ID">
        <button @click="checkforMember">Check</button>
        Date: <datepicker :format="customFormat" v-model="interest.date"></datepicker>
        <input type="number" v-model="interest.amount" placeholder="Enter Principal Amount">
        <input type="number" v-model="interest.rate" placeholder="Enter Rate ( % )">
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
            interest: {
                name: '',
                mid: '',
                date: '',
                amount: '',
                rate: ''
            },
            CheckPressed: false,
            buttonText: 'Add Interest',
            id: localStorage.getItem('temp'),
            customFormat: 'dd MMM yyyy'
        }
    },
    components: {
        Datepicker
    },
    mounted(){
        if(this.id){
            this.buttonText = "Update Interest";
        db.collection("Interests").doc(this.id).get().then((doc)=>{
            this.interest = {...doc.data()};
        })
        }
    },
    methods: {
        add: function(){
            var vm = this;
            if(!this.checkAllFields(this.interest)){
                vm.showIncompleteAlert("Incomplete Fields");
            }else{
                if(confirm("Are You Sure?")){
                    if(this.id){
                        vm.interest = {...vm.interest, due:0}
                        db.collection("Interests").doc(this.id).update(vm.interest, { merge: true }).then(()=>{
                            vm.showSuccessAlert();
                            router.push({
                                name: 'interest'
                            })
                        })
                }else{
                    vm.interest = {...vm.interest, date: String(vm.interest.date).substring(8,10), principle: 0, lastMonthPaid: flase}
                    db.collection("Interests").add(vm.interest).then(()=>{
                    db.collection("Members").doc(this.mid).collection("Interests").add({
                        amount: vm.interest.amount,
                        rate: vm.interest.rate,
                        date: String(vm.interest.date).substring(8,10)
                    }).then(()=>{
                        db.collection("Members").doc(vm.mid).update({
                            interestDate: String(vm.date).substring(8,10),
                            interestDue: 0,
                            interestAmount: 0,
                        }).then(()=>{
                            vm.showFullSuccessAlert()
                            router.push({
                            name: 'interest'
                        })
                    })
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
                name: 'interest'
            })
        },
        checkforMember: function(){
            this.CheckPressed = true;
            this.$store.dispatch('checkforMember', {mid: this.interest.mid}).then((response)=>{
                this.interest.name = response;
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
