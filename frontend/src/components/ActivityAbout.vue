<template>
  <div class="activity-details-section about-page-container" v-if="activity" id="about">
    <div class="about-details">
      <h1>{{activity.title}}</h1>
      <div class="details">
        <div class="flex-column">
          <div class="deep-details">
            <p>
              <font-awesome-icon :icon="['fa', 'map-marker']" />
              {{activity.location.address}}
            </p>
            <p>
              <font-awesome-icon :icon="['fa', 'user']" />
              {{activity.attendees.length}}/{{activity.maxAttendees}} Members
            </p>
            <p>
              <font-awesome-icon :icon="['fa', 'calendar-plus']" />
              {{this.activity.cycle}}
            </p>
          </div>

          <div class="description">
            <h3>Description</h3>
            <p class="text">{{this.activity.description}}</p>
          </div>
        </div>

        <div class="created-by">
          <h3>Organizer</h3>
          <router-link :to="`/profile/${activity.createdBy._id}`" class="created-by-card">
            <img :src="activity.createdBy.imgUrl" />
            <div class="created-by-card-name">{{activity.createdBy.fullName}}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SocketService from "../services/SocketService";
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
    
    SocketService.on("add user", user => {
      this.activity.attendees.push({
        _id: user._id,
        fullName: user.fullName,
        imgUrl: user.imgUrl
      });
    });
    SocketService.on("remove user", userId => {
      this.activity.attendees = this.activity.attendees.filter(
        att => att._id !== userId
      );
    });
  }
};
</script>