import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import ToggleButton from 'vue-js-toggle-button'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
 
const SweetAlertOptions = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}
Vue.use(VueSweetalert2, SweetAlertOptions);
Vue.use(ToggleButton)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyBh9byv0nUHtXcoaCmemfmN7Jl67pdqNjc",
    authDomain: "chits-d495d.firebaseapp.com",
    databaseURL: "https://chits-d495d.firebaseio.com",
    projectId: "chits-d495d",
    storageBucket: "chits-d495d.appspot.com",
    messagingSenderId: "786842757324"
}
)

export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
