<template>
  <div id="app">
    <div class="container">
      <line-canvas v-if="true" :dots="dots" />
    </div>
  </div>
</template>

<script>
import lineCanvas from "@/components/lineCanvas.vue";

import { getDots } from "./api/dots";
import Dots from "./utils/parseDots";
export default {
  name: "App",
  components: {
    lineCanvas,
  },
  data() {
    return {
      dots: {},
    };
  },
  created() {
    this.getDotsFromApi();
  },
  methods: {
    getDotsFromApi() {
      getDots()
        .then((res) => {
          return res.json();
        })
        .then((data) => (this.dots = new Dots(data?.dots)))
        .catch((err) => console.error(new Error(err)));
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
  height: 100%;
}
html,
body {
  margin: 0;
  height: 100%;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
}
</style>
