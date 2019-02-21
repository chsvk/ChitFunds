<template>
    <div>
        <input type="text" v-model="userName">
        <button @click="validateUserName">Check If Username is Valid</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userName: ''
        }
    },
    computed: {
        
    },
    methods: {
        validateUsername(){
            if(this.userName.length > 8){
                alert('Hello User ', this.userName)
            }
        }
    }
}
</script>

<style>

</style>
