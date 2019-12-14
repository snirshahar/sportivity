<template>
  <div class="activity-details-section google-map-container" v-if="activity">
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
    <div class="location-info">
      <h3>{{activity.title}}</h3>
      <p>at</p>
      <p class="bold">
        {{activity.location.address}}
      </p>
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