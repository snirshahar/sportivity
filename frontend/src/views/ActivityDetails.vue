<template>
  <section class="details-container" v-if="activity">
    <div class="img" :style="{ backgroundImage: `url(${activity.imgUrls[0]})` }">
      <div class="img-blur-line">
        <div class="details">
          <h1>{{activity.title}}</h1>
          <div class="deep-details">
            <p>
              <font-awesome-icon :icon="['fa', 'map-marker']" />
              {{activity.location.address}}
            </p>
            <p>
              <font-awesome-icon :icon="['fa', 'user']" />
              {{activity.attendees.length}}/{{activity.maxAttendees}} Members
            </p>
            <p>
              <font-awesome-icon :icon="['fa', 'calendar-plus']" />
              {{this.activity.cycle}}
            </p>
          </div>
        </div>
        <div class="attend">
          <button v-if="isOwner" class="btn-delete" @click="join">Delete this group</button>
          <button
            v-else-if="!joined"
            class="btn-join"
            @click="join"
            :class="{ disabled: isFull }"
          >Join this group</button>
          <button v-else class="btn-unjoin" @click="unjoin">Leave this group</button>
        </div>
      </div>
    </div>
    <div :class="{'container-details-bar': true, sticky: topNavBar}">
      <ActivityDetailsBar />
    </div>
    <div class="group-container">
      <ActivityAbout ref="about" />
      <ActivityMembers :attendees="activity.attendees" />
      <ActivityDiscussions />
      <ActivityPhotos :images="activity.imgUrls" />
    </div>
  </section>
</template>

<script>
import activityService from "../services/ActivityService";
import locationService from "../services/LocationService";
import SocketService from "../services/SocketService";
import ActivityDetailsBar from "../components/ActivityDetailsBar";
import ActivityAbout from "../components/ActivityAbout";
import ActivityMembers from "../components/ActivityMembers";
import ActivityDiscussions from "../components/ActivityDiscussions";
import ActivityPhotos from "../components/ActivityPhotos";

export default {
  data() {
    return {
      activity: null,
      user: null,
      topNavBar: false,
      joined: false
    };
  },
  async created() {
    const id = this.$route.params.id;
    await this.$store.dispatch({ type: "loadCurrActivity", id });
    this.activity = this.$store.getters.currActivity;
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
    async join() {
      if (!this.user) return this.$router.push("/login");
      if (this.isFull || this.isJoined) return;
      this.joined = true;
      SocketService.emit("user joined", {
        activityId: this.activity._id,
        user: this.user
      });
    },
    async unjoin() {
      this.joined = false;
      SocketService.emit("user unjoined", {
        activityId: this.activity._id,
        user: this.user
      });
    },
    handleScroll(event) {
      window.pageYOffset > (window.innerHeight * 7.9) / 10
        ? (this.topNavBar = true)
        : (this.topNavBar = false);
    }
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
  components: {
    ActivityDetailsBar,
    ActivityAbout,
    ActivityMembers,
    ActivityDiscussions,
    ActivityPhotos
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    SocketService.emit("user unListen activity", {
      activityId: this.activityId
    });
  }
};
</script>

