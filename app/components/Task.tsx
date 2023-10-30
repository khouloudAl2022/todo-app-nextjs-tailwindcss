import { ITask } from '@/types/tasks'
import React from 'react'
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";

interface TaskProps {
    task: ITask
}
const Task: React.FC<TaskProps> = ({ task }: TaskProps) => {
    return (
        <tr key={task.id}>
            <td>{task.text}</td>
            <td className='flex'>
                <div className='flex justify-center items-center gap-4'>
                    <AiOutlineEdit className="text-violet-500" />
                    <IoTrashBinOutline className='text-red-400' /></div>
            </td>
        </tr>
    )
}

export default Task
