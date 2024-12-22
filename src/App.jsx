import { useState } from "react";
export default function App() {
  const [scrollPoint, setscrollPoint] = useState(2);
  const scrollTabs = ["about", "project1", "project2", "contact"];
  function AboutContent() {
    return (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    );
  }
  function ProjectsContent() {
    return (
      <>
        <div className="subTab">
          {scrollTabs[scrollPoint] === "project1" ? (
            <>
              <div className="projectTitleHolder">
                <p className="title">Projects - </p>
                <p className="title activeProjectTitle projectTitle">
                  Run Tracker
                </p>
              </div>
              <div className="projectTitleHolder">
                <p></p>
                <p className="title projectTitle">Spreadsheet Creep</p>
              </div>
              <p>
                Run tracker ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </>
          ) : null}
          {scrollTabs[scrollPoint] === "project2" ? (
            <>
              <div className="projectTitleHolder">
                <p></p>
                <p className="title projectTitle">Run Tracker</p>
              </div>
              <div className="projectTitleHolder">
                <p className="title">Projects - </p>
                <p className="title activeProjectTitle projectTitle">
                  Spreadsheet Creep
                </p>
              </div>
              <p>
                Spreadsheet creep Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </>
          ) : null}
        </div>
      </>
    );
  }
  function ContactContent() {
    return (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    );
  }
  return (
    <>
      <p className="title">Thomas Evans</p>
      <div className="tab">
        <p className="title">About</p>
        {scrollTabs[scrollPoint] === "about" ? <AboutContent /> : null}
      </div>
      <div className="tab">
        {scrollTabs[scrollPoint] === "project1" ||
        scrollTabs[scrollPoint] === "project2" ? (
          <ProjectsContent />
        ) : (
          <p className="title">Projects</p>
        )}
      </div>
      <div className="tab">
        <p className="title">Contact</p>
        {scrollTabs[scrollPoint] === "contact" ? <ContactContent /> : null}
      </div>
    </>
  );
}
