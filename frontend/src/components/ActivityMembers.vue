<template>
  <div class="attendees-container" v-if="attendees">
    <h1>Attendees</h1>
    <div class="attendees">
      <ActivityPreview v-for="attendee in attendees" :key="attendee._uid" :attendee="attendee" :size="'50px'" :showName="true"></ActivityPreview>
    </div>
  </div>
</template>

<script>
import ActivityPreview from "./AttendeePreview";

export default {
  props: {
    attendees: Array
  },
  created() {
    console.log(this.attendees);
  },
  components: {
    ActivityPreview
  }
};
</script>