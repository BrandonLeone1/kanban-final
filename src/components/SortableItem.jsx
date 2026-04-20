import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';


export function SortableItem ({task, children}) {

    const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id: task.id, data: {status: task.status}});

    const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    };


    return (
        <>
        <div ref={setNodeRef} style={style}>
            
            <div {...listeners} {...attributes} className='text-xl hover:scale-110 w-fit mx-auto duration-150 text-center cursor-pointer'>
                ≡
            </div>


            <div>
            {children}
            </div>
        </div>
        </>
    )
}