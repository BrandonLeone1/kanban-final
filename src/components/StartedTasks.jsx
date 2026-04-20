import { TaskCard } from "./TaskCard"
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import { SortableItem } from "./SortableItem"
import { DroppableContainer } from "./DroppableContainer"

export function StartedTasks ({tasks, editMethod, deleteMethod, editedTitle, setEditedTitle, editedDescription, setEditedDescription, editedPriority, setEditedPriority}) {
    return (
        <>

        

        

        

        <DroppableContainer id={"started-column"} status={"Started"}>
                
                {tasks.Started.length < 1 ? (
            
                <p className="text-center">No started tasks</p>
            
        ) : (
                
                <>
                <h2 className="mb-6 text-center">Started Tasks: ({tasks.Started.length})</h2>
                <SortableContext strategy={verticalListSortingStrategy}
                items={tasks.Started.map(task => task.id)}
                >
                {tasks.Started.map((task => (
                    <SortableItem key={task.id} task={task}>
                  
                        <TaskCard task={task} editMethod={editMethod} deleteMethod={deleteMethod} editedTitle={editedTitle} setEditedTitle={setEditedTitle} editedDescription={editedDescription} setEditedDescription={setEditedDescription} editedPriority={editedPriority} setEditedPriority={setEditedPriority}/>
                 
                    </SortableItem>
                )))
        
                }
                </SortableContext>
</>
            )}
            </DroppableContainer>
        
 
        </>
    )
}