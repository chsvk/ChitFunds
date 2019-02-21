import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import ToggleButton from 'vue-js-toggle-button'
import store from './store'



Vue.use(ToggleButton)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyCHVBkxc7XBfdu5H1sw5DUJQN90__9nueQ",
    authDomain: "chitfunds-92413.firebaseapp.com",
    databaseURL: "https://chitfunds-92413.firebaseio.com",
    projectId: "chitfunds-92413",
    storageBucket: "",
    messagingSenderId: "804368071788"
}
)

export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
