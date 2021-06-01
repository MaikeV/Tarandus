<template class="all">
  <Layout class="all">
    <router-view/>
  </Layout>
</template>

<script>
  import Layout from "./components/Layout";
  export default {
    components: {Layout}
  }
</script>

<style>
    .all {
        min-height: 90vh;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>