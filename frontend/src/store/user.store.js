import userService from '../services/UserService.js'

var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export default ({
  strict: true,
  state: {
    loggedInUser: localLoggedinUser,
  },
  getters: {
    loggedinUser(state) {
      return state.user;
    }
  },
  mutations: {
    setUser(state, { user }) {
      state.loggedInUser = user;
    },
    removeUser(state) {
      state.loggedInUser = null;
    },
  },
  actions: {
    async login(context, { cred }) {
      const user = await userService.login(cred)
      context.commit({ type: "setUser", user });
      return user;
    },
    async register(context, { cred }) {
      const user = await userService.register(cred)
      context.commit({ type: "removeUser", user })
      return user;
    },
    async userLogout(context) {
      await userService.logout()
      context.commit({ type: "userLoggedOut" })
      return user;
    }
  }
})
