<template>
  <vue-video-section
    :elementId="'header-background-video'"
    :ref="'header-background-video'"
    :mp4Source="require('../assets/videos/home.mp4')"
    :mobileBreakpoint="992"
    :desktopHeight="550"
    :mobileHeight="450"
    :playsinline="true"
    :loop="true"
    :autoplay="true"
    :autobuffer="true"
    :muted="true"
  ></vue-video-section>
</template>

<style>
    /* :posterSource="require('../assets/logo.png')" */
.vue-video-section-wrapper {
  z-index: -1;
}
</style>