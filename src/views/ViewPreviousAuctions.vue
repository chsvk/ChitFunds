<template>
    <div class="prev">
        <h1 class="heading">Previous Auctions</h1>
        <table>
            <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Installment</th>
                <th>Month</th>
            </tr>
            <tr v-for="(group, index) in groups" :key="index">
                <td>{{group.name}}</td>
                <td>{{group.value}}</td>
                <td>{{group.netInstallment}}</td>
                <td>{{group.month}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import {db} from '../main'
export default {
    data(){
        return{
            groups: []
        }
    },
    mounted(){var vm = this;
        db.collection("Auctions").get().then((query)=>{
            query.forEach((doc)=>{
                vm.groups.push(doc.data());
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
