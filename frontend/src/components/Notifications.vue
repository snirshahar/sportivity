<template>
 
</template>

<script>
import SocketService from "../services/SocketService";

export default {
created() {
    SocketService.on("msg to all activity members except sender", msg=>{
      console.log(`notification: ',${msg}`);
    }),
    SocketService.on("msg to single user", msg=>{
      console.log(`notification: ',${msg}`);
    })
  } 
}
</script>