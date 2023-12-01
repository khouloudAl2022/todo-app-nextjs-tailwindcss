'use client';

import { ITask } from '@/types/tasks'
import React, { FormEventHandler, useState } from 'react'
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import Modal from './Modal';
import { deleteTodo, editTodo, getAllTodos } from '@/api';
import { useRouter } from 'next/navigation';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastContainer, toast } from "react-toastify";
import SpinnerLoading from './SpinnerLoading';

interface TaskProps {
    task: ITask
}
const Task: React.FC<TaskProps> = ({ task }: TaskProps) => {
    const router = useRouter()
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [taskToEdit, setTaskTodEdit] = useState<string>(task.text)
    const queryClient = useQueryClient()

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
    //query delete todo task 


    const { mutate: deleteTask, isLoading: deleteLoading } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            toast.success('task deleted successfully'),
                setOpenModalDelete(false)
            queryClient.invalidateQueries(['userToDos'])

        },
        onError: () => {
            toast.error("there was an error")
        }

    })
    //edit todo
    const { mutate: editTask, isLoading: editTodoLoading } = useMutation({
        mutationFn: editTodo,
        onSuccess: () => {
            toast.success('task edited successfully'),
                setOpenModalEdit(false)
            queryClient.invalidateQueries(['userToDos'])

        },
        onError: () => {
            toast.error("there was an error")
        }

    })



    //handle delete function 
    // const handleDeleteTask = async (id: string) => {
    //     await deleteTodo(id)
    //     setOpenModalDelete(false)
    //     router.refresh()
    // }

    return (
        <tr key={task.id}>
            <td>{task.text}</td>
            <td className='flex justify-end'>
                <div className='flex justify-center items-center gap-4'>
                    <AiOutlineEdit cursor='pointer' className="text-violet-500" onClick={() => setOpenModalEdit(true)} />
                    <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
                        <form onSubmit={handleSubmitEditTodo}>
                            <h3 className="font-bold text-lg">Edit task</h3>

                            <div className="modal-action">
                                <input value={taskToEdit} onChange={e => setTaskTodEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered input-primary w-full" />
                                <button type="submit" className="btn btn-primary" onClick={() => editTask({ id: task.id, text: taskToEdit })}> Add</button>
                            </div>
                        </form>
                    </Modal>
                    <IoTrashBinOutline cursor='pointer' className='text-red-400' onClick={() => setOpenModalDelete(true)} />
                    <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} >

                        <div className="modal-action">
                            <h3 className="font-normal text-lg ">Are you sure you want to delete this task ?</h3>
                            <button type="button" className="btn btn-primary" onClick={() => deleteTask(task.id)} disabled={deleteLoading}>Yess</button>
                        </div>
                    </Modal>
                </div>
            </td>
            <ToastContainer />

        </tr>
    )
}

export default Task
