<template>
  <section class="activity-container">
    <div class="activity-top">
      <h1>{{title}}</h1>
      <router-link to="/asd">See All</router-link>
    </div>
    <div class="activity-list" ref="list">
      <ActivityPreview v-for="activity in activities" :key="activity.id" :activity="activity"></ActivityPreview>
    </div>
    <div class="scroll-btns">
      <button id="left-button" @click="swipeLeft">←</button>
      <button id="right-button" @click="swipeRight">→</button>
    </div>
  </section>
</template>

<script>
import ActivityPreview from "./ActivityPreview";
import AttendeeList from "./AttendeeList";
import locationSerivce from "../services/LocationService";

export default {
  props: {
    type: String
  },
  data() {
    return {
      city: null
    };
  },
  methods: {
    scrollTo(element, scrollPixels, duration) {
      const scrollPos = element.scrollLeft;
      if (
        !(
          (scrollPos === 0 || scrollPixels > 0) &&
          (element.clientWidth + scrollPos === element.scrollWidth ||
            scrollPixels < 0)
        )
      ) {
        const startTime =
          "now" in window.performance
            ? performance.now()
            : new Date().getTime();

        scroll = timestamp => {
          const timeElapsed = timestamp - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          element.scrollLeft = scrollPos + scrollPixels * progress;
          if (timeElapsed < duration) window.requestAnimationFrame(scroll);
          else return;
        };
        window.requestAnimationFrame(scroll);
      }
    },
    swipeLeft() {
      const list = this.$refs.list;
      this.scrollTo(list, -300, 600);
    },
    swipeRight() {
      const list = this.$refs.list;
      this.scrollTo(list, 300, 600);
    }
  },
  computed: {
    activities() {
      return this.$store.getters.activities;
    },
    title() {
      const title =
        this.type === "popular"
          ? "Most popular activities"
          : this.type === "recent"
          ? "Most recent activites"
          : "Today";
      return title + ` in ${this.city}`;
    }
  },
  components: {
    ActivityPreview,
    AttendeeList
  },
  created() {
    navigator.geolocation.getCurrentPosition(pos =>
      locationSerivce.getLocation(pos.coords).then(
        res => {
          const str = res.data.plus_code.compound_code;
          this.city = str.substring(str.indexOf(" ") + 1, str.indexOf(","));
        },
        err => console.log(err)
      )
    );
  }
};
</script>

<style scoped>
.activity-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  border-radius: 6px;
}
.activity-list {
  display: flex;
  overflow: hidden;
  flex-direction: row;
}
.activity-top {
  display: flex;
  justify-content: space-between;
}
a {
  text-decoration: none;
  color: rgb(105, 105, 105);
  margin: auto 0;
  transition: all 0.1s;
}
a:hover {
  color: rgb(41, 41, 41);
}
button {
  border: none;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: bold;
  outline: none;
  cursor: pointer;
}

.scroll-btns{
  position: absolute;
  width: 96%;
  bottom: 50%;
  display: flex;
  justify-content: space-between;
}
</style>
