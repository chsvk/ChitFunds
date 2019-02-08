<template>
  <div class="home">
  </div>
</template>

<script>
import firebase from 'firebase'
import router from '../router'
export default {
  name: 'home',
  router,
  components: {
  },
  mounted(){
    if(firebase.auth().currentUser){
      console.log('User')
    }else{
      console.log('No User')
    }
  }
}
</script>
