import Arrow from "./Arrow";
export default function App() {
  const intervalTime = 50;
  return (
    <div
      className="backgroundHolder"
      style={{
        height: "100%",
        left: "20%",
        zIndex: "-50",
        position: "fixed",
      }}
    >
      <Arrow
        startAngle={-4.7}
        startSpeed={-0.0001}
        intervalTime={intervalTime}
      />
      <Arrow startAngle={0} startSpeed={0.1} intervalTime={intervalTime} />
      <Arrow startAngle={10} startSpeed={0.1} intervalTime={intervalTime} />
      <Arrow startAngle={20} startSpeed={0.1} intervalTime={intervalTime} />
      <Arrow startAngle={30} startSpeed={0.1} intervalTime={intervalTime} />
      <Arrow startAngle={40} startSpeed={0.1} intervalTime={intervalTime} />
      <Arrow
        startAngle={44.7}
        startSpeed={0.0001}
        intervalTime={intervalTime}
      />
      <Arrow startAngle={0} startSpeed={-0.1} intervalTime={intervalTime} />
      <Arrow startAngle={10} startSpeed={-0.1} intervalTime={intervalTime} />
      <Arrow startAngle={20} startSpeed={-0.1} intervalTime={intervalTime} />
      <Arrow startAngle={30} startSpeed={-0.1} intervalTime={intervalTime} />
      <Arrow startAngle={40} startSpeed={-0.1} intervalTime={intervalTime} />
    </div>
  );
}
