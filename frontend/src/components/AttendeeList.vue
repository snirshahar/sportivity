<template>
  <section>
    <div class="attendee-list-container">
      <AttendeePreview v-for="attendee in attendees" :key="attendee._id" :attendee="attendees"></AttendeePreview>
    </div>
  </section>
</template>

<script>
import AttendeePreview from "../components/AttendeePreview";

export default {
  name: "attendeeList",
  props: {
    attendees: Array
  },
  data() {
    return {};
  },
  components: {
    AttendeePreview
  }
};
</script>

<style >
</style>