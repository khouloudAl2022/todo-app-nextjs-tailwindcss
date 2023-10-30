import { ITask } from '@/types/tasks'
import React from 'react'
import Task from './Task'

interface TodoListProps {
  tasks: ITask[]
}


const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
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
          {tasks.map(task => {
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
