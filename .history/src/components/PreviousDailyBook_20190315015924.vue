<template>
    <div class="groups">
        <div class="flex">
            <h1 class="heading">Daily Book History</h1>
        </div>
        <div class="select">
            <h4>Select Date <datepicker v-model="dateSelected"></datepicker></h4>
        </div>
        <table>
            <tr>
                <th>Date</th>
                <th>ID/Name</th>
                <th>Chit Installment</th>
                <th>Principle</th>
                <th>Interest</th>
                <th>Excess</th>
                <th>Discount</th>
                <th>Actions</th>
            </tr>
            <tr v-for="(group, index) in groups" :key="index">
                <td>{{group.today}}</td>
                <td>{{group.mid}}/{{group.name}}</td>
                <td>{{group.chitValue}}</td>
                <td>{{group.principle}}</td>
                <td>{{group.interest}}</td>
                <td>{{group.excess}}</td>
                <td>{{group.discount}}</td>
                <td>
                    <div style="display:flex" class="buttons">
                        <button @click="editDailyBook(group)" style="background:#03A9F4">Edit</button>
                        <button @click="deleteFromDailyBook(group.id)" style="background:#E64A19">Delete</button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import {db} from '../main';
import router from '../router'
import Datepicker from 'vuejs-datepicker';
import Utils from '@/Mixins/Utils'
export default {
    mixins: [Utils],
    data(){
        return{
            groups: [],
            data: {
                mid: '',
                principle: '',
                chitValue: '',
                interest: '',
                excess: '',
                discount: '',
                today: '',
                name: ''
            },
            dateSelected: '',
            customFormatter: 'dd MMM yyyy'
        }
    },
    components: {
        Datepicker
    },
    methods: {
        checkforMember(){
            this.$store.dispatch('checkforMember', {mid: this.data.mid}).then((response)=>{
                this.data.name = response;
            })
        },
        previousDailyBook(){
            this.$router.push({
                name: 'previousDaily'
            })
        },
        add(){
            var vm = this;
            
            if(this.data.today){
                vm.data = {...vm.data, today: vm.formatDate(vm.data.today)}
            }else{
                vm.data = {...vm.data, today: this.getDate()}
            }
            if(!(this.checkAllFields(this.data)) || (String(this.data.name).includes("No User"))){
                vm.showIncompleteAlert("Fields Incomplete / User Details Error");
            }else{
                if(confirm('Are You Sure?')){
                    db.collection("DailyBook").add(vm.data).then(()=>{
                        vm.showSuccessAlert();
                    })
                }  
            }
        },
        deleteFromDailyBook(id){
            var vm = this;
            if(confirm("Are You Sure?")){
                db.collection('DailyBook').doc(id).delete().then(()=>{
                    vm.showSuccessAlert();
                })
            }
        },
        updateInterest: function(){
             db.collection("Interests").doc(localStorage.getItem('temp')).get().then((doc)=>{
                db.collection("Interests").doc(localStorage.getItem('temp')).update({
                    principle: doc.data().principle + vm.principle,
                    interestAmount: doc.data().due - vm.interestAmount,
                    lastMonthPaid: true
                })
            })
        },
        editDailyBook(DailyBook){
            this.$router.push({
                name: 'editDailyBook',
                params: {
                    daily: DailyBook
                }
            })
        }
    },
    mounted(){var vm = this;
    localStorage.removeItem('temp');
        db.collection("DailyBook").onSnapshot(function(query){
            vm.groups = [];
            query.forEach(function(doc){
                vm.groups.push({...doc.data(), id: doc.id})
            })
        })
    },
}
</script>
<style lang="scss" scoped>

 button{
                width: 80%;
                color: white;
                border: none;
                border-radius: 6px;
                padding: 0.5em 0;
                border: none;
                background: #2196F3;
            }

    .groups{
        .add{
            margin-left: 80%;
            border: none;
            background: lightgreen;
            color: black;
            padding: 1em;
            margin:1em;
        }

        .previous{
            width: 15%;
            padding: 1em;
        }
    }

    table {
    border-collapse: collapse;
    width:  96%
    }

    table, th, td {
        border: 1px solid black;
        text-align: center;
        padding: 1em;

        .buttons{
            button{
                width: 80%;
                color: white;
                border: none;
                border-radius: 6px;
                padding: 0.5em 0;
            }
        }

        input{
            width: 50%;
            padding: 1em;
        }
    }

</style>
