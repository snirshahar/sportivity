<template>
  <div class="preview-details" @click="$router.push(`/activity/${activity._id}`)">
    <div class="preview-image-container">
      <img class="preview-image" v-if="activity.imgUrls[0]" :src="activity.imgUrls[0]" />
    </div>
    <div class="wishlist-heart" @click.stop="test">❤</div>
    <div class="border">
      <div class="preview-top">
        <p class="preview-stars">{{activity.startsAt}}</p>
        <p class="preview-attendees">{{attendees}}/{{activity.maxAttendees}}</p>
      </div>
      <div class="preview-desc">
        <p class="preview-title">{{activity.title}}</p>
        <p class="preview-desc-text">{{activity.description}}</p>
      </div>
      <div class="preview-creator">
        <p>Hosted By</p>
        <div class="profile-card">
          <img :src="activity.createdBy.imgUrl" class="profile-image" />
          <router-link
            @click.native="$event.stopImmediatePropagation()"
            :to="'/profile/' + activity.createdBy.id"
          >{{activity.createdBy.fullName}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import AttendeeList from "../components/AttendeeList";

export default {
  props: {
    activity: Object
  },
  methods: {
    test() {
      console.log("test");
    }
  },
  computed:{
    attendees(){
      return this.activity.attendees ? this.activity.attendees.length : 0;
    }
  },
  components: {
    AttendeeList
  }
};
</script>

<style scoped lang="scss">
.preview-details {
  cursor: pointer;
  flex: 0 0 278px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  position: relative;
  transition: all 0.2s;
  &:hover {
    box-shadow: 0 0 2px 2px rgb(223, 223, 223);
  }
}

.preview-attendees,
.preview-stars {
  font-size: 0.8rem;
  margin: auto 0;
}

.preview-stars {
  color: green;
}

.preview-title {
  font-weight: bold;
  font-size: 1.2rem;
}

.border {
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.preview-top {
  display: flex;
  justify-content: space-between;
}

.preview-image {
  width: 100%;
  height: 200px;
}

.profile-image {
  border-radius: 50%;
  width: 40px;
}

.preview-creator {
  text-align: left;
  .profile-card {
    display: flex;
    a {
      text-decoration: none;
      color: rgb(71, 71, 71);
      margin: auto 10px;
    }
  }
  p {
    margin: 5px 0;
    font-size: 0.8rem;
  }
}

.wishlist-heart {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 1.2rem;
  color: white;
  -webkit-text-stroke: 2px black;
  transition: all 0.2s;
  &:hover {
    color: red;
  }
}
</style>