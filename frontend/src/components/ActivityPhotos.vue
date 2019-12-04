<template>
  <div class="activity-details-section photos-container">
    <h1>Photos</h1>
    <carousel :per-page="1" :mouse-drag="false">
      <slide v-for="image in images" :key="image">
        <img :src="image" width="100%" />
      </slide>
    </carousel>
  </div>
</template>
<style lang="scss">
.VueCarousel-inner {
  height: 70vh !important;
}
</style>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  props: {
    images: Array
  },
  components: {
    Carousel,
    Slide
  },
  created() {
    console.log(this.images);
  }
};
</script>