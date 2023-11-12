'use client'

import { ITask } from '@/types/tasks'
import React from 'react'
import Task from './Task'
import { useQuery } from '@tanstack/react-query'
import { getAllTodos } from '@/api'

interface TodoListProps {
  tasks: ITask[]
}


const TodoList: React.FC<TodoListProps> = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userTodos"],
    queryFn: getAllTodos
  })
  console.log("dataaaaaaa", data)

  if (isLoading) return <div>Loading ...</div>

  return (
    <div className="w-full ">
      <table className="table">
        {/* head */}
        <thead>
          <tr className=''>
            <th>Task</th>
            <th className='flex justify-end'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map(task => {
            return (
              <Task task={task} key={task.id} />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TodoList
