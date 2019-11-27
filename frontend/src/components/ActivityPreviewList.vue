<template>
  <section class="activity-list">
    <h1>Most Activities in Tel Aviv</h1>
    <button>See All</button>
    <activity-preview v-for="activity in activities" :key="activity._id" :activity="activity"></activity-preview>
  </section>
</template>

<script>
import activityPreview from './ActivityPreview'

export default {
  props: ['type'],
  data() {
    return {
    };
  },
  methods: {
  },
  computed:{
    activities(){
      console.log('store');
      
      return this.$store.getters.all
    }
  },
  components:{
    activityPreview
  },
  created(){
    this.$store.dispatch({type: 'loadActivities'})
  }
};
</script>
