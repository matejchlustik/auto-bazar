<template>
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from "./components/NavBar"

export default {
  components: {
    NavBar
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Quicksand:wght@600&family=Roboto:wght@100;300&display=swap");


#app {
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #343433;
  margin-top: 80px;
}

body {
  background-color: rgb(86, 137, 255);
  margin: 0;
}

input {
  font-family: inherit;
}

.error-message {
  text-align: center;
  padding: 15px;
}

@media only screen and (max-width: 600px) {

  #app {
    margin-top: 125px;
  }
}
</style>


