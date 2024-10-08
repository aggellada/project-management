export default function Topbar({ currentDate }) {
  return (
    <div className="top_bar">
      <div>
        <h1>Hi, Alejandro!</h1>
      </div>
      <div className="date">
        <p>{currentDate}</p>
      </div>
    </div>
  );
}
