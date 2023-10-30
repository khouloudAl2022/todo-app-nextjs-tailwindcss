'use client';
import { VscAdd } from "react-icons/vsc"
import Modal from "./Modal"
import { FormEventHandler, useEffect, useState } from "react"
import { addTodo, getAllTodos } from "@/api";
import { ITask } from "@/types/tasks";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';


const AddTask = () => {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [newTaskValue, setNEwTaskValue] = useState<string>("")
    const [todoList, setTodoList] = useState<ITask[]>([]);


    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        await addTodo({
            id: uuidv4(),
            text: newTaskValue
        })
        setNEwTaskValue("")
        await getAllTodos();
        setModalOpen(false);
        router.refresh()


    }

    return (
        <div>
            <button className="btn btn-secondary w-full" onClick={() => setModalOpen(true)}> Add new task <VscAdd /></button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
                <form onSubmit={handleSubmitNewTodo}>
                    <h3 className="font-bold text-lg">Add new task</h3>

                    <div className="modal-action">
                        <input value={newTaskValue} onChange={e => setNEwTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered input-primary w-full" />
                        <button type="submit" className="btn btn-primary"> Add</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddTask
