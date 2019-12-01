<template>
  <nav class="main-nav">
    <div class="logo" @click="navToHome">
      <img src="../img/logo.png" />
      <p class="title">Sportivity</p>
    </div>
    <div class="nav-items">
      <router-link to="/activity/add">Create an activity</router-link>
      <router-link v-if="!user" to="/login">Login</router-link>
      <router-link v-else to="/logout" @click="doLogout">Logout</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    navToHome() {
      if (this.$route.path !== "/") this.$router.push("/");
    },   
    doLogout() {
      this.$store.dispatch({type: 'logout'})
      this.$router.push("/login");
    }
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    }
  }
};
</script>

<style lang="scss">
.logo {
  cursor: pointer;
  display: flex;
  font-size: bold;
  align-items: center;
  img {
    width: 50px;
  }
  .title {
    font-size: 1.3rem;
    margin-left: 10px;
  }
}

.main-nav {
  padding: 5px 15px;
  user-select: none;
  border-bottom: 2px solid rgb(228, 228, 228);
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    font-size: 0.8rem;
    color: #2c3e50;
    text-decoration: none;
    margin-left: 30px;
    transition: all 0.1s;
    &.router-link-exact-active {
      color: #42b983;
    }
    &:hover {
      color: #42b983;
    }
  }
}
</style>