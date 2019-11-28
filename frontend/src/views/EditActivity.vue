<template>

<section class="edit-activity-container">
    <form @submit.prevent="saveActivity" v-if="activity">
      <label>
        <p>Activity Title</p>
        <input type="text" v-model="activity.title" required>
      </label>
      <label>
        <p>Activity Description</p>
        <input type="text" v-model="activity.description" required>
      </label>
      <label>
        <p>Activity Category</p>
        <input type="text" v-model="activity.category" required>
      </label>
      <label>
        <p>Max Attendees</p>
        <input type="text" v-model="activity.maxAttendees" required>
      </label>
      <label>
        <p>City</p>
        <input type="text" v-model="activity.location.city" >
        </label>
      <label>
        <p>Street</p>
        <input type="text" v-model="activity.location.street" >
      </label>
      <label>
        <p>Activity date and time</p>
        <input type="date" v-model="activity.startsAt" required>
      </label>
      <label v-if="!this.activityId">
        <p>Activity Created by</p>
        <!-- what happ when user choose the pics? will they shows? -->
        <input type="text" :value="activity.createdBy.fullName" disabled>
        <img :src="activity.createdBy.imgUrl" alt="">
        <input type="text" :value="activity.createdBy.imgUrl" disabled>
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
        <input @change="uploadImg" type="file">
      </label>
      <label>
        <p>another activity images</p>
        <input @change="uploadImg" type="file" multiple>
      </label>
      <!-- <el-form-item>In Stock:
      <el-switch v-model="activity.inStock"></el-switch>
      </el-form-item> -->
      <button>{{this.saveButton}}</button>
    </form>
      <!-- <button @click="userCanceled()">Cancel</button> -->
  </section>
</template>

<style>
</style>

<script>
// import activityService from '../services/ActivityService'
// import MapActivity from '../components/MapActivity'

export default {
  data(){
    return{
      activity:{
        title:'',
        description:'',
        category:'',
        createdBy:{
            fullName:'ofer',
            imgUrl:'avatar',
        },
        cycle:'Once',
        startsAt:Date.now(),
        maxAttendees:'',
        location:{
          city:'',
          street:''
        }
      },
      activityId: null
      }
    },
    computed:{
      saveButton(){
        if(this.$route.params.id) return 'Save';
        else {
          this.activity={
            title:'',
            description:'',
            category:'',
            createdBy:{
              fullName:'',
              imgUrl:'',
            },
            startsAt:'',
            location:{
              city:'',
              street:''
            },
            maxAttendees:'',
            cycle:'Once'
          }
        }
        return 'Create an activity'
      },
    },
    component:{
      // MapActivity
    },
    methods:{
    uploadImg(ev){
      // activityService.uploadImg(ev)
      //   .then(res => this.activity.img = res.url)
    },
    async saveActivity(){
      console.log('userSave', this.activity);
      await this.$store.dispatch({type:'saveActivity', activity:{...this.activity}})
      this.$router.push('/')         
    },
    userCanceled(){
      this.$router.push('/')
    },
  },
  created(){
    this.activityId = this.$route.params.id;
    console.log(this.activity.createdBy);
    
    // if(!this.activityId) return
    // activityService.query(this.activityId)
    //   .then(activity=> {
    //     if(activity){
    //       this.activity = {...activity};
    //     }
      // })
  }
}
</script>