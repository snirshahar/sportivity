<template>
  <section>
    <h1>Explore Your New Activities Here!</h1>
    <div class="activity-list">
      <div v-for="activity in activities" :key="activity.id">
        <ActivityPreview :activity="activity"></ActivityPreview>
      </div>
    </div>
  </section>
</template>

<script>
import ActivityPreview from "../components/ActivityPreview";

export default {
  data() {
    return {};
  },
  created() {
    console.log("explore created and toys loaded!");
    this.$store.dispatch("loadActivities");
  },
  components: {
    ActivityPreview
  }
};
</script>

<style>
</style>