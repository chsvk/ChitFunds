<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
import {db} from './main'
import router from './router'
import {mapActions} from 'vuex'
import GroupMembers from '@/Data/GroupMembers'
// import Members from '@/Data/Members'
// import Groups from '@/Data/Groups'
export default {
  router,
  date(){
    return{
    }
  },
  mounted(){
    var vm = this;  
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          // Members.forEach((member)=>{
          //   db.collection("Members").doc(String(member.mid)).set(member).then(()=>{
          //     console.log('Doen')
          //   })
          // })
          // Groups.forEach((group)=>{
          //   db.collection("Groups").doc(group.name).set(group).then(()=>{
          //     console.log('Added Group')
          //   })
          // })
          GroupMembers.forEach((Member)=>{
            Object.keys(Member).forEach((Key)=>{
              console.log(Member[Key])
            })
          })
          vm.hasOneDayPassed().then((DayPassed)=>{
            if(DayPassed){
              this.fetchTodayPayments();
              this.fetchInterests();
              this.updateInterest()
            }
          })
      } else {
        console.log('No User Logged In')
        router.push({
          name: 'login'
        })
        // No user is signed in.
      }
    });
  },
  methods: {
    ...mapActions(['fetchTodayPayments', 'fetchInterests', 'hasOneDayPassed']),
  }
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins:300,300i,400,600,700,700i,800,800i');

*{
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

.heading{
  text-align: center;
  padding: 1em;
}

button{
  cursor: pointer;
}
</style>
