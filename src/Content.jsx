import runVideo from "./videos/runVid.mp4";
import thingConnectorImage from "./images/thingConnectorImage.png";
import spreadsheetVideo from "./videos/spreadsheetVid.mp4";
import blank from "./images/blank.png";
export function content() {
  return [
    {
      scrollId: 0,
      type: "header",
      content: [
        <p key="about-1">
          I am a self-taught full-stack developer with a non-linear path into
          programming.
        </p>,
        <p key="about-2">
          Before transitioning into development, I spent nearly a decade working
          in sales, where I developed strong communication and problem-solving
          skills that have proven invaluable in my development work.
        </p>,
        <p key="about-3">
          Discovering &nbsp;
          <a target="_blank" href="https://www.theodinproject.com/">
            The Odin Project
          </a>
          &nbsp; provided the structure I needed to channel my curiosity and
          passion for problem-solving into building a solid foundation in web
          development..
        </p>,
        <p key="about-4" className="subTitle">
          Skills:
        </p>,
        <p key="about-5">
          At this point, I feel highly confident in my understanding of
          front-end web development, with solid expertise in HTML, CSS,
          JavaScript, and React. <br />
          While I am newer to back-end development, I've thoroughly enjoyed
          expanding my skills in this area. I am now comfortable working with
          Node.js, Express, and SQL, building scalable and efficient back-end
          systems.
        </p>,
        <p key="about-6" className="subTitle">
          This portfolio:
        </p>,
        <p key="about-7">
          This portfolio is a reflection of my self-driven projects, which best
          demonstrate my skills and passion for creating functional and
          innovative solutions.
          <br /> While the basic projects from The Odin Project were essential
          to my growth, I've chosen to showcase original work that highlights my
          creativity, problem-solving abilities, and readiness for the
          challenges of an industry role.
        </p>,
      ],
    },
    {
      scrollId: 1,
      type: "project1",
      content: [
        <video
          key="project1-1"
          className="contentMedia"
          poster={blank}
          autoPlay
          muted
          loop
        >
          <source src={runVideo} type="video/mp4"></source>
        </video>,
        <p key="project1-2">
          A dashboard and API that use data collected from the Fitbit API to
          better visualise my progress in running.
        </p>,
        <p key="project1-3" className="subTitle">
          Built with:
        </p>,
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
          key="project1-4"
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
        </div>,
        <p key="project1-5" className="subTitle">
          Links:
        </p>,
        <div
          key="project1-6"
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
        </div>,
      ],
    },
    {
      scrollId: 2,
      type: "project2",
      content: [
        <img
          key="project2-1"
          src={thingConnectorImage}
          className="contentMedia"
        ></img>,
        <p key="project2-2">
          This tool compares words, finds connections between them, and ranks
          their relationships using the Gemini 1.5 Flash API.
        </p>,
        <p key="project2-3">
          I like writing jokes, and I wanted to see the way an AI model thinks
          when making connections between things.
        </p>,
        <p key="project2-4" className="subTitle">
          Built with:
        </p>,
        <div style={{ display: "flex", gap: "10px" }} key="project2-5">
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
        </div>,
        <p key="project2-6" className="subTitle">
          Links:
        </p>,
        <div
          key="project2-7"
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <a target="_blank" href="https://thingconnector.netlify.app">
            Live site
          </a>
          <a target="_blank" href="https://github.com/daefron/thing-connector">
            Project GitHub
          </a>
        </div>,
      ],
    },
    {
      scrollId: 3,
      type: "project3",
      content: [
        <video
          key="project3-1"
          className="contentMedia"
          poster={blank}
          autoPlay
          muted
          loop
        >
          <source src={spreadsheetVideo} type="video/mp4"></source>
        </video>,

        <p key="project3-2">A tower defense game set in a spreadsheet.</p>,
        <p key="project3-3">
          While it's more of an engine than a fully playable game at this stage,
          it is functional and a ridiculous thing to have built in React.
        </p>,
        <p key="project3-4" className="subTitle">
          Built with:
        </p>,
        <div style={{ display: "flex", gap: "10px" }} key="project3-5">
          <a target="_blank" href="https://react.dev/">
            React
          </a>
        </div>,
        <p key="project3-6" className="subTitle">
          Links:
        </p>,
        <div
          key="project3-7"
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
        </div>,
      ],
    },
    {
      scrollId: 4,
      type: "contact",
      content: [
        <div key="contact-1" style={{ display: "flex" }}>
          <p className="subTitle">Email: &nbsp;</p>
          <p className="subTitle">thomas_evans@outlook.com</p>
        </div>,
        <div key="contact-2" style={{ display: "flex" }}>
          <p className="subTitle">GitHub: &nbsp;</p>
          <a
            className="subTitle"
            target="_blank"
            href="https://github.com/daefron"
          >
            daefron
          </a>
        </div>,
      ],
    },
  ];
}
