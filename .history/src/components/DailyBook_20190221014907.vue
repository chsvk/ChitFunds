<template>
    <div class="groups">
        <h1 class="heading">Daily Book</h1>
        <table>
            <tr>
                <td>Name : {{message}}</td>
            </tr>
            <tr>
                <td>
                    <div style="display:flex" class="content">
                        <input type="text" placeholder="MID" v-model="mid">
                        <button @click="checkforMember()">Check</button>
                    </div>
                </td>
                <td><input type="text" placeholder="Chit Installment" v-model="chitValue"></td>
                <td><input type="text" placeholder="Principle" v-model="principle"></td>
                <td><input type="text" placeholder="Interest" v-model="interest"></td>
                <td><input type="text" placeholder="Excess" v-model="excess"></td>
                <td><input type="text" placeholder="Discount" v-model="discount"></td>
                <td><button style="width: 150%" @click="add(mid)">Add</button></td>
            </tr>
            <tr>
                <th>ID/Name</th>
                <th>Chit Installment</th>
                <th>Principle</th>
                <th>Interest</th>
                <th>Excess</th>
                <th>Discount</th>
            </tr>
            <tr v-for="(group, index) in groups" :key="index">
                <td>{{group.mid + "/" + group.name}}</td>
                <td>{{group.chitValue}}</td>
                <td>{{group.principle}}</td>
                <td>{{group.interest}}</td>
                <td>{{group.excess}}</td>
                <td>{{group.discount}}</td>
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
            mid: '',
            chitValue: '',
            principle: '',
            interest: '',
            excess: '',
            discount: '',
            today: '',
            message: '',
        }
    },
    components: {
        Datepicker
    },
    methods: {
        checkforMember(){
            this.$store.dispatch('checkforMember', {mid: this.mid}).then((response)=>{
                this.message = response;
            })
        },
        add(){
            if((this.mid || this.principle || this.chitValue || this.interest || this.excess || this.discount || this.today) == ""){
                this.$swal.fire({
                        title: 'Error!',
                        text: 'Incomplete Fields',
                        type: 'error',
                        confirmButtonText: 'Okay'
                        })
            }else{
                if(confirm('Are You Sure?')){
                    db.collection("DailyBook").doc(this.mid).set({
                        mid: this.mid,
                        chitValue: this.chitValue,
                        principle: this.principle,
                        interest: this.interest,
                        excess: this.excess,
                        discount: this.discount,
                        today: this.getDate()
                    })
                }
                
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
        }
    },
    mounted(){var vm = this;
    localStorage.removeItem('temp');
        db.collection("DailyBook").onSnapshot(function(query){
            vm.groups = [];
            query.forEach(function(doc){
                vm.groups.push(doc.data())
            })
        })
    }
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
            background: #2196F3;
            color: white;
            padding: 1em;
            margin:1em;
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
