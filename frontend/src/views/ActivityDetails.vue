<template>
  <section class="details-container" v-if="activity">
    <div class="img" :style="{ backgroundImage: `url(${activity.imgUrls[0]})` }">
      <div class="img-blur-line">
        <div class="details">
          <h1>{{activity.title}}</h1>
          <div class="deep-details">
            <p>
              <font-awesome-icon :icon="['fa', 'map-marker']" />
              {{locationStr}}
            </p>
            <p>
              <font-awesome-icon :icon="['fa', 'user']" />
              {{activity.attendees.length}}/{{activity.maxAttendees}}
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
    <ActivityDetailsBar />
    <div class="group-container">
      <ActivityAbout />
      <div class="social">
        <ActivityMembers />
        <ActivityDiscussions />
      </div>
      <ActivityPhotos />
    </div>
  </section>
</template>

<script>
import activityService from "../services/ActivityService";
import locationService from "../services/LocationService";
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
      joined: false,
      locationStr: null
    };
  },
  async created() {
    const id = this.$route.params.id;
    await this.$store.dispatch({ type: "loadCurrActivity", id });
    this.activity = this.$store.getters.currActivity;
    this.joined = this.isJoined;
    this.user = this.getUser;
    // Location
    const loc = {
      latitude: this.activity.location.lat,
      longitude: this.activity.location.lng
    };
    const res = await locationService.getLocation(loc);
    const str = res.data.plus_code.compound_code;
    const city = str.substring(str.indexOf(" ") + 1, str.indexOf(","));
    const country = str.substring(str.indexOf(",") + 2);
    this.locationStr = `${city}, ${country}`;
    console.log(this.locationStr);
  },
  methods: {
    async join() {
      if (!this.user) return this.$router.push("/login");
      if (this.isFull || this.isJoined) return;
      const shortUser = {
        _id: this.user._id,
        fullName: this.user.fullName,
        imgUrl: this.user.imgUrl
      };
      this.activity.attendees.push(shortUser);
      const res = await ActivityService.addAttendee(this.activity, shortUser);

      console.log("join", res);

      this.joined = true;
      SocketService.emit("user joined", {
        activityId: this.activity._id,
        user: this.user
      });
    },
    async unjoin() {
      const res = await ActivityService.deleteAttendee(
        this.activity,
        this.user._id
      );
      console.log("unjoin", res);
      this.activity.attendees = this.activity.attendees.filter(
        att => att._id !== this.user._id
      );
      this.joined = false;
      SocketService.emit("user left", {
        activityId: this.activity._id,
        user: this.user
      });
    },
    async country() {
      const res = await locationService.getLocation(pos.coords);
      console.log(res);
      const str = res.data.plus_code.compound_code;
      return str.substring(str.indexOf(",") + 1);
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
  }
};
</script>

<style lang="scss" scoped>
.group-container{
  display: flex;
  flex-direction: column;
  .social{
    display: flex;
  }
}

img {
  width: 100%;
}

h1,
p {
  margin: 0;
}

.ml-50 {
  margin-left: 50px;
}
.details-container {
  max-width: 1140px;
  margin: 0 auto;
}

.details {
  margin: 0;
  color: white;
  position: relative;
  z-index: 1;
  margin: auto 10px;
  .deep-details {
    display: flex;
    p {
      color: white;
      margin: auto;
    }
  }
}

.img {
  background-attachment: fixed;
  background-repeat: no-repeat;
  width: 100%;
  background-position: 50% 50%;
  position: relative;
  overflow: hidden;
  height: 50vh;
  display: flex;
  justify-content: space-between;
}
.img > .img-blur-line {
  position: absolute;
  bottom: 0;
  padding: 20px 0;
  left: 0;
  width: 100%;
  background: inherit;
  background-attachment: fixed;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.img > .img-blur-line::before {
  content: "";
  position: absolute;
  top: -20px;
  left: 0;
  width: 200%;
  height: 200%;
  background: inherit;
  background-attachment: fixed;
  -webkit-filter: blur(4px);
  filter: blur(4px);
}
.img > .img-blur-line::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.attend {
  margin: auto 10px;
}

.btn-join,
.btn-unjoin,
.btn-delete {
  border: none;
  outline: none;
  background: #f65858;
  color: white;
  padding: 10px 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 4px;
  position: relative;
  z-index: 1;
}

.btn-join {
  background: rgb(29, 160, 40);
}

.btn-join:hover {
  background: rgba(29, 160, 40, 0.75);
}

.btn-delete {
  background: red;
}

.btn-delete:hover {
  background: rgba(255, 0, 0, 0.75);
}

.btn-unjoin:hover {
  background: rgba(246, 88, 88, 0.9);
}

.disabled {
  background: gray;
}
</style>