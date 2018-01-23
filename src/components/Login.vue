<template>
  <main class="w3-container w3-light-grey">
    <form action="" method="" class="w3-container w3-text-blue w3-mobile" style="width: 60%; margin: 16px auto;">
      <h2 class="w3-center">Login form</h2>

      <section class="w3-row w3-section" style="text-align: center">
        <span v-show="errLogin" style="color: red"> Invalid username or password </span>
      </section>
      <section class="w3-row w3-section">
        <div class="w3-col" style="width:50px">
          <i class="w3-xxlarge fa fa-user"></i>
        </div>
        <div class="w3-rest">
          <input type="email" placeholder="Email address" class="w3-input w3-round" required v-model="username">
        </div>
      </section>
      <section class="w3-row w3-section">
        <div class="w3-col" style="width:50px">
          <i class="w3-xxlarge fa fa-key"></i>
        </div>
        <div class="w3-rest">
          <input type="password" placeholder="Password" class="w3-input w3-round" required v-model="password">
        </div>
      </section>
      <section class="w3-section">
        <button type="submit" class="w3-button w3-block w3-blue w3-hover-teal w3-ripple w3-round-large" v-on:click.prevent="checkLogin">
          <i class="fa fa-unlock-alt"></i> Login
        </button>
      </section>
    </form>
  </main>
</template>

<script>
  import {bus} from '../main'
  import Functions from '../mixin.js';

  export default {
    name: "vue-login-page",
    mixins: [Functions],
    data(){
      return{
        errLogin: false,
        username: "",
        password: ""
      }
    },
    methods:{
      checkLogin: function(){
        /* TODO eventually add some serious check */
        if(this.username === "john@doe.fr" && this.password==="webint"){
          /*TODO eventually retrieve data from DB*/
          let firstName="John";
          let lastName="Doe";
          this.$emit('userLoggedIn', {email: this.username, name: firstName, lastName: lastName})
        }
        else{
          this.errLogin=true
        }
      }
    }
  }

</script>

<style scoped>

</style>
