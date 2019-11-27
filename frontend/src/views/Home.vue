<template>
  <section>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div class="activitity-preview-list-container">
      <ActivityPreviewList type="popular"></ActivityPreviewList>
      <ActivityPreviewList type="recent"></ActivityPreviewList>
      <ActivityPreviewList type="today"></ActivityPreviewList>
    </div>
  </section>
</template>


<script>
import ActivityPreviewList from "../components/ActivityPreviewList";

export default {
  name: "home",

  components: {
    ActivityPreviewList
  },
  created(){
    // this.$store.dispatch.loadActivities
  }
};
</script>
