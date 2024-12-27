import { animated, useSpring } from "@react-spring/web";
import { useState, useEffect, useRef } from "react";
export default function App() {
  const [scrollPoint, setScrollPoint] = useState(0);
  const scrollRef = useRef();
  const lastScroll = useRef();
  scrollRef.current = scrollPoint;
  const scrollDelay = useRef(false);
  useEffect(() => {
    const scrollEvent = addEventListener("wheel", (e) => scroll(e));
    const touchStartEvent = addEventListener("touchstart", touchStart);
    const touchEndEvent = addEventListener("touchend", touchEnd);
    const touchMoveEvent = addEventListener("touchmove", (e) => touchMove(e));
    let lastTouch;
    function touchEnd() {
      removeEventListener("touchstart", touchStartEvent);
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
            console.log(distance);
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
            }, 750);
          }
        }
      }
      lastTouch = touch;
    }
    function touchStart() {}
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
      }, 750);
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
      return (
        <animated.div
          className={selected ? "tab activeTab" : "tab"}
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
        visible = true;
      } else if (subTitleTypeIsCurrent) {
        animation = growAnimation;
        visible = true;
      } else if (subTitleTypeIsLast) {
        animation = shrinkAnimation;
        visible = "last";
      }
      return (
        <animated.div
          className={selected ? "tab activeTab" : "tab"}
          style={animation}
        >
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
  return (
    <>
      <div className="blocker top" />
      <div className="mainDiv">
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
      </div>
      <div className="blocker bottom" />
    </>
  );
}
