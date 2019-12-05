<template>
  <div class="activity-details-section photos-container">
    <h1>Photos</h1>
    <CarouselCard :interval="7000" height="300px" type="card" arrow="always">
      <CarouselCardItem v-for="image in images" :key="image">
        <img :src="image" width="100%" />
      </CarouselCardItem>
    </CarouselCard>
  </div>
</template>
<style lang="scss">
.VueCarousel-inner {
  height: 70vh !important;
}
</style>

<script>
import { CarouselCard, CarouselCardItem } from 'vue-carousel-card'
import 'vue-carousel-card/styles/index.css'

export default {
  props: {
    images: Array
  },
  components: {
    CarouselCard,
    CarouselCardItem
  },
  created() {
    console.log(this.images);
  }
};
</script>