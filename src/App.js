import { useEffect, useRef, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import Projects from "./components/Projects";
import NoProjects from "./components/NoProjects";
import ProjectDetails from "./components/ProjectDetails";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Bottombar from "./components/Bottombar";
import ProjectsDefault from "./components/ProjectsDefault";
import { AnimatePresence } from "framer-motion";

const INTERVAL_TIME = 1000;
const fetchedProjects = JSON.parse(localStorage.getItem("projects")) || [];

function App() {
  const [projects, setProjects] = useState(fetchedProjects);
  const [projectDetails, setProjectDetails] = useState(null);
  const [currentDateObj, setCurrentDateObj] = useState({
    currentDate: null,
    currentDay: null,
    minimumDate: null,
  });
  const [actionsIsShowingId, setActionsIsShowingId] = useState(false);
  const [modal, setModal] = useState(false);

  const modalRef = useRef();

  // ---------------- USE EFFECTS ----------------

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    getCurrentDateAndTime();
    const interval = setInterval(() => {
      getCurrentDateAndTime();
    }, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (modal) {
      modalRef.current.showModal();
    }
  }, [modal]);

  // ---------------- DATE FUNCTIONS ----------------

  const getCurrentDateAndTime = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const currentDate = date.toLocaleString("en-US", options);
    const currentDay = date.toLocaleDateString("en-US", {
      day: "numeric",
    });
    const yy = date.getFullYear();
    const mm = date.getMonth();
    const dd = String(date.getDate()).padStart(2, "0");
    const minimumDate = `${yy}-${mm + 1}-${dd}`;

    setCurrentDateObj({
      currentDate,
      currentDay,
      minimumDate,
    });
  };

  // ---------------- ACTIONS FUNCTIONALITIES ----------------

  const projectsNavigation = () => {
    setProjectDetails(null);
  };

  const projectDetailsClick = (project) => {
    setProjectDetails(project);
  };

  const openActions = (e, id) => {
    if (e) {
      e.stopPropagation();
    }
    setActionsIsShowingId(actionsIsShowingId === id ? null : id);
  };

  // ---------------- MODAL FUNCTIONALITIES ----------------

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  // ---------------- FORM FUNCTIONALITIES ----------------

  const submitForm = (project) => {
    setProjects((prev) => {
      const projectId = Math.random();
      const projectObject = {
        id: projectId,
        ...project,
        tasks: [],
        isDone: false,
      };
      return [...prev, projectObject];
    });
  };

  const submitTaskForm = (id, taskObject) => {
    setProjects((prev) => {
      return prev.map((projectObj) => {
        if (projectObj.id !== id) return projectObj;
        return {
          ...projectObj,
          tasks: [taskObject, ...projectObj.tasks],
        };
      });
    });
  };

  // ---------------- PROJECT FUNCTIONALITIES ----------------

  const doneProject = (e, id) => {
    e.stopPropagation();

    setProjects((prev) => {
      return prev.map((projectObj) => {
        if (projectObj.id !== id) return projectObj;

        const newIsDone = !projectObj.isDone;

        const updatedTasks = projectObj.tasks.map((task) => ({
          ...task,
          isDone: newIsDone,
        }));

        const allTasksDone = updatedTasks.every((task) => task.isDone);

        return {
          ...projectObj,
          isDone: allTasksDone || !projectObj.isDone,
          tasks: updatedTasks,
        };
      });
    });
    setActionsIsShowingId(null);
  };

  const deleteProject = (e, id) => {
    e.stopPropagation();
    setProjects((prev) => {
      return prev.filter((projectObj) => projectObj.id !== id);
    });
    setActionsIsShowingId(null);
  };

  // ---------------- TASK FUNCTIONALITIES ----------------

  const deleteTask = (id, selectedTaskId) => {
    setProjects((prev) => {
      return prev.map((projectObj) => {
        if (projectObj.id !== id) return projectObj;
        const filteredTask = projectObj.tasks.filter(
          (task) => task.taskId !== selectedTaskId
        );
        return { ...projectObj, tasks: filteredTask };
      });
    });
  };

  const editTask = (id, selectedTaskId) => {
    setProjects((prev) => {
      return prev.map((projectObj) => {
        if (projectObj.id !== id) return projectObj;
        const newTask = projectObj.tasks.map((task) => {
          if (task.taskId !== selectedTaskId) return task;
          return { ...task, isEditing: !task.isEditing };
        });
        return { ...projectObj, tasks: newTask };
      });
    });
  };

  const saveEditTask = (id, selectedTaskId, editedTask) => {
    setProjects((prev) => {
      return prev.map((projectObj) => {
        if (projectObj.id !== id) return projectObj;
        const newTask = projectObj.tasks.map((task) => {
          if (task.taskId !== selectedTaskId) return task;
          return { ...task, task: editedTask, isEditing: !task.isEditing };
        });
        return { ...projectObj, tasks: newTask };
      });
    });
  };

  const doneTask = (id, selectedTaskId) => {
    setProjects((prev) => {
      return prev.map((projectObj) => {
        if (projectObj.id !== id) return projectObj;

        const updatedTasks = projectObj.tasks.map((task) => {
          if (task.taskId !== selectedTaskId) return task;
          return { ...task, isDone: !task.isDone };
        });

        const allTasksDone = updatedTasks.every((task) => task.isDone);

        return { ...projectObj, tasks: updatedTasks, isDone: allTasksDone };
      });
    });
  };

  return (
    <>
      <AnimatePresence>
        {modal && (
          <Modal
            ref={modalRef}
            closeModal={closeModal}
            submitForm={submitForm}
            minimumDate={currentDateObj.minimumDate}
          />
        )}
      </AnimatePresence>
      <div className="wrapper">
        <Sidebar
          projects={projects}
          projectDetailsClick={projectDetailsClick}
        />
        <div className="content">
          <Topbar currentDate={currentDateObj.currentDate} />
          <div className="middle_bar">
            {projectDetails ? (
              <ProjectDetails
                projectDetails={projectDetails}
                projects={projects}
                submitTaskForm={submitTaskForm}
                doneTask={doneTask}
                saveEditTask={saveEditTask}
                editTask={editTask}
                deleteTask={deleteTask}
                projectsNavigation={projectsNavigation}
              />
            ) : (
              <>
                <ProjectsDefault projects={projects} openModal={openModal} />
                {projects.length > 0 ? (
                  <Projects
                    projects={projects}
                    openActions={openActions}
                    deleteProject={deleteProject}
                    actionsIsShowingId={actionsIsShowingId}
                    projectDetailsClick={projectDetailsClick}
                    currentDay={currentDateObj.currentDay}
                    doneProject={doneProject}
                  />
                ) : (
                  <NoProjects openModal={openModal} />
                )}
                <Bottombar />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
