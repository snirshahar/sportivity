<template>
  <nav class="main-nav" :class="{home: homePage }">
    <div class="logo" @click="nav('/')">
      <img v-if="desktop" src="../assets/logo.png" />
      <img v-else src="../assets/logo-mobile.png" />
    </div>
    <div class="nav-items">
      <router-link to="/activity/add" :class="{home: homePage }">
        <font-awesome-icon :icon="['fa', 'plus']" />
        <span style="margin-left:7px">Create an activity</span>
      </router-link>
      <div class="seprator"></div>

      <router-link v-if="!loggedinUser" to="/login">
        <font-awesome-icon :icon="['fa', 'sign-in-alt']" />
        <span style="margin-left:7px">Login</span>
      </router-link>
      <div v-else class="user-profile" @click="showOpts = !showOpts">
        <p v-if="desktop" :class="{white: homePage }">{{loggedinUser.fullName}}</p>
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
export default {
  data() {
    return {
      loggedinUser: null,
      showOpts: false,
      width: 0
    };
  },
  methods: {
    nav(path) {
      if (this.$route.path !== path) this.$router.push(path);
    },
    async doLogout() {
      await this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
    handleResize() {
      this.width = window.innerWidth;
    }
  },
  computed: {
    homePage() {
      return this.$route.path === "/" ? true : false;
    },
    desktop(){
      return this.width > 530;  
    }
  },
  created() {
    this.loggedinUser = this.$store.getters.loggedinUser;

    window.addEventListener("resize", this.handleResize);
    this.width = window.innerWidth;
  },
  watch: {
    "$store.getters.loggedinUser"() {
      const user = this.$store.getters.loggedinUser;
      if (user && user._id) this.loggedinUser = user;
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>