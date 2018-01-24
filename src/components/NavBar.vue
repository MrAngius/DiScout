<template>
  <div>
    <button id="menu-button-mobile" v-on:click="showMobile=!showMobile" v-bind:class="{'w3-black': !showMobile, 'w3-teal': showMobile}">
      <i class="fa fa-bars"></i>
    </button>
    <nav id="navigation" v-bind:class="{'w3-hide-small': !showMobile, 'w3-show-small': showMobile}" >
      <a href="#" v-on:click="changePage('Home'); showMobile = false">Home</a>
      <a href="#" v-on:click="changePage('MyTrack'); showMobile = false">MyTrack</a>
      <a href="#" v-on:click="changePage('News'); showMobile = false">News</a>
      <div id="user-button" v-on:click="action($event.currentTarget)">
        <div class="w3-padding">
          <img src="../../static/img/user.png" alt="" id="user_icon" />
          Hello<span v-if="loggedIn">, {{ userInfo.name }}! </span> <i class="fa fa-caret-down"></i>
        </div>
        <div id="userDropdown" v-bind:class="{'w3-show': showUser}">
          <a href="#" v-if="!loggedIn" v-on:click="changePage('Login'); showMobile = false">Login</a>
          <a href="#" v-if="!loggedIn" v-on:click="changePage('Registration'); showMobile = false">Register</a>
          <a href="#" v-if="loggedIn" v-on:click="changePage('UserSettings'); showMobile = false">My Profile </a>
          <a href="#" v-if="loggedIn" v-on:click="changePage('MyTrack'); showMobile = false">My Tracks</a>
          <a href="#" v-if="loggedIn" v-on:click="logout(); showMobile = false; changePage('Login')">Logout</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

  export default {
    name: "vue-nav-bar",
    data(){
        return{
          showMobile: false,
          showUser: false,
        }
    },
    props:{
      userInfo: {
        required: true,
        type: Object
      },
      loggedIn: {
        required: true,
        type: Boolean
      }
    },
    mounted(){
    },
    methods:{
      logout: function () {
        this.$emit('logout')
      },
      changePage: function(page){
        this.$emit('changepage', page)
      },
      // used to add some style effects and open the user menu
      action: function (elem) {
        this.showUser=!this.showUser;
        addRemoveClass(elem, "w3-teal");
      }
    }
  }
</script>

<style scoped>

</style>
