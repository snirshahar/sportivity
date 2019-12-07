<template>
 
</template>

<script>
import SocketService from "../services/SocketService";
import BusService from '../services/BusService';

export default {
created() {
    SocketService.on("msg to all activity members except sender", msg=>{
      console.log(`notification: ',${msg}`);
    }),
    SocketService.on("user msg", msg=>{
      console.log(`notification: ',${msg}`);
    })
  } 
}
</script>