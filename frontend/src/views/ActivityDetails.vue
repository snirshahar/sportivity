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
    <div class="container">
      <ActivityDetailsBar />
    </div>
    <div class="group-container">
      <ActivityAbout />
      <ActivityMembers :attendees="activity.attendees" />
      <ActivityDiscussions />
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
      joined: false
    };
  },
  async created() {
    const id = this.$route.params.id;
    await this.$store.dispatch({ type: "loadCurrActivity", id });
    this.activity = this.$store.getters.currActivity;
    this.user = this.getUser;
    this.joined = this.isJoined;
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
      const res = await activityService.addAttendee(this.activity, shortUser);

      console.log("join", res);

      this.joined = true;
    },
    async unjoin() {
      const res = await activityService.deleteAttendee(
        this.activity,
        this.user._id
      );
      console.log("unjoin", res);
      this.activity.attendees = this.activity.attendees.filter(
        att => att._id !== this.user._id
      );
      this.joined = false;
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
.container {
  background: #f7f7f7;
}
.group-container {
  display: flex;
  flex-direction: column;
  max-width: 1140px;
  margin: 0 auto;
  .social {
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
}

.details {
  margin: 0;
  color: white;
  position: relative;
  z-index: 1;
  margin: auto 10px;
  .deep-details {
    display: flex;
    flex-direction: column;
    p {
      color: white;
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
  height: 70vh;
  display: flex;
  justify-content: space-between;
  background-size: cover;
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
  p {
    padding: 3px 0;
  }
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