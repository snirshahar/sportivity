<template>
  <div class="container">
    <div class="width">
      <div :class="{'nav-bar': true, sticky: topNavBar}">
        <div class="buttons">
          <router-link :to="`/activity/${$route.params.id}`">About</router-link>
          <router-link :to="`/activity/${$route.params.id}/members`">Members</router-link>
          <router-link :to="`/activity/${$route.params.id}/discussions`">Discussions</router-link>
          <router-link :to="`/activity/${$route.params.id}/photos`">Photos</router-link>
        </div>
        <div class="attend">
          <button v-if="!joined" class="ml-50" @click="join" :class="{ disabled: isFull }">Join this group</button>
          <button v-else class="ml-50" @click="unjoin">Leave this group</button>
        </div>
      </div>
      <div class="bg-lightgray">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ActivityService from "../services/ActivityService";

export default {
  data() {
    return {
      topNavBar: false,
      activity: null,
      user: this.$store.getters.loggedinUser,
      joined: false
    };
  },
  computed: {
    isFull() {
      return this.activity.attendees.length === this.activity.maxAttendees;
    },
    isJoined() {
      const searchedUser = this.activity.attendees.find(
        att => att._id === this.user._id
      );
      console.log('isJoined',  searchedUser ? 'true' : 'false')
      return searchedUser ? true : false;
    }
  },
  methods: {
    handleScroll(event) {
      window.pageYOffset > 540
        ? (this.topNavBar = true)
        : (this.topNavBar = false);
    },
    async join() {
      if (this.isFull || this.isJoined) return;
      const shortUser = {
        _id: this.user._id,
        fullName: this.user.fullName,
        imgUrl: this.user.imgUrl
      };
      this.activity.attendees.push(shortUser);
      const res = await ActivityService.addAttendee(this.activity, shortUser);
      this.joined = true;
    },
    async unjoin() {
      const res = await ActivityService.deleteAttendee(this.activity, this.user._id);
      this.activity.attendees = this.activity.attendees.filter(att => att._id !== this.user._id)
      this.joined = false;
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.activity = this.$store.getters.currActivity;
    this.joined = this.isJoined;
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
.container {
  background: #f7f7f7;
}
.fade-enter-active {
  transition: all 0.75s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.sticky {
  position: fixed;
  top: 0;
  background: white;
  z-index: 1;
  width: 100%;
  margin: 0 auto;
}
.width {
  max-width: 1100px;
  margin: 0 auto;
}
.ml-50 {
  margin-left: 50px;
}
.nav-bar {
  padding: 20px;
  display: flex;
}

.buttons,
.attend {
  margin: auto;
  flex: 1;
  text-align: left;
}
a {
  text-decoration: none;
  color: gray;
  margin-right: 30px;
  font-weight: bold;
  transition: all 0.2s;
}
a:hover {
  color: lightskyblue;
}

.attend button {
  border: none;
  outline: none;
  background: #f65858;
  color: white;
  padding: 10px 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 4px;
}

.attend button:hover {
  background: rgba(246, 88, 88, 0.9);
}

.disabled {
  background: gray;
}
</style>