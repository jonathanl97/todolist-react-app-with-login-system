import { useState } from "react";
import styles from "../pages/TodoListPage.module.css";
import * as Todo from "../utils/TodoListFetch";
import {
  PlusIcon,
  StopIcon,
  CheckIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export default function Tasks({ task, listId }) {
  const [checked, setChecked] = useState(task.item_is_checked);

  //issues with latency/not registering
  const handleCheck = async (itemId, isChecked) => {
    await Todo.checkItem({ itemId, isChecked });
    setChecked(!checked);
  };

  const handleDelete = async (itemId) => {
    await Todo.deleteItem({ itemId });
    //setstate delete task
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
