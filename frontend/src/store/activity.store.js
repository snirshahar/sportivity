import Vue from 'vue'
import Vuex from 'vuex'
import activityService from '../services/ActivityService';

Vue.use(Vuex)

export default ({
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
    setActivities(state, { filter, activities }) {
      state.activities[filter] = activities;
    },
  },
  actions: {
    async loadActivities(context) {
      const activities = await activityService.getActivities();
      context.commit({ type: "setActivities", filter: 'all', activities });
      return activities;
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
