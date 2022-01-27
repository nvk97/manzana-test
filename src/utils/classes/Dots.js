// eslint-disable-next-line no-unused-vars
import { cloneDeep, isEqual } from "lodash";
export default class Dots {
  constructor(dots) {
    this.canvasProp = {
      size: 500,
      scale: 3,
      fontSize: 48,
      circleRadius: 7,
    };
    this.setNewValue(
      dots.map((dot) => ({
        x: parseInt(dot.split(";")[0]),
        y: parseInt(dot.split(";")[1]),
      }))
    );
  }
  getDotsValuesByCanvasSize() {
    const values = {
      x: this.inputValue.map((val) => val.x),
      y: this.inputValue.map((val) => val.y),
    };
    const canvasSize = this.canvasProp.size * this.canvasProp.scale;
    const lengthX = Math.max(...values.x) - Math.min(...values.x);
    const lengthY = Math.max(...values.y) - Math.min(...values.y);
    const canvasRatio = (
      canvasSize / (lengthX > lengthY ? lengthX : lengthY)
    ).toFixed(2);
    this.canvasDotsValues = this.inputValue.map((dot) => {
      let x = (dot.x - Math.min(...values.x)) * canvasRatio;
      let y = (dot.y - Math.min(...values.y)) * canvasRatio;
      x =
        x === 0
          ? this.canvasProp.circleRadius
          : x - this.canvasProp.circleRadius;
      y =
        y === 0
          ? this.canvasProp.circleRadius
          : y - this.canvasProp.circleRadius;
      return { x, y };
    });
    this.getLinesByCanvasSize();
  }
  getLinesByCanvasSize() {
    this.canvasLinesCords = this.buildLines(this.canvasDotsValues);
    this.setState("needToDraw");
  }
  buildLines(values) {
    return values
      .map((dot, idx, Dots) => {
        if (idx < Dots.length - 1) {
          return [Dots[idx], Dots[idx + 1]];
        }
      })
      .filter((val) => val);
  }
  checkLinesIntersect(lines) {
    const [line1, line2] = lines;
    // for (let dot of line1) {
    //   if (!isEqual(line1[1], line2[0]) && !isEqual(line1[0], line2[1]))
    //     if (
    //       (dot.x - line2[0].x) / (line2[1].x - line2[0].x) ==
    //       (dot.y - line2[0].y) / (line2[1].y - line2[0].y)
    //     )
    //       return true;
    // }
    // for (let dot of line2) {
    //   if (!isEqual(line1[1], line2[0]) && !isEqual(line1[0], line2[1]))
    //     if (
    //       (dot.x - line1[0].x) / (line1[1].x - line1[0].x) ==
    //       (dot.y - line1[0].y) / (line1[1].y - line1[0].y)
    //     )
    //       return true;
    // }

    function vectorMulti(ax, ay, bx, by) {
      return ax * by - bx * ay;
    }
    function realLess(a) {
      return 0 - a > 0.001;
    }
    const v1 = vectorMulti(
      line2[1].x - line2[0].x,
      line2[1].y - line2[0].y,
      line1[0].x - line2[0].x,
      line1[0].y - line2[0].y
    );
    const v2 = vectorMulti(
      line2[1].x - line2[0].x,
      line2[1].y - line2[0].y,
      line1[1].x - line2[0].x,
      line1[1].y - line2[0].y
    );
    const v3 = vectorMulti(
      line1[1].x - line1[0].x,
      line1[1].y - line1[0].y,
      line2[0].x - line1[0].x,
      line2[0].y - line1[0].y
    );
    const v4 = vectorMulti(
      line1[1].x - line1[0].x,
      line1[1].y - line1[0].y,
      line2[1].x - line1[0].x,
      line2[1].y - line1[0].y
    );
    return realLess(v1 * v2) && realLess(v3 * v4);
  }
  tryToCalculateOptimalPath() {
    this.setState("calculating");
    const getSuccesWay = (values, dots) => {
      const _values = cloneDeep(values);
      if (values.length > 0) {
        for (let idx in values) {
          const currentDot = cloneDeep(values[idx]);
          const otherDots = _values.filter((val, index) => idx != index);
          const _dots = dots.concat([currentDot]);
          const res = getSuccesWay(otherDots, _dots);
          if (res) return res;
        }
      } else {
        const lines = this.buildLines(dots);
        for (let i = 0; i < lines.length - 1; i++) {
          for (let j = i + 1; j < lines.length; j++) {
            if (this.checkLinesIntersect([lines[i], lines[j]])) {
              return false;
            }
          }
        }
        return dots;
      }
      return false;
    };
    const res = getSuccesWay(this.inputValue, []);
    if (res) {
      this.inputValue = cloneDeep(res);
      this.setState("needToRecalcualteForCanvas");
    } else {
      this.setState("notResolved");
    }
  }
  setState(state) {
    this._state = state;
    switch (state) {
      case "needToRecalcualteForCanvas":
        this.getDotsValuesByCanvasSize();
        break;
      case "newValues":
        this.tryToCalculateOptimalPath();
        break;
    }
  }
  setNewValue(value) {
    this.inputValue = value;
    this.setState("newValues");
  }
}