<template>
  <div>
    <form @submit.prevent="userLoggin">
      <p>Email</p>
      <input type="text" v-model="user.email">
      <p>Password</p>
      <input type="password" v-model="user.password">
      <button>Loggin</button>
    </form>
  </div>
</template>

<script>
import ActivityPreview from "../components/ActivityPreview";

export default {
  data() {
    return {
      user:{
        email:'',
        password:''
      }
    };
  },
  methods:{
    userLoggin(){
      console.log(this.user);
      
    }
  },
  created() {
    
    // this.$store.dispatch("loadActivities");
  },
  components: {
  }
};
</script>
