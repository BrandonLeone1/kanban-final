import { useEffect, useState } from 'react'
import { AddTask } from './components/AddTask'
import {DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Column } from './components/Column'
import {auth, db} from './services/Firebase'
import { SignIn } from './components/SignIn'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot, query, where, QuerySnapshot } from "firebase/firestore"; 
import { Loading } from './components/Loading'

function App() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsub();

  }, []

)

console.log(user)

  const [tasks, setTasks] = useState({
    ToDo: [],
    Started: [],
    Finished: []
  });

  useEffect(() => {

    if (!user) {return}

    const q = query(collection(db, "users", user.uid, "tasks"))

    const unsub = onSnapshot(q, (snapshot) => {
      const groupedTasks = {
        ToDo: [],
        Started: [],
        Finished: []
      }

      snapshot.forEach((doc) => {
        const task = {
          id: doc.id,
          ...doc.data()
        }
        groupedTasks[task.status].push(task)
      })

      Object.keys(groupedTasks).forEach(status => {
      groupedTasks[status].sort((a, b) => a.order - b.order);
      });

      setTasks(groupedTasks);
    })
    return () => unsub();
  }, [user]
)

  const [editedTitle, setEditedTitle] = useState({});
  const [editedDescription, setEditedDescription] = useState({});
  const [editedPriority, setEditedPriority] = useState({});

  async function addMethod (taskToAdd) {
    if (!user) {return}

    try {
    setIsLoading(true)
    await addDoc(collection(db, "users", user.uid, "tasks"), 
    taskToAdd
  )

  setIsLoading(false)
} catch (e) {
  console.log(e)
}
    
  /*
    setTasks(prev => ( {
      ...prev,
      ToDo: [...prev["ToDo"], taskToAdd]
    })) */
  }

  async function deleteMethod (taskToDelete) {
   if (!user) {return}
    try {
      setIsLoading(true)
      await deleteDoc(doc(db, "users", user.uid, "tasks", taskToDelete.id))
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
   /*
    setTasks(prev => ({
      ...prev,
      [taskToDelete.status]: prev[taskToDelete.status].filter(task => task.id !== taskToDelete.id)
    })) */
  }

 async function editMethod (editedTask) {
  if (!user) {return}
  const docRef = doc(db, "users", user.uid, "tasks", editedTask.id);
  
  try {
    setIsLoading(true)
  await updateDoc(docRef, {
    createdOn: editedTask.createdOn,
    order: editedTask.order,
    status: editedTask.status,
    title: editedTask.title,
    description: editedTask.description,
    priority: editedTask.priority
  })

  setIsLoading(false)
} catch (e) {
  console.log(e)
}
  /*
  setTasks(prev => ({
      ...prev,
      [editedTask.status]: prev[editedTask.status].map(task => {
        if (task.id === editedTask.id) {
          return editedTask
        } else {
          return task
        }
      })
    })) */
  }


async function updateTasksInDb(updatedTasks) {
  if (!user) {return} 
  
  const updates = updatedTasks.map(task => {
    const docRef = doc(db, "users", user.uid, "tasks", task.id);

    return updateDoc(docRef, {
      status: task.status,
      order: task.order
    })
  })

  await Promise.all(updates)
}   

 async function handleDragEnd (event) {
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

      await updateTasksInDb(updatedArray)

    /*  setTasks(prev => ({
        ...prev,
        [activeStatus]: updatedArray
      })) */
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
      let overIndex = tasks[overStatus].findIndex(task => task.id === over.id)
      overArray.splice(overIndex, 0, itemToMove)


      const updatedActive = activeArray.map((task, index) => ({
        ...task,
        order: index
      }))

      const updatedOver = overArray.map((task, index) => ({
      ...task,
      order: index
      }));

      await updateTasksInDb([...updatedActive, ...updatedOver]);
     /* setTasks(prev => ({
        ...prev,
        [activeStatus]: activeArray,
        [overStatus]: overArray
      })) */
      
    }
  }


  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  )

 if (isLoading) {
  return <Loading />
 }


  return (
    <>

      { !user && (
        <SignIn />
      ) 

      }
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
