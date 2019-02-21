import Vue from 'vue'
import Vuex from 'vuex'
import {db} from './main'
import { Resolver } from 'dns';
Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        paymentExist: false,
        interests: [],
        today: []
    },
    mutations: {
          setEmpty: (state)=>{
            state.interests = [];
            state.today = [];
        },  
    },
    actions: {
        hasOneDayPassed(){
                var Daypassed = ''
                var date = new Date().toLocaleDateString();
          
                if( localStorage.yourapp_date == date ) 
                    console.log(false)
            
                localStorage.yourapp_date = date;
                console.log(true);
          },
        fetchInterests(state){
            var today = new Date();
                var dd = today.getDate();
                if(dd<10){
                    dd=dd;
                } 
            var vm = this;
        var query = db.collection('Members').where("interestDate", "==", String(dd)).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                state.interests.push(doc.data())
                if(state.interests.length>0){
                    state.paymentExist = true
                }
            })
        })
    },
    fetchTodayPayments(state){
        var today = new Date();
            var dd = today.getDate();
            if(dd<10){
                dd=dd;
            } 
            console.log(dd);
        var query2 = db.collection("Members").where("monthlyDate", "==", String(dd)).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                console.log(doc.data());
                state.today.push(doc.data())
                console.log(state.today.length)
                state.paymentExist = true;
            })
        })
    },
}
})