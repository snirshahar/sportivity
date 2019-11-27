import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ActivityDetails from '../views/ActivityDetails.vue'
import EditActivity from '../views/EditActivity.vue'
import Login from '../views/Login.vue'
import UserProfile from '../views/UserProfile.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/activity/:id',
    name: 'activity',
    component: ActivityDetails
  },
  {
    path: '/activity/add',
    name: 'activityAdd',
    component: EditActivity
  },
  {
    path: '/activity/edit/:id',
    name: 'activityEdit',
    component: EditActivity
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: UserProfile
  },
]

const router = new VueRouter({
  routes
})

export default router
