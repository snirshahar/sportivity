<template>
  <section class="activity-container">
    <div class="activity-top">
      <h1>Most Activities in Tel Aviv</h1>
      <button>See All</button>
    </div>
    <div class="activity-list">
      <ActivityPreview v-for="activity in activities" :key="activity._id" :activity="activity"></ActivityPreview>
    </div>
  </section>
</template>

<script>
import ActivityPreview from "./ActivityPreview";

export default {
  props: {
    type: String
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    activities() {
      return this.$store.getters.all;
    }
  },
  components: {
    ActivityPreview
  }
};
</script>

<style scoped>
.activity-container {
  display: flex;
  flex-direction: column;
}
.activity-list{
  display: flex;
  overflow: auto;
  flex-direction: row;
}
.activity-top{
  display: flex;
  justify-content: space-between;
}
</style>
