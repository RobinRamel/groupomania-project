<template>
  <b-container id="app" fluid>
    <Header />
    <router-view/>
  </b-container>
</template>

<script>
import Header from './components/Header'

export default {
    components: { Header }

}
</script>

<style lang="scss">
html, body {
  font-size: 10px;
  background-color: #fff0e0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fff0e0;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

h1 {
  margin: 3rem 0 !important;
  text-transform: uppercase;
}

h2 {
  margin: 3rem 0 !important;
}

h3 {
  color: white;
  font-size: 4rem !important; 
  font-weight: bold;
}

p {
  font-size: 1.8rem;
  text-align: left;
  line-height: 2.5rem;
}

label {
  font-size: 2rem !important;
}

input, textarea {
  border: 1px solid #232b2b !important;
  // border-radius: 5px !important;
  //overflow: hidden !important;
  // overflow-y: none !important;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.errorMessage {
  margin-top: 5rem;
  font-size: 1.4rem;
  background-color: #d47f7f;
  color: white;
}

//Label commentaire form 
#commentaire-section__BV_label_ {
  font-size: 1.8rem;
}
</style>
