import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dash from './components/Dash'
import Login from './components/Login'
import Groups from './components/Groups'
// import Members from './components/Members'
import Interest from './components/Interest'
import Balance from './components/Balance'
import Auction from './components/Auction'
import DailyBook from './components/DailyBook'

// Views
import AddGroup from './views/AddGroup'
import AddMember from './views/AddMember'
import AddInterest from './views/AddInterest'
import ViewGroup from './views/ViewGroup'
import Today from './components/Today'
import UpdateInterest from './views/UpdateInterest'
import ViewMember from './views/ViewMember'
import ViewPrevAuction from './views/ViewPreviousAuctions'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      // name: 'dash',
      component: Dash,
      children: [
        {
          path: '/',
          name: 'dailyBook',
          component: DailyBook
        },
        {
          path: '/groups',
          name: 'groups',
          component: Groups,
        },
        {
          path: '/add',
          name: 'addGroup',
          component: AddGroup
        },
        {
          path: '/viewGroup',
          name: 'viewGroup',
          component: ViewGroup
        },
        {
          path: '/addMember',
          name: 'addMember',
          component: AddMember
        },
        {
          path: '/addInterest',
          name: 'addInterest',
          component: AddInterest
        },
        {
          path: '/updateInterest',
          name: 'updateInterest',
          component: UpdateInterest
        },
        {
          path: '/viewMember',
          name: 'viewMember',
          component: ViewMember
        },
        {
          path: '/interest',
          name: 'interest',
          component: Interest
        },
        {
          path: '/auction',
          name: 'auction',
          component: Auction
        },
        {
          path: '/balance',
          name: 'balance',
          component: Balance
        },
        {
          path: '/today',
          name: 'today',
          component: Today
        },
        {
          path: '/prevAuc',
          name: 'viewPrev',
          component: ViewPrevAuction
        }
      ]
    },
  ]
})
