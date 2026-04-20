import { TaskCard } from "./TaskCard"
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import { SortableItem } from "./SortableItem"
import { DroppableContainer } from "./DroppableContainer"

export function FinishedTasks ({tasks, editMethod, deleteMethod, editedTitle, setEditedTitle, editedDescription, setEditedDescription, editedPriority, setEditedPriority}) {
    return (
        <>
        
        <DroppableContainer id={"finished-column"} status={"Finished"}>
        
                <h2 className="mb-6 text-center">Finished Tasks: ({tasks.Finished.length})</h2>
                <SortableContext strategy={verticalListSortingStrategy}
                items={tasks.Finished.map(task => task.id)}
                >
                {tasks.Finished.map((task => (
                    <SortableItem key={task.id} task={task}>
                  
                        <TaskCard task={task} editMethod={editMethod} deleteMethod={deleteMethod} editedTitle={editedTitle} setEditedTitle={setEditedTitle} editedDescription={editedDescription} setEditedDescription={setEditedDescription} editedPriority={editedPriority} setEditedPriority={setEditedPriority}/>
                 
                    </SortableItem>
                )))
        
                }
                </SortableContext>
            
        </DroppableContainer>
        </>
    )
}