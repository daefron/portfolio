import runVideo from "./videos/runVid.mp4";
import spreadsheetVideo from "./videos/spreadsheetVid.mp4";
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
        <p key="about-5" className="subTitle">
          Skills:
        </p>,
        <p key="about-6">
          At this point, I feel highly confident in my understanding of
          front-end web development, with solid expertise in HTML, CSS,
          JavaScript, and React. <br />
          While I am newer to back-end development, I've thoroughly enjoyed
          expanding my skills in this area. I am now comfortable working with
          Node.js, Express, and SQL, building scalable and efficient back-end
          systems.
        </p>,
        <p key="about-7" className="subTitle">
          This portfolio:
        </p>,
        <p key="about-8">
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
        <video key="project1-2" className="videoContent" autoPlay muted loop>
          <source src={runVideo} type="video/mp4"></source>
        </video>,
        <p key="project1-3">
          I had just started getting into running, and I found that Fitbit's
          data visualisation didn't allow me to easily compare exercises, so I
          took it upon myself to create a dashboard that would give me more
          control over how I visualised my data.
        </p>,
        <p key="project1-3-2">
          The Fitbit API's rate limits prompted me to explore back-end
          development. I built an API for more efficient communication with
          Fitbit and integrated a PostgreSQL database to store and manage data,
          improving performance and functionality.
        </p>,
        <p key="project1-4" className="subTitle">
          Built with:
        </p>,
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
          key="project1-5"
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
        <p key="project1-6" className="subTitle">
          Links:
        </p>,
        <div
          key="project1-7"
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
        <video key="project2-2" className="videoContent" autoPlay muted loop>
          <source src={spreadsheetVideo} type="video/mp4"></source>
        </video>,

        <p key="project2-3">
          I needed a compelling first project in React, and the idea that came
          to mind (as most good ideas do: in the shower) was a tower defense
          game set in a spreadsheet.
        </p>,
        <p key="project2-4">
          While it's more of an engine than a fully playable game right now, I'm
          proud of what I've built and how much I've learned from the process.
        </p>,
        <p key="project2-5" className="subTitle">
          Built with:
        </p>,
        <div style={{ display: "flex", gap: "10px" }} key="project2-6">
          <a target="_blank" href="https://react.dev/">
            React
          </a>
        </div>,
        <p key="project2-7" className="subTitle">
          Links:
        </p>,
        <div
          key="project2-8"
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
      scrollId: 3,
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
