<template>
  <section class="activity-list-container">
    <ActivityFilter @filter="setRange" @sort="setSort"></ActivityFilter>
    <transition-group class="activity-list" name="fade">
      <ActivityPreview
        v-for="activity in filterActivities"
        :key="activity._id"
        :activity="activity"
      ></ActivityPreview>
    </transition-group>
  </section>
</template>

<script>
import ActivityPreview from "../components/ActivityPreview";
import ActivityFilter from "../components/ActivityFilter";
import locationService from "../services/LocationService";

export default {
  name: "activityList",
  data() {
    return {
      filterBy: null,
      location: null,
      range: 0,
      sortBy: null
    };
  },
  components: {
    ActivityPreview,
    ActivityFilter
  },
  methods: {
    setSort(val){
      this.sortBy = val;
    },
    setRange(val){
      this.range = val;
    },
  },
  computed: {
    filterActivities() {
      var activities = JSON.parse(JSON.stringify(this.$store.getters.activities))
      activities = this.filterBy ? activities.filter(activity => activity.category === this.filterBy) : activities;
      activities = this.range ? activities.filter(activity => this.range > activity.distance) : activities;
      activities = this.sortBy ? activities.sort((a,b) => (a[this.sortBy] > b[this.sortBy]) ? 1 : ((b[this.sortBy] > a[this.sortBy]) ? -1 : 0)) : activities;
      return activities;
    },
  },
  created() {
    this.filterBy = this.$route.params.category;
  },
  watch: {
    "$route.params.category"() {
      this.filterBy = this.$route.params.category;
    }
  }
};
</script>