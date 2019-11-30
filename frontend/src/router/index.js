import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ActivityDetails from '../views/ActivityDetails.vue'
import EditActivity from '../views/EditActivity.vue'
import Login from '../views/Login.vue'
import UserProfile from '../views/UserProfile.vue'
import ActivityList from '../views/ActivityList.vue'


import ActivityAbout from "../components/ActivityAbout";
import ActivityMembers from "../components/ActivityMembers";
import ActivityDiscussions from "../components/ActivityDiscussions";
import ActivityPhotos from "../components/ActivityPhotos";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
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
    component: ActivityDetails,
    children: [
      {
        path: '/activity/:id',
        name: 'activityAbout',
        component: ActivityAbout
      },
      {
        path: '/activity/:id/members',
        name: 'Members',
        component: ActivityMembers
      },
      {
        path: '/activity/:id/discussions',
        name: 'activityDiscussions',
        component: ActivityDiscussions
      },
      {
        path: '/activity/:id/photos',
        name: 'activityPhotos',
        component: ActivityPhotos
      }
    ]
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
  {
    path: '/explore',
    name: 'activityList',
    component: ActivityList
  }
]

const router = new VueRouter({
  routes
})

export default router
