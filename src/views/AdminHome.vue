<template>
  <div>
    <Header/>
    <div style="display: flex">
      //  zhiyu
      <Aside/>
      <router-view style="flex: 1"/>
    </div>
  </div>
</template>

<style>

</style>
<script>
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
export default {
  name: "AdminHome",
  components: {
    Aside,
    Header
  }
}
</script>