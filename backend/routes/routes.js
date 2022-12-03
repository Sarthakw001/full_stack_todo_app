const express = require("express");

const {
  home,
  createTodo,
  createTodo_task,
  deleteTodo,
  getTodos,
  deleteTodo_task,
  searchTodo,
  editTodo_title,
  editTodo_task
} = require("../controller/todo_app_logic");

const {signUp,login} = require("../controller/auth");

const router = express.Router();

router.get("/", home);
router.post("/createTodo/:user_id", createTodo);
router.put("/createTodo_task/:id", createTodo_task);
router.delete("/deleteTodo/:id", deleteTodo);
router.get("/getTodos/:user_id", getTodos);
router.delete("/deleteTodo_task/:id/:index", deleteTodo_task);
router.post("/searchTodo/:user_id", searchTodo);
router.put("/editTodo_title/:id", editTodo_title);
router.put("/editTodo_task/:id/:index", editTodo_task);
router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;
