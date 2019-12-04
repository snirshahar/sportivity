<template>
  <div class="activity-details-section about-page-container" v-if="activity" id="about">
    <div class="details">
      <h1>About</h1>
      <div class="created-by">
        <h3>Organizer</h3>
        <router-link :to="this.activity._id" class="created-by-card">
          <img :src="this.activity.createdBy.imgUrl" />
          <div class="created-by-card-name">{{this.activity.createdBy.fullName}}</div>
        </router-link>
      </div>
      <div class="description">
        <h3>Description</h3>
        <p class="text">{{this.activity.description}}</p>
      </div>
    </div>
    <div class="google-map">
      <GmapMap
        :center="{lat:activity.location.coords.lat, lng:activity.location.coords.lng}"
        :zoom="16"
        map-type-id="terrain"
        class="google-map"
      >
        <GmapMarker
          :position="{lat:activity.location.coords.lat, lng:activity.location.coords.lng}"
          :clickable="true"
          :draggable="false"
          @click="center={lat:activity.location.coords.lat, lng:activity.location.coords.lng}"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activity: null
    };
  },

  async created() {
    const id = this.$route.params.id;
    await this.$store.dispatch({ type: "loadCurrActivity", id });
    this.activity = this.$store.getters.currActivity;
  }
};
</script>