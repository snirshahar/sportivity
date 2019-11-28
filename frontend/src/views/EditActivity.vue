<template>
  <section class="edit-activity-container">
    <form @submit.prevent="saveActivity" v-if="activity">
      <label>
        <p>Activity Title</p>
        <input type="text" v-model="activity.title" required />
      </label>
      <label>
        <p>Activity Description</p>
        <input type="text" v-model="activity.description" required />
      </label>
      <label>
        <p>Activity Category</p>
         <select v-model="activity.category">
          <option value="all">All</option>
          <option value="soccer">Soccer</option>
          <option value="basketball">Basketball</option>
          <option value="workout">Workout</option>
          <option value="yoga">Yoga</option>
          <option value="pooldance">Pole dance</option>
          <option value="swimming">Swimming</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        <p>Max Attendees</p>
        <input type="number" v-model="activity.maxAttendees" required />
      </label>
      <label>
        <p>City</p>
        <input type="text" v-model="activity.location.city" required/>
      </label>
      <label>
        <p>Street</p>
        <input type="text" v-model="activity.location.street" />
      </label>
      <label>
        <p>Activity date and time</p>
        <input type="date" v-model="activity.startsAt.date" required />
        <input type="time" v-model="activity.startsAt.time" required />
      </label>
      <label v-if="!this.activityId">
        <p>Activity Created by</p>
        <!-- what happ when user choose the pics? will they shows? -->
        <input type="text" :value="activity.createdBy.fullName" disabled />
        <img :src="activity.createdBy.imgUrl" alt />
        <input type="text" :value="activity.createdBy.imgUrl" disabled />
      </label>
      <label>
        <p>Activity Cycle</p>
        <select v-model="activity.cycle">
          <option value="once">Once</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>
      <label>
        <p>Main activity image</p>
        <input @change="uploadImg" type="file" />
      </label>
      <label>
        <p>another activity images</p>
        <input @change="uploadImg" type="file" multiple />
      </label>
      <!-- <el-form-item>In Stock:
      <el-switch v-model="activity.inStock"></el-switch>
      </el-form-item>-->
      <button>{{this.saveButton}}</button>
    </form>
    <!-- <button @click="userCanceled()">Cancel</button> -->
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
        category: "",
        createdBy: {
          fullName: "ofer",
          imgUrl: "avatar"
        },
        cycle: "Once",
        startsAt: {
          date:'',
          time:''
        },
        maxAttendees: "",
        location: {
          city: "",
          street: ""
        },
        imgUrls:''
      },
      activityId: null
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
          date:'',
          time:''
          },
          location: {
            city: "",
            street: ""
          },
          imgUrls:''
        };
      }
      return "Create an activity";
    }
  },
  component: {
    // MapActivity
  },
  methods: {
    uploadImg(ev) {
      // activityService.uploadImg(ev)
      //   .then(res => this.activity.img = res.url)
    },
    async saveActivity() {
      console.log('new activity', this.activity);
      if(!this.activity.imgUrls[0]) this.activity.imgUrls[0]="https://images.unsplash.com/photo-1463253897230-4e281bf226c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      await this.$store.dispatch({ type: "saveActivity", activity: this.activity});
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
  }
};
</script>