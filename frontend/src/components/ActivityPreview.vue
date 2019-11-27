<template>
  <section v-if="activity" class="preview-container">
    <div class="preview-details">
      <div class="preview-info">{{activity.title}}</div>
      <div class="preview-desc">{{activity.description}}</div>
      <div class="preview-creator">
        {{activity.imgUrl}}
        {{activity.fullName}}
      </div>
    </div>
  </section>
</template>

<style>
</style>

<script>
export default {
  props: {
    activity: Object
  }
};
</script>