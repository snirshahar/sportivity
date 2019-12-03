<template>
  <div id="app">
    <div class="nav">
      <NavBar />
    </div>
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  components: {
    NavBar
  },
  created() {
    this.$store.dispatch("loadActivities");
  }
};
</script>
