import { useState, useRef, useEffect } from "react";
export default function App({
  type, // animation positioning, either inline or background
  duration = { current: 1800 }, //amount of frames one revolution takes
  speedMult = { current: 1 }, //multiplier for speed of revolutions
  lineAmount = { current: 7 }, //total amount of lines, must be positive
  minAngle = { current: 0 }, //start angle
  maxAngle = { current: 45 }, //end angle
}) {
  const [lineAngles, setLineAngles] = useState([]);
  const lines = useRef([]);
  useEffect(() => {
    //creates lines from scratch, resets animation
    function makeLines() {
      const diameter = maxAngle.current - minAngle.current;
      const radius = diameter / 2;

      const timeline = timelineMaker(radius);
      //creates an array of points for the lines to reference
      function timelineMaker(radius) {
        let timelineArray = [];
        for (let i = 0; i <= duration.current; i++) {
          const timePercentage = i / duration.current;
          let timeAngle = timePercentage * 2 * Math.PI;
          timelineArray.push([
            radius * Math.sin(timeAngle),
            radius * Math.cos(timeAngle),
          ]);
        }
        return timelineArray;
      }
      class Line {
        constructor(initialCoords, initialTimeline) {
          this.coords = initialCoords;
          this.timelinePosition = initialTimeline;
        }
        updateDirection() {
          this.timelinePosition += Math.round(speedMult.current);
          if (this.timelinePosition > duration.current) {
            this.timelinePosition -= duration.current;
          } else if (this.timelinePosition < 0) {
            this.timelinePosition += duration.current;
          }
          this.coords = timeline[this.timelinePosition];
        }
      }

      lines.current = [];
      for (let i = 0; i < lineAmount.current; i++) {
        const timePercentage = i / lineAmount.current;
        const arrayPosition = Math.round(timePercentage * duration.current);
        const timelinePosition = timeline[arrayPosition];
        let newLine = new Line(timelinePosition, arrayPosition);
        lines.current.push(newLine);
      }
    }

    makeLines();
    let lastMaxAngle = maxAngle.current;
    let lastMinAngle = minAngle.current;

    setInterval(() => {
      //resets lines if lineAmount changes
      if (
        lines.current.length !== lineAmount.current ||
        lastMaxAngle !== maxAngle.current ||
        lastMinAngle !== minAngle.current
      ) {
        lastMaxAngle = maxAngle.current;
        lastMinAngle = minAngle.current;
        makeLines();
      }
      lines.current.forEach((line) => {
        line.updateDirection();
      });
      setLineAngles(lines.current.map((line) => line.coords[0]));
    }, 16.666);
  }, []);

  function NewLine({ line }) {
    const backgroundColor =
      "RGBA(222,222,222," + (1 - line.coords[1] * 0.15) + ")";
    function Pointer({ angle }) {
      return (
        <div
          style={{
            width: "10px",
            backgroundColor: backgroundColor,
            height: "200%",
            transform:
              "rotate(" + (line.coords[0] + angle) + "deg) scale(0.15, 1)",
            position: "fixed",
            userSelect: "none",
          }}
        ></div>
      );
    }
    return (
      <div
        style={{
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
      (line.coords[1] / maxAngle.current) * 150 +
      "," +
      (2 + line.coords[1] / maxAngle.current) * 111 +
      "," +
      (line.coords[1] / maxAngle.current) * 140 +
      "," +
      (1 - line.coords[1] / (maxAngle.current * 0.1)) +
      ")";
    function Pointer({ angle }) {
      return (
        <div
          className="pointer"
          style={{
            position: "absolute",
            width: "10px",
            backgroundColor: backgroundColor,
            marginTop: "max(-20vw, -180px)",
            height: "min(85vw, 670px)",
            transform:
              "rotate(" + (line.coords[0] + angle) + "deg) scale(0.25, 1) ",
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
        <Pointer angle={90} />
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
