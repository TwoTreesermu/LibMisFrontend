<template>
  <div>
    <Header/>
    <div style="display: flex">
      <Aside/>
      <router-view style="flex: 1"/>
    </div>
  </div>

</template>

<script setup>
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";

const componentName = "Manager"
</script>

<style scoped>

</style>