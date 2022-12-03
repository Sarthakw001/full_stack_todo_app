import React from "react";
import { Link, useParams } from "react-router-dom";
import { account } from "../appwrite_config/appwrite";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const TodoHomepage = () => {
  const { sessionId } = useParams();
  // console.log(sessionId);
  const [user, setUser] = useState({});
  const [todos, setTodos] = useState(null);
  const getUser = async () => {
    await account.get().then(
      function (response) {
        // console.log(response);
        setUser(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const deleteSession = async () => {
    await account.deleteSession(sessionId).then(
      function (response) {
        // console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const [title, setTitle] = useState("");

  // console.log(user.$id);

  const createTodo = async () => {
    // console.log(title);
    const user_id = user.$id;
    // console.log(user_id);
    const res = await axios
      .post(`/createTodo/${user_id}`, { title })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    createTodo();

    setTitle("");
  };

  const fetchTodoData = async () => {
    const res = await axios
      .get(`/getTodos/${user.$id}`)
      .then((res) => {
        // console.log(res);
        setTodos(res.data.todos);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(todos);
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    fetchTodoData();
  });

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  // console.log(tasks);

  const deleteTodo = async (todoId) => {
    console.log(todoId);
    const res = await axios.delete(`/deleteTodo/${todoId}`);
  };

  const editTodoTitle = async (todoId) => {
    const title = prompt("Enter the new title");
    const res = await axios.put(`/editTodo_title/${todoId}`, { title });
  };

  const addTask = async (todoId) => {
    const task = prompt("enter the task");
    const res = await axios.put(`/createTodo_task/${todoId}`, { task });
  };

  return (
    <section className="mb-40">
      <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Link className="navbar-brand text-blue-600">
              <svg
                className="w-5 h-5 ml-2 lg:ml-0 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"
                ></path>
              </svg>
            </Link>
            <h1 className="text-sm sm:text-xl font-bold">
              Hello <span className="text-blue-600">{user.name}</span>
            </h1>
          </div>
          <div className="flex items-center lg:ml-auto">
            <Link
              to={"/"}
              onClick={deleteSession}
              className="inline-block px-5 sm:px-7 py-2.5 bg-red-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
      <form onSubmit={handleAdd}>
        <div className="mt-10">
          <div className="flex justify-center">
            <div className="mb-3 w-1/2 sm:w-3/5">
              <div className="input-group relative flex-wrap justify-center flex mb-4">
                <label
                  htmlFor="title"
                  className="font-body text-lg sm:text-3xl p-2"
                >
                  Create Todo
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-blue-600 border-2 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-700 focus:outline-none"
                  placeholder="title"
                />
                <div className="m-4 sm:m-6">
                  <button
                    className="btn inline-block px-8 py-2 sm:px-14 sm:py-3 border-2  text-white bg-blue-600 font-medium text-lg leading-tight uppercase rounded-full focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="w-full flex justify-center">
        <div className="w-4/5 sm:w-3/5 ">
          {todos &&
            todos.map((todo, index) => {
              return (
                <Fragment key={index}>
                  <Accordion className="mt-4" open={open === index + 1}>
                    <AccordionHeader onClick={() => handleOpen(index + 1)}>
                      {todo.title}
                    </AccordionHeader>
                    <div className="float-right">
                      <button
                        onClick={() => {
                          addTask(todo._id);
                        }}
                        className="px-4 text-green-600 font-bold"
                      >
                        Add task
                      </button>
                      <button
                        onClick={() => {
                          editTodoTitle(todo._id);
                        }}
                        className="px-4  text-blue-800 font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteTodo(todo._id);
                        }}
                        className="px-4  text-red-600 font-bold"
                      >
                        Delete
                      </button>
                    </div>
                    <AccordionBody className="h-max">
                      <div>
                        <ol>
                          {
                            todo.task.map((task, index) => {
                              return (
                                <li
                                  key={index}
                                  className="text-xs w-40 sm:text-lg"
                                >
                                  {task}
                                </li>
                              );
                            })}
                        </ol>
                      </div>
                    </AccordionBody>
                  </Accordion>
                </Fragment>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default TodoHomepage;

// return (
//   <Todos
//     key={index}
//     title={todo.title}
//     index={index + 1}
//     todoId={todo._id}
//     tasks={todo.task}
//   />
// );
