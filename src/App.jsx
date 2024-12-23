import { useState, useRef } from "react";
export default function App() {
  const [scrollPoint, setScrollPoint] = useState(0);
  const tabOrder = ["about", "project1", "project2", "contact"];
  const scrollDelay = useRef(false);
  addEventListener("wheel", (event) => {
    if (scrollDelay.current) {
      return;
    }
    let diff;
    if (event.deltaY < 0) {
      diff = -1;
    } else if (event.deltaY > 0) {
      diff = 1;
    }
    scrollDelay.current = true;
    setScrollPoint((previous) => previous + diff);
    setTimeout(() => {
      scrollDelay.current = false;
    }, 500);
  });
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
    if (!subTitles) {
      return (
        <div className={tabOrder[scrollPoint] === title ? "activeTab" : "tab"}>
          <Title title={title} renderTitle={renderTitle} />
          {tabOrder[scrollPoint] === title ? <Content /> : null}
        </div>
      );
    }
    if (subTitles) {
      return (
        <div
          className={
            tabOrder[scrollPoint] === subTitles[0].title ||
            tabOrder[scrollPoint] === subTitles[1].title
              ? "activeTab"
              : "tab"
          }
        >
          {tabOrder[scrollPoint] === subTitles[0].title ||
          tabOrder[scrollPoint] === subTitles[1].title ? (
            <>
              <SubTitles subTitles={subTitles} renderTitle={renderTitle} />
              <Content />
            </>
          ) : (
            <Title title={title} renderTitle={renderTitle} />
          )}
        </div>
      );
      function Title({ title, renderTitle }) {
        let className = "title";
        if (tabOrder[scrollPoint] !== title) {
          className += " inactiveTitle";
        }
        return (
          <p
            className={className}
            onClick={() => setScrollPoint(tabOrder.indexOf(title))}
          >
            {renderTitle}
          </p>
        );
      }
      function Content() {
        return (
          <div className="contentHolder">
            {contentHolder[tabOrder[scrollPoint]]}
          </div>
        );
      }
      function SubTitles({ subTitles, renderTitle }) {
        function SubTitleTitle() {
          return (
            <p
              className="title"
              style={{
                gridColumn: "1/2",
                gridRow: Number(tabOrder[scrollPoint].slice(-1)) + "/3",
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
                key={subTitle.title + "key"}
                title={subTitle.title}
                renderTitle={subTitle.renderTitle}
              />
            );
          });
          function SubTitle({ title, renderTitle }) {
            let style = {
              gridColumn: "2/3",
              gridRow:
                Number(title.slice(-1)) + "/" + (Number(title.slice(-1)) + 1),
            };
            let className = "title";
            if (tabOrder[scrollPoint] !== title) {
              className += " inactiveTitle";
            }
            return (
              <p
                className={className}
                style={style}
                onClick={() => setScrollPoint(tabOrder.indexOf(title))}
              >
                {renderTitle}
              </p>
            );
          }
          return holder;
        }
        return (
          <div className="subTitleHolder">
            <SubTitleTitle />
            <SubTitleList />
          </div>
        );
      }
    }
    function Title({ title, renderTitle }) {
      let className = "title";
      if (tabOrder[scrollPoint] !== title) {
        className += " inactiveTitle";
      }
      return (
        <p
          className={className}
          onClick={() => setScrollPoint(tabOrder.indexOf(title))}
        >
          {renderTitle}
        </p>
      );
    }
    function Content() {
      return (
        <div className="contentHolder">
          {contentHolder[tabOrder[scrollPoint]]}
        </div>
      );
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
          { title: "project1", renderTitle: "Run Tracker" },
          { title: "project2", renderTitle: "Spreadsheet Creep" },
        ]}
      />
      <Tab title="contact" renderTitle="Contact" />
    </>
  );
}
