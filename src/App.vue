<template>
  <main>
    <vue-header/>
    <vue-navbar :loggedIn="loggedIn" :userInfo="userInfo" v-on:changepage="changePage" v-on:logout="logout"/>
    <component v-bind:is="whichPage" v-on:userLoggedIn="logIn" v-on:changepage="changePage"/>
    <vue-footer/>
  </main>
</template>

<script>
  import Header from './components/Header'
  import NavBar from './components/NavBar'
  import Footer from './components/Footer'
  import SearchPage from './components/SearchPage'
  import Login from './components/Login'
  import MixIns from './mixin'
  import GraphPage from './components/GraphPage'
  export default {
    name: 'App',
    mixins: [MixIns],
    components: {
      'vue-header': Header,
      'vue-navbar': NavBar,
      'vue-footer': Footer,
      'vue-search-page': SearchPage,
      'vue-graph-page': GraphPage,
      'vue-login-page': Login
    },
    data() {
      return{
        whichPage: 'vue-search-page',
        loggedIn: false,
        userInfo: {}
      }
    },
    created(){
      let user=window.sessionStorage.getItem('user');
      if(user!==null){
        this.loggedIn=true;
        this.userInfo=JSON.parse(user)
      }
    },
    methods: {
      logout: function(){
        this.loggedIn=false;
        window.sessionStorage.removeItem('user');
        this.changePage('Home')
      },
      logIn: function (data) {
        this.loggedIn=true;
        this.userInfo=data;
        window.sessionStorage.setItem('user', JSON.stringify(data));
        this.whichPage='vue-search-page'
      },
      changePage: function(targetPage){
        if(targetPage === "Home"){
          this.whichPage='vue-search-page'
        }
        else if(targetPage === "MyTrack"){
          if(this.loggedIn){
            this.whichPage='vue-graph-page'
          }
          else{
            this.whichPage='vue-login-page'
          }
        }
        else if(targetPage === "Login"){
          this.whichPage='vue-login-page'
        }
        else if(targetPage === "Register"){
          this.whichPage='vue-registration-page'
        }
      }
    }
  }


</script>

<style>

</style>
