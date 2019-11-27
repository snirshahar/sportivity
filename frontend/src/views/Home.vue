<template>
  <section>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div class="activitity-preview-list-container">
      <ActivityPreviewList></ActivityPreviewList>
    </div>
  </section>
</template>


<script>
import ActivityPreviewList from "../components/ActivityPreviewList";

export default {
  name: "home",
  components: {
    ActivityPreviewList
  }
};
</script>
