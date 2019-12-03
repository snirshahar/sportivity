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

<style scoped lang="scss">
.activity-attendee {
  width: 40px;
  height: 40px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  padding: 5px;
  img {
    display: inline;
    margin: 0 auto;
  }
}
</style>