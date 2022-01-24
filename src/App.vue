<template>
  <div id="app">{{ dots }}</div>
</template>

<script>
import { getDots } from "./api/dots";
export default {
  name: "App",
  data() {
    return {
      dots: "ПУСТА",
    };
  },
  created() {
    this.getDotsFromApi();
  },
  methods: {
    getDotsFromApi() {
      getDots()
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => (this.dots = data));
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
