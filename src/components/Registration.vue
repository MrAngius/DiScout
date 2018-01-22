<template>
  <main class="w3-container w3-light-grey">

    <form v-if="notFilled" action="" method="" class="w3-container w3-text-blue w3-mobile" style="width: 60%; margin: 16px auto;">
      <section class="w3-row w3-section" style="text-align: center">
        <span style="color: red" v-model="errReg"></span>
      </section>
      <h2 class="w3-center">Registration form</h2>
      Fill this form to register an account

      <section class="w3-row w3-section">
        <div class="w3-col" style="width:50px">
          <i class="w3-xxlarge fa fa-user"></i>
        </div>
        <div class="w3-rest">
          <input type="text" placeholder="First name" class="w3-input w3-round" required v-model="userInfo.firstName">
        </div>
      </section>
      <section class="w3-row w3-section" style="padding-left: 50px">
        <input type="text" placeholder="Last name" class="w3-input w3-round" required v-model="userInfo.lastName">
      </section>
      <section class="w3-row w3-section">
        <div class="w3-col" style="width:50px">
          <i class="w3-xxlarge fa fa-envelope"></i>
        </div>
        <div class="w3-rest">
          <input type="email" placeholder="Email address" class="w3-input w3-round" required v-model="userInfo.email">
        </div>
      </section>
      <section class="w3-row w3-section">
        <div class="w3-col" style="width:50px">
          <i class="w3-xxlarge fa fa-key"></i>
        </div>
        <div class="w3-rest">
          <input type="password" placeholder="Choose your password" class="w3-input w3-round" required v-model="userInfo.password">
        </div>
      </section>
      <section class="w3-row w3-section" style="padding-left: 50px">
        <input type="password" placeholder="Type your password again" class="w3-input w3-round" required v-model="userInfo.cpassword">
      </section>
      <section class="w3-row w3-section">
        <div class="w3-col" style="width:50px">
          <i class="w3-xxlarge fa fa-birthday-cake"></i>
        </div>
        <div class="w3-rest">
          <input type="date" class="w3-input w3-round" required v-model="userInfo.birthDate">
        </div>
      </section>
      <section class="w3-row w3-section">
        <label>
          <i class="w3-xxlarge fa fa-male"></i>
          <input type="radio" name="gender" class="w3-radio" value="M" required>
        </label>
        <label>
          <input type="radio" name="gender" class="w3-radio" value="F">
          <i class="w3-xxlarge fa fa-female"></i>
        </label>
      </section>
      <section class="w3-section">
        <br>
        <button type="submit" class="w3-button w3-blue w3-hover-teal w3-ripple w3-round-large">
          <i class="fa fa-send"></i> Register
        </button>
        <button type="reset" class="w3-button w3-blue w3-hover-red w3-ripple w3-round-large">
          <i class="fa fa-close"></i> Reset
        </button>
      </section>
    </form>
    <section v-else class="w3-row w3-section" style="text-align: center">
      <span style="color: green"> Successfully registered un account </span>
    </section>

  </main>
</template>

<script>
    export default {
        name: "registration",
      data(){
          return {
            notFilled: true,
            errReg: "",
            userInfo:{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              cpassword: "",
              birthDate: ""
            }
          }
      },
      methods: {
          checkForm: function () {
            if(this.userInfo.email==="john@doe.fr"){
              this.errReg="An account already exists"
            }
            else if(this.userInfo.password===this.userInfo.cpassword){
              this.errReg="Password do not match"
            }
            else {
              /* TODO eventually register user */
              this.notFilled=false
              (new Promise((resolve) => setTimeout(resolve, 1000))).then(this.$emit('changepage', 'Home'))
            }
          }
      }
    }
</script>

<style scoped>

</style>
