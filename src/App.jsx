import { useState } from "react";
export default function App() {
  const [scrollPoint, setScrollPoint] = useState(0);
  const scrollTabs = ["about", "project1", "project2", "contact"];
  const contentHolder = {
    about: [
      <p key="about-1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>,
    ],
    project1: [
      <p key="project1-1">
        Run tracker ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>,
      <p key="project1-2">adjfkn juvi rekjsrenf</p>,
    ],
    project2: [
      <p key="project2-1">
        Spreadsheet creep Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>,
      <p key="project2-2">sdjf ubs ifwenfki sdkjf</p>,
    ],
    contact: [
      <p key="contact-1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>,
    ],
  };

  function Tab({ title, renderTitle, subTitles }) {
    function Title({ title, renderTitle }) {
      let className = "title";
      if (scrollTabs[scrollPoint] !== title) {
        className += " inactiveTitle";
      }
      return (
        <p
          className={className}
          onClick={() => setScrollPoint(scrollTabs.indexOf(title))}
        >
          {renderTitle}
        </p>
      );
    }
    function Content() {
      return (
        <div className="contentHolder">
          {contentHolder[scrollTabs[scrollPoint]]}
        </div>
      );
    }
    if (!subTitles) {
      return (
        <div
          className={scrollTabs[scrollPoint] === title ? "activeTab" : "tab"}
        >
          <Title title={title} renderTitle={renderTitle} />
          {scrollTabs[scrollPoint] === title ? <Content /> : null}
        </div>
      );
    }
    if (subTitles) {
      return (
        <div
          className={
            scrollTabs[scrollPoint] === subTitles[0][0] ||
            scrollTabs[scrollPoint] === subTitles[1][0]
              ? "activeTab"
              : "tab"
          }
        >
          {scrollTabs[scrollPoint] === subTitles[0][0] ||
          scrollTabs[scrollPoint] === subTitles[1][0] ? (
            <>
              <SubTitles subTitles={subTitles} renderTitle={renderTitle} />
              <Content />
            </>
          ) : (
            <Title title={title} renderTitle={renderTitle} />
          )}
        </div>
      );
      function SubTitles({ subTitles, renderTitle }) {
        function Title() {
          return (
            <p
              className="title"
              style={{
                gridColumn: "1/2",
                gridRow: Number(scrollTabs[scrollPoint].slice(-1)) + "/3",
              }}
            >
              {renderTitle} -
            </p>
          );
        }
        function SubTitleList() {
          let holder = [];
          subTitles.forEach((subTitle) => {
            holder.push(
              <SubTitle
                key={subTitle[0] + "key"}
                title={subTitle[0]}
                renderTitle={subTitle[1]}
              />
            );
          });
          function SubTitle({ title, renderTitle }) {
            let style = {
              gridColumn: "2/3",
              gridRow:
                Number(title.slice(-1)) + "/" + (Number(title.slice(-1)) + 1),
            };
            let className = "title subTitle";
            if (scrollTabs[scrollPoint] !== title) {
              className += " inactiveSubTitle";
            }
            return (
              <p
                className={className}
                style={style}
                onClick={() => setScrollPoint(scrollTabs.indexOf(title))}
              >
                {renderTitle}
              </p>
            );
          }
          return holder;
        }
        return (
          <div className="subTitleHolder">
            <Title />
            <SubTitleList />
          </div>
        );
      }
    }
  }
  return (
    <>
      <p className="title">Thomas Evans</p>
      <Tab title="about" renderTitle="About" />
      <Tab
        title="project1"
        renderTitle="Projects"
        subTitles={[
          ["project1", "Run Tracker"],
          ["project2", "Spreadsheet Creep"],
        ]}
      />
      <Tab title="contact" renderTitle="Contact" />
    </>
  );
}
