<template>
  <div class="form-container">
    <div class="form-type">
      <div @click="type='Login'; msg=''" :class="{active: type === 'Login'}">Login</div>
      <div @click="type='Register'; msg=''" :class="{active: type === 'Register'}">Register</div>
    </div>
    <form class="form" @submit.prevent.stop="submit">
      <template v-if="type === 'Register'">
        <label for="fullname">Full Name</label>
        <input
          class="input"
          type="text"
          id="fullname"
          name="fullname"
          placeholder="Enter your full name..."
          v-model="cred.fullName"
        />
      </template>

      <label for="email">Email Address</label>
      <input
        class="input"
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email address..."
        v-model="cred.email"
      />

      <label for="password">Password</label>
      <input
        class="input"
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password..."
        v-model="cred.password"
      />

      <template v-if="type === 'Register'">
        <label for="confirm">Confirm Password</label>
        <input
          class="input"
          type="password"
          id="confirm"
          name="confirm"
          placeholder="Confirm your password..."
          v-model="cred.confirm"
        />
      </template>
      <input class="button" type="submit" v-model="type" />
      <p class="msg" v-if="msg">{{msg}}</p>
    </form>
  </div>
</template>

<style lang="scss">
.form-container {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  padding: 15px;
  border-radius: 3px;
  width: 400px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  .form-type {
    display: flex;
    div {
      font-weight: bold;
      font-size: 1.2rem;
      padding: 10px;
      flex: 1;
      cursor: pointer;
    }
  }
  .form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .input {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .button {
    width: 100%;
    background-color: #2c3e50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background-color: #1b2631;
    }
  }
  .msg{
    font-size: 0.8rem;
    color: red;
  }
}

.active {
  border-bottom: 3px solid #2c3e50;
}
</style>

<script>
import ActivityPreview from '../components/ActivityPreview';
// import UserService from '../services/UserService';

export default {
  data() {
    return {
      cred: {
        email: '',
        password: '',
        confirm: '',
        fullName: ''
      },
      type: 'Login',
      msg: ''
    };
  },
  methods: {
    async submit() {
      const res = await this.$store.dispatch({ type: this.type.toLowerCase(), cred: this.cred});
      if (!res._id) {
        return this.msg = 'Email or password is incorrect';
      }
      this.$router.push('/');
    }
  }
};
</script>
