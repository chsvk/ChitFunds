<template>
    <div class="groups">
        <h1 class="heading">Groups List</h1>
        <button class="add" @click="add">Add Group</button>
        <table>
            <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Months</th>
                <th>Starting Date</th>
                <th>Actions</th>
            </tr>
            <tr v-for="(group, index) in groups" :key="index">
                <td>{{group.name}}</td>
                <td>{{group.value}}</td>
                <td>{{group.months}}</td>
                <td>{{group.started}}</td>
                <td>
                    <div style="display:flex" class="buttons">
                        <button @click="edit(group.name)" style="background:#03A9F4">Edit</button>
                        <button @click="view(group.name)" style="background:#FFC107">View</button>
                        <button @click="del(group)" style="background:#E64A19">Delete</button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import {db} from '../main';
import AddGroup from '../views/AddGroup'
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
                name: 'addGroup'
            });
        },
        edit: function(id){
            localStorage.setItem('temp', id);
            router.push({
                name: 'addGroup',
            })
        },
        view: function(id){
            localStorage.setItem('temp', id);
            router.push({
                name: 'viewGroup'
            })
            
        },
        del: function(group){
            var vm = this;
            db.collection("Groups").doc(group.id).collection("Members").get().then((doc)=>{
                console.log(doc)
                doc.forEach((doc)=>{
                    db.collection('Members').doc(doc.id).collection("Groups").doc(group.id).delete().then((doc)=>{
                    }).then(()=>{
                        db.collection("Groups").doc(group.id).delete().then((doc)=>{
                            vm.showFullSuccessAlert();
                        })
                    })
                })
            })
            // if(confirm("Are You Sure?")){

            //     db.collection("Groups").doc(id).delete().then(()=>{
            //         alert("Group Deleted")
            //     })
            // }
        }
    },
    mounted(){var vm = this;
    localStorage.removeItem('temp');
        db.collection("Groups").onSnapshot(function(query){
            vm.groups = [];
            query.forEach(function(doc){
                vm.groups.push({...doc.data(), id: doc.id})
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
