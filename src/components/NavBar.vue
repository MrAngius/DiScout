<template>
  <div>
    <button id="menu-button-mobile" v-on:click="showMobile=!showMobile" v-bind:class="{'w3-black': !showMobile, 'w3-teal': showMobile}">
      <i class="fa fa-bars"></i>
    </button>
    <nav id="navigation" v-bind:class="{'w3-hide-small': !showMobile, 'w3-show-small': showMobile}" >
      <a href="#" v-on:click="changePage('Home')">Home</a>
      <a href="#" v-on:click="changePage('MyTrack')">MyTrack</a>
      <a href="#">Menu item 3</a>
      <div id="user-button" v-on:click="showUser=!showUser">
        <div class="w3-padding">
          <img src="../../static/img/user.png" alt="" id="user_icon" />
          Hello<span v-if="loggedIn">, {{ userInfo.name }}! </span> <i class="fa fa-caret-down"></i>
        </div>

        <div id="userDropdown" v-bind:class="{'w3-show': showUser}" v-on:mouseout="showUser=false">
          <a href="#" v-if="!loggedIn" v-on:click="changePage('Login')">Login</a>
          <a href="#" v-if="!loggedIn" v-on:click="changePage('Registration')">Register</a>
          <a href="#" v-if="loggedIn">My Profile</a>
          <a href="#" v-if="loggedIn" v-on:click="changePage('MyTracks')">My Tracks</a>
          <a href="#" v-if="loggedIn" v-on:click="logout">Logout</a>
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
    created(){

    },
    methods:{
      logout: function () {
        this.$emit('logout')
      },
      changePage: function(page){
        this.$emit('changepage', page)
      }
    }
  }
</script>

<style scoped>

</style>
