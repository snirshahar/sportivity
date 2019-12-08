<template>
  <div id="app">
    <NavBar />
    <Notifications />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Notifications from "./components/Notifications";
import SocketService from "./services/SocketService";

export default {
  components: {
    Footer,
    NavBar,
    Notifications
  },
  methods: {
    getDistance(from, to) {
      var R = 6371;
      var dLat = ((to.lat - from.lat) * Math.PI) / 180;
      var dLon = ((to.lng - from.lng) * Math.PI) / 180;
      var lat1 = (from.lat * Math.PI) / 180;
      var lat2 = (from.lng * Math.PI) / 180;

      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return Math.floor(d);
    }
  },
  async created() {
    await this.$store.dispatch("loadActivities");
    navigator.geolocation.getCurrentPosition(pos => {
      const location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      var activities = this.$store.getters.activities;
      activities.map(
        activity =>
          (activity.distance = this.getDistance(
            activity.location.coords,
            location
          ))
      );
      this.$store.dispatch({ type: "saveActivities", activities });
    });

    const activities = this.$store.getters.activities;
    const user = this.$store.getters.loggedinUser;
    if (!user) return;
    SocketService.activityConnect(activities, user);
  }
};
</script>
