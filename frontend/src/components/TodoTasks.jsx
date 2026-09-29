import styles from "../pages/TodoListPage.module.css";
import { StopIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTodo } from "../hooks/useTodo";

export default function Tasks({ task, listId }) {
  const { todoFetch } = useTodo();

  const handleCheck = async (itemId, isChecked) => {
    try {
      await todoFetch("checkitem", "PUT", { itemId, isChecked, listId });
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await todoFetch("deleteitem", "DELETE", { itemId });
    } catch (error) {
      throw error;
    }
  };

  return (
    <li>
      <div className={styles.taskContainer}>
        <button
          className={styles.checkButton}
          onClick={() => handleCheck(task.item_id, !task.item_is_checked)}
        >
          {task.item_is_checked ? (
            <CheckIcon className={styles.iconContainer} />
          ) : (
            <StopIcon className={styles.iconContainer} />
          )}
        </button>
        <p
          className={
            task.item_is_checked ? styles.checkedItemText : styles.itemText
          }
        >
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
