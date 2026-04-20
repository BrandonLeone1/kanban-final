import { useState } from "react";

export function TaskCard ({task, editMethod, startMethod, deleteMethod, editedTitle, setEditedTitle, editedDescription, setEditedDescription, editedPriority, setEditedPriority}) {
    
    const [editingTask, setEditingTask] = useState({});
    
    function handleDelete (taskToDelete) {
        deleteMethod(taskToDelete);
    }
    
    function handleEdit (taskToEdit) {
        
        const editedTask = {
            ...taskToEdit,
            title: editedTitle[taskToEdit.id] ? editedTitle[taskToEdit.id] : taskToEdit.title,
            description: editedDescription[taskToEdit.id] ? editedDescription[taskToEdit.id] : taskToEdit.description,
            priority: editedPriority[taskToEdit.id] ? editedPriority[taskToEdit.id] : taskToEdit.priority
        }
        editMethod(editedTask)

        setEditedTitle(prev => ({
            ...prev,
            [task.id]: ""
        }))
        setEditedDescription(prev => ({
            ...prev,
            [task.id]: ""
        }))
        setEditedPriority(prev => ({
            ...prev,
            [task.id]: ""
        }))
        setEditingTask(prev => ({
            ...prev,
            [taskToEdit.id]: false
        }))
    }

    function handleStartTask (taskToStart) {
        const startedTask = {
            ...taskToStart,
            status: "Started"
        }

        startMethod(startedTask, taskToStart)
    }
    return (
        <>
        {editingTask[task.id] ? (
            <div className="flex flex-col gap-4 border border-gray-300 rounded-xl p-6">
                <p>Editing task: {task.title}</p>

                <input 
                type="text"
                placeholder="Enter new title..."
                value={editedTitle[task.id] || ""}
                onChange={(e) => setEditedTitle(prev => ({
                    ...prev,
                    [task.id]: e.target.value
                }))}
                className="border border-gray-300 p-2 rounded-xl"
                />
                <textarea 
                placeholder="Enter new description..."
                value={editedDescription[task.id] || ""}
                onChange={(e) => setEditedDescription(prev => ({
                    ...prev,
                    [task.id]: e.target.value
                }))}
                className="border border-gray-300 p-2 rounded-xl"
                />
                <select
                value={editedPriority[task.id]|| ""}
                onChange={(e) => setEditedPriority(prev => ({
                    ...prev,
                    [task.id]: e.target.value
                }))}
                className="border border-gray-300 p-2 rounded-xl"
                >
                    <option defaultValue>Select new priority</option>
                    <option value={`Low`}>Low</option>
                    <option value={`Medium`}>Medium</option>
                    <option value={`High`}>High</option>
                </select>
                <button 
                className="border border-gray-300 p-2 rounded-xl cursor-pointer w-fit mx-auto hover:bg-gray-100 duration-300"
                onClick={() => handleEdit(task)}>Finish</button>
            </div>
        ) : (

        
        
            <div className={`relative flex flex-col gap-4 border-2 p-6 rounded-xl ${task.priority === "High" ? "border-red-400" : "border-gray-300" }`}>
                <p 
                onClick={() => handleDelete(task)}
                className="absolute top-1 right-2 text-lg cursor-pointer">x</p>
                <p>Title: {task.title}</p>
                <p>Created: {task.createdOn}</p>
                <p>Priority: {task.priority}</p>
                <p>Description: {task.description}</p>
                <p>Status: {task.status}</p>
                <button onClick={() => setEditingTask(prev => ({
                    ...prev,
                    [task.id]: true
                }))}
                className="border border-gray-300 p-2 rounded-xl cursor-pointer w-fit mx-auto hover:bg-gray-100 duration-300"
                >Edit</button>
            </div>
        )

    }
        </>
    )
}