<template>
  <div class="container">
    <div class="nav-bar">
      <button @click="component = 'about'">About</button>
      <button @click="component = 'members'">Members</button>
      <button @click="component = 'photos'">Photos</button>
      <button @click="component = 'discussions'">Discussions</button>
    </div>
    <ActivityAbout v-if="component === 'about'" />
    <ActivityMembers v-else-if="component === 'members'" />
    <ActivityDiscussions v-else-if="component === 'discussions'" />
    <ActivityPhotos v-else />
  </div>
</template>

<script>
import ActivityAbout from "../components/ActivityAbout";
import ActivityMembers from "../components/ActivityMembers";
import ActivityDiscussions from "../components/ActivityDiscussions";
import ActivityPhotos from "../components/ActivityPhotos";
export default {
  data() {
    return {
      component: "about"
    };
  },
  components: {
    ActivityAbout,
    ActivityMembers,
    ActivityDiscussions,
    ActivityPhotos
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
a {
  text-decoration: none;
  color: gray;
  margin-right: 30px;
  font-weight: bold;
}
a:hover {
  color: lightskyblue;
}
</style>