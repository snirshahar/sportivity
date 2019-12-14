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
          <router-link :to="this.activity._id" class="created-by-card">
            <img :src="this.activity.createdBy.imgUrl" />
            <div class="created-by-card-name">{{this.activity.createdBy.fullName}}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  }
};
</script>