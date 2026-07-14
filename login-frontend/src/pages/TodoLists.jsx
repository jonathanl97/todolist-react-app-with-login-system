import { useEffect, useState } from "react";
import styles from "./TodoLists.module.css";
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

//adding list, send userid
//editing list, send listid
//editing task, enough to send itemid since they are all unique
//adding task, send list id

//create whole list before sending to server. have ability to add tasks to the list afterwards. minimise server requests.

//do the tasks need to be saved client side for smoothness?

//display number of tasks in each list

//filter lists based on completion. load completed lists in archive

export default function TodoLists() {
  //const [todo, setTodo] = useState([]);
  const [todoLists, setTodoLists] = useState([]);
  const [editList, setEditList] = useState(false);

  useEffect(() => {
    const getLists = async () => {
      const lists = await Todo.getLists();
      setTodoLists(lists);
    };
    getLists();
  }, []);

  return (
    <>
      <div>
        <h1 style={{ marginTop: 60, marginBottom: 40 }}>Todo lists:</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.listContainer}>
          {todoLists.map((todo, list_id) => (
            <div key={list_id} className={styles.todoList}>
              <h2>
                {todo.list_name}
                {/* 
                <button
                  className={styles.todoButtons}
                  onClick={() => setEditList(!editList)}
                >
                  <PencilSquareIcon className={styles.iconContainer} />
                </button>
                <button className={styles.todoButtons}>
                  <TrashIcon className={styles.iconContainer} />{" "}
                </button>
                */}
              </h2>
              <h3>{todo.list_category}</h3>
              <ul>
                {todoLists[list_id].tasks.map((task, item_id) => (
                  <li key={item_id}>
                    <p className={styles.itemText}>{task.item_name} </p>
                    <div className={styles.itemEdit}>
                      {editList && (
                        <button className={styles.todoButtons}>
                          <PencilIcon className={styles.iconContainer} />
                        </button>
                      )}
                      {editList && (
                        <button className={styles.todoButtons}>
                          <TrashIcon className={styles.iconContainer} />
                        </button>
                      )}
                      {!editList && (
                        <button className={styles.todoButtons}>
                          <StopIcon className={styles.iconContainer} />
                        </button>
                      )}
                    </div>
                    {/* fix empty space when edit is false */}
                  </li>
                ))}
              </ul>
              <div className={styles.todoEdit}>
                {editList ? (
                  <button
                    className={styles.doneButton}
                    onClick={() => setEditList(!editList)}
                  >
                    <p>Done</p>
                  </button>
                ) : (
                  <button
                    className={styles.editButton}
                    onClick={() => setEditList(!editList)}
                  >
                    <PencilIcon className={styles.iconContainer} />
                    <p>Edit</p>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.createButton}>
            <PlusIcon className={styles.iconContainer} />
            <p>Create</p>
          </button>
          <button className={styles.archiveButton}>
            <ArchiveBoxIcon className={styles.iconContainer} />
            <p>Archive</p>
          </button>
        </div>
      </div>
    </>
  );
}
