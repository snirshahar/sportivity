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
      return activityService.getActivies().then(activities => {
        return context.commit({ setActivities, activities })
      });
    }
  },
  getters: {
    all() {
      return this.state.all;
    },
    popular() {
      return this.state.popular;
    },
    recent() {
      return this.state.recent;
    },
    today() {
      return this.state.today;
    },
  },
  modules: {
  }
})
