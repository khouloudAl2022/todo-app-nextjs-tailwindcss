'use client';


import { VscAdd } from "react-icons/vsc"
import Modal from "./Modal"
import { FormEventHandler, useState } from "react"
import { addTodo } from "@/api";

const AddTask = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [newTaskValue, setNEwTaskValue] = useState<string>("")

    
    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        await addTodo({
            id: Math.random(),
            text: newTaskValue
        })     
        setNEwTaskValue("")  
        setModalOpen(false);
        
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
