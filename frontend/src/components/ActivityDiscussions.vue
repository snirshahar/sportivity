<template>
  <div class="discussions-container">
    <span class="wall-title">Activity Wall</span>
    <form @submit.prevent="sendMsg" v-if="user">
      <input type="text" v-model="msg.txt" placeholder="Write your message here" />
      <button>Send</button>
    </form>
    <div v-else>
      <p>Please <router-link to="/login">login</router-link> to chat</p>
    </div>
      <chat-msg v-for="(msg,idx) in msgs" :key="idx" :msg="msg"></chat-msg>
  </div>  
</template>

<script>
import SocketService from '../services/SocketService';
import ActivityService from "../services/ActivityService";
import chatMsg from './chatMsg'

export default {
  data() {
    return {
      msg: {from: 'User', txt: ''},
      msgs: [],
      activityId:'',
      user:null,
    }
  },

  async created() {
    this.activityId = this.$route.params.id;
    this.user = this.$store.getters.loggedinUser
    this.msg = (!this.user)? null : {from: this.user, txt: ''}
    const activity = await ActivityService.getActivity(this.activityId)
    this.msgs = activity.msgs
    SocketService.on('msg recieved', msg=>{
      console.log('msg recieved',msg);
      this.msgs.unshift(msg)
    })
  },
  components:{
    chatMsg
  },
  methods: {
    sendMsg() {
      if(!this.msg.txt || !this.user) return
      this.msg.activityId = this.activityId;
      SocketService.emit('chat addMsg', this.msg);
      this.msg.txt =''
    }
  },
}
</script>