import { ITask } from '@/types/tasks'
import React from 'react'

interface TaskProps {
    task: ITask
}
const Task: React.FC<TaskProps> = ({ task }: TaskProps) => {
    return (
        <tr key={task.id}>
            <td>{task.text}</td>
            <td>j</td>
        </tr>
    )
}

export default Task
