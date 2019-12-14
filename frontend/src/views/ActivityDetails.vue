<template>
  <section class="details-container" v-if="activity">
    <div class="img-mobile img" :style="{ backgroundImage: `url(${activity.imgUrls[0]})` }">
      <div class="img-blur-line">
        <div class="details">
          <h1>{{activity.title}}</h1>
          <div class="deep-details">
            <p>
              <font-awesome-icon :icon="['fa', 'map-marker']" />
              {{activity.location.address}}
            </p>
            <p>
              <font-awesome-icon :icon="['fa', 'hourglass-start']" />
              {{starts}}
            </p>
            <p>
              <font-awesome-icon :icon="['fa', 'user']" />
              {{activity.attendees.length}}/{{activity.maxAttendees}} Members
            </p>
            <p>
              <font-awesome-icon :icon="['fa', 'calendar-plus']" />
              {{cycle}}
            </p>
          </div>
        </div>
        <div class="attend">
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
    <div class="imgs-container">
      <div class="img-hover-zoom img-hover-zoom--xyz img1">
        <img class="img" :src="activity.imgUrls[0]" />
      </div>
      <div class="img-hover-zoom img-hover-zoom--xyz img2">
        <img class="img" v-if="activity.imgUrls[1]" :src="activity.imgUrls[1]" />
      </div>
      <div class="img-hover-zoom img-hover-zoom--xyz img3">
        <img class="img" v-if="activity.imgUrls[2]" :src="activity.imgUrls[2]" />
      </div>
      <div class="img-hover-zoom img-hover-zoom--xyz img4">
        <img class="img" v-if="activity.imgUrls[3]" :src="activity.imgUrls[3]" />
      </div>
    </div>
    <ActivityDetailsBar />
    <div class="group-container">
      <ActivityAbout ref="about" />
      <div class="members-section">
        <ActivityMembers :attendees="activity.attendees" />
        <ActivityDiscussions />
      </div>
      <ActivityLocation />
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
import ActivityLocation from "../components/ActivityLocation";
import moment from 'moment';

export default {
  data() {
    return {
      activity: null,
      user: null,
      joined: false
    };
  },
  async created() {
    const id = this.$route.params.id;
    await this.$store.dispatch({ type: "loadCurrActivity", id });
    this.activity = this.$store.getters.currActivity;
    this.user = this.getUser;
    this.joined = this.isJoined;
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
    }
  },
  computed: {
    starts() {
      return moment(this.activity.startsAt).format('llll');
    },
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
    },
    cycle(){
      let cycle = this.activity.cycle;
      const cycleCapitalized = cycle.charAt(0).toUpperCase() + cycle.slice(1);
      return cycleCapitalized;
    }
  },
  components: {
    ActivityDetailsBar,
    ActivityAbout,
    ActivityMembers,
    ActivityDiscussions,
    ActivityLocation
  },
  destroyed() {
    SocketService.emit("user unListen activity", {
      activityId: this.activityId
    });
  }
};
</script>

