export default function Sidebar({ projects, projectDetailsClick }) {
  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <h1>Manager</h1>
      </div>
      <div className="sidebar_middle">
        <h2 className="menu">Menu</h2>
        {projects.length > 0 &&
          projects.map((project) => {
            return (
              <div
                className="sidebar_project_title"
                onClick={() => projectDetailsClick(project)}
                key={project.id}
              >
                <p>{project.title}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
