'use client';


import { VscAdd } from "react-icons/vsc"
import Modal from "./Modal"
import { useState } from "react"
const AddTask = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    return (
        <div>
            <button className="btn btn-secondary w-full" onClick={() => setModalOpen(true)}> Add new task <VscAdd /></button>
            <Modal modalOpen={modalOpen} />
        </div>
    )
}

export default AddTask
