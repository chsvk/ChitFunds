<template>
    <div class="groups">
        <h1 class="heading">Interest Sheet</h1>
        <button class="add" @click="add">Add Interest</button>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Principle Recieved</th>
                <th>Balance</th>
                <th>Interest Rate</th>
                <th>Due</th>
                <th>Actions</th>
            </tr>
            <tr v-for="(group, index) in groups" :key="index">
                <td>{{group.data.mid}}</td>
                <td>{{group.data.name}}</td>
                <td>{{group.data.date}}</td>
                <td>{{group.data.amount}}</td>
                <td>{{group.data.principle}}</td>
                <td>{{group.data.amount - group.data.principle}}</td>
                <td>{{group.data.rate}}</td>
                <td>{{((group.data.amount - group.data.principle) * (group.data.rate/100))}}</td>
                <td>
                    <div style="display:flex" class="buttons">
                        <button @click="edit(group.id)" style="background:#03A9F4">Edit</button>
                        <button @click="del(group)" style="background:#E64A19">Delete</button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import {db} from '../main';
import router from '../router'
import Utils from '@/Mixins/Utils'
export default {
    mixins: [Utils],
    data(){
        return{
            groups: []
        }
    },
    components: {
    },
    methods: {
        add: function(){
            localStorage.removeItem('temp');
            router.push({
                name: 'addInterest'
            });
        },
        edit: function(id){
            localStorage.setItem('temp', id);
            router.push({
                name: 'updateInterest',
            })
        },
        view: function(id){
            localStorage.setItem('temp', id);
            
        },
        del: function(id){
            var vm = this;
            if(confirm("Are You Sure?")){
                db.collection("Interests").doc(id.id).delete().then(()=>{
            })  
                db.collection("Members").doc(id.data.mid).collection("Interests").doc(id.id).delete().then(()=>{
                    vm.showCustomSuccessAlert("Deleted")
            })
            }
        }
    },
    mounted(){var vm = this;
    localStorage.removeItem('temp');
        db.collection("Interests").onSnapshot(function(query){
            vm.groups = [];
            query.forEach(function(doc){
                var o = {
                    data: doc.data(),
                    id: doc.id
                }
                vm.groups.push(o)
            })
        })
    }
}
</script>
<style lang="scss" scoped>

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
    }

</style>
