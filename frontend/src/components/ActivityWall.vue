<template>
  <div>
    Chat
    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        {{msg.from}}: {{msg.txt}}
      </li>
    </ul>
    <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" placeholder="Write your message here" />
      <button>Send</button>

    </form>
  </div>  
</template>

<style scoped>
li{
  list-style-type: none;
}
</style>

<script>
import SocketService from '../services/SocketService';

export default {
  data() {
    return {
      msg: {from: 'User', txt: ''},
      msgs: [],
      activityId:'',
    }
  },
  created() {
    // const activityId = this.$route.params.id;
    const activityId = 12345
    const user = this.$store.getters.loggedinUser
    this.msg = (!user)? {from: 'guest', txt: ''} : {from: user.fullName, txt: ''}
    SocketService.emit('user visit', {activityId, user})
    SocketService.on('msg recieved', msg=>{
      this.msgs.unshift(msg)
    })
  },
  methods: {
    sendMsg() {
      if(!this.msg.txt) return
      SocketService.emit('chat addMsg', this.msg);
      this.msg.txt =''
    }
  }
}
</script>