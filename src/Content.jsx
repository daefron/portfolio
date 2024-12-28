import runPage from "./images/runPage.png";
import spreadsheetPage from "./images/spreadsheetPage.png";
export function content() {
  return [
    {
      id: 0,
      type: "header",
      content: [
        <p key="about-1">
          I am a completely self-taught front-end web developer.
        </p>,
        <p key="about-2">
          Over the years, I have tried to get into programming who knows how
          many times (I even started studying it at uni briefly) but I never
          could stick with it. My last attempt, I started working through&nbsp;
          <a target="_blank" href="https://www.theodinproject.com/">
            The Odin Project.
          </a>
        </p>,
        <p key="about-3">It stuck.</p>,
        <p key="about-4">
          I am now at a point live site I no longer need a guide, and feel
          "industry ready".
        </p>,
        <p key="about-5" className="subTitle">
          Skills:
        </p>,
        <p key="about-6">
          At this stage, I would say that I am extremely comfortable with the
          foundations (HTML, CSS, JS) of front-end web development (enough so
          that I believe I could make pretty much anything I put my mind to),
          comfortable with React, and have just started dipping my toes into the
          back-end.
        </p>,
        <p key="about-7" className="subTitle">
          This portfolio:
        </p>,
        <p key="about-8">
          While The Odin Project did get me to make a variety of basic projects,
          I decided not to include them in this portfolio and only showcase my
          self-driven projects; they're a hell of a lot better and you probably
          already know what the weather is...
        </p>,
      ],
    },
    {
      id: 1,
      type: "project1",
      content: [
        <p key="project1-1">
          A custom built dashboard that shows run data live site from the Fitbit
          API in a variety of graphs and lists.
        </p>,
        <img key="project1-2" src={runPage} />,
        <p key="project1-3">
          I had just started getting into running, and I found that Fitbit's
          data visualisation didn't allow for direct comparison of exercises (+
          I felt I needed more experience with APIs and wanted to learn a chart
          library) so I decided to make a dashboard for tracking my runs.
        </p>,
        <p key="project1-4" className="subTitle">
          Built with:
        </p>,
        <div style={{ display: "flex", gap: "10px" }} key="project1-5">
          <a target="_blank" href="https://react.dev/">
            React
          </a>
          <a target="_blank" href="https://recharts.org/">
            Recharts
          </a>
          <a target="_blank" href="https://www.fitbit.com/dev">
            Fitbit API
          </a>
        </div>,
        <p key="project1-6" className="subTitle">
          Links:
        </p>,
        <a
          key="project1-7"
          target="_blank"
          href="https://runtracker.netlify.app"
        >
          Live site
        </a>,
        <a
          key="project1-8"
          target="_blank"
          href="https://github.com/daefron/run-tracker"
        >
          Project Github
        </a>,
      ],
    },
    {
      id: 2,
      type: "project2",
      content: [
        <p key="project2-1">
          A "game engine" set within the bounds of a spreadsheet.
        </p>,
        <img key="project2-2" src={spreadsheetPage} />,
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
        <a
          key="project2-8"
          target="_blank"
          href="https://spreadsheetcreep.netlify.app"
        >
          Live site
        </a>,
        <a
          key="project2-9"
          target="_blank"
          href="https://github.com/daefron/spreadsheet-creep"
        >
          Project Github
        </a>,
      ],
    },
    {
      id: 3,
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
