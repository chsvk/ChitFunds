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
import NewMembers from '@/Data/Members2'
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
          // NewMembers.forEach((member)=>{
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
            var userObject = {
              name: Member.name,
              mid: Member.mid,
              lastMonthPaid: false
            }
            var groupObject;
            // console.log(Member.name)
            for(var i =0; i<Member['No Of Groups']; i++){

              if(Object.values(Member)[i+5] != "" && (Member['No Of Groups'] != 0)){
                db.collection("Groups").doc(Object.values(Member)[i+4]).onSnapshot((doc)=>{
                if(doc.exists){
                  groupObject = {
                  name: doc.data().name,
                  started: doc.data().started,
                  chitValue: doc.data().value
                }
                console.log(doc.exists);
                console.log(groupObject)
                // db.collection("Members").doc(String(userObject.mid)).collection("Groups").doc(groupObject.name).set(groupObject).then(()=>{
                //   db.collection("Groups").doc(groupObject.name).collection("Members").doc(String(userObject.mid)).set(userObject).then(()=>{
                //     console.log("Operation Complete")
                //   })
                // })
                }else{
                  // console.log(Object.values(Member)[i+5])
                }
                
              })
              }
            }

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
  },
  
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
