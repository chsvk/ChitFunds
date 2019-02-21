<template>
    <div class="addGroup">
        <div class="card">
        <h1 class="heading">Add New Interest</h1>
        <p v-if="CheckPressed">{{memberName}}</p>
        <input type="text" v-model="mid" placeholder="Enter Member ID">
        <button @click="checkforMember">Check</button>
        Date: <datepicker :format="customFormat" v-model="date"></datepicker>
        <input type="number" v-model="amount" placeholder="Enter Principal Amount">
        <input type="number" v-model="rate" placeholder="Enter Rate ( % )">
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
            memberName: '',
            CheckPressed: false,
            mid: '',
            name:'',
            date: '',
            amount: '',
            rate: '',
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
            this.mid = doc.data().mid;
            this.name = doc.data().name;
            this.date = String(doc.data().date).substring(8,10);
            this.amount = doc.data().amount;
            this.rate = doc.data().rate;
        })
        }
    },
    methods: {
        add: function(){
            if((this.mid =="") || (this.name =="") || ( this.date == "") || (this.amount == "") || (this.rate == "") || (this.due == "")){
                alert("Incomplete Fields")
            }else{
                if(confirm("Are You Sure?")){
                    if(this.id){
                db.collection("Interests").doc(this.id).update({
                   mid: this.mid,
                   name: this.name,
                   date: String(this.date).substring(8,10),
                   amount: this.amount,
                   rate: this.rate,
                   due: 0
                }, { merge: true }).then(()=>{
                    router.push({
                        name: 'interest'
                    })
                })
                }else{
                    db.collection("Interests").add({
                    mid: this.mid,
                    name: this.memberName,
                    amount: this.amount,
                    rate: this.rate,
                    date: String(this.date).substring(8,10),
                    principle: 0,
                    lastMonthPaid: false
                }).then(()=>{
                    db.collection("Members").doc(this.mid).collection("Interests").add({
                        amount: this.amount,
                        rate: this.rate,
                        date: String(this.date).substring(8,10)
                    }).then(()=>{
                        db.collection("Members").doc(this.mid).update({
                            interestDate: String(this.date).substring(8,10),
                            interestDue: 0,
                            interestAmount: 0,
                        }).then(()=>{
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
        checkforMember: function(){var vm = this;
            db.collection("Members").doc(this.mid).get().then((doc)=>{
                console.log(doc.exists)
                if(doc.exists){
                    vm.CheckPressed = true;
                    vm.memberName = doc.data().name;
                }else{
                    vm.CheckPressed = true;
                    vm.memberName = "No User Exists"
                }
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
