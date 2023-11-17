'use client';
import { VscAdd } from "react-icons/vsc"
import Modal from "./Modal"
import { FormEventHandler, useEffect, useState } from "react"
import { addTodo, getAllTodos } from "@/api";
import { ITask } from "@/types/tasks";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';


const AddTask = () => {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [newTaskValue, setNEwTaskValue] = useState<string>("")
    const [todoList, setTodoList] = useState<ITask[]>([]);
    const queryClient = useQueryClient()

    const { mutate: submitTodo, isLoading } = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            toast.success("todo added successfully")
            setNEwTaskValue("")
            queryClient.invalidateQueries(['userTodos'])
            setModalOpen(false);

        },
        onError: () => {
            toast.error("todo fail to add")
        }

    })

    // const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {

    //     e.preventDefault()

    //     await addTodo({
    //         id: uuidv4(),
    //         text: newTaskValue
    //     })
    //     await getAllTodos();
    //     setModalOpen(false);
    //     router.refresh()


    // }

    return (
        <div>
            <button className="btn btn-secondary w-full" onClick={() => setModalOpen(true)}> Add new task <VscAdd /></button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
                <form>
                    <h3 className="font-bold text-lg">Add new task</h3>

                    <div className="modal-action">
                        <input value={newTaskValue} onChange={e => setNEwTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered input-primary w-full" />
                        <button type="submit" className="btn btn-primary" onClick={() => submitTodo({ id: uuidv4(), text: newTaskValue })}> Add</button>
                    </div>
                </form>
            </Modal>
            <ToastContainer />

        </div>
    )
}

export default AddTask
