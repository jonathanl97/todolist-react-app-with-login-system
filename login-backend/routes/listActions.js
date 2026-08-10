import express from "express";
import { pool } from "../db.js";
import { checkAuthenticated } from "./auth.js";

const router = express.Router();

//create list
router.post("/todo/createlist", checkAuthenticated, async (req, res) => {
  const { listName, listCategory } = req.body;

  try {
    const response = await pool.query(
      "INSERT INTO todo_lists (user_id, list_name, list_cataegory) VALUES ($1, $2, $3)",
      [req.user.id, listName, listCategory],
    );
  } catch (err) {
    throw err;
  }
  //const userId = req.user; //user.id? user.user_id?
});

// ( edit list name )
router.put("/todo/editlistname", checkAuthenticated, async (req, res) => {
  const { listId, listName } = req.body;

  try {
    const response = await pool.query(
      "UPDATE todo_lists SET list_name=$1 WHERE list_id=$2 AND user_id=$3",
      [listName, listId, req.user.id],
    );
  } catch (err) {
    throw err;
  }
});

//remove list
router.delete("/todo/deletelist", checkAuthenticated, async (req, res) => {
  const { listId } = req.body;
  // req.user id, cascade delete all list items too

  try {
    const response = await pool.query(
      "DELETE FROM todo_lists WHERE list_id=$1",
      [listId],
    );
  } catch (err) {
    throw err;
  }
});

//add item (update list)
router.post("/todo/additem", checkAuthenticated, async (req, res) => {
  const { listId, itemName } = req.body; //taskName?
  // req.user id

  try {
    const response = await pool.query(
      "INSERT INTO list_items (list_id, itemName) VALUES ($1, $2)",
      [listId, itemName],
    );
  } catch (err) {
    throw err;
  }
});

// ( edit item )
router.put("/todo/edititemname", checkAuthenticated, async (req, res) => {
  const { listId, itemId, itemName } = req.body;
  // req.user id

  try {
    const response = await pool.query(
      "UPDATE list_items SET item_name=$1 WERE list_id=$2 AND item_id=$3",
      [itemName, list_id, itemId],
    );
  } catch (err) {
    throw err;
  }
});

//check item
router.put("/todo/checkitem", checkAuthenticated, async (req, res) => {
  const { itemId, isChecked } = req.body;

  try {
    const response = await pool.query(
      "UPDATE list_items SET item_is_checked=$1 WHERE item_id=$2",
      [isChecked, itemId],
    );
  } catch (err) {
    throw err;
  }

  res.status(201).json("Checked");
});

//remove item
router.delete("/todo/deleteitem", checkAuthenticated, async (req, res) => {
  const { itemId } = req.body;
  // req.user id

  try {
    const response = await pool.query(
      "DELETE FROM list_items WHERE item_id=$1",
      [itemId],
    );
  } catch (err) {
    throw err;
  }
});

//get archived lists
router.post("/todo/getarchive", checkAuthenticated, async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT list_id, list_name, list_category FROM todo_lists WHERE user_id=$1 AND list_is_completed=$2",
      [req.user.id, true],
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
