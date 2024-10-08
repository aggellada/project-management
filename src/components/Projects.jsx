import { useRef, useEffect } from "react";
import CircularProgress from "./CircularProgress";
import { motion } from "framer-motion";
export default function Projects({
  projects,
  openActions,
  deleteProject,
  actionsIsShowingId,
  projectDetailsClick,
  currentDay,
  doneProject,
}) {
  const actionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        openActions(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionsRef]);

  return (
    <div className="middle_content_projects">
      <div className="middle_box_no_border">
        {projects.map((project) => {
          const tasksDoneArray = project.tasks.filter((task) => task.isDone);

          return (
            <motion.div
              className={
                project.isDone ? "project_card project_done" : "project_card"
              }
              onClick={() => projectDetailsClick(project)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              key={project.id}
            >
              <button
                className="spreader"
                onClick={(e) => openActions(e, project.id)}
              >
                ...
              </button>
              <div
                className="project_details"
                onClick={() => projectDetailsClick(project)}
              >
                <div className={project.isDone ? "done" : "progress_div"}>
                  {project.isDone ? (
                    <p>DONE</p>
                  ) : (
                    <>
                      <div className="in_progress">
                        <p>IN PROGRESS</p>
                      </div>
                      <div className="days_left">
                        <p>{project.projectDay - currentDay} days left</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="project_details_content">
                  <div className="project_details_headers">
                    <p>Title </p>
                    <p>Due Date </p>
                    <p>Description </p>
                  </div>
                  <div>
                    <p>{project.title}</p>
                    <p>{project.formattedDate}</p>
                    <p>{project.description}</p>
                  </div>
                </div>
              </div>
              <div className="svg_div">
                <CircularProgress
                  progress={
                    tasksDoneArray.length > 0 ? tasksDoneArray.length : 0
                  }
                  max={project.tasks.length > 0 ? project.tasks.length : 100}
                  isDone={project.isDone}
                />
              </div>
              {actionsIsShowingId === project.id && (
                <div className="project_actions" ref={actionsRef} open>
                  <button onClick={(e) => doneProject(e, project.id)}>
                    Done
                  </button>
                  <button onClick={(e) => deleteProject(e, project.id)}>
                    Delete
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
