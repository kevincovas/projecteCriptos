<template>
  <Earn />
</template>

<script>

import Etheruem from './components/Criptomonedas/Etheruem.vue'
import Bitcoin from './components/Criptomonedas/Bitcoin.vue'
import Earn from './components/Earn/earnBTC.vue'

export default {
  name: 'App',
  components: {
    Bitcoin,
    Etheruem,
    Earn
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
