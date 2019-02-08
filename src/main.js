import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import ToggleButton from 'vue-js-toggle-button'
import store from './store'



Vue.use(ToggleButton)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyDI9u2Riw9qzwsIriaRgPlFangGBujOi-g",
    authDomain: "chit-funds-87725.firebaseapp.com",
    databaseURL: "https://chit-funds-87725.firebaseio.com",
    projectId: "chit-funds-87725",
    storageBucket: "chit-funds-87725.appspot.com",
    messagingSenderId: "1023685990004"
}
)

export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
