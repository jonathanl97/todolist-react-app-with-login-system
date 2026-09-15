import { useState } from "react";
import styles from "../pages/TodoListPage.module.css";
import * as Todo from "../utils/TodoListFetch";
import { StopIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Tasks({ task, listId }) {
  const [checked, setChecked] = useState(task.item_is_checked);

  const handleCheck = async (itemId, isChecked) => {
    try {
      await Todo.checkItem({ itemId, isChecked, listId });
      setChecked(!checked);
    } catch (error) {
      throw error;
    }

    window.location.reload();
  };

  const handleDelete = async (itemId) => {
    try {
      await Todo.deleteItem({ itemId });
    } catch (error) {
      throw error;
    }

    window.location.reload();
  };

  return (
    <li>
      <div className={styles.taskContainer}>
        <button
          className={styles.checkButton}
          onClick={() => handleCheck(task.item_id, !task.item_is_checked)}
        >
          {checked ? (
            <CheckIcon className={styles.iconContainer} />
          ) : (
            <StopIcon className={styles.iconContainer} />
          )}
        </button>
        <p className={checked ? styles.checkedItemText : styles.itemText}>
          {task.item_name}
        </p>
      </div>
      <div className={styles.itemEdit}>
        <button
          className={styles.deleteTaskButton}
          onClick={() => handleDelete(task.item_id)}
        >
          <TrashIcon className={styles.iconContainer} />
        </button>
      </div>
    </li>
  );
}
