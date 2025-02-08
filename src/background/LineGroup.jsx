import { useState, useRef, useEffect } from "react";
export default function App({
  type, // animation positioning, either inline or background
  speedMult = { current: 1 }, //display speed multiplier
  lineAmount = { current: 7 }, //total amount of lines, must be positive
  minAngle = { current: 0 }, //start angle
  maxAngle = { current: 45 }, //end angle
  baseSpeed = { current: 0.1 }, //baseline speed, usually not changed
}) {
  const [lineAngles, setLineAngles] = useState([]);
  const lines = useRef([]);
  useEffect(() => {
    //creates lines from scratch, resets animation
    function makeLines() {
      //value that affects how far lines go past angle limits
      const margin = 205;
      
      //distance between lines
      const lineSpacing =
        ((maxAngle.current - minAngle.current) * 2 +
          80 * (baseSpeed.current * 10)) /
        lineAmount.current;
      class Line {
        constructor(angle, baseSpeed) {
          this.angle = angle;
          this.speed = baseSpeed;
        }
        updateDirection() {
          const mult = speedMult.current;
          const speed = baseSpeed.current;
          let neutralMult = mult;
          if (mult < 0) {
            neutralMult *= -1;
          }
          if (
            this.angle <= minAngle.current + margin * speed &&
            this.speed + (speed / 400) * mult < speed * neutralMult
          ) {
            this.speed += (speed / 400) * mult;
          } else if (
            this.angle >= maxAngle.current - margin * speed &&
            this.speed - (speed / 400) * mult > -speed * neutralMult
          ) {
            this.speed -= (speed / 400) * mult;
          }
          this.angle += this.speed * mult;
        }
      }
      //prevents creation at invalid speeds
      const lastSpeed = speedMult.current;
      speedMult.current = 1;

      lines.current = [];
      for (let i = 0; i < lineAmount.current; i++) {
        let newLine = new Line(-lineSpacing * i, -baseSpeed.current);
        lines.current.push(newLine);
      }

      //gives enough time for lines to settle into place
      for (let i = 0; i < 5000; i++) {
        lines.current.forEach((line) => line.updateDirection());
      }

      speedMult.current = lastSpeed;
    }

    makeLines();

    setInterval(() => {
      //resets lines if lineAmount changes
      if (lines.current.length !== lineAmount.current) {
        makeLines();
      }
      
      lines.current.forEach((line) => {
        line.updateDirection();
      });
      setLineAngles(lines.current.map((line) => line.angle));
    }, 20);
  }, []);

  function NewLine({ line }) {
    const backgroundColor =
      "RGBA(222,222,222," + (1 - line.speed / (baseSpeed.current * 0.33)) + ")";
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
            userSelect: "none",
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
          display: "flex",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        <Pointer angle={180} />
      </div>
    );
  }
  function ProjectLine({ line }) {
    const backgroundColor =
      "RGBA(" +
      (line.angle / maxAngle.current) * 150 +
      "," +
      (2 + line.angle / maxAngle.current) * 111 +
      "," +
      (line.angle / maxAngle.current) * 140 +
      "," +
      (1 - line.speed / (baseSpeed.current * 0.33)) +
      ")";
    function Pointer({ angle }) {
      return (
        <div
          className="pointer"
          style={{
            position: "absolute",
            width: "2px",
            backgroundColor: backgroundColor,
            marginTop: "max(-20vw, -180px)",
            height: "min(85vw, 670px)",
            transform: "rotate(" + (line.angle + angle) + "deg)",
            userSelect: "none",
          }}
        ></div>
      );
    }
    return (
      <div
        className="pointerHolder"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          userSelect: "none",
        }}
      >
        <Pointer angle={68 - minAngle.current} />
      </div>
    );
  }
  if (type === "inline") {
    return (
      <div className="backgroundHolder" style={{ height: "min(45vw, 320px)" }}>
        {lines.current.map((line, i) => {
          return <ProjectLine key={i + "newLine"} line={line} />;
        })}
      </div>
    );
  }
  if (type === "background") {
    return (
      <div
        className="backgroundHolder"
        style={{
          top: "70lvh",
          left: "20vw",
          zIndex: "-50",
          position: "fixed",
          userSelect: "none",
        }}
      >
        {lines.current.map((line, i) => {
          return <NewLine key={i + "newLine"} line={line} />;
        })}
      </div>
    );
  }
}
