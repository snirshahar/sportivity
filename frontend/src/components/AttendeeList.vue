<template>
  <section>
    <div class="attendee-list-container">
      <AttendeePreview v-for="attendee in attendees" :attendee="attendee" :key="attendee._id"></AttendeePreview>
    </div>
  </section>
</template>

<script>
import AttendeePreview from "./AttendeePreview";

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

<style lang="scss" scoped>
.attendee-list-container {
  display: flex;
  background: rgb(245, 245, 245);
}
</style>>
