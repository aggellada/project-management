import { forwardRef, useRef } from "react";
import { motion } from "framer-motion";

const Modal = forwardRef(function Modal(
  { closeModal, submitForm, minimumDate },
  ref
) {
  const titleRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();

  const saveButton = (e) => {
    e.preventDefault();

    if (
      titleRef.current.value.trim() === "" ||
      dateRef.current.value.trim() === "" ||
      descriptionRef.current.value.trim() === ""
    ) {
      return;
    }

    const title = titleRef.current.value;
    const date = dateRef.current.value;
    const description = descriptionRef.current.value;

    const newDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      weekday: "long",
    };

    const formattedDate = newDate.toLocaleDateString("en-US", options);
    const projectDay = newDate.toLocaleDateString("en-US", { day: "numeric" });

    const project = { title, formattedDate, description, projectDay };
    submitForm(project);
    closeModal();
  };

  return (
    <motion.dialog
      ref={ref}
      onClose={closeModal}
      initial={{ opacity: 0, y: "-100px" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <h1>Add Project Entry</h1>
      <p>Fill in the form below.</p>
      <form onSubmit={(e) => saveButton(e)} className="add_project_form">
        <div className="input_group">
          <label>Title:</label>
          <input type="text" ref={titleRef} />
        </div>
        <div className="input_group">
          <label>Date:</label>
          <input type="date" ref={dateRef} min={minimumDate} />
        </div>
        <div className="input_group">
          <label>Description:</label>
          <textarea ref={descriptionRef} rows="4" />
        </div>
        <div className="form_button_div">
          <button className="cancel_button" onClick={closeModal}>
            Cancel
          </button>
          <button className="save_button">Save</button>
        </div>
      </form>
    </motion.dialog>
  );
});

export default Modal;
