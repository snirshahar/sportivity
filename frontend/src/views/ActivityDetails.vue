<template>
  <section class="details-container" v-if="activity">
    <div class="groupHeader">
      <div class="preview">
        <div class="img">
          <img :src="activity.imgUrls[0]" />
        </div>
        <div class="details">
          <div class="ml-50">
            <h1>{{activity.title}}</h1>
            <p>{{activity.location.city}}, Israel</p>
            <p>{{members}} members of {{maxAttendees}} - {{type}} group</p>
          </div>
        </div>
      </div>
      <ActivityDetailsBar />
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
    const id = this.$route.params.id;
    await this.$store.dispatch({ type: "loadCurrActivity", id });
    this.activity = this.$store.getters.currActivity;
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

h1,
p {
  margin: 0;
}

.ml-50 {
  margin-left: 50px;
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
.img,
.details {
  flex: 1;
}

.details {
  text-align: left;
}
</style>