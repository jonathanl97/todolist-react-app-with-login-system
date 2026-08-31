import { useState } from "react";
import Tasks from "../components/TodoTasks";
import styles from "../pages/TodoListPage.module.css";
import Category from "../utils/CategoryColour";
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

export default function Lists({ list }) {
  const [taskName, setTaskName] = useState("");

  const isCompleted = list.tasks.filter(
    (tasks) => tasks.item_is_checked === true,
  );

  if (list.tasks.length > 0 && isCompleted.length == list.tasks.length) {
    console.log(isCompleted.length, list.tasks.length);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const listId = list.list_id;

    try {
      //send task with list id to server
      //after confirmation add to state/localstorage
      await Todo.addItem({ listId, taskName });
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await Todo.deleteList(list.list_id);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={styles.todoList}>
      <div className={styles.listHeader}>
        <div style={{ width: "2rem" }}></div>
        <div className={styles.listTitle}>
          <h2>{list.list_name}</h2>
        </div>
        <div className={styles.taskCount}>
          <p>
            {isCompleted.length}/{list.tasks.length}
          </p>
        </div>
      </div>
      <Category category={list.list_category} />
      <ul>
        {list.tasks.map((task) => (
          <Tasks key={task.item_id} task={task} listId={list.list_id} />
        ))}

        {!list.list_is_completed && (
          <li>
            <form className={styles.addTask} onSubmit={handleSubmit}>
              <input
                className={styles.taskInput}
                type="text"
                placeholder="Add task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <button className={styles.addTaskButton}>
                <PlusIcon className={styles.iconContainer} />
                {/*<p>Add</p>*/}
              </button>
            </form>
          </li>
        )}
      </ul>
      <div className={styles.todoEdit}>
        <button className={styles.deleteButton} onClick={handleDelete}>
          {/*<TrashIcon className={styles.iconContainer} />*/}
          <p>Delete list</p>
        </button>
      </div>
    </div>
  );
}
