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
    saveActivity(state, { activity }) {
      console.log('mutate', activity);

      state.activities.all.unshift(activity);
      state.activities.recent.unshift(activity);
      //maby need to check if add to activities.today
    }
  },
  actions: {
    async loadActivities(context) {
      const activities = await activityService.getActivities();
      context.commit({ type: "setActivities", filter: 'all', activities });
      return activities;
    },
    async saveActivity(context, { activity }) {
      activity = await activityService.addActivity(activity);
      context.commit({ type: "saveActivity", activity });
      return activity
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
