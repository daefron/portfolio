import { useState, useRef, useEffect } from "react";
export default function App({ speedMult }) {
  const speed = 0.1;
  const margin = 205;
  const amountOfLines = 7;
  const minAngle = 0;
  const maxAngle = 45;
  const lineSpacing =
    ((maxAngle - minAngle) * 2 + 80 * (speed * 10)) / amountOfLines;
  const lines = useRef([]);
  class Line {
    constructor(angle, speed) {
      this.angle = angle;
      this.speed = speed;
    }
    updateDirection() {
      const mult = speedMult.current;
      let neutralMult = mult;
      if (mult < 0) {
        neutralMult *= -1;
      }
      if (
        this.angle <= minAngle + margin * speed &&
        this.speed + (speed / 400) * mult < speed * neutralMult
      ) {
        this.speed += (speed / 400) * mult;
      } else if (
        this.angle >= maxAngle - margin * speed &&
        this.speed - (speed / 400) * mult > -speed * neutralMult
      ) {
        this.speed -= (speed / 400) * mult;
      } else {
        if (this.speed > 0) {
          this.speed = speed;
        } else {
          this.speed = -speed;
        }
      }
      this.angle += this.speed * mult;
    }
  }
  const [lineAngles, setLineAngles] = useState([]);
  useEffect(() => {
    lines.current = [];
    for (let i = 0; i < amountOfLines; i++) {
      let newLine = new Line(-lineSpacing * i, -speed);
      lines.current.push(newLine);
    }
    for (let i = 0; i < 5000; i++) {
      lines.current.forEach((line) => line.updateDirection());
    }
    setInterval(() => {
      lines.current.forEach((line) => {
        line.updateDirection();
      });
      setLineAngles(lines.current.map((line) => line.angle));
    }, 20);
  }, []);

  function NewLine({ line }) {
    const backgroundColor =
      "RGBA(222,222,222," + (1 - line.speed / (speed * 0.33)) + ")";
    function Pointer({ angle }) {
      return (
        <div
          className="pointer"
          style={{
            width: "1px",
            backgroundColor: backgroundColor,
            height: 5000,
            transform: "rotate(" + (line.angle + angle) + "deg)",
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
        <Pointer angle={180} />
      </div>
    );
  }
  return (
    <div
      className="backgroundHolder"
      style={{
        height: "100%",
        top: "19%",
        left: "20%",
        zIndex: "-50",
        position: "fixed",
      }}
    >
      {lines.current.map((line, i) => {
        return <NewLine key={i + "newLine"} line={line} />;
      })}
    </div>
  );
}
