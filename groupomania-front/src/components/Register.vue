<template>
  <div class="registerForm">
    <div class="registerForm__container">

      <h1>Inscription</h1>

      <div class="registerForm__row">
        <label for="password">Adresse E-mail</label>
        <input 
          type="email"
          name="email"
          v-model="email"
          placeholder="E-mail" />
      </div>

      <div class="registerForm__row">
        <label for="password">Mot de passe</label>
        <input 
          type="password"
          name="password"
          v-model="password"
          placeholder="Mot de passe" />
      </div>

      <div class="registerForm__row">
        <label for="password">Choisissez votre pseudo</label>
        <input 
          type="text"
          name="username"
          v-model="username"
          placeholder="Pseudo" />
      </div>

      <div class="btn-container">
        <svg width="277" height="62">
          <rect x="5" y="5" rx="25" fill="none" stroke="#FCA311" width="266" height="50"></rect>
        </svg>
        <span class="button" @click="login">
          Inscription
        </span>
    </div>

    </div>

      <div class="errorMessage" v-html="error" v-if="this.error !== null"></div>
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
        const response = await AuthenticationService.register({
        email: this.email,
        password: this.password, 
        username: this.username
      })
    
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
  .registerForm {
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

    }

    &__row {
      display: flex;
      width: 80%;
      flex-direction: column;
      align-items: flex-start;
    }

    h1 {
      margin-bottom: 10rem !important;
    }
  }
</style>
