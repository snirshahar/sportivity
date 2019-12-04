<template>
  <section class="edit-activity-container">
    <form class="form" @submit.prevent="saveActivity">
      <section class="main-details">
        <label for="title">Title:</label>
        <input
          class="input"
          type="text"
          id="title"
          name="title"
          placeholder="Activity title..."
          v-model="activity.title"
          required
        />

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

        <label for="place">Place</label>
        <template>
          <input
            class="input"
            type="text"
            id="place"
            name="place"
            v-model="place"
            ref="autocomplete"
            @input="onInput"
            @blur="setMarker"
          />
        </template>

        <label for="attendees">Number of Attendees:</label>
        <input
          class="input"
          type="number"
          id="attendees"
          name="attendees"
          value="10"
          v-model="activity.maxAttendees"
        />

        <label for="description">Description:</label>
        <textarea
          class="input"
          id="description"
          name="description"
          rows="4"
          v-model="activity.description"
        />
      </section>
      <section class="info-details">
        <label for="starts-at">
          Beginning Time:
          <VueCtkDateTimePicker
            id="starts-at"
            v-model="activity.startsAt"
            style="margin: 8px 0"
            required
          />
        </label>

        <label for="occurrence">Occurrence:</label>
        <select class="input" id="cycle" name="cycle" v-model="activity.cycle">
          <option value="once">Once</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </section>
      <input class="button" type="submit" value="Submit" />
    </form>

    <GmapMap
      :center="{lat:10, lng:10}"
      :zoom="16"
      map-type-id="terrain"
      class="google-map"
      width="200px"
    >
      <GmapMarker
        :position="{lat:10, lng:10}"
        :clickable="true"
        :draggable="false"
        @click="center={lat:10, lng:10}"
      />
    </GmapMap>
  </section>
</template>

<script>
import activityService from "../services/ActivityService";
import locationService from "../services/LocationService";

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
          _id: null,
          address: null,
          coords: {
            lat: 0,
            lng: 0
          }
        },
        imgUrls: [],
        startsAt: null
      },
      activityId: null,
      autocomplete: null,
      placeChanged: false,
      place: null
    };
  },
  methods: {
    onInput() {
      this.placeChanged = true;
    },
    setMarker(ev) {
      if (this.placeChanged) {
        setTimeout(async () => {
          var res = await locationService.getCoors(ev.target.value);
          const result = res.data.results[0];
          this.activity.location._id = result.place_id;
          this.activity.location.coords = { lat: result.geometry.location.lat, lng: result.geometry.location.lng}
          this.activity.location.address = result.formatted_address;
          console.log(this.activity.location);
          // res = await locationService.getLocation({});
          // const str = res.data.plus_code.compound_code;
          // this.activity.location.city = str.substring(str.indexOf(" ") + 1, str.indexOf(","));
          // this.activity.location.country = str.substring(str.indexOf(",") + 2);
          // this.locationStr = `${city}, ${country}`;
        }, 100);
        this.placeChanged = false;
      }
    },
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
    setTimeout(() => {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.$refs.autocomplete,
        { types: ["address"] }
      );
    }, 500);
  }
};
</script>

<style lang="scss" scoped>
.field-container {
  display: flex;
}
.main-details {
  margin: 20px;
  width: 50%;
}
.info-details {
  margin: 20px;
  width: 50%;
  .edit-activity-container {
    display: flex;
    margin: 50px;
  }
  .form {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    padding: 15px;
    border-radius: 3px;
    width: 60%;
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
}
</style>