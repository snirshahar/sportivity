<template>
  <div class="container">
    <div class="nav-bar">
      <div class="buttons">
        <router-link to="about">About</router-link>
        <router-link to="members">Members</router-link>
        <router-link to="discussions">Discussions</router-link>
        <router-link to="photos">Photos</router-link>
      </div>
      <div class="attend">
        <button>Attend Now!</button>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      component: "about"
    };
  }
};
</script>

<style scoped>
.nav-bar {
  padding: 20px;
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
}

.buttons,
.attend {
  flex: 1;
  text-align: left;
}
a {
  text-decoration: none;
  color: gray;
  margin-right: 30px;
  font-weight: bold;
}
a:hover {
  color: lightskyblue;
}
button {
  border: none;
  background: none;
  outline: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.1s;
  margin-right: 30px;
}

button:hover {
  color: lightskyblue;
}

.attend button {
  background: #f65858;
  color: white;
  padding: 8px 12px;
  font-size: 0.9rem;
  border-radius: 4px;
}

.attend button:hover {
  background: rgba(246, 88, 88, 0.9);
}
</style>