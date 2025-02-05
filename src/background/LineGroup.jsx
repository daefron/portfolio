import SingleLine from "./SingleLine";
export default function App({ speedMult }) {
  return (
    <div
      className="backgroundHolder"
      style={{
        height: "100%",
        top:"19%",
        left: "20%",
        zIndex: "-50",
        position: "fixed",
      }}
    >
      <SingleLine startAngle={-5} startSpeed={0} speedMult={speedMult} />
      <SingleLine startAngle={0} startSpeed={0.08} speedMult={speedMult} />
      <SingleLine startAngle={10} startSpeed={0.08} speedMult={speedMult} />
      <SingleLine startAngle={20} startSpeed={0.08} speedMult={speedMult} />
      <SingleLine startAngle={30} startSpeed={0.08} speedMult={speedMult} />
      <SingleLine startAngle={40} startSpeed={0.08} speedMult={speedMult} />
      <SingleLine startAngle={45} startSpeed={0} speedMult={speedMult} />
      <SingleLine startAngle={0} startSpeed={-0.08} speedMult={speedMult} />
      <SingleLine startAngle={10} startSpeed={-0.08} speedMult={speedMult} />
      <SingleLine startAngle={20} startSpeed={-0.08} speedMult={speedMult} />
      <SingleLine startAngle={30} startSpeed={-0.08} speedMult={speedMult} />
      <SingleLine startAngle={40} startSpeed={-0.08} speedMult={speedMult} />
    </div>
  );
}
