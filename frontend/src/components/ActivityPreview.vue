<template>
  <div class="preview-details" @click="$router.push(`/activity/details/${activity.id}`)">
    <img v-if="activity.imgUrls[0]" :src="activity.imgUrls[0]"/>
    <div class="preview-info">{{activity.title}}</div>
    <div class="preview-desc">{{activity.description}}</div>
    <div class="preview-creator">
      <img :src="activity.createdBy.imgUrl"  />
      {{activity.createdBy.fullName}}
    </div>
    <AttendeeList></AttendeeList>
  </div>
</template>

<style>
</style>

<script>
import AttendeeList from '../components/AttendeeList'

export default {
  props: {
    activity: Object
  },
  created() {
  }
};
</script>

<style scoped>
.preview-details {
  cursor: pointer;
  border: 1px solid red;
  flex: 0 0 25%;
}

.preview-details:hover {
  border: 1px solid blue;
}

img {
  width: 50px;
}
</style>