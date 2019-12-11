<template>
  <div class="preview-card" v-if="attendee" @click="$router.push(`/profile/${attendee._id}`)">
    <img :src="attendee.imgUrl" class="attendee-image" :width="size" :height="size" />
    <p v-if="showName">{{shortName}}</p>
  </div>
</template>

<script>
export default {
  props: {
    attendee: Object,
    showName: Boolean,
    size: String
  },
  computed: {
    shortName() {
      const spaceIdx = this.attendee.fullName.indexOf(" ");

      return spaceIdx
        ? this.attendee.fullName.substring(0, spaceIdx + 2) + "."
        : this.attendee.fullName;
    }
  }
};
</script>