<template>
  <div>
    <h1>Connexion</h1>

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
      <button @click="login">
        Connexion
      </button>

  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'login',

  beforeCreate() {
    if (this.$store.state.isUserLoggedIn) {
      this.$router.push({ name: "home"})
    }
  },

  data () {
    return {
     email: '',
     password: '',
     error: null
    }
  }, 
  methods: {
    async login () {
      try {
        console.log('buton clicked', this.email, this.password)
        // On appelle la route login avec email et password comme l'attend l'API
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        console.log('response : ', response.data)
        // On update le store avec le Jwt et l'user qu'on récupere des datas de la reponse de la requete 
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        localStorage.setItem('gpm-token', JSON.stringify(response.data.token))
        localStorage.setItem('gpm-user', JSON.stringify(response.data.user))
        this.$router.push({ name: "home"})
      } catch (error) {
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
