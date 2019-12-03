
<template>
  <div class="chat-message">
    <img :src="msg.from.imgUrl" alt="">
    <div class="content">
      <p class="msg-fullname">
        <span style="font-weight: 1000">{{msg.from.fullName}}</span>
        <span style="color:grey">{{sentAt}}</span>
      </p>
      <p class="msg-txt">{{txtMsg}}</p>
    </div>
    
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['msg'],
  computed:{
    sentAt(){
      return `,  ${moment(this.msg.sentAt).fromNow()}`
    },
    txtMsg(){
      return this.msg.txt.charAt(0).toUpperCase() + this.msg.txt.slice(1)
    }
  },
  }
</script>
