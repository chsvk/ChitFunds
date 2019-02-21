<template>
    <div class="dailyEdit">
        <form @submit.prevent="UpdateDaily">
            <datepicker :format="customFormat" v-model="daily.date"></datepicker>
            <input type="text" placeholder="Enter MID" v-model="daily.mid">
            <input type="text" placeholder="Enter Chit Installement" v-model="daily.chitValue">
            <input type="text" placeholder="Enter Principle" v-model="daily.principle">
            <input type="text" placeholder="Enter Interest" v-model="daily.interest">
            <input type="text" placeholder="Enter Excess" v-model="daily.excess">
            <input type="text" placeholder="Enter Discount" v-model="daily.discount">
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import Utils from '@/Mixins/Utils'
export default {
    mixins: [Utils],
    components: {
        Datepicker
    },
    props: {
        daily: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            customFormat: 'dd MMM yyyy',
        }
    },
    methods: {
        updateDailyBook(){
            this.$store.dispatch('updateDailyBook', {})
        }
    }
}
</script>

<style lang="scss" scoped>
    .dailyEdit{
        form{
            padding: 1em;
            input: {
                padding: 1em;
                width: 50%;
            }
        }
    }
</style>
