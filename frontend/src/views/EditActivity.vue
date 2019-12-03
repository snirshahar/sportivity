<template>
  <section class="edit-activity-container">
    <form class="form" @submit.prevent="saveActivity">
      <label for="title">Title:</label>
      <input
        class="input"
        type="text"
        id="title"
        name="title"
        placeholder="Activity title..."
        v-model="activity.title"
      />

      <label for="attendees">Number of Attendees:</label>
      <input
        class="input"
        type="number"
        id="attendees"
        name="attendees"
        value="10"
        v-model="activity.maxAttendees"
      />

      <label for="starts-at">Beginning Time:</label>
      <VueCtkDateTimePicker id="starts-at" v-model="activity.startsAt" />

      <label for="category">Category</label>
      <select class="input" id="category" name="category" v-model="activity.category">
        <option disabled>Please select a category...</option>
        <option value="soccer">Soccer</option>
        <option value="basketball">Basketball</option>
        <option value="workout">Workout</option>
        <option value="yoga">Yoga</option>
        <option value="pooldance">Pole dance</option>
        <option value="swimming">Swimming</option>
        <option value="other">Other</option>
      </select>

      <label for="city">City:</label>
      <input class="input" type="text" id="city" name="city" v-model="activity.location.city" ref="autocomplete" onfocus="value = ''" />

      <label for="street">Street:</label>
      <input class="input" type="text" id="street" name="street" v-model="activity.location.street" />

      <label for="occurrence">Occurrence:</label>
      <select class="input" id="cycle" name="cycle" v-model="activity.cycle">
        <option value="once">Once</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      <label for="description">Description:</label>
      <textarea
        class="input"
        id="description"
        name="description"
        rows="4"
        v-model="activity.location.description"
      />

      <input class="button" type="submit" value="Submit" />
    </form>

    <GmapMap :center="{lat:10, lng:10}" :zoom="16" map-type-id="terrain" class="google-map">
      <GmapMarker
        :position="{lat:10, lng:10}"
        :clickable="true"
        :draggable="false"
        @click="center={lat:10, lng:10}"
      />
    </GmapMap>
  </section>
</template>

<style>
</style>

<script>
import activityService from "../services/ActivityService";

export default {
  data() {
    return {
      activity: {
        title: "",
        description: "",
        category: "Please select a category...",
        cycle: "once",
        startsAt: null,
        maxAttendees: 10,
        location: {
          city: "",
          street: "",
          lng: 10,
          lat: 10
        },
        imgUrls: [],
        startsAt: null
      },
      activityId: null,
      autocomplete: null
    };
  },
  computed: {
    saveButton() {
      if (this.$route.params.id) return "Save";
      else {
        this.activity = {
          createdBy: {
            fullName: "",
            imgUrl: ""
          },
          startsAt: {
            date: "",
            time: ""
          },
          location: {
            city: "",
            street: ""
          },
          imgUrls: []
        };
      }
      return "Create an activity";
    }
  },
  methods: {
    uploadImg(ev) {
      // activityService.uploadImg(ev)
      //   .then(res => this.activity.img = res.url)
    },
    async saveActivity() {
      this.activity.startsAt = new Date(this.activity.startsAt).getTime();
      console.log("new activity", this.activity);
      await this.$store.dispatch({
        type: "saveActivity",
        activity: this.activity
      });
      this.$router.push("/");
    },
    userCanceled() {
      this.$router.push("/");
    }
  },
  async created() {
    this.activityId = this.$route.params.id;
    if (!this.activityId) return;
    const activity = await activityService.getActivity(this.activityId);
    this.activity = { ...activity };
  },
  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      { types: ["geocode"] }
    );
  }
};
</script>

<style lang="scss" scoped>
.edit-activity-container {
  display: flex;
  margin: 50px;
}
.form {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  padding: 15px;
  border-radius: 3px;
  flex-basis: 400px;
  text-align: left;
  display: flex;
  flex-direction: column;
  .input,
  #starts-at-input {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .button {
    width: 100%;
    background-color: #2c3e50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background-color: #1b2631;
    }
  }
}

.google-map {
  width: 400px;
  height: 400px;
}
</style>