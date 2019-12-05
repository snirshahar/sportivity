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
    <div class="border">
      <div class="preview-top">
        <p class="preview-title">{{activity.title}}</p>
      </div>
      <div class="preview-desc">
        <div class="flex">
          <p class="preview-location">{{activity.location.address}}</p>
        <p class="preview-starts">{{starts}}</p>
        </div>
        <p class="preview-desc-text">{{activity.description}}</p>
      </div>
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
      var day = startsAt
        .format("dddd")
        .substring(0, 3)
        .toUpperCase();
      var month = startsAt
        .format("MMMM")
        .substring(0, 3)
        .toUpperCase();
      return `${day}, ${month} ${startsAt.format("DD")}, ${startsAt.format(
        "hh:mm"
      )}`;
    }
    // location() {
    //   const loc = this.activity.location.address
    //   console.log('loc:',loc);
    //   return loc

    // }
  },
  components: {
    AttendeeList
  }
};
</script>