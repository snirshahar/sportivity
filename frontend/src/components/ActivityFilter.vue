<template>
  <section>
    <div class="explore-categories">
      <button @click="filterBy='all'">All</button>
      <button @click="filterBy='soccer'">Soccer</button>
      <button @click="filterBy='basketball'">Basketball</button>
      <button @click="filterBy='tennis'">Tennis</button>
      <button @click="filterBy='volleyball'">Volleyball</button>
      <button @click="filterBy='workout'">Workout</button>
      <button @click="filterBy='pool'">Pool</button>
      <button @click="filterBy='poker'">Poker</button>
      <button @click="filterBy='yoga'">Yoga</button>
      <button @click="filterBy='cycling'">Cycling</button>
      <button @click="filterBy='dance'">Dance</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "ActivityFilter",
  data() {
    return {
      filterBy: "all",
      activities: null
    };
  },
  computed: {
    filterActivities() {
      const activities = this.$store.getters.activities;
      return this.filterBy === "all"
        ? activities
        : activities.filter(activity => activity.category === this.filterBy);
    }
  },
  watch: {
    filterBy() {
      this.activities = this.filterActivities;
      console.log("filtered:", this.filterActivities);
    }
  }
};
</script>