<template>
  <div class="user-container container" v-if="user">
    <div class="user-details-container">
      <div class="user-profile-img">
        <img :src="user.imgUrl" />
        <button v-if="himself" class="btn-upload" @click="$refs.file.click()">Upload</button>
        <input @change="uploadImg" ref="file" type="file" style="display: none" />
      </div>
      <div class="user-details">
        <h2>
          <font-awesome-icon :icon="['fa', 'user']" />
          {{user.fullName}}
        </h2>
        <p>
          <font-awesome-icon :icon="['fa', 'clock']" />
          Joined at {{since}}
        </p>
        <p>
          <font-awesome-icon :icon="['fa', 'envelope']" />
          {{user.email}}
        </p>
        <p>
          <font-awesome-icon :icon="['fa', 'info-circle']" />
          {{activitiedHosted}}
        </p>
        <p>
          <font-awesome-icon :icon="['fa', 'info-circle']" />
          {{activitiesJoined}}
        </p>
      </div>
    </div>
    <div>
      <h3>Activities</h3>
      <transition-group class="activity-list" name="fade">
        <ActivityPreview
          v-for="activity in user.activities"
          :activity="activity"
          :key="activity._id"
        ></ActivityPreview>
      </transition-group>
    </div>
  </div>
</template>

<script>
import userService from "../services/UserService";
import ActivityPreview from "../components/ActivityPreview";
import cloudinaryService from "../services/CloudinaryService";

export default {
  data() {
    return {
      user: null
    };
  },
  methods: {
    async uploadImg(event) {
      if (!event.target.files[0]) return;
      const res = await cloudinaryService.uploadImg(event.target.files[0]);
      var user = Object.assign({}, this.$store.getters.loggedinUser);
      user.imgUrl = res.url;
      this.$store.dispatch({ type: "updateUser", user });
      this.user.imgUrl = res.url
    }
  },
  async created() {
    const userId = this.$route.params.id;
    this.user = await userService.getById(userId);
  },
  computed: {
    since() {
      return new Date(this.user.createdAt).toLocaleDateString();
    },
    activitiesJoined() {
      const total = this.user.activities.length;
      return `Participated in ${total} ${
        total === 1 ? "activity" : "activities"
      } (hosted included)`;
    },
    activitiedHosted() {
      const total = this.user.activities.map(
        activity => activity.createdBy._id === this.user._id
      ).length;
      return `Hosted ${total} ${total === 1 ? "activity" : "activities"}`;
    },
    himself() {
      const loggedUser = this.$store.getters.loggedinUser;
      if (!loggedUser) return false;
      return this.$route.params.id === loggedUser._id;
    }
  },
  watch: {
    async "$route.params.id"() {
      const userId = this.$route.params.id;
      this.user = await userService.getById(userId);
    }
  },
  components: {
    ActivityPreview
  }
};
</script>