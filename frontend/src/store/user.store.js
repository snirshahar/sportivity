import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../services/UserService.js'

Vue.use(Vuex)

export default ({
  strict: true,
  state: {
    loggedInUser:null,
  },
  getters:{
    loggedinUser(state){
      return state.user;
    }
  },
  mutations: {
    userLoggedIn(state, {user}){
      state.loggedInUser = user;
    },
    userLoggedOut(state){
      state.loggedInUser = null;
    },
  },
  actions: {
    async userLogin(context, {userCred}) {
      const user = await userService.login(userCred)
      context.commit({ type: "userLoggedIn", user });
      return user;
    },
    async userSignup(context, {userCred}){
      const user = await userService.signup(userCred)
      context.commit({ type: "userLoggedIn", user })
      return user;
    },
    async userLogout(context){
      await userService.logout()
      context.commit({type: "userLoggedOut"})
      return user;
    }
  }
})
