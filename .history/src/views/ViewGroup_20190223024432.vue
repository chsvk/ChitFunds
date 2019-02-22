<template>
    <div class="groups">
        <h1 class="heading">{{groupName}} ({{started}})</h1>
        <h3>Members List</h3>
        <table>
            <tr>
                <td><input type="text" v-model="mid" placeholder="Enter ID"><button @click="check">Check</button></td>
                <td>{{name}}</td>
                <td><button @click="add">Add</button></td>
            </tr>
            <tr>
                <th class="mid">MID</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
            <tr :class="{lifted: group.ChitLifted}" v-for="(group, index) in groups" :key="index">
                <td>{{group.mid}}</td>
                <td>{{group.name}}</td>
                <td><button @click="viewMember(group.mid)">View Profile</button> <button @click="del(group.mid)">Delete</button></td>
            </tr>
        </table>
        <h3>Notes</h3>
        <div class="flex">
            <input type="text" v-for="(note, i) in notes" :key="i" v-model="note.value" placeholder="Enter Your Notes">
            <button @click="addNewNote()">Add More Notes</button>
        </div>
        <button @click="Update">Update</button>
        <h3>Existing Notes</h3>
        <ul v-if="group.notes">
            <li v-for="(note,i) in group.notes" :key="i">{{note.value}}</li>
        </ul>
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
            mid: '',
            groups: [],
            name: '',
            groupName: '',
            started: '',
            addok: false,
            groupValue: '',
            notes: [{
                value: ''
            }]
        }
    },
    components: {
    },
    methods: {
        add: function(){var vm = this;
            if(this.addok){
                db.collection("Groups").doc(localStorage.getItem('temp')).collection("Members").doc(this.mid).get().then((doc)=>{
                    if(doc.exists){
                        vm.showIncompleteAlert("User Already Exists")
                    }else{
                        db.collection("Groups").doc(localStorage.getItem('temp')).collection("Members").doc(this.mid).set({
                        name: vm.name,
                        mid: vm.mid,
                        lastMonthPaid: false,
                        });
                        db.collection("Members").doc(this.mid).collection("Groups").doc(localStorage.getItem('temp')).set({
                            name: vm.groupName,
                            started: vm.started,
                            chitValue: vm.groupValue
                        }).then(()=>{
                            vm.showSuccessAlert();
                            vm.name= "";
                            vm.addok = false;
                        })
                    }
                })   
            }
        },
        addNewNote(){
            this.notes.push({
                value: ''
            })
        },
        viewMember: function(mid){
            localStorage.setItem("temp", mid);
            router.push({
                name: 'viewMember'
            })
        },
        del: function(mid){
            if(confirm("Are You Sure?")){
                db.collection("Members").doc(mid).collection("Groups").doc(this.groupName).delete();
                db.collection("Groups").doc(this.groupName).collection("Members").doc(mid).delete();
                this.showSuccessAlert();
            }
        },
        check: function(){
            db.collection("Members").doc(this.mid).get().then((doc)=>{
                if(doc.exists){
                    this.name = doc.data().name;
                    this.mid = doc.data().mid;
                    this.addok = true;
                }else{
                    this.name = "No User Exists"
                }
            })
        },
        update(){
            var vm = this;
            db.collection("Groups").doc(this.groupName).update({
                notes: vm.notes
            }).then(()=>{
                vm.showSuccessAlert()
            })
        }
    },
    mounted(){var vm = this;
        db.collection("Groups").doc(localStorage.getItem('temp')).get().then((doc)=>{
            vm.groupName = doc.data().name;
            vm.started = doc.data().started;
            vm.groupValue = doc.data().value;
            db.collection("Groups").doc(localStorage.getItem('temp')).collection('Members').onSnapshot(function(querySnapshot) {
                    vm.groups = [];
                querySnapshot.forEach(function(doc) {
                    vm.groups.push(doc.data());
                });
            });
        })
    }
}
</script>

<style lang="scss" scoped>

button{
    margin-left: 80%;
            border: none;
            background: #2196F3;
            color: white;
            padding: 0.4em 1em;
            margin: 0 1em;
}


.lifted {
    background: #FFCDD2
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
    }

</style>
