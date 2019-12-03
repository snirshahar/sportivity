<template>
  <div class="preview-details" @click="$router.push(`/activity/${activity._id}`)">
    <div class="preview-image-container">
        <img class="preview-image" v-if="activity.imgUrls[0]" :src="activity.imgUrls[0]" />
      <div class="wrap">
        <router-link
          @click.native="$event.stopImmediatePropagation()"
          :to="'/profile/' + activity.createdBy._id"
        >
          <img :src="activity.createdBy.imgUrl" class="profile-image" />
        </router-link>
      </div>
      <div class="wishlist-heart" @click.stop="test">❤</div>
      <div class="ribbon">
        <p class="preview-attendees">
          <font-awesome-icon :icon="['fa', 'user']" size="xs" />
          {{attendees}}/{{activity.maxAttendees}}
        </p>
      </div>
      <div></div>
    </div>
    <div class="border">
      <div class="preview-top">
        <p class="preview-created-by-name">{{shortName}}</p>
        <p class="preview-starts">{{starts}}</p>
      </div>
      <div class="preview-desc">
        <p class="preview-title">{{activity.title}}</p>
        <p class="preview-desc-text">{{activity.description}}</p>
      </div>
    </div>
    <AttendeeList :attendees="activity.attendees" />
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
    },
    shortName() {
      return (
        this.activity.createdBy.fullName.substring(
          0,
          this.activity.createdBy.fullName.indexOf(" ") + 2
        ) + "."
      );
    }
  },
  components: {
    AttendeeList
  }
};
</script>

<style scoped lang="scss">
.preview-details {
  outline: 1px;
  cursor: pointer;
  flex: 0 0 320px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  text-align: left;
  position: relative;
  transition: all 0.2s;
  &:hover {
    box-shadow: 0 0 2px 2px rgb(223, 223, 223);
  }
}

.ribbon {
  top: 10px;
  left: 0;
  background: #2c3e50;
  position: absolute;
  p {
    margin: 0;
    color: white;
    padding: 4px 10px;
  }
}

.preview-desc {
  padding: 10px;
}

.preview-starts {
  color: green;
  margin: auto;
  font-size: 0.8rem;
}

.preview-title {
  font-weight: bold;
  font-size: 1.2rem;
}

.border {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.preview-top {
  display: flex;
  justify-content: space-between;
  .preview-created-by-name {
    margin-left: 63px;
    font-weight: bold;
  }
  p {
    margin: 0;
  }
}

.preview-image {
  width: 100%;
  height: 200px;
}

.profile-image {
  border-radius: 50%;
  width: 50px;
  box-shadow: 0px 0px 0px 4px white;
}

.left {
  left: 50%;
}

.wrap {
  position: absolute;
  top: 170px;
  left: 10px;
}

.wishlist-heart {
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 1.2rem;
  color: white;
  -webkit-text-stroke: 2px black;
  transition: all 0.2s;
  &:hover {
    color: red;
  }
}

.image-cropper {
  width: 100px;
  height: 100px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}
</style>