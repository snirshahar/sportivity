<template>
  <section class="details-container" v-if="activity">
    <div class="groupHeader">
      <div class="bound">
        <div class="preview">
          <div class="img">
            <img :src="activity.imgUrls[0]" />
          </div>
          <div class="details">
            <h1>{{activity.title}}</h1>
            <p>{{activity.location.city}}, Israel</p>
            <p>{{members}} members of {{maxAttendees}} - {{type}} group</p>
            <p>
              Organized by
              <router-link :to="'/profle/' + activity.createdBy.id">{{activity.createdBy.fullName}}</router-link>
            </p>
          </div>
        </div>
      </div>
      <ActivityDetailsBar/>
    </div>
  </section>
</template>

<script>
import activityService from "../services/ActivityService";
import ActivityDetailsBar from "../components/ActivityDetailsBar";

export default {
  data() {
    return {
      activity: null
    };
  },
  async created() {
    const activityId = this.$route.params.id;
    this.activity = await activityService.getActivity(activityId);
  },
  computed: {
    createdAt() {
      return new Date(this.activity.createdAt).toLocaleString("en-us");
    },
    members() {
      return this.activity.attendees.length;
    },
    maxAttendees() {
      return this.activity.maxAttendees;
    },
    type() {
      return this.activity.isPublic ? "Public" : "Private";
    }
  },
  components: {
    ActivityDetailsBar
  }
};
</script>

<style scoped>
img {
  width: 100%;
  border-radius: 10px;
}
.groupHeader {
  width: 100%;
}

.preview {
  margin: 0 auto;
  display: flex;
  max-width: 1100px;
  padding: 20px;
}

.bound {
  border-bottom: 1px solid #bbb;
}
.img,
.details {
  flex: 1;
}
</style>