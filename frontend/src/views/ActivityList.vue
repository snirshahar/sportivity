<template>
  <section>
    <ActivityFilter></ActivityFilter>
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

export default {
  name: "activityList",
  data() {
    return {
      filterBy: null
    };
  },
  components: {
    ActivityPreview,
    ActivityFilter
  },
  computed: {
    filterActivities() {
      const activities = this.$store.getters.activities;
      return !this.filterBy
        ? activities
        : activities.filter(activity => activity.category === this.filterBy);
    }
  },
  async created() {
    this.filterBy = this.$route.params.category;
    console.log(this.activities);
  },
  watch: {
    "$route.params.category"() {
      this.filterBy = this.$route.params.category;
    }
  }
};
</script>

<style scoped>
h1 {
  text-decoration: underline lightblue;
}
.activity-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.fade-enter-active {
  transition: all 0.75s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>