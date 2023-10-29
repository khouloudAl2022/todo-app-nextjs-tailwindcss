import { ITask } from '@/types/tasks'
import React from 'react'

interface TodoListProps {
  tasks: ITask[]
}


const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>id</th>
            <th>task</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => {
            return (<tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.text}</td>
              <td></td>
            </tr>)
          })}


        </tbody>
      </table>
    </div>
  )
}

export default TodoList
