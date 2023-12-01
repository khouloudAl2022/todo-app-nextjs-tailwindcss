"use client";

import { ITask } from "@/types/tasks";
import React, { useEffect } from "react";
import Task from "./Task";
import { useQuery } from "@tanstack/react-query";
import { getAllTodos } from "@/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import SpinnerLoading from "./SpinnerLoading";

const TodoList = () => {

  const { data, isLoading, isError, isSuccess } = useQuery({ queryKey: ["userTodos"], queryFn: getAllTodos });


  if (isError) {
    return <div>error...</div>
  }
  if (isLoading) {
    return <div><SpinnerLoading/></div>;
  }


  return (
    <div className="w-full ">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="">
            <th>Task</th>
            <th className="flex justify-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((task) => {
              return <Task task={task} key={task.id} />;
            })}
        </tbody>
      </table>
      <ToastContainer />

    </div>
  );
};

export default TodoList;
