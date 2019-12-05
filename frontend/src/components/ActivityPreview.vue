<template>
  <div class="preview-details-container" @click="$router.push(`/activity/${activity._id}`)">
    <div class="preview-image-container">
      <img class="preview-image" v-if="activity.imgUrls[0]" :src="activity.imgUrls[0]" />
      <div class="wishlist-heart" @click.stop="test">❤</div>
      <div class="ribbon">
        <p class="preview-attendees">
          <font-awesome-icon :icon="['fa', 'user']" size="l" />
          {{attendees}}/{{activity.maxAttendees}}
        </p>
      </div>
      <div></div>
    </div>
    <div class="preview-desc">
      <p class="preview-title">{{activity.title}}</p>
      <div class="preview-info">
        <p class="preview-starts">{{starts}}, </p>
        <p class="preview-location">{{city}}</p>
      </div>
      <p class="preview-desc-text">{{activity.description}}</p>
    </div>
  </div>
</template>

<style>
</style>

<script>
import AttendeeList from "../components/AttendeeList";
import moment from "moment";

export default {
  props: {
    activity: Object
  },
  methods: {
    test() {
      console.log("test");
    }
  },
  computed: {
    attendees() {
      return this.activity.attendees ? this.activity.attendees.length : 0;
    },
    starts() {
      const startsAt = moment(this.activity.startsAt);
      return moment(startsAt).fromNow();
    },
    city(){
      const address = this.activity.location.address;
      return address.substring(address.indexOf(',') + 2);
    }
  },
  created(){
    console.log(this.activity)
  },
  components: {
    AttendeeList
  }
};
</script>