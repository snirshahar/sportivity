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
          <button class="ml-50">Join this group</button>
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
export default {
  data() {
    return {
      topNavBar: false
    };
  },
  methods: {
    handleScroll(event) {
      window.pageYOffset > 540
        ? (this.topNavBar = true)
        : (this.topNavBar = false);
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    showNavbar() {
      console.log(this.showNavbar);
    }
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
</style>