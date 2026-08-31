import { useState } from "react";
import { createPortal } from "react-dom";
import * as Todo from "../utils/TodoListFetch";
import styles from "../pages/TodoListPage.module.css";

export default function CreateTodoModal({ showModal, onClose }) {
  if (!showModal) return null;

  const [newTodo, setNewTodo] = useState({
    title: "",
    category: "",
  });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleTodoChange = (e) => {};

  const handleAddTask = (e) => {};

  const handleDeleteTask = (e) => {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Todo.createList({ title, category });
    } catch (error) {
      throw error;
    }
  };

  return createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.formHeader}>
          <h1 style={{ marginTop: 0 }}>Create list</h1>
        </div>
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <label className={styles.formInput}>
            List name:
            <input
              required
              type="text"
              placeholder="Title"
              value={title}
              onChange={
                (e) => setTitle(e.target.value)
                //setNewTodo({ ...newTodo, title: e.target.value })
              }
            />
          </label>
          <label className={styles.formInput}>
            Category:
            <select
              value={category}
              //add default value
              onChange={
                (e) => setCategory(e.target.value)
                //setNewTodo({ ...newTodo, category: e.target.value })
              }
            >
              <option value="Personal">Personal</option>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="School">School</option>
              <option value="Other">Other</option>
            </select>
          </label>
          {/* 
            {newTodo.tasks.map(() => (
              <label className={styles.formInput}>
                Task name:
                <input type="text" placeholder="Task name" />
              </label>
            ))}
            <button
              className={styles.formButton}
              type="button"
              onClick={handleAddTask}
            >
              Add task
            </button>
            */}
          <div className={styles.buttonContainer}>
            <button
              className={styles.closeButton}
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className={styles.submitButton} type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>,

    document.body,
  );
}
