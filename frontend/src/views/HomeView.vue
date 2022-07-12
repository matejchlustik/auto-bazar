<template>
  <div class="home">
    <h1>Home</h1>
    <div class="search-bar">
      <form>
        <input type="text" v-model="searchTerm" @change="search" />
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity"

export default {
  name: "HomeView",
  setup() {
    const searchTerm = ref("")
    const timeout = ref(null)

    const search = () => {
      if (timeout.value) {
        clearTimeout(timeout.value)
      }
      timeout.value = setTimeout(() => {
        console.log(searchTerm.value) // TODO: add fetch method later
      }, 500);
    };

    return { searchTerm, search }
  },
}
</script>
<style scoped>
input[type="text"] {
  font-size: 20px;
}

.home {
  margin: 0 auto;
  width: 75%;
  text-align: center;
}
</style>