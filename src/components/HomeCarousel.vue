<template>
    <va-carousel :items="items" height="600px" style="max-width:1000px;" :indicators="false" :arrows="false" stateful autoscroll :autoscrollInterval="6000"/>
    <br>
    <h1>Go to the Home Page and find new gym exercises today!</h1>
    <br>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const items = ref(['https://i.ibb.co/Pg3Ly1C/carousel-image-1.jpg',
        'https://i.ibb.co/TrnGMws/carousel-image-2.jpg',
        'https://i.ibb.co/j9Xn1C4/carousel-image-3.jpg'])
</script>
