import { useState } from "react";
import Tasks from "../components/TodoTasks";
import styles from "../pages/TodoListPage.module.css";
import Category from "../utils/CategoryColour";
import * as Todo from "../utils/TodoListFetch";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Lists({ list }) {
  const [taskName, setTaskName] = useState("");

  const listId = list.list_id;

  const isCompleted = list.tasks.filter(
    (tasks) => tasks.item_is_checked === true,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Todo.addItem({ listId, taskName });
    } catch (error) {
      throw error;
    }

    window.location.reload();
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await Todo.deleteList(list.list_id);
    } catch (error) {
      throw error;
    }

    window.location.reload();
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
                required
                className={styles.taskInput}
                type="text"
                placeholder="Add task"
                maxLength={50}
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <button className={styles.addTaskButton}>
                <PlusIcon className={styles.iconContainer} />
              </button>
            </form>
          </li>
        )}
      </ul>
      <div className={styles.todoEdit}>
        <button className={styles.deleteListButton} onClick={handleDelete}>
          <TrashIcon className={styles.iconContainer} />
          <p>Delete list</p>
        </button>
      </div>
    </div>
  );
}
