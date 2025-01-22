import { animated, useSpring, easings } from "@react-spring/web";
import { useState, useEffect, useRef } from "react";
import { content } from "./Content";
export default function App() {
  const entryHolder = content();
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
              scrollRef.current < entryHolder.length - 1
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
      removeEventListener("wheel", scrollEvent);
      const distance = event.deltaY;
      scrollDelay.current = true;
      if (distance < 10 && scrollRef.current > 0) {
        lastScroll.current = scrollRef.current;
        setScrollPoint((previous) => previous - 1);
      } else if (distance > -10 && scrollRef.current < entryHolder.length - 1) {
        lastScroll.current = scrollRef.current;
        setScrollPoint((previous) => previous + 1);
      }
      setTimeout(() => {
        scrollDelay.current = false;
      }, 800);
    }
  }, []);

  function Tab({ type, renderTitle, subTitles }) {
    const animations = {
      growTab: useSpring({
        from: { flexGrow: 0 },
        to: { flexGrow: 1 },
        config: { duration: 600, easing: easings.easeInOutSine },
      }),
      shrinkTab: useSpring({
        from: { flexGrow: 1 },
        to: { flexGrow: 0 },
        config: { duration: 600, easing: easings.easeInOutSine },
      }),
      grow: useSpring({
        from: { flexGrow: 0, maxHeight: 0 },
        to: { flexGrow: 1, maxHeight: "maxContent" },
        config: { duration: 600, easing: easings.easeInOutSine },
      }),
      shrink: useSpring({
        from: { flexGrow: 1 },
        to: { flexGrow: 0, maxHeight: 0 },
        config: { duration: 600, easing: easings.easeInOutSine },
      }),
      left: useSpring({
        from: { flexGrow: 1, marginLeft: "0px", right: "0%" },
        to: { flexGrow: 1, marginLeft: "-30px", right: "100%" },
        config: { duration: 600, easing: easings.easeInOutSine },
      }),
      right: useSpring({
        from: { flexGrow: 1, marginLeft: "-30px", right: "100%" },
        to: { flexGrow: 1, marginLeft: "0px", right: "0%" },
        config: { duration: 600, easing: easings.easeInOutSine },
      }),
    };

    let lastEntry;
    const currentEntry = entryHolder[scrollPoint];
    const thisEntry = entryHolder.find((entry) => entry.type === type);
    if (lastScroll.current !== undefined) {
      lastEntry = entryHolder[lastScroll.current];
    }

    if (!subTitles) {
      return standardRender();
    }
    if (subTitles) {
      return subTitleRender();
    }

    function standardRender() {
      let selectedEntry, lastSelectedEntry;
      if (currentEntry === thisEntry) {
        selectedEntry = true;
      } else if (lastEntry === thisEntry) {
        lastSelectedEntry = true;
      }
      return (
        <animated.div
          className={type === "header" ? "tab header" : "tab"}
          style={
            selectedEntry
              ? animations.growTab
              : lastSelectedEntry
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
            className={!selectedEntry ? "title inactiveTitle" : "title"}
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
              selectedEntry
                ? animations.grow
                : lastSelectedEntry
                ? animations.shrink
                : null
            }
          >
            {selectedEntry
              ? thisEntry.content
              : lastSelectedEntry
              ? entryHolder[lastScroll.current].content
              : null}
          </animated.div>
        );
      }
    }
    function subTitleRender() {
      let subTitleIsCurrent, subTitleIsLast;
      subTitles.forEach((subTitle) => {
        const thisEntry = entryHolder.find(
          (entry) => entry.type === subTitle.type
        );
        if (thisEntry === currentEntry) {
          subTitleIsCurrent = thisEntry;
        } else if (lastEntry && thisEntry === lastEntry) {
          subTitleIsLast = thisEntry;
        }
      });
      if (subTitleIsCurrent && subTitleIsLast) {
        return HorizontalScroll();
      }
      return VerticalScroll();
      function HorizontalScroll() {
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
      function VerticalScroll() {
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
                    entryHolder.find((entry) => entry.type === type).scrollId
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
            const thisEntry = entryHolder.find(
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
  function Pagination() {
    const maxScrolls = content().length;
    let points = [];
    for (let i = 0; i < maxScrolls; i++) {
      if (i === scrollPoint) {
        points.push(true);
      } else {
        points.push(false);
      }
    }
    return (
      <div className="pagination">
        {points.map((point, i) => {
          return (
            <div
              key={i + "pagePoint"}
              className={point ? "pagePoint activePagePoint" : "pagePoint"}
            ></div>
          );
        })}
      </div>
    );
  }
  return (
    <>
      <div className="mainDiv">
        <Tab key="header" type="header" renderTitle="Thomas Evans" />
        <Tab
          key="projects"
          type="project1"
          renderTitle="Projects"
          subTitles={[
            { type: "project1", renderTitle: "Run Tracker" },
            { type: "project2", renderTitle: "Spreadsheet Creep" },
          ]}
        />
        <Tab key="contact" type="contact" renderTitle="Contact" />
      </div>  
      <Pagination />
    </>
  );
}
