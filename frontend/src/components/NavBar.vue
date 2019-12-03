<template>
  <nav class="main-nav">
    <div class="logo" @click="navToHome">
      <img src="../img/logo.png" />
    </div>
    <div class="nav-items">
      <router-link to="/activity/add">Create an activity</router-link>
      <span style="margin: 10px">|</span>
      <router-link v-if="!user" to="/login">Login</router-link>
      <div class="logout" v-else @click="doLogout">{{logout}}</div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    navToHome() {
      if (this.$route.path !== "/") this.$router.push("/");
    },
    async doLogout() {
      await this.$store.dispatch({ type: "logout" });
       if (this.$route.path !== "/") this.$router.push("/");
    }
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    },
    logout() {
      const user = this.$store.getters.loggedinUser;
      return `${user.fullName}, Logout`;
    }
  }
};
</script>