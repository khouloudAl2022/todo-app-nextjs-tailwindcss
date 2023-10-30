'use client';

import { ITask } from '@/types/tasks'
import React, { FormEventHandler, useState } from 'react'
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import Modal from './Modal';
import { deleteTodo, editTodo, getAllTodos } from '@/api';
import { useRouter } from 'next/navigation';

interface TaskProps {
    task: ITask
}
const Task: React.FC<TaskProps> = ({ task }: TaskProps) => {
    const router = useRouter()
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [taskToEdit, setTaskTodEdit] = useState<string>(task.text)

    //handle edit function
    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        await editTodo({
            id: task.id,
            text: taskToEdit
        })
        setTaskTodEdit("")
        setOpenModalEdit(false);
        router.refresh()
    }
    //handle delete function 
    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id)
        setOpenModalDelete(false)
        router.refresh()
    }

    return (
        <tr key={task.id}>
            <td>{task.text}</td>
            <td className='flex'>
                <div className='flex justify-center items-center gap-4'>
                    <AiOutlineEdit cursor='pointer' className="text-violet-500" onClick={() => setOpenModalEdit(true)} />
                    <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
                        <form onSubmit={handleSubmitEditTodo}>
                            <h3 className="font-bold text-lg">Edit task</h3>

                            <div className="modal-action">
                                <input value={taskToEdit} onChange={e => setTaskTodEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered input-primary w-full" />
                                <button type="submit" className="btn btn-primary"> Add</button>
                            </div>
                        </form>
                    </Modal>
                    <IoTrashBinOutline cursor='pointer' className='text-red-400' onClick={() => setOpenModalDelete(true)} />
                    <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} >

                        <div className="modal-action">
                            <h3 className="font-normal text-lg ">Are you sure you want to delete this task ?</h3>

                            <button type="button" className="btn btn-primary" onClick={() => handleDeleteTask(task.id)}>Yess</button>
                        </div>
                    </Modal>
                </div>
            </td>
        </tr>
    )
}

export default Task
