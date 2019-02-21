<template>
    <div class="addGroup">
        <div class="card">
        <h1 class="heading">{{headText}}</h1>
        <input type="text" v-model="name" placeholder="Enter Member Name">
        <input type="text" v-model="mid" placeholder="Enter Member ID">
        <input type="text" v-model="careOf" placeholder="Care of">
        <input type="number" v-model="number" placeholder="Enter Member Phone Number">
        <input type="number" v-model="monthlyDate" placeholder="Enter Monthly Date">
        <datePicker v-model="bday"></datePicker>
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
export default {
    router,
    data(){
        return{
            name: '',
            mid: '',
            number: '',
            monthlyDate: '',
            buttonText: 'Add Member',
            id: localStorage.getItem('temp'),
            careOf:'',
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
            this.name = doc.data().name;
            this.mid = doc.data().mid;
            this.number = doc.data().number;
            this.monthlyDate = doc.data().monthlyDate;
            this.careOf = doc.data().careOf;
            this.bday = doc.data().bday
            console.log(doc.data().careOf)
        })
        }
    },
    methods: {
        add: function(){
            if((this.name == "") || (this.mid == "" ) || ( this.monthlyDate =="" ) || (this.careOf == "" ) || (this.bday == "")){
                alert('Incomplete Fields')
            }else{
                if(confirm("Are you sure?")){
                    if(this.id){
                db.collection("Members").doc(this.id).update({
                    name: this.name,
                    mid: this.mid,
                    number: this.number,
                    monthlyDate: this.monthlyDate,
                    careOf: this.careOf,
                    bday: this.bday
                }).then(()=>{
                    router.push({
                        name: 'balance'
                    })
                })
                }else{
                    db.collection("Members").doc(this.mid).set({
                        name: this.name,
                        mid: this.mid,
                        number: this.number,
                        monthlyDate: this.monthlyDate,
                        careOf: this.careOf,
                        bday: this.bday 
                }).then(()=>{
                    router.push({
                        name: 'balance'
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
