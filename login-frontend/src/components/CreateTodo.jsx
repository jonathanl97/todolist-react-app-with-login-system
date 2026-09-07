import { useState } from "react";
import { createPortal } from "react-dom";
import * as Todo from "../utils/TodoListFetch";
import styles from "../pages/TodoListPage.module.css";

export default function CreateTodoModal({ showModal, onClose }) {
  if (!showModal) return null;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");

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
              maxLength={32}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className={styles.formInput}>
            Category:
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Personal">Personal</option>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="School">School</option>
              <option value="Other">Other</option>
            </select>
          </label>
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
