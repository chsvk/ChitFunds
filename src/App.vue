<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
import {db} from './main'
import router from './router'
import {mapMutations} from 'vuex'
export default {
  router,
  date(){
    return{
    }
  },
  mounted(){
    var vm = this;
    // if(firebase.auth().currentUser){
      //  if(localStorage.getItem('TodaysDate')){
      //   if(localStorage.getItem('TodaysDate') == this.getToday()){

      //   }else{
      //     localStorage.setItem('TodaysDate', this.getToday());
      //     this.updateInterest();
      //     // this.updateGroups();
      //   }
      //   }else{
      //     localStorage.setItem("TodaysDate", this.getToday());
      //     this.updateInterest();
      //   }
    // }else{
    //   router.push({
    //     name: 'login'
    //   })
    // }
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
           if(localStorage.getItem('TodaysDate')){
            if(localStorage.getItem('TodaysDate') == vm.getToday()){

            }else{
              localStorage.setItem('TodaysDate', vm.getToday());
              vm.updateInterest();
              // this.updateGroups();
            }
            }else{
              localStorage.setItem("TodaysDate", vm.getToday());
              vm.updateInterest();
            }
      } else {
        console.log('No')
        router.push({
          name: 'login'
        })
        // No user is signed in.
      }
    });
  },
  methods: {
    getToday: function(){
      var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd;
            } 
            if(mm<10){
                mm='0'+mm;
            } 
            return dd;
    },
    updateInterest: function(){
      db.collection("Interests").where("interestDue", "==", this.getToday()).get().then((snapshot)=>{
      snapshot.forEach((doc)=>{
          db.collection("Interests").doc(doc.id).get().then((doc)=>{
            if(doc.data().lastMonthPaid){
              db.collection("Interests").doc(doc.id).update({
                lastMonthPaid: false
              })
            }else{
              db.collection("Interests").doc(doc.id).update({
                due: doc.data().due + ((doc.data().amount - doc.data().principle) - (doc.data().rate/100))
              })
            }
          })
      })
    })
    },

    updateGroups: function(){
      
    }

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
