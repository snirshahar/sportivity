<template>
  <nav class="main-nav">
    <router-link to="/">
    <span class="logo">
      <img src="../img/logo.png">sportivity
    </span>
    </router-link>
    <div class="user-login-container">
      <router-link to="/activity/add">Create a new activity</router-link>
      <router-link to="/login">SignIn</router-link>
    </div>
  </nav>
</template>



<style>
.logo img{
  height: 60px;
  width: 60px;
}
.main-nav{
  display: flex;
  align-items: center;
  justify-content: space-between
}
.main-nav .logo{
  display: flex;
  align-items: center;
}
</style>