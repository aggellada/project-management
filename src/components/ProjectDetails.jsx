import { useRef } from "react";
import Bottombar from "./Bottombar";

export default function ProjectDetails({
  projectDetails,
  projects,
  submitTaskForm,
  doneTask,
  saveEditTask,
  editTask,
  deleteTask,
  projectsNavigation,
}) {
  const taskRef = useRef();
  const editRef = useRef([]);

  const currentProject = projects.find(
    (project) => projectDetails.id === project.id
  );

  const addTask = (e) => {
    e.preventDefault();
    const task = taskRef.current.value;
    if (task.trim("") === "") return;

    const taskObject = {
      task: task,
      isEditing: false,
      isDone: false,
      taskId: Math.random(),
    };

    submitTaskForm(currentProject.id, taskObject);
    taskRef.current.value = "";
  };

  const saveTaskButton = (taskId, i) => {
    const editedTask = editRef.current[i].value;
    saveEditTask(currentProject.id, taskId, editedTask);
  };

  return (
    <>
      <div className="selected_project">
        <div className="project_details_container">
          <div className="go_back_div">
            <button onClick={projectsNavigation} className="go_back">
              Back
            </button>
          </div>
          <div className="main_details">
            <div className="text">
              <p>{currentProject.title}</p>
              <p>{currentProject.formattedDate}</p>
              <p>{currentProject.description}</p>
            </div>
          </div>
          <form className="form_task" onSubmit={(e) => addTask(e)}>
            <input type="text" ref={taskRef} />
            <button className="add_task_button">+Add Task</button>
          </form>
          <div className="task">
            {currentProject.tasks.length > 0 ? (
              <>
                {currentProject.tasks.map((taskObj, i) => {
                  return (
                    <div
                      className={
                        taskObj.isDone ? "task_card_done" : "task_card"
                      }
                      key={i}
                    >
                      {taskObj.isEditing ? (
                        <input
                          type="text"
                          ref={(el) => (editRef.current[i] = el)}
                          defaultValue={taskObj.task}
                        />
                      ) : (
                        <p>{taskObj.task}</p>
                      )}
                      <div className="task_actions">
                        <button
                          onClick={() =>
                            deleteTask(currentProject.id, taskObj.taskId)
                          }
                        >
                          <img
                            className="menu_img"
                            src="https://cdn3.iconfinder.com/data/icons/streamline-icon-set-free-pack/48/Streamline-70-512.png"
                          />
                        </button>
                        {taskObj.isEditing ? (
                          <button
                            onClick={() => saveTaskButton(taskObj.taskId, i)}
                          >
                            <img
                              className="menu_img"
                              src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png"
                            />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              editTask(currentProject.id, taskObj.taskId)
                            }
                          >
                            <img
                              className="menu_img"
                              src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png"
                            />
                          </button>
                        )}

                        <button
                          onClick={() =>
                            doneTask(currentProject.id, taskObj.taskId)
                          }
                        >
                          <img
                            className="menu_img"
                            src="https://cdn2.iconfinder.com/data/icons/250-perfect-vector-pictograms/48/9.7-512.png"
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <p>No tasks has been added yet.</p>
            )}
          </div>
        </div>
        <Bottombar />
      </div>
    </>
  );
}
