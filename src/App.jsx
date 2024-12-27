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
    let selected, lastType, lastSelected, animation;
    const currentType = typeHolder[scrollPoint].type;
    if (lastScroll.current !== undefined) {
      lastType = typeHolder[lastScroll.current].type;
    }
    function contentAnimation(visible) {
      let animation;
      const growAnimation = useSpring({
        from: { flexGrow: 0, height: 0 },
        to: { flexGrow: 1, maxHeight: "maxContent" },
        config: { duration: 0 },
      });
      const shrinkAnimation = useSpring({
        from: { flexGrow: 1, maxHeight: "maxContent" },
        to: { flexGrow: 0, height: 0 },
        config: { duration: 0 },
      });
      const noAnimation = useSpring({
        from: { flexGrow: 0, maxHeight: 0 },
        to: { flexGrow: 0, height: 0 },
        config: { duration: 0 },
      });
      if (visible === true) {
        animation = growAnimation;
      } else if (visible === "last") {
        animation = shrinkAnimation;
      } else {
        animation = noAnimation;
      }
      return animation;
    }
    const growAnimation = useSpring({
      from: { flexGrow: 0 },
      to: { flexGrow: 1 },
      config: { duration: 0 },
    });
    const shrinkAnimation = useSpring({
      from: { flexGrow: 1 },
      to: { flexGrow: 0 },
      config: { duration: 0 },
    });
    if (!subTitles) {
      if (currentType === type) {
        selected = true;
      } else if (lastType === type) {
        lastSelected = true;
      }
      let className = "tab";
      if (type === "header") {
        className += " header";
      }
      return (
        <animated.div
          className={className}
          style={
            selected ? growAnimation : lastSelected ? shrinkAnimation : null
          }
        >
          <Title type={type} renderTitle={renderTitle} />
          <Content visible={selected ? true : lastSelected ? "last" : false} />
        </animated.div>
      );
    }
    if (subTitles) {
      const subTitleTypeIsCurrent = subTitles.find(
        (subTitle) => subTitle.type === currentType
      );
      const subTitleTypeIsLast = subTitles.find(
        (subTitle) => subTitle.type === lastType
      );
      const bothAnimation = useSpring({
        from: { flexGrow: 1 },
        to: { flexGrow: 1 },
        config: { duration: 0 },
      });
      let visible;
      if (subTitleTypeIsCurrent && subTitleTypeIsLast) {
        animation = bothAnimation;
        visible = "both";
      } else if (subTitleTypeIsCurrent) {
        animation = growAnimation;
        visible = true;
      } else if (subTitleTypeIsLast) {
        animation = shrinkAnimation;
        visible = "last";
      }
      if (visible === "both") {
        if (typeHolder[scrollPoint + 1].type !== subTitleTypeIsLast.type) {
          animation = useSpring({
            from: { flexGrow: 1, right: "0px" },
            to: { flexGrow: 1, right: "calc(100% + 30px)" },
            config: { duration: 0 },
          });
          return (
            <div className="tab" style={{ flexGrow: 1 }}>
              <SubTitles subTitles={subTitles} renderTitle={renderTitle} />
              <animated.div className="subContentHolder" style={animation}>
                <StaticContent visible={"last"} />
                <StaticContent visible={visible} />
              </animated.div>
            </div>
          );
        } else {
          animation = useSpring({
            from: { flexGrow: 1, right: "100%" },
            to: { flexGrow: 1, right: "0px" },
            config: { duration: 0 },
          });
          return (
            <div className="tab" style={{ flexGrow: 1 }}>
              <SubTitles subTitles={subTitles} renderTitle={renderTitle} />
              <animated.div className="subContentHolder" style={animation}>
                <StaticContent visible={visible} />
                <StaticContent visible={"last"} />
              </animated.div>
            </div>
          );
        }
        function StaticContent({ visible }) {
          return (
            <div className="contentHolder">
              {visible === "last"
                ? typeHolder[lastScroll.current].content
                : visible
                ? typeHolder[scrollPoint].content
                : null}
            </div>
          );
        }
      }
      return (
        <animated.div className="tab" style={animation}>
          <SubTitles subTitles={subTitles} renderTitle={renderTitle} />
          <Content visible={visible} />
        </animated.div>
      );
      function Content({ visible }) {
        const animation = contentAnimation(visible);
        return (
          <animated.div className="contentHolder" style={animation}>
            {visible === "last"
              ? typeHolder[lastScroll.current].content
              : visible
              ? typeHolder[scrollPoint].content
              : null}
          </animated.div>
        );
      }
      function SubTitles({ subTitles, renderTitle }) {
        function SubTitleTitle() {
          let className = "title";
          if (!subTitleTypeIsCurrent) {
            className += " inactiveTitle";
          } else {
            className += " activeTitle";
          }
          return (
            <>
              <div
                style={{
                  gridColumn: "1/2",
                  gridRow: "1/2",
                  display: "flex",
                }}
              >
                <p
                  className={className}
                  onClick={() => {
                    lastScroll.current = scrollRef.current;
                    setScrollPoint(
                      typeHolder.find((object) => object.type === type).id
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
                  {renderTitle}
                </p>
                <p className={className}>&nbsp;-</p>
              </div>
            </>
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
            } else {
              className += " activeTitle";
            }
            return (
              <p
                className={className}
                style={style}
                onClick={() => {
                  lastScroll.current = scrollRef.current;
                  setScrollPoint(
                    typeHolder.find((object) => object.type === type).id
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
      } else {
        className += " activeTitle";
      }
      return (
        <p
          className={className}
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
            setScrollPoint(
              typeHolder.find((object) => object.type === type).id
            );
          }}
        >
          {renderTitle}
        </p>
      );
    }
    function Content({ visible, animation }) {
      const growAnimation = useSpring({
        from: { flexGrow: 0, height: 0 },
        to: { flexGrow: 1, maxHeight: "maxContent" },
        config: { duration: 0 },
      });
      const shrinkAnimation = useSpring({
        from: { flexGrow: 1, maxHeight: "maxContent" },
        to: { flexGrow: 0, height: 0 },
        config: { duration: 0 },
      });
      const noAnimation = useSpring({
        from: { flexGrow: 0, maxHeight: 0 },
        to: { flexGrow: 0, height: 0 },
        config: { duration: 0 },
      });
      if (visible === true) {
        animation = growAnimation;
      } else if (visible === "last") {
        animation = shrinkAnimation;
      } else {
        animation = noAnimation;
      }
      return (
        <animated.div className="contentHolder" style={animation}>
          {visible === "last"
            ? typeHolder[lastScroll.current].content
            : visible
            ? typeHolder[scrollPoint].content
            : null}
        </animated.div>
      );
    }
  }
  const initialBlock = useSpring({
    from: {
      height: "calc(100%)",
    },
    to: {
      height: "0px",
    },
    config: { duration: 0 },
  });
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
        <animated.div className="initialBlock" style={initialBlock} />
      </div>
      <div className="blocker bottom" />
    </>
  );
}
