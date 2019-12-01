<template>
  <section>
    <h1>Explore Your New Activities Here!</h1>
    <div class="activity-list">
      <ActivityPreview v-for="activity in activities" :key="activity._id" :activity="activity"></ActivityPreview>

      <!-- <ActivityPreviewList type="all"></ActivityPreviewList> -->
    </div>
  </section>
</template>

<script>
// import ActivityPreview from "../components/ActivityPreview";
import ActivityPreview from "../components/ActivityPreview";

export default {
  name:"activityList",
  data() {
    return {};
  },
  components: {
    ActivityPreview
  },
  computed: {
    activities() {
      return this.$store.getters.all;
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