export default function ProjectsDefault({ projects, openModal }) {
  return (
    <div className="projects_header">
      <div className="projects_header_content">
        <div>
          <h1>Projects</h1>
          <p>Quick progress check on your projects.</p>
        </div>
        <div>
          {projects.length > 0 && (
            <button className="add_project_button" onClick={openModal}>
              +Add Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
