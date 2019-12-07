<template>
  <div class="preview-details-container" @click="$router.push(`/activity/${activity._id}`)">
    <div class="preview-image-container">
      <img class="preview-image" v-if="activity.imgUrls[0]" :src="activity.imgUrls[0]" />
      <div class="wishlist-heart" :class="{red : wishlist}" @click.stop="toggleWishlist"><font-awesome-icon :icon="['fa', 'heart']" /></div>
      <div class="ribbon">
        <p class="preview-attendees">
          <font-awesome-icon :icon="['fa', 'user']" />
          {{attendees}}/{{activity.maxAttendees}}
        </p>
      </div>
      <div></div>
    </div>
    <div class="preview-desc">
      <div class="top">
        <p class="preview-title">{{activity.title}}</p>
        <p class="preview-distance">{{activity.distance}}km</p>
      </div>
      <div class="preview-info">
        <p class="preview-starts">{{starts}},</p>
        <p class="preview-location">{{city}}</p>
      </div>
      <p class="preview-desc-text">{{activity.description}}</p>
    </div>
  </div>
</template>

<style>
</style>

<script>
import userService from '../services/UserService';
import moment from "moment";

export default {
  props: {
    activity: Object,
  },
  data(){
    return {
      wishlist: false
    }
  },
  methods: {
    async toggleWishlist() {
      return;
      var user = this.$store.getters.loggedinUser;
      if(!user) this.$router.push('/login');
      this.wishlist = !this.wishlist;
      user.wishlist.push(this.activity._id);
      const res = await userService.addToWishlist(this.activity._id);
      this.dispatch({ type:'updateUser', user});
    },
  },
  computed: {
    attendees() {
      return this.activity.attendees ? this.activity.attendees.length : 0;
    },
    starts() {
      const startsAt = moment(this.activity.startsAt);
      return moment(startsAt).fromNow();
    },
    city() {
      const address = this.activity.location.address;
      return address.substring(address.indexOf(",") + 2);
    }
  }
};
</script>