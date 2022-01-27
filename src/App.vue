<template>
  <div id="app">
    <div class="container">
      <div class="point-visualization">
        <line-canvas :dots="dots" />
        <add-dots-form :dots="dots" />
      </div>
    </div>
  </div>
</template>

<script>
import lineCanvas from "@/components/lineCanvas.vue";
import addDotsForm from "@/components/addDotsForm.vue";
import { getDots } from "@/api/dots";
import Dots from "@/utils/classes/Dots";
export default {
  name: "App",
  components: {
    lineCanvas,
    addDotsForm,
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
        .catch((err) => {
          this.dots = new Dots([]);
          return console.error(err);
        });
    },
  },
};
</script>

<style lang="scss">
#app {
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
.point-visualization {
  display: flex;
  justify-content: center;
  gap: 30px;
  align-items: center;
  height: 500px;
}
* {
  padding: 0;
  margin: 0;
  border: 0;
}

*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

:focus,
:active {
  outline: none;
}

a:focus,
a:active {
  outline: none;
}

nav,
footer,
header,
aside {
  display: block;
}

html,
body {
  height: 100%;
  width: 100%;
  font-size: 100%;
  line-height: 1;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

input,
button,
textarea {
  font-family: inherit;
}

input::-ms-clear {
  display: none;
}

button {
  cursor: pointer;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

a,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

ul li {
  list-style: none;
}

img {
  vertical-align: top;
  max-width: 100%;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: normal;
  overflow-x: hidden;
}
</style>
