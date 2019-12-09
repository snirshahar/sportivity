<template>
  <nav class="main-nav">
    <div class="logo" @click="nav('/')">
      <img src="../img/logo.png" />
    </div>
  <notifications></notifications>
    <div class="nav-items">
      <router-link to="/activity/add">
        <font-awesome-icon :icon="['fa', 'plus']" />
        <span style="margin-left:7px">Create an activity</span>
      </router-link>
      <div class="seprator"></div>

      <router-link v-if="!loggedinUser" to="/login">
        <font-awesome-icon :icon="['fa', 'sign-in-alt']" />
        <span style="margin-left:7px">Login</span>
      </router-link>
      <div v-else class="user-profile" @click="showOpts = !showOpts">
        <p>{{loggedinUser.fullName}}</p>
        <img :src="loggedinUser.imgUrl" width="40px" />
        <transition name="fade">
          <div class="options" v-if="showOpts">
            <div class="drop-down-item" @click="nav('/profile/' + loggedinUser._id)">
              <font-awesome-icon :icon="['fa', 'user']" />
              <span style="margin-left:7px">My Profile</span>
            </div>
            <div class="drop-down-item">
              <font-awesome-icon :icon="['fa', 'bell']" />
              <span style="margin-left:7px">Notifications</span>
            </div>
            <div class="drop-down-item" @click="doLogout">
              <font-awesome-icon :icon="['fa', 'sign-out-alt']" />
              <span style="margin-left:7px">Logout</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script>
import notifications from './Notifications'
export default {
  data() {
    return {
      loggedinUser: null,
      showOpts: false
    };
  },
  methods: {
    nav(path) {
      if (this.$route.path !== path) this.$router.push(path);
    },
    async doLogout() {
      await this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    }
  },
  created() {
    this.loggedinUser = this.$store.getters.loggedinUser;
  },
  watch: {
    "$store.getters.loggedinUser"() {
      const user = this.$store.getters.loggedinUser;
      if(user && user._id) this.loggedinUser = user;
    }
  },
  components:{
    notifications
  }
};
</script>