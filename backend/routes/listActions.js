import express from "express";
import { pool } from "../db.js";
import { checkAuthenticated } from "./auth.js";

const router = express.Router();

//create list
router.post("/todo/createlist", checkAuthenticated, async (req, res) => {
  const { title, category } = req.body;

  try {
    await pool.query(
      "INSERT INTO todo_lists (user_id, list_name, list_category) VALUES ($1, $2, $3)",
      [req.user.id, title, category],
    );
    res.status(200).json("List created");
  } catch (err) {
    throw err;
  }
});

//remove list
router.delete("/todo/deletelist", checkAuthenticated, async (req, res) => {
  const { listId } = req.body;

  try {
    await pool.query("DELETE FROM todo_lists WHERE list_id=$1", [listId]);
    res.status(200).json("List deleted");
  } catch (err) {
    throw err;
  }
});

//add item (update list)
router.post("/todo/additem", checkAuthenticated, async (req, res) => {
  const { listId, taskName } = req.body;

  try {
    await pool.query(
      "INSERT INTO list_items (list_id, item_name) VALUES ($1, $2)",
      [listId, taskName],
    );
    res.status(200).json("Task added");
  } catch (err) {
    throw err;
  }
});

//check item
router.put("/todo/checkitem", checkAuthenticated, async (req, res) => {
  const { itemId, isChecked, listId } = req.body;

  try {
    await pool.query(
      "UPDATE list_items SET item_is_checked=$1 WHERE item_id=$2",
      [isChecked, itemId],
    );

    archiveList(listId);

    res.status(201).json("Task checked/unchecked");
  } catch (err) {
    throw err;
  }
});

//archives or unarchives a list based on the if all tasks are checked or not
async function archiveList(listId) {
  const list = await pool.query("SELECT * FROM list_items WHERE list_id=$1", [
    listId,
  ]);

  const completedTasks = await pool.query(
    "SELECT * FROM list_items WHERE list_id=$1 AND item_is_checked=$2",
    [listId, true],
  );

  if (list.rowCount > 0 && list.rowCount == completedTasks.rowCount) {
    await pool.query(
      "UPDATE todo_lists SET list_is_completed=$1 WHERE list_id=$2",
      [true, listId],
    );
  } else {
    await pool.query(
      "UPDATE todo_lists SET list_is_completed=$1 WHERE list_id=$2",
      [false, listId],
    );
  }
}

//remove item
router.delete("/todo/deleteitem", checkAuthenticated, async (req, res) => {
  const { itemId } = req.body;

  try {
    await pool.query("DELETE FROM list_items WHERE item_id=$1", [itemId]);
    res.status(200).json("Task deleted");
  } catch (err) {
    throw err;
  }
});

//get lists
router.post("/todo/getlists", checkAuthenticated, async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT list_id, list_name, list_category, list_is_completed FROM todo_lists WHERE user_id=$1",
      [req.user.id],
    );

    const responseArray = response.rows;

    const todoList = [];
    let listObject = {};
    for (let i = 0; i < responseArray.length; i++) {
      const tasks = await pool.query(
        "SELECT * FROM list_items WHERE list_id=$1",
        [responseArray[i].list_id],
      );
      listObject = { ...responseArray[i], tasks: tasks.rows };
      todoList[i] = listObject;
    }
    res.status(200).json(todoList);
  } catch (err) {
    throw err;
  }
});

export default router;
