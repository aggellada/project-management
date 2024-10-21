export default function Topbar({ currentDate }) {
  return (
    <div className="top_bar">
      <div className="date">
        <p>{currentDate}</p>
      </div>
    </div>
  );
}
