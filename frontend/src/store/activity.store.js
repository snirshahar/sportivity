import Vue from 'vue'
import Vuex from 'vuex'
import { activityService } from '@/services/ActivityService';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    activities: {
      all: [],
      popular: [],
      recent: [],
      today: [],
    },
  },
  mutations: {
    setActivities(state, type, activities) {
      state.activities[type] = activities;
    },
  },
  actions: {
    loadActivities(context) {
      console.log('sdfsdfgsdf');
      
      return activityService.getActivities()
          .then(activities => {
        return context.commit({ type:"setActivities", activities })
      });
    }
  },
  getters: {
    all(state) {
      return state.activities.all;
    },
    popular(state) {
      return state.activities.popular;
    },
    recent(state) {
      return state.activities.recent;
    },
    today(state) {
      return state.activities.today;
    },
  },
  modules: {
  }
})
