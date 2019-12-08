<template>
  <div class="activity-details-section wall-container">
    <h1>Discussions</h1>
    <div class="wall">
      <div class="msgs">
        <ChatMsg v-for="(msg,idx) in msgs" :key="idx" :msg="msg"></ChatMsg>
      </div>
      <form @submit.prevent="sendMsg" v-if="user" class="form">
        <input
          type="text"
          class="msg-input"
          v-model="msg.txt"
          placeholder="Write your message here"
        />
        <button class="btn-send">Send</button>
      </form>
      <div v-else>
        <p>
          Please
          <router-link to="/login">login</router-link>to chat
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SocketService from "../services/SocketService";
import ActivityService from "../services/ActivityService";
import ChatMsg from "./ChatMsg";

export default {
  data() {
    return {
      msg: { from: "User", txt: "" },
      msgs: [],
      activityId: "",
      user: null
    };
  },

  async created() {
    this.activityId = this.$route.params.id;
    this.user = this.$store.getters.loggedinUser;
    this.msg = !this.user ? null : { from: this.user, txt: "" };
    const activity = await ActivityService.getActivity(this.activityId);

    SocketService.emit("user listen activity", { activityId: this.activityId });
    this.msgs = activity.msgs;
    SocketService.on("msg recieved", msg => {
      console.log("msg recieved", msg);
      this.msgs.unshift(msg);
    });
  },
  components: {
    ChatMsg
  },
  methods: {
    sendMsg() {
      if (!this.msg.txt || !this.user) return;
      this.msg.activityId = this.activityId;
      SocketService.emit("chat addMsg", this.msg);
      this.msg.txt = "";
    }
  },
};
</script>