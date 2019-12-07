<template>
  <div id="app">
    <NavBar />
    <router-view />
    <Footer/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import SocketService from "./services/SocketService";
import Footer from "./components/Footer";
import ActivityService from "./services/ActivityService";


export default {
  components: {
    Footer,
    NavBar
  },
  async created() {
    this.$store.dispatch("loadActivities");
    const activities = await ActivityService.getActivities();
    const user = this.$store.getters.loggedinUser;
    if(!user) return
    SocketService.emit("single socket", { user })
    if(user && activities){
      activities.forEach(activity=> {
        activity.attendees.forEach(attendee=>{
          if(attendee._id===user._id){
            SocketService.emit("user connect to socket activity", { activityId: activity._id })
        }
        })
      })
    } else  SocketService.emit("single socket", { user: 'guest' })
  } 
}
</script>
