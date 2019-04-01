<template>
    <div class="groups">
        <h1 class="heading">Members List</h1>
        <button class="add" @click="add">Add Member</button>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Due</th>
                <th>Number</th>
                <th>Monthly Date</th>
                <th>Actions</th>
            </tr>
            <tr v-for="(group, index) in groups" :key="index">
                <td>{{group.data.mid}}</td>
                <td>{{group.data.name}}</td>
                <td>{{group.data.due}}</td>
                <td>{{group.data.number}}</td>
                <td>{{group.data.monthlyDate}}</td>
                <td>
                    <div style="display:flex" class="buttons">
                        <button @click="edit(group.id)" style="background:#03A9F4">Edit</button>
                        <button @click="view(group.id)" style="background:#FFC107">View</button>
                        <button @click="del(group.id)" style="background:#E64A19">Delete</button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import {db} from '../main';
import router from '../router'
export default {

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
                name: 'addMember'
            });
        },
        edit: function(id){
            localStorage.setItem('temp', id);
            router.push({
                name: 'addMember',
            })
        },
        view: function(id){
            localStorage.setItem('temp', id);
            router.push({
                name:'viewMember'
                })
        },
        del: function(id){
            if(confirm("Are You Sure?")){
                db.collection("Members").doc(id).delete().then(()=>{

            })
            }
        }
    },
    mounted(){var vm = this;
    localStorage.removeItem('temp');
        db.collection("Members").orderBy("mid").onSnapshot(function(query){
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
