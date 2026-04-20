import { useState } from "react"

export function AddTask ({addMethod}) {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [failure, setFailure] = useState(false);

    function handleClick () {
        
        if (title.length < 1 || description.length < 1 || priority.length < 1 ) {
            setFailure(true);
        } else {
        const newTask = {
         
            createdOn: new Date().toLocaleDateString("en-CA"),
            order: Date.now(),
            status: "ToDo",
            title: title,
            description: description,
            priority: priority,
        };


        addMethod(newTask);
        setTitle("");
        setDescription("");
        setPriority("");
    }

    }

    return (
        <>
            <div className="flex w-300 mx-auto max-w-[90%] justify-center mt-12">
                <div className="flex flex-col gap-4">
                    <input 
                    type="text"
                    placeholder="Enter task title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 p-2 rounded-xl"
                    />
                    <textarea 
                    placeholder="Enter task description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 p-2 rounded-xl"
                    />
                    <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="border border-gray-300 p-2 rounded-xl cursor-pointer"
                    >
                        <option defaultValue>Select task priority</option>
                        <option value={`Low`}>Low</option>
                        <option value={`Medium`}>Medium</option>
                        <option value={`High`}>High</option>
                    </select>

                    <button onClick={handleClick}
                    className="border border-gray-300 p-2 rounded-xl cursor-pointer w-fit mx-auto hover:bg-gray-100 duration-300"
                    >Add task</button>
                </div>

                { failure && (
                    <div 
                    onClick={() => setFailure(false)}
                    className="fixed inset-0 bg-black/75 flex justify-center items-center">
                        <div 
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gray-100 h-fit w-fit flex flex-col gap-4 p-6 rounded-xl">
                            <p>You must fill out all fields in order to add a task!</p>
                            <button onClick={() => setFailure(false)} className="block mx-auto w-fit h-fit underline hover:text-olive-500 duration-300 cursor-pointer">Close</button>
                        </div>
                    </div>
                )

                }
            </div>
        </>
    )
}