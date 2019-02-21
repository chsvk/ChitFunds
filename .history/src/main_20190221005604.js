import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import ToggleButton from 'vue-js-toggle-button'
import store from './store'



Vue.use(ToggleButton)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyAIBPUyHbauRTW4r-gbJUtodxcyynF8wrs",
    authDomain: "chitfunds-497bf.firebaseapp.com",
    databaseURL: "https://chitfunds-497bf.firebaseio.com",
    projectId: "chitfunds-497bf",
    storageBucket: "chitfunds-497bf.appspot.com",
    messagingSenderId: "874708452255"
}
)

export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
