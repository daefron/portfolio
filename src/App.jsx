import { useState, useEffect, useRef } from "react";
export default function App() {
  const [scrollPoint, setScrollPoint] = useState(0);
  const scrollRef = useRef();
  scrollRef.current = scrollPoint;
  const scrollDelay = useRef(false);
  useEffect(() => {
    const scrollEvent = addEventListener("wheel", (e) => scroll(e));
    function scroll(event) {
      if (scrollDelay.current) {
        return;
      }
      scrollDelay.current = true;
      if (event.deltaY < 0 && scrollRef.current > 0) {
        setScrollPoint((previous) => previous - 1);
      } else if (
        event.deltaY > 0 &&
        scrollRef.current < typeHolder.length - 1
      ) {
        setScrollPoint((previous) => previous + 1);
      }
      setTimeout(() => {
        scrollDelay.current = false;
      }, 500);
    }
    removeEventListener("wheel", scrollEvent);
  }, []);
  const typeHolder = [
    {
      id: 0,
      type: "about",
      content: [
        <p key="about-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>,
      ],
    },
    {
      id: 1,
      type: "project1",
      content: [
        <p key="project1-1">
          Run tracker ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>,
        <p key="project1-2">adjfkn juvi rekjsrenf</p>,
      ],
    },
    {
      id: 2,
      type: "project2",
      content: [
        <p key="project2-1">
          Spreadsheet creep Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </p>,
        <p key="project2-2">sdjf ubs ifwenfki sdkjf</p>,
      ],
    },
    {
      id: 3,
      type: "contact",
      content: [
        <p key="contact-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>,
      ],
    },
  ];

  function Tab({ type, renderTitle, subTitles }) {
    const currentType = typeHolder[scrollPoint].type;
    if (!subTitles) {
      return (
        <div className={currentType === type ? "activeTab" : "tab"}>
          <Title type={type} renderTitle={renderTitle} />
          {currentType === type ? <Content /> : null}
        </div>
      );
    }
    if (subTitles) {
      return (
        <div
          className={
            currentType === subTitles[0].type ||
            currentType === subTitles[1].type
              ? "activeTab"
              : "tab"
          }
        >
          {currentType === subTitles[0].type ||
          currentType === subTitles[1].type ? (
            <>
              <SubTitles subTitles={subTitles} renderTitle={renderTitle} />
              <Content />
            </>
          ) : (
            <Title type={type} renderTitle={renderTitle} />
          )}
        </div>
      );
      function Title({ type, renderTitle }) {
        let className = "title";
        if (currentType !== type) {
          className += " inactiveTitle";
        }
        return (
          <p
            className={className}
            onClick={() =>
              setScrollPoint(
                typeHolder.find((object) => object.type === type).id
              )
            }
          >
            {renderTitle}
          </p>
        );
      }
      function Content() {
        return (
          <div className="contentHolder">{typeHolder[scrollPoint].content}</div>
        );
      }
      function SubTitles({ subTitles, renderTitle }) {
        function SubTitleTitle() {
          return (
            <p
              className="title"
              style={{
                gridColumn: "1/2",
                gridRow: Number(currentType.slice(-1)) + "/3",
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
                key={subTitle.type + "key"}
                type={subTitle.type}
                renderTitle={subTitle.renderTitle}
              />
            );
          });
          function SubTitle({ type, renderTitle }) {
            let style = {
              gridColumn: "2/3",
              gridRow:
                Number(type.slice(-1)) + "/" + (Number(type.slice(-1)) + 1),
            };
            let className = "title";
            if (currentType !== type) {
              className += " inactiveTitle";
            }
            return (
              <p
                className={className}
                style={style}
                onClick={() =>
                  setScrollPoint(
                    typeHolder.find((object) => object.type === type).id
                  )
                }
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
    function Title({ type, renderTitle }) {
      let className = "title";
      if (currentType !== type) {
        className += " inactiveTitle";
      }
      return (
        <p
          className={className}
          onClick={() =>
            setScrollPoint(typeHolder.find((object) => object.type === type).id)
          }
        >
          {renderTitle}
        </p>
      );
    }
    function Content() {
      return (
        <div className="contentHolder">{typeHolder[scrollPoint].content}</div>
      );
    }
  }
  return (
    <>
      <p className="title">Thomas Evans</p>
      <Tab type="about" renderTitle="About" />
      <Tab
        type="project1"
        renderTitle="Projects"
        subTitles={[
          { type: "project1", renderTitle: "Run Tracker" },
          { type: "project2", renderTitle: "Spreadsheet Creep" },
        ]}
      />
      <Tab type="contact" renderTitle="Contact" />
    </>
  );
}
