<template>
  <div>
    <h1>Inscription</h1>

    <input 
      type="email"
      name="email"
      v-model="email"
      placeholder="E-mail" />
      <br>
    <input 
      type="password"
      name="password"
      v-model="password"
      placeholder="Mot de passe" />
      <br>
    <input 
      type="text"
      name="username"
      v-model="username"
      placeholder="Pseudo" />
      <br>
      <button @click="register">
        Inscription
      </button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      username: '',
    }
  }, 
  methods: {
    async register () {
      console.log('buuton clicked', this.email, this.password, this.username)
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password, 
        username: this.username
      })
      console.log(response.data)
    }
  },
  computed: {
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
