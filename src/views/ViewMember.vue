<template>
    <div class="viewMem">
        <h1 class="heading">View Member</h1>
        <div class="content">
            <h3>Name: </h3>
            <p>{{member.name}}</p>
        </div>
        <div class="content">
            <h3>MID: </h3>
            <p>{{member.mid}}</p>
        </div>
        <div class="content">
            <h3>Care Of: </h3>
            <p>{{member.careOf}}</p>
        </div>
        <div class="content">
            <h3>Payment Date: </h3>
            <p>{{member.monthlyDate}}</p>
        </div>
        <div class="content">
            <h3>Phone Number: </h3>
            <p>{{member.number}}</p>
        </div>
        <div class="content">
            <h3>Date of Birth: </h3>
            <p>{{String(member.bday).substring(4,16)}}</p>
        </div>
        <hr>
        <h2 style="margin: 0.5em">Chits Involved</h2>
        <h4 v-if="groups.length<1">No Groups Involved</h4>
        <div v-else v-for="(g,index) in groups" :key="index" class="grp">
            <div class="content">
                <h3>Name: </h3>
                <p>{{g.name}}</p>
            </div>
            <div class="content">
                <h3>ChitValue: </h3>
                <p>{{g.chitValue}}</p>
            </div>
            <div class="content">
                <h3>Started: </h3>
                <p>{{g.started}}</p>
            </div>
            <div class="content">
                <h3>Due: </h3>
                <p>{{g.due}}</p>
            </div>
        </div>
        <hr>
        <h2 style="margin: 0.5em">Interests Involved</h2>
        <h4 v-if="groups.length<1">No Interests Involved</h4>
        <div v-else v-for="(g,index) in inte" :key="index" class="grp">
            <div class="content">
                <h3>Amount: </h3>
                <p>{{g.amount}}</p>
            </div>
            <div class="content">
                <h3>Date: </h3>
                <p>{{g.date}}</p>
            </div>
            <div class="content">
                <h3>Rate: </h3>
                <p>{{g.rate}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {db} from '../main'
export default {
    data(){
        return{
            member: '',
            inte: [],
            groups: []
        }
    },
    mounted(){this.groups = [];
    var vm = this;
        db.collection('Members').doc(localStorage.getItem('temp')).get().then((doc)=>{
            this.member = doc.data();
            
        })
        db.collection("Members").doc(localStorage.getItem('temp')).collection('Groups').get().then(function(query){
            query.forEach((doc)=>{
                vm.groups.push(doc.data())
            })
        })
        
        db.collection("Members").doc(localStorage.getItem('temp')).collection('Interests').get().then(function(query){
            query.forEach((doc)=>{
                vm.inte.push(doc.data())
            })
        })

    }
}
</script>

<style lang="scss" scoped>
    .content{
        display: flex;
        padding: 0.5em;

        p{
            margin: 0 1em;
            margin-top: 0.1em;
            // padding: 0.5em;
        }
    }

</style>

