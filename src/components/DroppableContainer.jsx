import {useDroppable} from '@dnd-kit/core';


export function DroppableContainer ({id, status, children}) {

    const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      status
    }
  });

    return (
        <>
        <div
      ref={setNodeRef}
      className={` ${status === "ToDo" ? "border-t-4 border-blue-400!" : ""} ${status === "Started" ? "border-t-4 border-yellow-400!" : ""} ${status === "Finished" ? "border-t-4 border-green-400!" : ""} p-6 flex flex-col gap-4 transition ${
        isOver ? "bg-gray-200" : ""
      }`}
      >
      {children}
    </div>
        
        </>
    )
}