import { useEffect, useState } from "react";
import styles from "./TodoLists.module.css";
import Lists from "../components/TodoList";
import * as Todo from "../utils/TodoListFetch";
import {
  PlusIcon,
  PlusCircleIcon,
  CheckIcon,
  CheckCircleIcon,
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
  const [listInfo, setListInfo] = useState({});

  useEffect(() => {
    const getLists = async () => {
      const lists = await Todo.getLists();
      setListInfo(lists[0].list_name, lists[0].list_category);
      //console.log(lists);
      console.log(listInfo);
    };
    getLists();
  }, []);

  /*
  todo.map(({ list, index }) => {
    return <p key={index}>{list}</p>;
  });

  data.map(({ list, index }) => {
    return (
      <p key={index}>
        {list.list_name}
        {list.category}
      </p>
    );
  });
  */

  return (
    <>
      <div>
        <h1 style={{ marginTop: 60, marginBottom: 40 }}>Todo lists:</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.listContainer}>test</div>
        <div className={styles.buttonContainer}>
          <button className={styles.createButton}>
            <PlusIcon className={styles.iconContainer} />
            Create
          </button>
          <button className={styles.archiveButton}>
            <ArchiveBoxIcon className={styles.iconContainer} />
            Archive
          </button>
        </div>
      </div>
    </>
  );
}
