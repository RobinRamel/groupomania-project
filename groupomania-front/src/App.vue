<template>
  <div id="app">
    <div class="shapes-topleft">
      <svg width="555" height="605" viewBox="0 0 555 605" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="shapes-topleft__light-main" d="M359.454 210.035C416.948 256.517 497.944 139.058 504.446 29.597C505.033 19.7116 503.326 9.7977 499.673 -0.0627274L-0.0131072 -0.0528182L-0.023145 507.077C47.9129 521.925 95.6485 530.854 138.778 499.865C205.461 451.95 173.466 363.983 177.967 283.012C182.468 202.041 301.959 163.553 359.454 210.035Z" fill="#FFBE54"/>
        <path class="shapes-topleft__dark-main" d="M354.455 205.037C411.949 251.519 492.945 134.059 499.446 24.5989C499.934 16.3824 498.838 8.14615 496.356 -0.0627114L-0.0129235 -0.0527945L-0.0229448 503.604C46.2277 517.499 92.1488 524.779 133.778 494.867C200.462 446.952 168.466 358.985 172.968 278.014C177.469 197.043 296.96 158.555 354.455 205.037Z" fill="#FCA311"/>
        <path class="shapes-topleft__light-blue" d="M212.932 73.2638C293.177 -10.2341 362.909 160.383 411.402 22.4233C414.275 14.2515 415.811 6.77528 416.153 -0.0701464L-0.036413 -0.0701523L-0.0364192 319.19C4.4175 319.498 9.08088 319.715 13.9615 319.836C229.638 325.202 132.686 156.762 212.932 73.2638Z" fill="#1F3C53"/>
        <path class="shapes-topleft__dark-blue" d="M207.933 62.2669C288.178 -21.2309 357.91 149.386 406.403 11.4264C407.808 7.4304 408.893 3.60071 409.675 -0.0702458L-0.0363388 -0.0702509L-0.0363342 308.496C2.87769 308.648 5.87658 308.763 8.96232 308.839C224.639 314.205 127.687 145.765 207.933 62.2669Z" fill="#011627"/>
      </svg>
    </div>
    <Header />
    <router-view/>
    <div class="shapes-botright">
      <svg width="484" height="472" viewBox="0 0 484 472" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="shapes-botright__light-main" d="M44.7592 334.796C18.7515 373.23 0.368131 418.993 19.1432 456.539C22.04 462.331 25.6376 467.449 29.7931 472.035L483.819 472.029L483.825 86.5342C479.827 83.695 475.133 81.416 469.596 79.8397C408.118 62.339 314.683 109.844 329.676 205.351C344.669 300.858 251.202 318.361 194.224 263.357C137.245 208.354 70.7669 296.361 44.7592 334.796Z" fill="#FFBE54"/>
        <path class="shapes-botright__dark-main" d="M49.7572 338.796C23.7495 377.23 5.36617 422.993 24.1412 460.539C26.223 464.702 28.6668 468.516 31.4194 472.035L483.819 472.028L483.825 87.4794C481.04 86.0259 477.973 84.8019 474.594 83.8397C413.116 66.339 319.681 113.844 334.674 209.351C349.667 304.858 256.2 322.361 199.222 267.357C142.243 212.354 75.7649 300.361 49.7572 338.796Z" fill="#FCA311"/>
        <path class="shapes-botright__light-blue" d="M390.606 324.736C336.232 389.484 218.478 369.451 182.708 394.751C157.167 412.815 141.737 441.907 142.126 472.037L483.824 472.037L483.824 168.727C449.184 162.614 412.887 180.892 415.222 197.917C418.797 223.981 444.98 259.987 390.606 324.736Z" fill="#1F3C53"/>
        <path class="shapes-botright__dark-blue" d="M396.604 327.736C342.23 392.485 224.476 372.451 188.705 397.751C164.014 415.215 148.771 442.986 148.137 472.037L483.824 472.037L483.824 170.909C451.126 167.717 419.02 184.874 421.22 200.917C424.795 226.981 450.978 262.987 396.604 327.736Z" fill="#011627"/>
      </svg>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
    components: { Header },
    created() {
      document.title = 'Groupomania'
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Oswald:wght@300;400;500;600;700&family=Roboto:wght@100;300;400;500;700&display=swap');

html, body {
  font-size: 10px;
  background-color: #fff0e0;
}

#app { 
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $C-dark;
  background-color: $C-white;
  padding-left: 0 !important;
  padding-right: 0 !important;
  width: 100%;
  position: relative;
  font-size: 1.8rem;
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

//-------------------- SHAPES SVG ---------------------//
.shapes-topleft, .shapes-botright {
  position: absolute;
  z-index: $ZI-shapes;
  max-width: 40%;

  @include breakpoint(lt-md) {
    max-width: 50%;
  }

  svg {
    width: 100%;
    height: 100%;
  }
}

.shapes-topleft {
  left: 0;
  top: 0;
}

.shapes-botright {
  right: 0;
  bottom: 0;
}
</style>
