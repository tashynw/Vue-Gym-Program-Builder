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
::-webkit-scrollbar-track
{
  background-color: white;
}

::-webkit-scrollbar
{
  width: 10px;
  background-color: white;
}

::-webkit-scrollbar-thumb
{
  background-color: rgb(44, 130, 224);
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
