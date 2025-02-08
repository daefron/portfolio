import { useEffect, useRef } from "react";
import Background from "./background/LineGroup";
import runVideo from "./videos/runVid.mp4";
import thingConnectorImage from "./images/thingConnectorImage.png";
import spreadsheetVideo from "./videos/spreadsheetVid.mp4";
import blank from "./images/blank.png";
export default function App() {
  const backgroundSpeed = useRef(1);
  const lastScroll = useRef(0);
  useEffect(() => {
    const scrollEvent = addEventListener("scroll", (e) => scroll(e));
    function scroll(event) {
      removeEventListener("scroll", scrollEvent);
      const originalPosition = window.scrollY;
      const distance = originalPosition - lastScroll.current;
      function friction() {
        setTimeout(() => {
          if (lastScroll.current === originalPosition) {
            if (
              backgroundSpeed.current > 1.5 ||
              backgroundSpeed.current < -1.5
            ) {
              backgroundSpeed.current *= 0.8;
              friction();
            }
          }
        }, 500);
      }
      friction();
      lastScroll.current = originalPosition;
      if (backgroundSpeed.current < 5 && backgroundSpeed.current > -5) {
        backgroundSpeed.current += distance / 100;
      } else {
        backgroundSpeed.current *= 0.8;
      }
    }
  }, []);
  function Header() {
    return (
      <div className="contentHolder">
        <p className="title">Thomas Evans</p>
        <p>
          I am a self-taught full-stack developer with a non-linear path into
          programming.
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
          and back-end (<b>Node.js</b>, <b>Express</b>,<b> SQL</b>) development.
        </p>
      </div>
    );
  }
  function Projects() {
    function Project1() {
      return (
        <div className="project projectLine">
          <p className="subTitle">Run Tracker</p>
          <video className="contentMedia" poster={blank} autoPlay muted loop>
            <source src={runVideo} type="video/mp4"></source>
          </video>
          <p>
            A dashboard and API that use data collected from the Fitbit API to
            better visualise my progress in running.
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
            <a target="_blank" href="https://runtracker.netlify.app">
              Live site
            </a>
            <a target="_blank" href="https://github.com/daefron/run-tracker">
              Project GitHub
            </a>
          </div>
        </div>
      );
    }
    function Project2() {
      return (
        <div className="project projectLine">
          <p className="subTitle">Thing Connector</p>
          <img src={thingConnectorImage} className="contentMedia"></img>
          <p>
            This tool compares words, finds connections between them, and ranks
            their relationships using the Gemini 1.5 Flash API.
          </p>
          <p>
            I like writing jokes, and I wanted to see the way an AI model thinks
            when making connections between things.
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
            <a target="_blank" href="https://thingconnector.netlify.app">
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
    function Project3() {
      return (
        <div className="project projectLine">
          <p className="subTitle">Spreadsheet Creep</p>
          <video className="contentMedia" poster={blank} autoPlay muted loop>
            <source src={spreadsheetVideo} type="video/mp4"></source>
          </video>
          <p>A tower defense game set in a spreadsheet.</p>
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
            <a target="_blank" href="https://spreadsheetcreep.netlify.app">
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
    function Project4() {
      return (
        <div className="project">
          <p className="subTitle">
            And that animation you can see in the background
          </p>
          <Background
            className="contentMedia"
            speedMult={backgroundSpeed}
            position={"project"}
          />
          <p>This is a weird one.</p>
          <p>
            This initially started out as an algorithm for a wind generator mod
            in the videogame Beam.NG In messing around with visualising it, I
            went down a rabbit-hole and eventually ended up with a very
            tweakable, dynamic "3D" animation using pure Javascript and CSS.
          </p>
        </div>
      );
    }
    return (
      <div className="contentHolder">
        <p className="title">Projects</p>
        <Project1 />
        <Project2 />
        <Project3 />
        <Project4 />
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
      <Background speedMult={backgroundSpeed} />
      <div className="mainDiv">
        <Header />
        <Projects />
        <Footer />
      </div>
    </>
  );
}
