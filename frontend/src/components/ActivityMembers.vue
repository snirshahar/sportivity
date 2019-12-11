<template>
  <div class="activity-details-section attendees-container" v-if="attendees">
    <h1>Members</h1>
    <div class="attendees">
      <AttendeePreview v-for="attendee in attendees" :key="attendee._uid" :attendee="attendee" size="'50px'" :showName="true"></AttendeePreview>
    </div>
  </div>
</template>

<script>
import AttendeePreview from "./AttendeePreview";

export default {
  props: {
    attendees: Array
  },
  components: {
    AttendeePreview
  }
};
</script>