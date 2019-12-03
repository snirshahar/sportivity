<template>
  <div class="image-cropper">
    <img :src="attendee.imgUrl" class="activity-attendee" />
  </div>
</template>

<script>
export default {
  props: {
    attendee: Object
  },
  data() {
    return {};
  }
};
</script>