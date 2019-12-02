import activityService from '../services/ActivityService';

export default ({
  strict: true,
  state: {
    activities: [],
    currActivity: null
  },
  mutations: {
    setActivities(state, { activities }) {
      state.activities = activities;
    },
    saveActivity(state, { activity }) {
      state.activities.unshift(activity);
    },
    setCurrActivity(state, { activity }) {
      state.currActivity = activity;
    }
  },
  actions: {
    async loadActivities(context) {
      const activities = await activityService.getActivities();
      context.commit({ type: 'setActivities', activities });
    },
    async saveActivity(context, { activity }) {
      activity = await activityService.addActivity(activity);
      context.commit({ type: 'saveActivity', activity });
      return activity
    },
    async loadCurrActivity(context, { id }) {
      const currActivity = context.getters.currActivity;
      if(currActivity && currActivity.id === id) return currActivity;
      const activity = await activityService.getActivity(id);
      context.commit({ type: 'setCurrActivity', activity })
    }
  },
  getters: {
    activities(state) {
      return state.activities;
    },
    currActivity(state){
      return state.currActivity;
    }
  },
  modules: {
  }
})
