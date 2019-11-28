<template>
  <section>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <router-link to="/explore"><button>Explore</button></router-link>
    <div class="activitity-preview-list-container">
      <ActivityPreviewList type="popular"></ActivityPreviewList>
      <ActivityPreviewList type="recent"></ActivityPreviewList>
      <ActivityPreviewList type="today"></ActivityPreviewList>
    </div>
  </section>
</template>


<script>
import ActivityPreviewList from "../components/ActivityPreviewList";
import Explore from "../views/Explore";

export default {
  name: "home",
  components: {
    ActivityPreviewList,
    Explore
  },
  created() {
    console.log("hi");
    this.$store.dispatch("loadActivities");
  }
};
</script>
