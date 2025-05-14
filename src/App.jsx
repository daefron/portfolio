import { useEffect, useState, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import Background from "./background/LineGroup";
import jumpVideo from "./videos/jumpVid.mp4";
import windVideo from "./videos/windVid.mp4";
import runVideo from "./videos/runVid.mp4";
import spreadsheetVideo from "./videos/spreadsheetVid.mp4";
import weatherImage from "./images/weatherImage.png";
import thingConnectorImage from "./images/thingConnectorImage.png";
import blank from "./images/blank.png";
export default function App() {
  const backgroundSpeed = useRef(1);
  const lastScroll = useRef(0);
  useEffect(() => {
    const scrollEvent = addEventListener("scroll", (e) => scroll(e));
    function scroll() {
      removeEventListener("scroll", scrollEvent);
      const originalPosition = window.scrollY;
      const distance = originalPosition - lastScroll.current;

      //stops fast scrolling on load
      if (lastScroll.current === 0) {
        lastScroll.current = originalPosition;
        return;
      }

      //slows animation down slowly after not scrolling
      function friction() {
        const interval = setInterval(() => {
          if (lastScroll.current === originalPosition) {
            if (backgroundSpeed.current > 1 || backgroundSpeed.current < -1) {
              backgroundSpeed.current *= 0.99;
            } else {
              clearInterval(interval);
            }
          }
        }, 10);
      }
      friction();

      //limits on max scrolling speeds
      if (backgroundSpeed.current < 2 && backgroundSpeed.current > -2) {
        backgroundSpeed.current -= distance / 100;
      } else {
        backgroundSpeed.current *= 0.99;
      }
      lastScroll.current = originalPosition;
    }
  }, []);
  function Header() {
    return (
      <div className="contentHolder">
        <p className="title" style={{ paddingBottom: 11 }}>
          Thomas Evans
        </p>
        <p>
          I am a self-taught full-stack developer that took a non-linear path
          into programming.
        </p>
        <p>
          Before transitioning into development, I spent nearly a decade working
          in sales, never really finding passion in the work.
        </p>
        <p>
          I worked through&nbsp;
          <a target="_blank" href="https://www.theodinproject.com/">
            The Odin Project
          </a>
          , and am now making cool things.
        </p>
        <p className="subTitle">Skills:</p>
        <p>
          At this point, I feel highly confident in my understanding of
          front-end (<b>HTML</b>,<b> CSS</b>,<b> JavaScript</b>,<b> React</b>)
          and back-end (<b>Node.js</b>, <b>Express</b>,<b> SQL</b>) development,
          and am constantly learning more along the way.
        </p>
      </div>
    );
  }
  function Projects() {
    function WeatherProject() {
      return (
        <div className="project projectLine">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="subTitle">Better Weather</p>
            <p className="subTitle" style={{ color: "rgba(255,255,255,0.5)" }}>
              Local forecast explorer
            </p>
          </div>
          <p>
            A weather app that makes it easy to find if there's better weather.
          </p>
          <img src={weatherImage} className="contentMedia"></img>
          <p>
            It was cold, wet, and the suburb I had planned a day-trip to was
            also miserable. I figured somewhere nearby had to be nicer, but
            checking each place manually was a chore.
          </p>
          <p>
            So I built a tool that does the busywork for you, visually
            displaying a weather data by the hour across nearby locations.
          </p>
          <p className="subTitle">Built with:</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <a target="_blank" href="https://www.typescriptlang.org/">
              TypeScript
            </a>
            <a target="_blank" href="https://react.dev/">
              React
            </a>
            <a target="_blank" href="https://expressjs.com/">
              Express
            </a>
            <a target="_blank" href="https://open-meteo.com/">
              Open-Meteo API
            </a>
            <a target="_blank" href="https://developers.google.com/maps">
              Google Maps API
            </a>
          </div>
          <p className="subTitle">Links:</p>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <a target="_blank" href="https://weather.thomasevans.org/">
              Live Site
            </a>
            <a target="_blank" href="https://github.com/daefron/better-weather">
              Project GitHub
            </a>
          </div>
        </div>
      );
    }
    function JumpProject() {
      return (
        <div className="project projectLine">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="subTitle">Jump Button</p>
            <p className="subTitle" style={{ color: "rgba(255,255,255,0.5)" }}>
              BeamNG.drive mod
            </p>
          </div>
          <video className="contentMedia" poster={blank} autoPlay muted loop>
            <source src={jumpVideo} type="video/mp4"></source>
          </video>
          <p>
            A mod for the car simulator BeamNG.drive that allows vehicles to
            jump, because why not?.
          </p>
          <p>
            This started out as a bit of a joke, as I wanted to see how
            realistic cars would handle an arcadey/cartoonish jump. As it turns
            out, not very well.
          </p>
          <p>
            This mod seamlessly integrates into the current game, and can be
            customised with a UI app made in AngularJS.
          </p>
          <p className="subTitle">Built with:</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <a target="_blank" href="https://angularjs.org/">
              AngularJS
            </a>
            <a target="_blank" href="https://www.lua.org/">
              Lua
            </a>
          </div>
          <p className="subTitle">Links:</p>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <a
              target="_blank"
              href="https://www.beamng.com/resources/jump-button.33905/"
            >
              Mod Page
            </a>
            <a target="_blank" href="https://github.com/daefron/jump-button/">
              Project GitHub
            </a>
          </div>
        </div>
      );
    }
    function WindProject() {
      return (
        <div className="project projectLine">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="subTitle">Winds of Change</p>
            <p className="subTitle" style={{ color: "rgba(255,255,255,0.5)" }}>
              BeamNG.drive mod
            </p>
          </div>
          <video className="contentMedia" poster={blank} autoPlay muted loop>
            <source src={windVideo} type="video/mp4"></source>
          </video>
          <p>A dynamic wind app for the car simulator BeamNG.drive.</p>
          <p>
            I felt that BeamNG had a big gap in its driving simulation in that
            there was only static wind, so I added winds that change naturally
            over time to the engine.
          </p>
          <p>
            This gives you a reasonlably realistic depiction of wind, and can be
            customised with user inputs.
          </p>
          <p className="subTitle">Built with:</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <a target="_blank" href="https://angularjs.org/">
              AngularJS
            </a>
            <a target="_blank" href="https://www.lua.org/">
              Lua
            </a>
          </div>
          <p className="subTitle">Links:</p>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <a
              target="_blank"
              href="https://www.beamng.com/resources/winds-of-change.33596/"
            >
              Mod Page
            </a>
            <a
              target="_blank"
              href="https://github.com/daefron/winds-of-change"
            >
              Project GitHub
            </a>
          </div>
        </div>
      );
    }
    function RunProject() {
      return (
        <div className="project projectLine">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="subTitle">Run Tracker</p>
            <p className="subTitle" style={{ color: "rgba(255,255,255,0.5)" }}>
              Personal fitness dashboard
            </p>
          </div>
          <video className="contentMedia" poster={blank} autoPlay muted loop>
            <source src={runVideo} type="video/mp4"></source>
          </video>
          <p>So my girlfriend got me a Fitbit for my birthday...</p>
          <p>
            This is a dashboard and API that use data collected from the Fitbit
            API to better visualise my progress in running.
          </p>
          <p>
            Needless to say, I wasn't very impressed with Fitbit's official
            exercise displays.
          </p>
          <p className="subTitle">Built with:</p>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <a target="_blank" href="https://react.dev/">
              React
            </a>
            <a target="_blank" href="https://expressjs.com/">
              Express
            </a>
            <a target="_blank" href="https://recharts.org/">
              PostgreSQL
            </a>
          </div>
          <p className="subTitle">Links:</p>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <a target="_blank" href="https://run.thomasevans.org">
              Live site
            </a>
            <a target="_blank" href="https://github.com/daefron/run-tracker">
              Project GitHub
            </a>
          </div>
        </div>
      );
    }
    function ThingProject() {
      return (
        <div className="project projectLine">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="subTitle">Thing Connector</p>
            <p className="subTitle" style={{ color: "rgba(255,255,255,0.5)" }}>
              Word association app
            </p>
          </div>
          <img src={thingConnectorImage} className="contentMedia"></img>
          <p>
            I like writing jokes, and I wanted to see the way an AI model thinks
            when making connections between things.
          </p>
          <p>
            This tool compares words, finds connections between them, and ranks
            their relationships using the Gemini 1.5 Flash API.
          </p>
          <p>
            About the only use case for this is as a tool for creative writing,
            and while most of the connections it makes are mundane, it can
            output some <i>interesting</i> insights.
          </p>
          <p className="subTitle">Built with:</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <a target="_blank" href="https://react.dev/">
              React
            </a>
            <a target="_blank" href="https://expressjs.com/">
              Express
            </a>
            <a
              target="_blank"
              href="https://ai.google.dev/gemini-api/docs/models/gemini#gemini-1.5-flash"
            >
              Gemini 1.5 Flash
            </a>
          </div>
          <p className="subTitle">Links:</p>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <a target="_blank" href="https://thing.thomasevans.org">
              Live site
            </a>
            <a
              target="_blank"
              href="https://github.com/daefron/thing-connector"
            >
              Project GitHub
            </a>
          </div>
        </div>
      );
    }
    function SpreadsheetProject() {
      return (
        <div className="project projectLine">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="subTitle">Spreadsheet Creep</p>
            <p className="subTitle" style={{ color: "rgba(255,255,255,0.5)" }}>
              Game engine
            </p>
          </div>
          <video className="contentMedia" poster={blank} autoPlay muted loop>
            <source src={spreadsheetVideo} type="video/mp4"></source>
          </video>
          <p>A tower defense game set in a spreadsheet.</p>
          <p>
            Made to look and feel as if played in a spreadsheet, it allows for
            automatic battles between entities, in dynamic, randomly generated
            levels.
          </p>
          <p>
            While it's more of an engine than a fully playable game at this
            stage, it is functional and a ridiculous thing to have built in
            React.
          </p>
          <p className="subTitle">Built with:</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <a target="_blank" href="https://react.dev/">
              React
            </a>
          </div>
          <p className="subTitle">Links:</p>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <a target="_blank" href="https://spreadsheet.thomasevans.org/">
              Live site
            </a>
            <a
              target="_blank"
              href="https://github.com/daefron/spreadsheet-creep"
            >
              Project GitHub
            </a>
          </div>
        </div>
      );
    }
    function AnimationProject() {
      const lineAmount = useRef(15);
      const [lineAmountState, setLineAmountState] = useState(
        lineAmount.current
      );
      const speed = useRef(1);
      const [speedState, setSpeedState] = useState(speed.current);
      const minAngle = useRef(0);
      const [minAngleState, setMinAngleState] = useState(minAngle.current);
      const maxAngle = useRef(45);
      const [maxAngleState, setMaxAngleState] = useState(maxAngle.current);
      return (
        <div className="project">
          <p className="subTitle">
            That line animation you can see in the background
          </p>
          <Background
            className="contentMedia"
            type={"inline"}
            lineAmount={lineAmount}
            speedMult={speed}
            minAngle={minAngle}
            maxAngle={maxAngle}
          />
          <div className="animationControls">
            <div className="animationControl">
              <label htmlFor="range">Line count: {lineAmountState}</label>
              <input
                type="range"
                name="lineAmount"
                min={0}
                max={100}
                defaultValue={lineAmount.current}
                onChange={(e) => {
                  lineAmount.current = Number(e.target.value);
                  setLineAmountState(lineAmount.current);
                }}
              ></input>
            </div>
            <div className="animationControl">
              <label htmlFor="range">Speed: {speedState}</label>
              <input
                type="range"
                name="speed"
                min={-10}
                max={10}
                defaultValue={speed.current}
                onChange={(e) => {
                  speed.current = Number(e.target.value);
                  setSpeedState(speed.current);
                }}
              ></input>
            </div>
            <div className="animationControl">
              <label htmlFor="minAngle">Start angle: {minAngleState}</label>
              <input
                type="range"
                name="minAngle"
                min={0}
                max={maxAngleState}
                defaultValue={minAngle.current}
                onChange={(e) => {
                  minAngle.current = Number(e.target.value);
                  setMinAngleState(minAngle.current);
                }}
              ></input>
            </div>
            <div className="animationControl">
              <label htmlFor="maxAngle">End angle: {maxAngleState}</label>
              <input
                type="range"
                name="maxAngle"
                min={minAngleState}
                max={60}
                defaultValue={maxAngle.current}
                onChange={(e) => {
                  maxAngle.current = Number(e.target.value);
                  setMaxAngleState(maxAngle.current);
                }}
              ></input>
            </div>
          </div>
          <p>
            <b>
              (animation controls can lead to broken results, they are purely
              for demonstration purposes)
            </b>
          </p>
          <p>This is a weird one.</p>
          <p>
            What initially started out as an algorithm for my wind generation
            mod in the videogame BeamNG turned into a very tweakable, dynamic
            "3D" animation using purely JavaScript and CSS in React.
          </p>
          <p className="subTitle">Built with:</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <a target="_blank" href="https://react.dev/">
              React
            </a>
          </div>
        </div>
      );
    }
    return (
      <div className="contentHolder">
        <p
          className="title"
          style={{
            paddingBottom: 15,
            borderBottom: "dashed 2px rgb(90,90,90)",
          }}
        >
          Projects
        </p>
        <WeatherProject />
        <JumpProject />
        <WindProject />
        <RunProject />
        <ThingProject />
        <SpreadsheetProject />
        <AnimationProject />
      </div>
    );
  }
  function Footer() {
    return (
      <div className="contentHolder footer">
        <p className="title">Contact</p>
        <div key="contact-1" style={{ display: "flex" }}>
          <p className="subTitle">Email: &nbsp;</p>
          <p className="subTitle">thomas_evans@outlook.com</p>
        </div>
        <div key="contact-2" style={{ display: "flex" }}>
          <p className="subTitle">GitHub: &nbsp;</p>
          <a
            className="subTitle"
            target="_blank"
            href="https://github.com/daefron"
          >
            daefron
          </a>
        </div>
      </div>
    );
  }
  return (
    <>
      <Analytics />
      <Background type="background" speedMult={backgroundSpeed} />
      <div className="mainDiv">
        <Header />
        <Projects />
        <Footer />
      </div>
    </>
  );
}
