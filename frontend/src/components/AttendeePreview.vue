<template>
  <div class="image-cropper" v-if="attendee">
    <img :src="attendee.imgUrl" class="activity-attendee" :width="size" :height="size"/>
    <p v-if="showName">{{attendee.fullName}}</p>
  </div>
</template>

<script>
export default {
  props: {
    attendee: Object,
    showName: Boolean,
    size: String
  },
};
</script>