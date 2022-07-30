<template>
  <div id="app">
    <HomeNavbar/>
    <router-view/>
    <HomeFooter />
  </div>
</template>

<style>
body{
  margin: 0;
}
.app{
  min-height: 700px;
}
</style>
<script setup lang="ts">
import HomeNavbar from './components/HomeNavbar.vue'
import HomeFooter from './components/HomeFooter.vue'
import { onMounted } from 'vue'
onMounted(() => {
  if (!localStorage.getItem('program')) localStorage.setItem('program', JSON.stringify([]))
})
</script>
