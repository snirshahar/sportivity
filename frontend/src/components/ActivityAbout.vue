<template>
  <div class="about-page-container" v-if="activity">
    <div class="details">
      <div class="created-by">
        <h3>Organizer</h3>
        <router-link :to="this.activity._id" class="created-by-card">
          <img :src="this.activity.createdBy.imgUrl" />
          <div class="created-by-card-name">{{this.activity.createdBy.fullName}}</div>
        </router-link>
      </div>
      <div>
        <h3>Location</h3>
        <p>{{this.activity.location.street}}, {{this.activity.location.city}}</p>
      </div>
      <div class="description">
        <h3>Description</h3>
        <p class="text">{{this.activity.description}}</p>
      </div>
      <div>
        <h3>Occurrence</h3>
        <p>{{this.activity.cycle}}</p>
      </div>
    </div>
    <div class="google-map">
      <div class="ml-50">
        <GmapMap
          :center="{lat:activity.location.lat, lng:activity.location.lng}"
          :zoom="16"
          map-type-id="terrain"
          class="google-map"
        >
          <GmapMarker
            :position="{lat:activity.location.lat, lng:activity.location.lng}"
            :clickable="true"
            :draggable="false"
            @click="center={lat:activity.location.lat, lng:activity.location.lng}"
          />
        </GmapMap>
      </div>
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