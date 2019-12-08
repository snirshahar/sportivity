<template>
  <div class="container">
    <div class="explore-filter-container">
      <button class="btn-filter" @click="showCats = !showCats">Categories</button>
      <button class="btn-filter" @click="showLoc = !showLoc">Location</button>
      <button class="btn-filter" @click="showSort = !showSort">Sort By</button>
      <transition name="fade">
        <div class="cats" v-if="showCats">
          <router-link to="/explore" @click.native="showCats = false">All</router-link>
          <router-link to="/explore/soccer" @click.native="showCats = false">Soccer</router-link>
          <router-link to="/explore/basketball" @click.native="showCats = false">Basketball</router-link>
          <router-link to="/explore/tennis" @click.native="showCats = false">Tennis</router-link>
          <router-link to="/explore/volleyball" @click.native="showCats = false">Volleyball</router-link>
          <router-link to="/explore/workout" @click.native="showCats = false">Workout</router-link>
          <router-link to="/explore/pool" @click.native="showCats = false">Pool</router-link>
          <router-link to="/explore/poker" @click.native="showCats = false">Poker</router-link>
          <router-link to="/explore/climbing" @click.native="showCats = false">Climbing</router-link>
          <router-link to="/explore/yoga" @click.native="showCats = false">Yoga</router-link>
          <router-link to="/explore/cycling" @click.native="showCats = false">Cycling</router-link>
          <router-link to="/explore/dance" @click.native="showCats = false">Dance</router-link>
          <router-link to="/explore/running" @click.native="showCats = false">Running</router-link>
        </div>
      </transition>
      <transition name="fade">
        <div class="location" v-if="showLoc">
          <p class="sort-item">Radius ({{range}}km)</p>
          <range-slider class="slider" min="0" max="100" step="1" v-model="range" @change="$emit('filter', range); showLoc = false"></range-slider>
        </div>
      </transition>
      <transition name="fade">
        <div class="sort" v-if="showSort">
          <p class="sort-item" @click="sort('startsAt')">Recent</p>
          <p class="sort-item" @click="sort('attendees')">Popular</p>
          <p class="sort-item" @click="sort('distance')">Nearby</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import RangeSlider from 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';

export default {
  data() {
    return {
      showCats: false,
      showLoc: false,
      showSort: false,
      range: 0
    };
  },
  methods:{
    sort(val){
      this.showSort = false;
      this.$emit('sort', val);
    }
  },
  watch: {
    showCats() {
      if (this.showCats) {
        this.showLoc = false;
        this.showSort = false;
      }
    },
    showLoc() {
      if (this.showLoc) {
        this.showCats = false;
        this.showSort = false;
        }
    },
    showSort() {
      if (this.showSort) {
        this.showCats = false;
        this.showLoc = false;
        }
    }
  },
  components: {
    RangeSlider
  }
};
</script>