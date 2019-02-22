<template>
    <div class="dailyEdit">
        <h1 class="heading">Edit Daily Book</h1>
        <form @submit.prevent="UpdateDaily">
            <!-- <span>Pick New Date:</span><datepicker :format="customFormat" v-model="daily.date"></datepicker> -->
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
        UpdateDaily(){
            this.$store.dispatch('updateDailyBook', {data: this.daily}).then(()=>{
                this.showSuccessAlert();
                this.$router.push({
                    name: 'dailyBook'
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .dailyEdit{
        form{
            padding: 1em;
            input{
                padding: 1em;
                width: 50%;
                margin: 1em;
            }
            button{
                width: 50%;
                padding: 1em;
            }
        }
    }
</style>
