<template>
  <va-navbar class="mb-2" color="primary">
    <template #left>
      <router-link style="text-decoration: none; color: inherit;" to="/">Gym Program Builder</router-link>
    </template>
    <template #right>
      <router-link style="text-decoration: none; color: inherit;" to="/"><va-navbar-item>Home</va-navbar-item></router-link>
      <router-link style="text-decoration: none; color: inherit;" to="/program"><va-navbar-item>My Program</va-navbar-item></router-link>
      <router-link style="text-decoration: none; color: inherit;" to="/about"><va-navbar-item>About</va-navbar-item></router-link>
    </template>
  </va-navbar>
</template>
<style>
  .va-navbar{
    justify-content: center;
  }
  .va-navbar__content{
    max-width: 70%;
  }
  .va-navbar__right{
    gap: 25px;
  }
</style>
