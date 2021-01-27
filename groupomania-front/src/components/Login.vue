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
  data () {
    return {
     email: '',
     password: ''
    }
  }, 
  methods: {
    async login () {
      console.log('buton clicked', this.email, this.password)
      const response = await AuthenticationService.login({
        email: this.email,
        password: this.password
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
