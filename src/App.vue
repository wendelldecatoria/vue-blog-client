<template>
  <BlogComponent/>
</template>

<script>
import BlogComponent from './components/Blog.vue'

export default {
  name: 'App',
  components: {
    BlogComponent
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
  background-color: #F7F7F7;
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
}
</style>
