export default function NoProjects({ openModal }) {
  return (
    <div className="middle_content">
      <div className="middle_box">
        <h1>No projects yet.</h1>
        <p>You can start tracking as soon as you add one.</p>
        <button className="add_project_button" onClick={openModal}>
          +Add Project
        </button>
      </div>
    </div>
  );
}
