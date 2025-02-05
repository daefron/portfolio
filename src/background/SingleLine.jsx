import { useState, useRef, useEffect } from "react";
export default function SingleLine({ startAngle, startSpeed, speedMult }) {
  class Line {
    constructor() {
      this.angle = startAngle;
      this.change = startSpeed;
    }

    changeDirection() {
      const mult = speedMult.current;
      if (mult) {
        if (this.angle > 40 && this.angle < 40.1) {
        }
        let neutralMult = mult;
        if (neutralMult < 0) {
          neutralMult *= -1;
        }
        let newChange = this.change;
        let newAngle = this.angle + newChange;
        if (newChange > 0.08 * neutralMult) {
          newChange = 0.08 * neutralMult;
        }
        if (newChange < -0.08 * neutralMult) {
          newChange = -0.08 * neutralMult;
        }
        if (newAngle < 0) {
          newChange -= -0.0009 * mult;
        }
        if (newAngle > 40) {
          newChange -= 0.0009 * mult;
        }
        newAngle = this.angle + newChange * mult;
        this.change = newChange;
        this.angle = newAngle;
        setLineAngle(newAngle);
      }
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
  const backgroundColor = "RGBA(220,220,220," + (1 - changeRatio / 0.11) + ")";
  function Pointer({ angle }) {
    return (
      <div
        className="pointer"
        style={{
          width: "1px",
          backgroundColor: backgroundColor,
          height: 3000,
          transform: "rotate(" + (lineAngle+ angle) + "deg)",
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
      <Pointer angle={184} />
    </div>
  );
}
