<template>
  <div class="preview-details">
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
  border: 1px solid red;
  flex: 0 0 25%;
}

img {
  width: 50px;
}
</style>