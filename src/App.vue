<template>
  <main>
    <vue-header></vue-header>
    <vue-navbar></vue-navbar>
    <component v-bind:is="whichpage"></component>
    <vue-footer></vue-footer>
  </main>
</template>

<script>
  import Header from './components/Header'
  import NavBar from './components/NavBar'
  import Footer from './components/Footer'
  import SearchPage from './components/SearchPage'
  import GraphPage from './components/GraphPage'
export default {
  name: 'App',
  components: {
    'vue-header': Header,
    'vue-navbar': NavBar,
    'vue-footer': Footer,
    'vue-search-page': SearchPage,
    'vue-graph-page': GraphPage
  },
  data() {
    return{
      whichpage: 'vue-search-page'
    }
  }
}
</script>

<style>

</style>
