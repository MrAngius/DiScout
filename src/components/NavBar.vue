<template>
  <div>
    <button id="menu-button-mobile" onclick="showHideTargetMobile('navigation'); addRemoveClass(this, 'w3-black'), addRemoveClass(this, 'w3-teal')">
      <i class="fa fa-bars"></i>
    </button>
    <nav id="navigation" class="w3-hide-small">
      <a href="#">Menu item 1</a>
      <a href="#">Menu item 2</a>
      <a href="#">Menu item 3</a>
      <div id="user-button">
        <div class="w3-padding" onclick="showDropdown('userDropdown'); addRemoveClass(this, 'w3-teal')">
          <img src="../../static/img/user.png" alt="" id="user_icon" />
          Welcome, user! <i class="fa fa-caret-down"></i>
        </div>

        <div id="userDropdown">
          <a href="#">User item 1</a>
          <a href="#">User item 2</a>
          <a href="#">User item 3</a>
          <a href="#">User item 4</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
    export default {
        name: "vue-nav-bar"
    }
</script>

<style scoped>

</style>
