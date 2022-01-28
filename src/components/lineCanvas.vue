<script>
export default {
  props: {
    dots: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      canvas: null,
      state: "ok",
    };
  },
  methods: {
    drawCanvas() {
      if (!this.canvas) this.setupCanvas();
      this.clearCanvas();
      this.drawLines();
      for (let [index, dot] of this.canvasDotsValues.entries()) {
        this.drawPoints(dot);
        this.drawText(dot, index);
      }
    },
    drawPoints(dot) {
      const circle = new Path2D();
      const x = dot.x;
      const y = dot.y;
      circle.arc(x, y, this.canvasProp.circleRadius, 0, 2 * Math.PI);
      this.canvas.fill(circle);
    },
    drawText(dot, index) {
      const needToChangeAlign =
        dot.x > (this.canvasProp.size * this.canvasProp.scale) / 2;
      const y =
        dot.y === this.canvasProp.circleRadius
          ? this.canvasProp.circleRadius + this.canvasProp.fontSize
          : dot.y - this.canvasProp.circleRadius * 3;
      if (needToChangeAlign) this.canvas.textAlign = "end";
      this.canvas.fillText(
        `${index + 1}(${this.dots.inputValue[index].x};${this.dots.inputValue[index].y})`,
        dot.x,
        y
      );
      if (needToChangeAlign) this.canvas.textAlign = "start";
    },
    drawLines() {
      for (let lineCord of this.canvasLinesCords) {
        this.canvas.beginPath();
        this.canvas.moveTo(lineCord[0].x, lineCord[0].y);
        this.canvas.lineTo(lineCord[1].x, lineCord[1].y);
        this.canvas.stroke();
      }
    },
    setupCanvas() {
      const canvas = this.$refs.lineCanvas;
      const { size } = this.canvasProp;
      canvas.style.width = size + "px";
      canvas.style.height = size + "px";
      const { scale } = this.canvasProp;
      canvas.width = Math.floor(size * scale);
      canvas.height = Math.floor(size * scale);
      this.canvas = canvas.getContext("2d");
      this.canvas.height = Math.floor(size * scale);
      this.canvas.width = Math.floor(size * scale);
      this.canvas.font = `${this.canvasProp.fontSize}px Avenir, Helvetica, Arial, sans-serif`;
      this.canvas.strokeStyle = "green";
      this.canvas.lineWidth = this.canvasProp.circleRadius;
    },
    clearCanvas() {
      const { size, scale } = this.canvasProp;
      if (!this.canvas) this.setupCanvas();
      this.canvas.clearRect(
        0,
        0,
        Math.floor(size * scale),
        Math.floor(size * scale)
      );
    },
  },
  computed: {
    canvasDotsValues: {
      cache: false,
      get() {
        return this.dots.canvasDotsValues;
      },
    },
    canvasLinesCords: {
      cache: false,
      get() {
        return this.dots.canvasLinesCords;
      },
    },
    dotsState: {
      cache: false,
      get() {
        return this.dots?.state;
      },
    },
    canvasProp() {
      return this.dots.canvasProp;
    },
  },
  watch: {
    dotsState(state) {
      if (state === "needToDraw") {
        this.drawCanvas();
        this.dots.setState("ok");
        this.state = "ok";
      } else if (state === "notResolved") {
        this.clearCanvas();
        this.state = "error";
      }
    },
  },
};
</script>

<template>
  <div class="canvas-wrapper">
    <div v-if="state === 'error'">Error, cant find way</div>
    <canvas id="line-canvas" ref="lineCanvas" />
  </div>
</template>

<style lang="scss">
#line-canvas {
  border: 1px solid #cecece;
  width: 500px;
  height: 500px;
}
.canvas-wrapper {
  position: relative;
}
</style>
