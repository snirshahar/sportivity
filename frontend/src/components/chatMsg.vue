
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

<style scoped>
p{
  margin: 0;
  text-align: left;
}
.msg-fullname{
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
.msg-txt{
  font-size: 16px
}
img{
  height: 30px;
  margin: 5px;
}
.chat-message{
  width: 400px;
  display: flex;
  align-items: center;
  margin: 5px 20px;
}
</style>

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
