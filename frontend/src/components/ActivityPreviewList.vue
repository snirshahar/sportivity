<template>
  <section class="activity-list">
    <h1>Most Activities in Tel Aviv</h1>
    <button>See All</button>
    <ActivityPreview v-for="activity in activities" :key="activity._id" :activity="activity"></ActivityPreview>
  </section>
</template>

<script>
import ActivityPreview from './ActivityPreview'

export default {
  props: {
    type: String
  },
  data() {
    return {
    };
  },
  methods: {
  },
  computed:{
    activities(){      
      return this.$store.getters[this.type];
    }
  },
  components:{
    ActivityPreview
  }
};
</script>
