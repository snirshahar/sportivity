<template>
  <div class="container-details-bar">
    <div :class="{'nav-bar': true, sticky: topNavBar}">
      <div class="buttons">
        <router-link :to="`/activity/${$route.params.id}`">About</router-link>
        <router-link :to="`/activity/${$route.params.id}/members`">Members</router-link>
        <router-link :to="`/activity/${$route.params.id}/discussions`">Discussions</router-link>
        <router-link :to="`/activity/${$route.params.id}/photos`">Photos</router-link>
      </div>
    </div>
    <div class="bg-lightgray">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import ActivityService from "../services/ActivityService";
import SocketService from "../services/SocketService";

export default {
  data() {
    return {
      topNavBar: false
    };
  },
  methods: {
    handleScroll(event) {
      window.pageYOffset > 540
        ? (this.topNavBar = true)
        : (this.topNavBar = false);
    },
    
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    // SocketService.emit("user listen", { activityId: this.activity._id });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>