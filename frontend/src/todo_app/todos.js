import { Fragment, useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import axios from "axios";

export default function Todos({ title, index, todoId, tasks }) {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  // console.log(tasks);

  const deleteTodo = async () => {
    console.log(todoId);
    const res = await axios.delete(`/deleteTodo/${todoId}`);
  };

  const editTodoTitle = async () => {
    const title = prompt("Enter the new title");
    const res = await axios.put(`/editTodo_title/${todoId}`, { title });
  };

  const addTask = async () => {
    const task = prompt("enter the task");
    const res = await axios.put(`/createTodo_task/${todoId}`, { task });
  };

  

  return (
    <Fragment>
      <Accordion className="mt-4" open={open === index}>
        <AccordionHeader onClick={() => handleOpen(index)}>
          {title}
        </AccordionHeader>
        <div className="float-right">
          <button onClick={addTask} className="px-4 text-green-600 font-bold">
            Add task
          </button>
          <button
            onClick={editTodoTitle}
            className="px-4  text-blue-800 font-bold"
          >
            Edit
          </button>
          <button onClick={deleteTodo} className="px-4  text-red-600 font-bold">
            Delete
          </button>
        </div>
        <AccordionBody className="">
          {tasks &&
            tasks.map((task, index) => {
              return (
                <li key={index} className="text-xs w-40 sm:text-lg">
                  {task}
                </li>
              );
            })}
        </AccordionBody>
      </Accordion>
    </Fragment>
  );
}
// {/* <span className="text-xs text-red-600 ml-24"><button>del</button></span> */}
