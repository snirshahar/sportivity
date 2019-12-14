<template>
  <div class="card-container" @click="$router.push(`/activity/${activity._id}`)">
    <div class="top-container">
      <img class="card-image" v-if="activity.imgUrls[0]" :src="activity.imgUrls[0]" />
      <div class="category">
        <p>{{category}}</p>
      </div>
      <div class="date-container">
        <p class="day">{{day}}</p>
        <p class="month">{{month}}</p>
      </div>
    </div>
    <div class="bottom-container">
      <p class="title">{{activity.title}}</p>
      <p class="location">{{address}}</p>
      <div class="info">
        <p class="text-info">
          <font-awesome-icon :icon="['fa', 'hourglass-start']" />
          {{starts}}
        </p>
        <p class="text-info">
          <font-awesome-icon :icon="['fa', 'user']" />
          {{attendees}}/{{activity.maxAttendees}}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import userService from "../services/UserService";
import moment from "moment";

export default {
  props: {
    activity: Object
  },
  data() {
    return {
      wishlist: false
    };
  },
  methods: {
    async toggleWishlist() {
      return;
      var user = this.$store.getters.loggedinUser;
      if (!user) this.$router.push("/login");
      this.wishlist = !this.wishlist;
      user.wishlist.push(this.activity._id);
      const res = await userService.addToWishlist(this.activity._id);
      this.dispatch({ type: "updateUser", user });
    }
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
    },
    address() {
      return this.activity.location.address;
    },
    isFull() {
      return this.activity.attendees.length === this.activity.maxAttendees;
    },
    category() {
      let cat = this.activity.category;
      const catCapitalized = cat.charAt(0).toUpperCase() + cat.slice(1);
      return catCapitalized;
    },
    day() {
      const time = moment(this.activity.startsAt).format("ll");
      return time.substring(4, time.indexOf(','));
    },
    month(){
      const time = moment(this.activity.startsAt).format("ll");
      return time.substring(0, 3).toUpperCase();
    }
  }
};
</script>