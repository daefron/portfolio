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
          Although I studied programming briefly at university and made several
          attempts to learn on my own, it just never could stick.
        </p>,
        <p key="about-3">
          Eventually, I started working through &nbsp;
          <a target="_blank" href="https://www.theodinproject.com/">
            The Odin Project
          </a>
          , which provided the structure I needed to build a strong foundation.
        </p>,
        <p key="about-4">
          Now, I've reached a point where I no longer rely on guided projects
          and feel confident in my ability to handle real-world development
          tasks. I'm ready to apply my skills in an industry setting.
        </p>,
        <p key="about-5" className="subTitle">
          Skills:
        </p>,
        <p key="about-6">
          At this point, I feel highly confident in my understanding of
          front-end web development, particularly the fundamentals (HTML, CSS,
          and JavaScript), and am comfortable working with React - to the point
          where I am confident that I could build almost any front-end project I
          set my mind to.
        </p>,
        <p key="about-6-1">
          Recentlty, I've started exploring back-end development and have taken
          a liking to it. I'm already comfortable working with Node.js, Express,
          and SQL so far, with more to come shortly.
        </p>,
        <p key="about-7" className="subTitle">
          This portfolio:
        </p>,
        <p key="about-8">
          While The Odin Project helped me build a variety of basic projects,
          I've chosen not to include them in this portfolio. Instead, I'm
          focusing on showcasing my self-driven projects, as they better
          represent my skills and abilities. Plus, you probably already know
          what the weather is...
        </p>,
      ],
    },
    {
      scrollId: 1,
      type: "project1",
      content: [
        <p key="project1-1">
          A custom built dashboard that shows run data gathered from the Fitbit
          API in a variety of graphs and lists.
        </p>,
        <video key="project1-2" className="videoContent" autoPlay muted>
          <source src={runVideo} type="video/mp4"></source>
        </video>,
        <p key="project1-3">
          I had just started getting into running, and I found that Fitbit's
          data visualisation didn't allow for direct comparison of exercises (+
          I felt I needed more experience with APIs and wanted to learn a chart
          library) so I decided to make a dashboard for tracking my runs.
        </p>,
        <p key="project1-3-2">
          Dealing with the Fitbit API's request rate limit pretty much forced me
          to learn backend as well, so this also includes a database + API for
          interfacing with the Fitbit API more efficiently.
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
            Project Github
          </a>
        </div>,
      ],
    },
    {
      scrollId: 2,
      type: "project2",
      content: [
        <p key="project2-1">
          A game/game engine set within the bounds of a spreadsheet.
        </p>,
        <video key="project2-2" className="videoContent" autoPlay muted>
          <source src={spreadsheetVideo} type="video/mp4"></source>
        </video>,

        <p key="project2-3">
          I needed an interesting, first project to make in React, and the first
          thing that came to mind (when I was having a shower of course) was a
          tower defense game set in a spreadsheet.
        </p>,
        <p key="project2-4">
          At this stage, it's more of an engine than a playable game, but for
          what it is I am proud of it and how much it taught me.
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
            Project Github
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
          <p className="subTitle">Github: &nbsp;</p>
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
