<template>
  <div id="app">
    <NavBar />
    <router-view />
    <Footer/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import SocketService from "./services/SocketService";
import Footer from "./components/Footer";
import ActivityService from "./services/ActivityService";


export default {
  components: {
    Footer,
    NavBar
  },
  async created() {
    await this.$store.dispatch("loadActivities");
    const activities = this.$store.activities
    const user = this.$store.getters.loggedinUser;
    if(!user) return
    SocketService.activityConnect(activities, user)
  } 
}
</script>
