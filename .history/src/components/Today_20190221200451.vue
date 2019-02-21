<template>
    <div class="today">
        <h1 class="heading">Todays Payments</h1>
        <div class="tab">
        <div class="tabs">
        <h2 style="margin: 1em">Interest Dues</h2>
        <table v-if="inn.length>0">
            <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Due</th>
            </tr>
            <tr v-for="(i, index) in inn" :key="index">
                <td>{{i.name}}</td>
                <td>{{i.number}}</td>
                <td>{{i.interestDue}}</td>
            </tr>
        </table>
        <p v-else>No Interest Dues for Today</p>
    </div>
        <div class="tabs">
            <h2 style="margin: 1em">Chit Dues</h2>
            <table v-if="to.length>0">
            <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Due</th>
            </tr>
            <tr v-for="(i, index) in to" :key="index">
                <td>{{i.name}}</td>
                <td>{{i.number}}</td>
                <td>{{i.chitDue}}</td>
            </tr>
        </table>
        <p v-else>No Chit Dues For Today</p>
        </div>
        </div>
    </div>
</template>

<script>
import {db} from '../main'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
    data(){
        return{
            inn: [],
            to: [],
        }
    },
    computed: {
        ...mapState(['interests','today'])
    },
    mounted(){
        this.setEmpty();
        this.fetchInterests();
        this.fetchTodayPayments();
        this.inn = this.interests;
        this.to = this.today;
    },
    methods: {
        ...mapActions(['fetchInterests','fetchTodayPayments','setEmpty']),

    }
}
</script>

<style lang="scss" scoped>

     table {
        border-collapse: collapse;
        width: 60%
    }

    table, th, td {
        border: 1px solid black;
        text-align: center;
        padding: 1em;
    }

    .tab{
        display: flex;
        justify-content: space-around;

        .tabs{

        }
    }

</style>
