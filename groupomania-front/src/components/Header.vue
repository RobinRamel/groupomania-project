<template>
  <b-navbar toggeable="md" type="dark" variant="dark">
    <b-navbar-brand :to="{ name: 'home'}">Groupomania</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse v-if="this.$store.state.isUserLoggedIn === false" id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{ name: 'login'}">Login</b-nav-item>
        <b-nav-item :to="{ name: 'register'}">Register</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
    <b-collapse v-else id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{ name: 'login'}">Profile</b-nav-item>
        <b-nav-item @click="deconnection">Deconnexion</b-nav-item>
      </b-navbar-nav>

    </b-collapse>

  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    deconnection() {
      this.$store.commit('userDeconnection')
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
