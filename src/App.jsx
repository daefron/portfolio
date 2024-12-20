export default function App() {
  const colors = {
    first: "rgb(50, 50, 50)",
    second: "rgb(100, 100, 100)",
    third: "rgb(150, 150, 150)",
    fourth: "rgb(200, 200, 200)",
  };
  const expandBorder = makeExpandBorders();
  function makeExpandBorders() {
    let expandHolder = {};
    for (const color in colors) {
      expandHolder[color] = {
        borderBottom: "solid " + colors[color] + " 1px",
        borderLeft: "solid " + colors[color] + " 1px",
      };
    }
    return expandHolder;
  }
  const titleBorder = makeTitleBorders();
  function makeTitleBorders() {
    let titleHolder = {};
    for (const color in colors) {
      titleHolder[color] = {
        borderBottom: "solid " + colors[color] + " 8px",
      };
    }
    return titleHolder;
  }
  function arrowClick() {}
  function Arrow() {
    return (
      <svg onClick={arrowClick} fill="white" viewBox="0 0 330 330">
        <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></path>
      </svg>
    );
  }
  function About() {
    return (
      <div className="expand" style={expandBorder.first}>
        <div className="titleHolder" style={titleBorder.second}>
          <p className="title">About me</p>
          <Arrow />
        </div>
        <div className="expand" style={expandBorder.second}>
          <p className="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="paragraph">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
    );
  }
  function Projects() {
    function RunTracker() {
      return (
        <div className="expand" style={expandBorder.second}>
          <div className="titleHolder" style={titleBorder.third}>
            <p className="title">Run tracker</p>
            <Arrow />
          </div>
          <div className="expand" style={expandBorder.third}>
            <div className="titleHolder" style={titleBorder.fourth}>
              <p className="subTitle">About</p>
              <Arrow />
            </div>
            <div className="expand" style={expandBorder.fourth}>
              <p className="paragraph">
                So my girlfriend got me a Fitbit for me birthday...
              </p>
              <p className="paragraph">
                I had just started getting into running, and I found that
                Fitbit's data visualisation didn't allow for direct comparison
                of exercises (and I felt I needed more practice with APIs and
                wanted to learn a chart library) so I decided to make a
                dashboard for tracking my runs.
              </p>
            </div>
          </div>
        </div>
      );
    }
    function Spreadsheet() {
      return (
        <div className="expand" style={expandBorder.second}>
          <div className="titleHolder" style={titleBorder.third}>
            <p className="title">Spreadsheet creep</p>
            <Arrow />
          </div>
          <div className="expand" style={expandBorder.third}>
            <p className="paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="paragraph">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="expand" style={expandBorder.first}>
        <div className="titleHolder" style={titleBorder.second}>
          <p className="title">Projects</p>
          <Arrow />
        </div>
        <RunTracker />
        <Spreadsheet />
      </div>
    );
  }
  return (
    <>
      <p className="title" style={titleBorder.first}>
        Thomas Evans
      </p>
      <About />
      <Projects />
    </>
  );
}
