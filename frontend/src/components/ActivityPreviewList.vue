<template>
  <section class="activity-list">
    <h1>Most Popular Activities At The Moment</h1>
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

<style scoped>
.activity-list {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
}
</style>