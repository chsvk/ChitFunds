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
  // apiKey: "AIzaSyAIBPUyHbauRTW4r-gbJUtodxcyynF8wrs",
  //   authDomain: "chitfunds-497bf.firebaseapp.com",
  //   databaseURL: "https://chitfunds-497bf.firebaseio.com",
  //   projectId: "chitfunds-497bf",
  //   storageBucket: "chitfunds-497bf.appspot.com",
  //   messagingSenderId: "874708452255"
  apiKey: "AIzaSyCHVBkxc7XBfdu5H1sw5DUJQN90__9nueQ",
    authDomain: "chitfunds-92413.firebaseapp.com",
    databaseURL: "https://chitfunds-92413.firebaseio.com",
    projectId: "chitfunds-92413",
    storageBucket: "chitfunds-92413.appspot.com",
    messagingSenderId: "804368071788"
}
)

export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
