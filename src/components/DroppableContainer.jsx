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
      className={`border-2 rounded-xl p-6 flex flex-col gap-4 transition ${
        isOver ? "bg-gray-200" : "border-gray-400"
      }`}
      >
      {children}
    </div>
        
        </>
    )
}