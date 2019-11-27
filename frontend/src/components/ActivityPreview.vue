<template>
  <section class="preview-container">
    <img src="../img/soccer.jpg" />
    <div class="preview-details">
      previewwwwwwwww
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
  prop: ["activity"]
};
</script>