import { DroppableContainer } from "./DroppableContainer"
import { TaskCard } from "./TaskCard"
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import { SortableItem } from "./SortableItem"

export function Column ({status, tasks, editMethod, deleteMethod, editedTitle, setEditedTitle, editedDescription, setEditedDescription, editedPriority, setEditedPriority}) {
    return (
        <>
        
         <DroppableContainer id={`${status}-column`} status={status}>
                        
                        {tasks[status].length < 1 ? (
                    
                        <p className="text-center">No {status} tasks</p>
                    
                ) : (
                        
                        <>
                        <h2 className="mb-6 text-center">{status} Tasks: ({tasks[status].length})</h2>
                        <SortableContext strategy={verticalListSortingStrategy}
                        items={tasks[status].map(task => task.id)}
                        >
                        {tasks[status].map((task => (
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