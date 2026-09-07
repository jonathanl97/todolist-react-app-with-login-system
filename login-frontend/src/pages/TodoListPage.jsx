import { useEffect, useState } from "react";
import styles from "./TodoListPage.module.css";
import * as Todo from "../utils/TodoListFetch";
import Lists from "../components/TodoLists";
import CreateTodoModal from "../components/CreateTodo";
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

export default function TodoListPage() {
  const [todoLists, setTodoLists] = useState([]);
  const [archivedLists, setArchivedLists] = useState([]);
  const [showArchive, setShowArchive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getLists = async () => {
      const lists = await Todo.getLists();
      setTodoLists(lists);
    };
    getLists();
  }, []);

  const activeLists = todoLists.filter(
    (lists) => lists.list_is_completed === false,
  );

  const completedLists = todoLists.filter(
    (lists) => lists.list_is_completed === true,
  );

  return (
    <>
      <div>
        <h1 style={{ marginTop: 60 }}>Todo lists:</h1>
        <div className={styles.listTabButtons}>
          <button
            className={
              showArchive ? styles.activeButton : styles.selectedActiveButton
            }
            onClick={() => setShowArchive(false)}
          >
            Active
          </button>
          <button
            className={
              showArchive
                ? styles.selectedCompletedButton
                : styles.completedButton
            }
            onClick={() => setShowArchive(true)}
          >
            Completed
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.listContainer}>
          <div className={styles.leftMargin} />
          <div className={styles.responsiveLayout}>
            {showArchive
              ? completedLists.map((list) => (
                  <Lists key={list.list_id} list={list} />
                ))
              : activeLists.map((list) => (
                  <Lists key={list.list_id} list={list} />
                ))}
          </div>
          {!showArchive && (
            <div className={styles.sideBar}>
              <div className={styles.createList}>
                <button
                  className={styles.createButton}
                  onClick={() => setShowModal(true)}
                >
                  <PlusIcon className={styles.iconContainer} />
                  <p>Create</p>
                </button>
              </div>
            </div>
          )}
          {showArchive && <div className={styles.rightMargin} />}
          <CreateTodoModal
            showModal={showModal}
            onClose={() => setShowModal(false)}
          />
        </div>
      </div>
    </>
  );
}
