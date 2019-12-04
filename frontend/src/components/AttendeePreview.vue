<template>
  <router-link :to="`/profile/${attendee._id}`">
    <div class="preview-card" v-if="attendee">
      <img :src="attendee.imgUrl" class="attendee-image" :width="size" :height="size" />
      <p v-if="showName">{{shortName}}</p>
    </div>
  </router-link>
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