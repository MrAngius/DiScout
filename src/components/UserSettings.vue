<template>
  <div class="w3-light-grey w3-clear">
    <h2 class="w3-center w3-blue w3-padding" style="margin: 0">Your profile</h2>
    <form class="w3-white w3-round-large w3-mobile" style="width: 60%; margin: 16px auto;">

      <section class="w3-clear">
        <div class="w3-left w3-round-large w3-card w3-margin">
          <img :src="userInfo.img" class="w3-image"/>
        </div>
        <div class="w3-left w3-margin">
          <h3> {{ userInfo.name }} {{ userInfo.lastName }} </h3>
          <i class="fa fa-envelope-o"></i> {{ userInfo.email }} <br>
          <i class="fa fa-birthday-cake"></i> {{ userInfo.birthday }}
        </div>
      </section>

      <section class="w3-padding">
        <div class="w3-large w3-text-teal">Account settings</div>
        <div class="w3-justify">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
          sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
          facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
          impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
          voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
          ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat
        </div>
      </section>
    </form>
  </div>
</template>

<script>
  export default {
    name: "vue-user-settings",
    data() {
      return {
        userInfo: JSON.parse(sessionStorage.getItem('user'))
      }
    },
    props: {}
  }
</script>
