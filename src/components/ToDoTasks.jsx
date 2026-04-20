import { TaskCard } from "./TaskCard"
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import { SortableItem } from "./SortableItem"
import { DroppableContainer } from "./DroppableContainer"
export function ToDoTasks ({tasks, editMethod, startMethod, deleteMethod, editedTitle, setEditedTitle, editedDescription, setEditedDescription, editedPriority, setEditedPriority}) {
    return (
        <>
        <DroppableContainer id={"todo-column"} status={"ToDo"}>
        <h2 className="mb-6 text-center">ToDo Tasks: ({tasks.ToDo.length})</h2>
        <SortableContext strategy={verticalListSortingStrategy}
        items={tasks.ToDo.map(task => task.id)}
        >
        {tasks.ToDo.map((task => (
            <SortableItem key={task.id} task={task}>
          
                <TaskCard task={task} startMethod={startMethod} editMethod={editMethod} deleteMethod={deleteMethod} editedTitle={editedTitle} setEditedTitle={setEditedTitle} editedDescription={editedDescription} setEditedDescription={setEditedDescription} editedPriority={editedPriority} setEditedPriority={setEditedPriority}/>
         
            </SortableItem>
        )))

        }
        </SortableContext>
    </DroppableContainer>
        
        </>
    )
}