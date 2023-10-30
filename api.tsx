import { stringify } from "postcss";
import { ITask } from "./types/tasks"
import { useEffect } from "react";

const baseUrl = 'http://localhost:3001'


// get todo 

export const getAllTodos = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });
    const todos = await res.json();
    return todos;
}


// add todo 

export const addTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
    const newTodo = await res.json()
    return newTodo;
}

//edit todo 

export const editTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
    const editedTodo = await res.json()
    return editedTodo;
}
// delete todo 

export const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/tasks/${id}`, {
        method: "DELETE",
       
    })

}