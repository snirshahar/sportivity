<template>
  <section>
    <h1>Explore Your New Activities Here!</h1>
    <div class="activity-list">
      {{activities}}
      <ActivityPreview v-for="activity in activities" :key="activity._id" :activity="activity"></ActivityPreview>
      <ActivityFilter></ActivityFilter>
    </div>
  </section>
</template>

<script>
import ActivityPreview from "../components/ActivityPreview";
import ActivityFilter from "../components/ActivityFilter";

export default {
  name: "activityList",
  data() {
    return {};
  },
  components: {
    ActivityPreview,
    ActivityFilter
  },
  computed: {
    activities() {
      return this.$store.getters.activities;
    }
  }
};
</script>

<style scoped>
h1 {
  text-decoration: underline lightblue;
}
.activity-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>