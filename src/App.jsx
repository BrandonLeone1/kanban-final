import { useState } from 'react'
import { AddTask } from './components/AddTask'
import { ToDoTasks } from './components/ToDoTasks'
import {DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { StartedTasks } from './components/StartedTasks'
import { FinishedTasks } from './components/FinishedTasks'
import { Column } from './components/Column'
function App() {

  const [tasks, setTasks] = useState({
    ToDo: [],
    Started: [],
    Finished: []
  });

  const [editedTitle, setEditedTitle] = useState({});
  const [editedDescription, setEditedDescription] = useState({});
  const [editedPriority, setEditedPriority] = useState({});

  function addMethod (taskToAdd) {
    setTasks(prev => ( {
      ...prev,
      ToDo: [...prev["ToDo"], taskToAdd]
    }))
  }

  function deleteMethod (taskToDelete) {
    setTasks(prev => ({
      ...prev,
      [taskToDelete.status]: prev[taskToDelete.status].filter(task => task.id !== taskToDelete.id)
    }))
  }

  function editMethod (editedTask) {
    setTasks(prev => ({
      ...prev,
      [editedTask.status]: prev[editedTask.status].map(task => {
        if (task.id === editedTask.id) {
          return editedTask
        } else {
          return task
        }
      })
    }))
  }

  function handleDragEnd (event) {
    const {active, over} = event;

    if (!active.id || !over) {return}

    let activeStatus = active.data.current.status
    let overStatus = over.data.current.status
    let activeColumn = [...tasks[activeStatus]]

    if (activeStatus === overStatus) {
      let activeIndex = tasks[activeStatus].findIndex(task => task.id === active.id)
      let overIndex = tasks[overStatus].findIndex(task => task.id === over.id)

      let swapped = arrayMove(activeColumn, activeIndex, overIndex)


      let updatedArray = swapped.map((task, index) => {
        return {
          ...task,
          order: index
        }
      })

      setTasks(prev => ({
        ...prev,
        [activeStatus]: updatedArray
      }))
    } else {
      let taskToChange = tasks[activeStatus].find(task => task.id === active.id)
      let activeArray = [...tasks[activeStatus]]
      let overArray = [...tasks[overStatus]]
      
      activeArray = activeArray.map(task => {
        if (task.id === taskToChange.id) {
          return {
            ...task,
            status: overStatus
          } 
        } else {
            return task
          }
      })

      let itemToMoveIndex = activeArray.findIndex(task => task.id === active.id)
      let [itemToMove] = activeArray.splice(itemToMoveIndex, 1)
      overArray.splice(0, 0, itemToMove)

      setTasks(prev => ({
        ...prev,
        [activeStatus]: activeArray,
        [overStatus]: overArray
      }))
      
    }
  }


  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  )
  return (
    <>
      <AddTask addMethod={addMethod} />
      <main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-350 mx-auto max-w-[90%]'>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Column status={"ToDo"} tasks={tasks} editMethod={editMethod} deleteMethod={deleteMethod} editedTitle={editedTitle} editedDescription={editedDescription} editedPriority={editedPriority} setEditedTitle={setEditedTitle} setEditedDescription={setEditedDescription} setEditedPriority={setEditedPriority}/>
      <Column status={"Started"} tasks={tasks} editMethod={editMethod} deleteMethod={deleteMethod} editedTitle={editedTitle} editedDescription={editedDescription} editedPriority={editedPriority} setEditedTitle={setEditedTitle} setEditedDescription={setEditedDescription} setEditedPriority={setEditedPriority}/>
      <Column status={"Finished"} tasks={tasks} editMethod={editMethod} deleteMethod={deleteMethod} editedTitle={editedTitle} editedDescription={editedDescription} editedPriority={editedPriority} setEditedTitle={setEditedTitle} setEditedDescription={setEditedDescription} setEditedPriority={setEditedPriority}/>
      </DndContext>
      </main>
    </>
  )
}

export default App
