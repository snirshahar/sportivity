import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ActivityDetails from '../views/ActivityDetails.vue'
import EditActivity from '../views/EditActivity.vue'
import Login from '../views/Login.vue'
import UserProfile from '../views/UserProfile.vue'
<<<<<<< HEAD
=======
import ActivityList from '../views/ActivityList.vue'
>>>>>>> explore-page-continue



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
<<<<<<< HEAD
=======
    path: '/activity/:id',
    name: 'activity',
    component: ActivityDetails,
  },
  {
>>>>>>> activity-details
    path: '/activity/add',
    name: 'activityEdit',
    component: EditActivity
  },
  {
    path: '/activity/edit/:id',
    name: 'activityEdit',
    component: EditActivity
  },
  {
    path: '/activity/:id',
    name: 'ActivityDetails',
    component: ActivityDetails
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
<<<<<<< HEAD
=======
  {
    path: '/explore',
    name: 'activityList',
    component: ActivityList
  }
>>>>>>> explore-page-continue
]

const router = new VueRouter({
  routes
})

export default router
