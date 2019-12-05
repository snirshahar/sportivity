<template>
  <div id="app">
    <NavBar />
    <router-view />
    <Footer/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default {
  components: {
    Footer,
    NavBar
  },
  created() {
    this.$store.dispatch("loadActivities");
  }
};
</script>
