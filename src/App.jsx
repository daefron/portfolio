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
  const typeHolder = [
    {
      id: 0,
      type: "about",
      content: [
        <p key="about-1">
          I am a completely self-taught front-end web developer.
        </p>,
        <p key="about-2">
          Over the years, I have tried to get into programming who knows how
          many times (I even started studying it at uni briefly) but I never
          could stick with it. Last year, I started working through The Odin
          Project.
        </p>,
        <p key="about-3">It stuck.</p>,
        <p key="about-4" className="subTitle">
          Skills:
        </p>,
        <p key="about-5">
          At this stage, I would say that I am extremely comfortable with the
          foundations (HTML, CSS, JS) of front-end web development (enough so
          that I believe I could make pretty much anything I put my mind to),
          comfortable with React, and have just started dipping my toes into the
          back-end.
        </p>,
        <p key="about-6" className="subTitle">
          This portfolio:
        </p>,
        <p key="about-7">
          While The Odin Project did get me to make a variety of basic projects,
          I decided not to include them in this portfolio and only showcase my
          self-driven projects. You probably already know what the weather is...
        </p>,
      ],
    },
    {
      id: 1,
      type: "project1",
      content: [
        <p key="project1-1">
          A custom built dashboard that shows run data gathered from the Fitbit
          API in a variety of graphs and lists.
        </p>,
        <img key="project1-2" src="./docs/images/runPage.png" />,
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
          <a href="https://react.dev/">React</a>
          <a href="https://recharts.org/">Recharts</a>
          <a href="https://www.fitbit.com/dev">Fitbit API</a>
        </div>,
        <p key="project1-6" className="subTitle">
          Links:
        </p>,
        <div key="project1-7" style={{ display: "flex" }}>
          <p>Live site link: &nbsp;</p>
          <a href="https://runtracker.netlify.app">Here</a>
        </div>,
        <div key="project1-8" style={{ display: "flex" }}>
          <p>Github link: &nbsp;</p>
          <a href="https://github.com/daefron/run-tracker">Here</a>
        </div>,
      ],
    },
    {
      id: 2,
      type: "project2",
      content: [
        <p key="project2-1">
          A "game engine" set within the bounds of a spreadsheet.
        </p>,
        <img key="project2-2" src="./docs/images/spreadsheetPage.png" />,
        <p key="project2-3">
          I needed an interesting, first project to make in React, and the first
          thing that came to mind (when I was having a shower of course) was a
          tower defense game set in a spreadsheet.
        </p>,
        <p key="project2-4">
          At this stage, it's more of an engine than a playable game, but for
          what it is I am proud of it.
        </p>,
        <p key="project2-5" className="subTitle">
          Built with:
        </p>,
        <div style={{ display: "flex", gap: "10px" }} key="project2-6">
          <a href="https://react.dev/">React</a>
        </div>,
        <p key="project2-7" className="subTitle">
          Links:
        </p>,
        <div key="project2-8" style={{ display: "flex" }}>
          <p>Live site link: &nbsp;</p>
          <a href="https://spreadsheetcreep.netlify.app">Here</a>
        </div>,
        <div key="project2-9" style={{ display: "flex" }}>
          <p>Github link: &nbsp;</p>
          <a href="https://github.com/daefron/spreadsheet-creep">Here</a>
        </div>,
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
          <a className="subTitle" href="https://github.com/daefron">
            daefron
          </a>
        </div>,
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
          className="tab"
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
