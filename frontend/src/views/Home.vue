<template>
  <section>
    <div class="home">
      <img src="../assets/logo.png" />
      <div class="center-text">
        <div class="fix">
          <h2>The real world is calling</h2>
          <h3>Join a local sport group to meet people, try something new, or do more of what you love.</h3>
          <router-link class="btn-explore" to="/explore">Explore</router-link>
        </div>
      </div>
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
import ActivityList from "../views/ActivityList";

export default {
  name: "home",
  components: {
    ActivityPreviewList,
    ActivityList
  },
  created() {
    this.$store.dispatch("loadActivities");
  }
};
</script>

<style lang="scss">
.home {
  position: relative;
  img {
    width: 100%;
    height: 500px;
  }
}
.btn-explore {
  background: rgb(241, 58, 89);
  color: white;
  text-decoration: none;
  padding: 10px 36px;
  border-radius: 6px;
  transition: all 0.1s;
  font-weight: bold;
  &:hover {
    background: rgb(232, 16, 53);
  }
}

.center-text {
  top: 50%;
  left: 50%;
  position: absolute;
  width: 100%;
}
.fix {
  color: white;
  left: -50%;
  position: relative;
  h2 {
    font-size: 2rem;
  }
}
</style>