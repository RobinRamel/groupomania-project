<template>
  <div class="registerForm">
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

      <div class="errorMessage" v-html="error"></div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: '',
      username: '',
      error: null
    }
  }, 
  methods: {
    async register () {
      try {
        console.log('buuton clicked', this.email, this.password, this.username)
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password, 
        username: this.username
      })
      console.log(response)
    
      // On update le store avec le Jwt et l'user qu'on récupere des datas de la reponse de la requete 
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        localStorage.setItem('gpm-token', JSON.stringify(response.data.token))
        localStorage.setItem('gpm-user', JSON.stringify(response.data.user))
        this.$router.push({ name: "home"})
      } catch(error) {
        this.error = error.response.data.error
        console.log(error)
      }
    }
  },
  computed: {
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
