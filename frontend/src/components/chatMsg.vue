
<template>
  <div class="chat-message">
    <img :src="msg.from.imgUrl" alt />
    <div class="content">
      <div class="msg-info">
        <p class="fullname">{{msg.from.fullName}}</p>
        <p>{{sentAt}}</p>
      </div>
      <p class="msg-txt">{{txtMsg}}</p>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["msg"],
  computed: {
    sentAt() {
      return `,  ${moment(this.msg.sentAt).fromNow()}`;
    },
    txtMsg() {
      return this.msg.txt.charAt(0).toUpperCase() + this.msg.txt.slice(1);
    }
  }
};
</script>
