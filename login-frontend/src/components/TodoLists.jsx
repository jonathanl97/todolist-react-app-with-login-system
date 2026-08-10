import { useState } from "react";
import Tasks from "../components/TodoTasks";
import styles from "../pages/TodoListPage.module.css";
import {
  PlusIcon,
  StopIcon,
  CheckIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export default function Lists({ list }) {
  const [editList, setEditList] = useState(false);

  const isCompleted = list.tasks.filter(
    (tasks) => tasks.item_is_checked === true,
  );

  if (isCompleted.length == list.tasks.length) {
    console.log(isCompleted.length, list.tasks.length);
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.listHeader}>
        <div className={styles.taskCount}>
          <p>x/{list.tasks.length}</p>
        </div>
        <div className={styles.listTitle}>
          <h2>{list.list_name}</h2>
        </div>
        <div className={styles.testDiv}>
          <PencilSquareIcon className={styles.iconContainer} />
        </div>
      </div>
      <h3>{list.list_category}</h3>
      <ul>
        {list.tasks.map((task) => (
          <Tasks key={task.item_id} task={task} listId={list.list_id} />
        ))}
      </ul>
      <div className={styles.todoEdit}>
        <button className={styles.addButton}>
          <PlusIcon className={styles.iconContainer} />
          <p>Add</p>
        </button>
      </div>
    </div>
  );
}
