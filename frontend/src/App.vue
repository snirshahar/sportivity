<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
body {
  margin: 0;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import NavBar from "./components/NavBar";

export default {
  components: {
    NavBar
  }
};
</script>
