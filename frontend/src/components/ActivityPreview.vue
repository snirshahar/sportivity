<template>
  <div class="preview-details" @click="$router.push(`/activity/details/${activity.id}`)">
    <img :src="activity.imgUrls[0]"/>
    <div class="preview-info">{{activity.title}}</div>
    <div class="preview-desc">{{activity.description}}</div>
    <div class="preview-creator">
      <img :src="activity.createdBy.imgUrl" />
      {{activity.createdBy.fullName}}
    </div>
  </div>
</template>

<style>
</style>

<script>
export default {
  props: {
    activity: Object
  },
  created() {
    console.log(this.activity.id);
  }
};
</script>

<style scoped>
.preview-details {
  cursor: pointer;
  border: 1px solid red;
  flex: 0 0 25%;
}

.preview-details:hover{
  border: 1px solid blue;
}

img {
  width: 50px;
}
</style>