<template>
  <div class="activity-details-section attendees-container" v-if="attendees">
    <h1>Members</h1>
    <div class="attendees">
      <ActivityPreview v-for="attendee in attendees" :key="attendee._uid" :attendee="attendee" size="'50px'" :showName="true"></ActivityPreview>
    </div>
  </div>
</template>

<script>
import ActivityPreview from "./AttendeePreview";

export default {
  props: {
    attendees: Array
  },
  components: {
    ActivityPreview
  }
};
</script>