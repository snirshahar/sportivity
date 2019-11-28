<template>
  <section>
    <h1>User</h1>
    <!-- <div>
      <div v-model="attendee.id"></div>
      <div v-model="attendee.fullName"></div>
      <div v-model="attendee.imgUrl"></div>
    </div>-->
    <div class="attendees-container">
      <div class="attendee-id">{{attendee.id}}</div>
      <div class="attendee-fullName">{{attendee.fullName}}</div>
      <div class="attendee-imgUrl">
        <img :src="attendee.imgUrl" />
        {{attendee.fullName}}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    attendee: Object
  },
  data() {
    return {
      attendee: {}
    };
  }
};
</script>

<style>
</style>