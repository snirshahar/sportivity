<template>
  <div :class="{'container-details-bar': true, sticky: topNavBar}" v-if="activity">
    <div class="container">
      <div class="nav-bar">
        <div class="buttons">
          <button class="nav-button" @click="scrollToClass('.about-page-container')">Details</button>
          <button class="nav-button" @click="scrollToClass('.attendees-container')">Members</button>
          <button class="nav-button" @click="scrollToClass('.wall-container')">Discussions</button>
          <button class="nav-button" @click="scrollToClass('.google-map')">Location</button>
        </div>
        <div class="attend-bar">
          <button v-if="isOwner" class="btn-delete" @click="join">Delete</button>
          <button
            v-else-if="!joined"
            class="btn-join"
            @click="join"
            :class="{ disabled: isFull }"
          >Attend</button>
          <button v-else class="btn-unjoin" @click="unjoin">Leave</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SocketService from '../services/SocketService';
import ActivityService from "../services/ActivityService";

export default {
  data() {
    return {
      activity: null,
      topNavBar: false,
      user: null,
      joined: false
    };
  },
  computed: {
    createdAt() {
      return new Date(this.activity.createdAt).toLocaleString("en-us");
    },
    members() {
      return this.activity && this.activity.attendees
        ? this.activity.attendees.length
        : 0;
    },
    maxAttendees() {
      return this.activity && this.activity.maxAttendees;
    },
    type() {
      return this.activity && this.activity.isPublic ? "Public" : "Private";
    },
    getUser() {
      return this.$store.getters.loggedinUser;
    },
    isFull() {
      return this.activity.attendees.length === this.activity.maxAttendees;
    },
    isJoined() {
      if (!this.user) return false;
      const searchedUser = this.activity.attendees.find(
        att => att._id === this.user._id
      );
      return searchedUser ? true : false;
    },
    isOwner() {
      if (!this.user) return false;
      return this.activity.createdBy._id === this.user._id;
    }
  },
  async created() {
    const id = this.$route.params.id;
    await this.$store.dispatch({ type: "loadCurrActivity", id });
    this.activity = JSON.parse(JSON.stringify(this.$store.getters.currActivity));
    this.user = this.getUser;
    this.joined = this.isJoined;
    window.addEventListener("scroll", this.handleScroll);
    SocketService.on("add user", user => {
      this.activity.attendees.push({
        _id: user._id,
        fullName: user.fullName,
        imgUrl: user.imgUrl
      });
    });
    SocketService.on("remove user", userId => {
      this.activity.attendees = this.activity.attendees.filter(
        att => att._id !== userId
      );
    });
  },
  methods: {
    scrollToClass(className) {
      let el = document.querySelector(className);
      const offset = window.innerWidth > 530 ? 78 : 63;
      window.scrollTo(
        el.offsetLeft,
        el.offsetTop - (this.topNavBar ? offset : offset * 2)
      );
    },
    handleScroll(event) {
      this.topNavBar = window.pageYOffset > (window.innerHeight * 7.9) / 10;
    },

    async join() {
      if (!this.user) return this.$router.push("/login");
      if (this.isFull || this.isJoined) return;
      const shortUser = {
        _id: this.user._id,
        fullName: this.user.fullName,
        imgUrl: this.user.imgUrl
      }
      this.joined = true;
      SocketService.emit("user joined", {
        activityId: this.activity._id,
        user: shortUser
      });
    },
    async unjoin() {
      this.joined = false;
      SocketService.emit("user unjoined", {
        activityId: this.activity._id,
        user: this.user
      });
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>