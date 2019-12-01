<template>
  <div class="about-page" v-if="activity">
    <GmapMap
      :center="{lat:activity.location.lat, lng:activity.location.lng}"
      :zoom="16"
      map-type-id="satellite"
      class="google-map"
    >
      <GmapMarker
        :position="{lat:activity.location.lat, lng:activity.location.lng}"
        :clickable="true"
        :draggable="false"
        @click="center={lat:activity.location.lat, lng:activity.location.lng}"
      />
    </GmapMap>
    <div class="details">
      <div class="ml-50">
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

<style scoped>
p {
  margin: 0;
}
h3 {
  margin: 0 0 10px 0;
}
a {
  text-decoration: none;
  color: rgb(49, 49, 49);
}
img {
  width: 50px;
}

.ml-50 {
  margin-left: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.about-page {
  display: flex;
  text-align: left;
  background: #f7f7f7;
  padding: 10px;
}

.text {
  background: white;
  padding: 10px;
  word-break: break-word;
}

.details,
.google-map {
  flex: 1;
}

.created-by-card-name {
  margin: auto 10px;
}

.created-by {
  display: flex;
  flex-direction: column;
}

.created-by-card {
  display: flex;
}

.google-map {
  width: 100%;
  height: 400px;
}
</style>