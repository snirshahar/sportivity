<template>
  <section class="user-msg" v-if="showMsg">
    <div class="msg-content">
      <div class="msg-text">
        <p>{{msg}}</p>
      </div>
      <div class="close">
        <button class="close-btn">x</button>
      </div>
    </div>
  </section>
</template>

<script>
import SocketService from "../services/SocketService";

export default {
  data() {
    return {
      msg: "",
      showMsg: false
    };
  },
  created() {
    SocketService.on("msg to all activity members except sender", msg => {
      this.msg = msg;
      this.showMsg = true;
      setTimeout(() => {
        this.showMsg = false;
        this.msg = "";
      }, 5000);
    }),
      SocketService.on("msg to single user", msg => {
        this.msg = msg;
        this.showMsg = true;
        setTimeout(() => {
          this.showMsg = false;
          this.msg = "";
        }, 5000);
      });
  }
};
</script>