<template>
  <div class="login">
    <div class="login__container">

      <h1>Connexion</h1>
    
    <div class="login__row">
      <label for="email">E-mail</label>
      <input 
        type="email"
        name="email"
        placeholder="E-mail"
        v-model="email" />
    </div>

    <div class="login__row">
      <label for="password">Mot de passe</label>  
      <input 
        type="password"
        name="password"
        placeholder="Mot de passe"
        v-model="password" />
    </div>

    <div class="btn-container">
        <svg width="277" height="62">
          <rect x="5" y="5" rx="25" fill="none" stroke="#FCA311" width="266" height="50"></rect>
        </svg>
        <span class="button" @click="login">
          Se Connecter
        </span>
    </div>  
  
    </div>    
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
        // On appelle la route login avec email et password comme l'attend l'API
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
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
  .login {
    height: $noScrollContainer;
    display: flex;
    justify-content: center;
    align-items: center;

    &__container {
      width: 50%;
      margin: 0 auto;
      max-width: 75rem;
      background-color: $C-dark;
      color: $C-white;
      padding: 5rem;
      border: 3px solid $C-main;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: $ZI-containers;

      @include breakpoint(lt-md) {
        width: 80%;
      }

      @include breakpoint(lt-sm) {
        width: 90%;
      }



      h1 {
        margin-bottom: 10rem !important;
      }

    }

    &__row {
        display: flex;
        width: 80%;
        flex-direction: column;
        align-items: flex-start;
      }
   
  }
</style>
