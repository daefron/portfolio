import { useState, useRef, useEffect } from "react";
export default function Arrow({ startAngle, startSpeed, intervalTime }) {
  class Line {
    constructor() {
      this.angle = startAngle;
      this.change = startSpeed;
      this.gap = 0.00004635446490955549;
      if (startSpeed < 0) {
        this.gap *= -1;
      }
    }

    changeDirection() {
      let gapDiff;
      if (this.gap < 0) {
        gapDiff = 1 / 10000;
      } else {
        gapDiff = -1 / 10000;
      }
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
        newChange -= -0.001;
        if (newGap < 0) {
          newGap -= newGap * 0.05;
        }
      }
      if (newAngle > 40) {
        newChange -= 0.001;
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
      }, intervalTime);
    }
  }
  const line = useRef(new Line());
  const [lineAngle, setLineAngle] = useState(line.current.angle);

  useEffect(() => {
    line.current.intervals();
  }, []);

  let changeRatio = line.current.change;
  const backgroundColor = "RGBA(255,255,255," + (changeRatio / 0.1 + 0.5) + ")";
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
