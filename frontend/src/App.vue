<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/addOffer">Add Offer</router-link>
  </nav>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Quicksand:wght@600&family=Roboto:wght@100;300&display=swap");

#app {
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #343433;
}

body {
  background-color: rgb(86, 137, 255);
}

input {
  font-family: inherit;
}
</style>
<style scpoed>
nav {
  text-align: center;
}
</style>
