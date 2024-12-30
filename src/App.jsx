import { animated, useSpring } from "@react-spring/web";
import { useState, useEffect, useRef } from "react";
import { content } from "./Content";
export default function App() {
  const typeHolder = content();
  const [scrollPoint, setScrollPoint] = useState(0);
  const scrollRef = useRef();
  const lastScroll = useRef();
  scrollRef.current = scrollPoint;
  const scrollDelay = useRef(false);
  useEffect(() => {
    const scrollEvent = addEventListener("wheel", (e) => scroll(e));
    const touchEndEvent = addEventListener("touchend", touchEnd);
    const touchMoveEvent = addEventListener("touchmove", (e) => touchMove(e));
    let lastTouch;
    function touchEnd() {
      removeEventListener("touchend", touchEndEvent);
      removeEventListener("touchmove", touchMoveEvent);
      lastTouch = undefined;
    }
    function touchMove(event) {
      const touch = event.touches[0];
      if (lastTouch) {
        const yDistance = lastTouch.clientY - touch.clientY;
        if (yDistance > 10 || yDistance < -10) {
          touchScroll(yDistance);
          touchEnd();
          return;
          function touchScroll(distance) {
            if (scrollDelay.current) {
              return;
            }
            scrollDelay.current = true;
            if (distance < 0 && scrollRef.current > 0) {
              lastScroll.current = scrollRef.current;
              setScrollPoint((previous) => previous - 1);
            } else if (
              distance > 0 &&
              scrollRef.current < typeHolder.length - 1
            ) {
              lastScroll.current = scrollRef.current;
              setScrollPoint((previous) => previous + 1);
            }
            setTimeout(() => {
              scrollDelay.current = false;
            }, 800);
          }
        }
      }
      lastTouch = touch;
    }
    function scroll(event) {
      if (scrollDelay.current) {
        return;
      }
      scrollDelay.current = true;
      if (event.deltaY < 0 && scrollRef.current > 0) {
        lastScroll.current = scrollRef.current;
        setScrollPoint((previous) => previous - 1);
      } else if (
        event.deltaY > 0 &&
        scrollRef.current < typeHolder.length - 1
      ) {
        lastScroll.current = scrollRef.current;
        setScrollPoint((previous) => previous + 1);
      }
      setTimeout(() => {
        scrollDelay.current = false;
      }, 800);
    }
    removeEventListener("wheel", scrollEvent);
  }, []);

  function Tab({ type, renderTitle, subTitles }) {
    const animations = {
      growTab: useSpring({
        from: { flexGrow: 0 },
        to: { flexGrow: 1 },
        config: { duration: 0 },
      }),
      shrinkTab: useSpring({
        from: { flexGrow: 1 },
        to: { flexGrow: 0 },
        config: { duration: 0 },
      }),
      grow: useSpring({
        from: { flexGrow: 0, height: 0 },
        to: { flexGrow: 1, maxHeight: "maxContent" },
        config: { duration: 0 },
      }),
      shrink: useSpring({
        from: { flexGrow: 1, maxHeight: "maxContent" },
        to: { flexGrow: 0, height: 0 },
        config: { duration: 0 },
      }),
      both: useSpring({
        from: { flexGrow: 1 },
        to: { flexGrow: 1 },
        config: { duration: 0 },
      }),
      left: useSpring({
        from: { flexGrow: 1, right: "0px", height: "100%" },
        to: { flexGrow: 1, right: "calc(100% + 30px)", height: "100%" },
        config: { duration: 0 },
      }),
      right: useSpring({
        from: { flexGrow: 1, marginLeft: -30, right: "100%" },
        to: { flexGrow: 1, marginLeft: 0, right: "0px" },
        config: { duration: 0 },
      }),
    };

    let lastEntry;
    const currentEntry = typeHolder[scrollPoint];
    const thisEntry = typeHolder.find((entry) => entry.type === type);
    if (lastScroll.current !== undefined) {
      lastEntry = typeHolder[lastScroll.current];
    }

    if (!subTitles) {
      return standardRender();
    }
    if (subTitles) {
      return subTitleRender();
    }

    function standardRender() {
      let selected, lastSelected;
      if (currentEntry === thisEntry) {
        selected = true;
      } else if (lastEntry === thisEntry) {
        lastSelected = true;
      }
      return (
        <animated.div
          className={type === "header" ? "tab header" : "tab"}
          style={
            selected
              ? animations.growTab
              : lastSelected
              ? animations.shrinkTab
              : null
          }
        >
          <Title />
          <Content />
        </animated.div>
      );
      function Title() {
        return (
          <p
            className={
              currentEntry !== thisEntry ? "title inactiveTitle" : "title"
            }
            onMouseOver={(e) => {
              if (e.target.className.includes("inactive")) {
                e.target.style.color = "rgb(190, 190, 190)";
              }
            }}
            onMouseOut={(e) => {
              if (e.target.className.includes("inactive")) {
                e.target.style.color = "rgb(150, 150, 150)";
              }
            }}
            onClick={() => {
              lastScroll.current = scrollRef.current;
              setScrollPoint(thisEntry.scrollId);
            }}
          >
            {renderTitle}
          </p>
        );
      }
      function Content() {
        return (
          <animated.div
            className="contentHolder"
            style={
              selected
                ? animations.grow
                : lastSelected
                ? animations.shrink
                : null
            }
          >
            {selected
              ? thisEntry.content
              : lastSelected
              ? typeHolder[lastScroll.current].content
              : null}
          </animated.div>
        );
      }
    }
    function subTitleRender() {
      let subTitleIsCurrent, subTitleIsLast;
      subTitles.forEach((subTitle) => {
        const thisEntry = typeHolder.find(
          (entry) => entry.type === subTitle.type
        );
        if (thisEntry === currentEntry) {
          subTitleIsCurrent = thisEntry;
        } else if (lastEntry && thisEntry === lastEntry) {
          subTitleIsLast = thisEntry;
        }
      });
      if (subTitleIsCurrent && subTitleIsLast) {
        return BothVisible();
      }
      return OneVisible();
      function BothVisible() {
        const lastScrollDirection = scrollPoint + 1 === subTitleIsLast.scrollId;
        return (
          <div className="tab" style={{ flexGrow: 1 }}>
            <SubTitlesHead />
            <animated.div
              className="subContentHolder"
              style={lastScrollDirection ? animations.right : animations.left}
            >
              <div className="contentHolder">
                {lastScrollDirection
                  ? subTitleIsCurrent.content
                  : subTitleIsLast.content}
              </div>
              <div className="contentHolder">
                {!lastScrollDirection
                  ? subTitleIsCurrent.content
                  : subTitleIsLast.content}
              </div>
            </animated.div>
          </div>
        );
      }
      function OneVisible() {
        return (
          <animated.div
            className="tab"
            style={
              subTitleIsCurrent
                ? animations.growTab
                : subTitleIsLast
                ? animations.shrinkTab
                : null
            }
          >
            <SubTitlesHead />
            <Content />
          </animated.div>
        );
      }
      function Content() {
        return (
          <animated.div
            className="contentHolder"
            style={
              subTitleIsCurrent
                ? animations.grow
                : subTitleIsLast
                ? animations.shrink
                : null
            }
          >
            {subTitleIsLast
              ? subTitleIsLast.content
              : subTitleIsCurrent
              ? subTitleIsCurrent.content
              : null}
          </animated.div>
        );
      }
      function SubTitlesHead() {
        function SubTitleTitle() {
          return (
            <div
              style={{
                gridColumn: "1/2",
                gridRow: "1/2",
                display: "flex",
              }}
            >
              <p
                className={!subTitleIsCurrent ? "title inactiveTitle" : "title"}
                onClick={() => {
                  lastScroll.current = scrollRef.current;
                  setScrollPoint(
                    typeHolder.find((entry) => entry.type === type).scrollId
                  );
                }}
                onMouseOver={(e) => {
                  if (e.target.className.includes("inactive")) {
                    e.target.style.color = "rgb(190, 190, 190)";
                  }
                }}
                onMouseOut={(e) => {
                  if (e.target.className.includes("inactive")) {
                    e.target.style.color = "rgb(150, 150, 150)";
                  }
                }}
              >
                {renderTitle} -
              </p>
            </div>
          );
        }
        function SubTitleList() {
          let holder = [];
          subTitles.forEach((subTitle, i) => {
            const thisEntry = typeHolder.find(
              (entry) => entry.type === subTitle.type
            );
            holder.push(
              <SubTitleContent
                key={subTitle.type + "key"}
                subTitle={thisEntry}
                renderTitle={subTitle.renderTitle}
                index={i}
              />
            );
          });
          function SubTitleContent({ subTitle, index, renderTitle }) {
            return (
              <p
                className={
                  currentEntry !== subTitle ? "title inactiveTitle" : "title"
                }
                style={{
                  gridColumn: "2 / 3",
                  gridRow: index + 1 + " / " + (index + 2),
                }}
                onClick={() => {
                  lastScroll.current = scrollRef.current;
                  setScrollPoint(subTitle.scrollId);
                }}
                onMouseOver={(e) => {
                  if (e.target.className.includes("inactive")) {
                    e.target.style.color = "rgb(190, 190, 190)";
                  }
                }}
                onMouseOut={(e) => {
                  if (e.target.className.includes("inactive")) {
                    e.target.style.color = "rgb(150, 150, 150)";
                  }
                }}
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
  }
  return (
    <>
      <div className="blocker top" />
      <div className="mainDiv">
        <Tab type="header" renderTitle="Thomas Evans" />
        <Tab
          type="project1"
          renderTitle="Projects"
          subTitles={[
            { type: "project1", renderTitle: "Run Tracker" },
            { type: "project2", renderTitle: "Spreadsheet Creep" },
          ]}
        />
        <Tab type="contact" renderTitle="Contact" />
        <animated.div
          className="initialBlock"
          style={useSpring({
            from: {
              height: "calc(100%)",
            },
            to: {
              height: "0px",
            },
            config: { duration: 0 },
          })}
        />
      </div>
      <div className="blocker bottom" />
    </>
  );
}
