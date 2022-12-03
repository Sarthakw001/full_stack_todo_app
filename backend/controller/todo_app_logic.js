const Todo = require("../model/todo_app_schema");

// home
exports.home = (req, res) => {
  res.status(200).send("Hello from Admin of Todo_app");
};

// createTodo
exports.createTodo = async (req, res) => {
  try {
    const title = req.body.title;

    const user_id = req.params.user_id;

    if (!title) {
      res.status(401).send("Please Enter title to create a todo");
      return;
    }

    const existingTitle = await Todo.findOne({ title });
    if (existingTitle) {
      res.status(401).send("title already exist!");
      return;
    }

    const todo = await Todo.create({ title , user_id});
    res.status(201).json({
      success: true,
      message: "todo created Succesfully",
      todo
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// create Todo_task
exports.createTodo_task = async (req, res) => {
  try {
    const todo_id = req.params.id;

    const todo = await Todo.findById(todo_id);

    const { task } = req.body;

    if (task) {
      todo.task.push(task);

      await todo.save();

      res.status(201).json({
        success: true,
        todo,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// deleteTodo
exports.deleteTodo = async (req, res) => {
  try {
    const todo_id = req.params.id;

    await Todo.findByIdAndDelete(todo_id);
    res.status(201).json({
      success: true,
      message: "deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// getTodos
exports.getTodos = async (req, res) => {
  try {
    const {user_id} = req.params;
    const todos = await Todo.find({user_id:user_id});
    res.status(201).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error);
  }
};

// deleteTodo_task
exports.deleteTodo_task = async (req, res) => {
  try {
    const todo_id = req.params.id;
    const task_index = req.params.index;

    const todo = await Todo.findById(todo_id);

    todo.task.splice(task_index, 1);

    await todo.save();

    res.status(201).json({
      success: true,
      message: "task deleted Successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.searchTodo = async (req, res) => {
  try {
    const { searchTodo } = req.body;

    const {user_id} = req.params;

    const searchTodos = searchTodo.split(" ");

    const todoArray = new Array();

    searchTodos.forEach((element) => {
      todoArray.push({ title: { $regex: String(element) } });
    });

    const todo = await Todo.find({user_id : user_id, $or: todoArray });

    if (!todo) res.status(400).send({ error: "No task was found" });

    res.status(201).json({
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editTodo_title = async (req, res) => {
  try {
    const todo_id = req.params.id;

    const { title } = req.body;

    const todo = await Todo.findById(todo_id);

    if (todo && title) {
      todo.title = title;

      await todo.save();
    }
    res.status(201).json({
      success: true,
      message: "Tittle changed succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editTodo_task = async (req, res) => {
  try {
    const todo_id = req.params.id;
    const { index } = req.params;

    const {task} = req.body;

    const todo = await Todo.findById(todo_id);

    if (todo && task) {
      todo.task[index] = task;
      await todo.save();
      res.status(201).json({
        success: true,
        message: "task updated Successfully",
      });
    }
  } catch (error) {}
};
