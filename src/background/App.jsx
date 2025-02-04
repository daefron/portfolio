import Arrow from "./Arrow";
export default function App() {
  const startAngle = Math.random() * 90;
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
      <Arrow startAngle={startAngle} />
      <Arrow startAngle={startAngle} />
      <Arrow startAngle={startAngle} />
      <Arrow startAngle={startAngle} />
      <Arrow startAngle={startAngle} />
      <Arrow startAngle={startAngle} />
      <Arrow startAngle={startAngle} />
      <Arrow startAngle={startAngle} />
      <Arrow startAngle={startAngle} />
      <Arrow startAngle={startAngle} />
      <Arrow startAngle={startAngle} />
      <Arrow startAngle={startAngle} />
      <Arrow startAngle={startAngle} />
      <Arrow startAngle={startAngle} />
      </div>
  );
}
