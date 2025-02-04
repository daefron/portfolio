import { useState, useRef, useEffect } from "react";
export default function Arrow({ startAngle }) {
  class Line {
    constructor() {
      this.angle = 45 * Math.random();
      this.change = changeValue(0.1);
      this.gap = 0;

      function changeValue(max) {
        let value = max * Math.random();
        let decider = Math.random();
        if (decider > 0.5) {
          value *= -1;
        }
        return value;
      }
    }

    changeDirection() {
      let gapDiff = (Math.random() - 0.5) / 100000;
      let newGap = gapDiff + this.gap;
      let newChange = this.change + newGap;
      if (newChange > 0.1) {
        newChange = 0.1;
        newGap *= 0.9;
      }
      if (newChange < -0.1) {
        newChange = -0.1;
        newGap *= 0.9;
      }
      let newAngle = this.angle + newChange;
      if (newAngle < 0) {
        newChange -= -0.002;
        if (newGap < 0) {
          newGap -= newGap * 0.05;
        }
      }
      if (newAngle > 45) {
        newChange -= 0.002;
        if (newGap > 0) {
          newGap -= newGap * 0.05;
        }
      }
      newAngle = this.angle + newChange;
      this.gap = newGap;
      this.change = newChange;
      this.angle = newAngle;
      setLineAngle(newAngle);
    }
    intervals() {
      setInterval(() => {
        this.changeDirection();
      }, 30);
    }
  }
  const line = useRef(new Line());
  const [lineAngle, setLineAngle] = useState(line.current.angle);

  useEffect(() => {
    line.current.intervals();
  }, []);

  let changeRatio = line.current.change;
  const backgroundColor = "RGBA(255,255,255," + (1 - changeRatio / 0.13) + ")";
  function Pointer({ angle }) {
    return (
      <div
        className="pointer"
        style={{
          width: "1px",
          backgroundColor: backgroundColor,
          height: 8000,
          transform: "rotate(" + (line.current.angle + angle) + "deg)",
          position: "fixed",
        }}
      ></div>
    );
  }
  return (
    <div
      className="pointerHolder"
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Pointer angle={175} />
    </div>
  );
}
