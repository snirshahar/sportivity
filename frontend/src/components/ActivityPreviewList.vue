<template>
  <section class="activity-list">
    <h1>Most Activities in Tel Aviv</h1>
    <div v-for="activity in activities" :key="activity._id"></div>
    <h1>Most Recent At The Moment</h1>
    <div v-for="activity in activities" :key="activity._id"></div>
    <h1>Today Activities Near You</h1>
    <div v-for="activity in activities" :key="activity._id"></div>
  </section>
</template>

<script>
// import activityPreview from './activity-preview.vue'

export default {
  props: ["activities"],
  data() {
    return {};
  },
  methods: {
    // deleteActivity(activityId) {
    //   this.$emit("deleteActivity", activityId);
    // }
  },
  components: {
    //   TEST TEST TEST! !!!!!!!!!!!!!!!!!!!!!!
    // activityPreview
  }
};
</script>
