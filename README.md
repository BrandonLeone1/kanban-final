# Task Tracker (Kanban Board)

A full-stack React application for managing tasks using a Kanban-style workflow. Users can create, edit, delete, and drag tasks across and within columns while maintaining persistent ordering. All data is stored per-user and synced in real-time using Firebase Firestore.

## Features
- Create, edit, and delete tasks
- Organize tasks across columns - ToDo, Started, Finished
- Drag-and-drop task movement within and between columns
- Real-time updates using Firebase Firestore (no refresh required)
- Automatic grouping of tasks by status
- Responsive design across devices
- Secure user authentication with Firebase (Google OAuth)

## Setup Locally
1. Clone the repo: 
```bash
git clone https://github.com/BrandonLeone1/kanban-final.git
```
2. Navigate to the project folder:
```bash
cd kanban-final
```
3. Install all dependencies: 
```bash
npm install
```
4. Create a firebase project and add your config inside: 
```bash
/services/Firebase.js
```
5. Start the development server:
```bash
npm run dev
```
6. Usage:
navigate to http://localhost:5173 in your browser. Sign in to begin creating tasks.

## Built With
- React
- Firebase (Auth & Firestore)
- @dnd-kit (drag-and-drop)
- Tailwind CSS
- Vite

## Key concepts / What This Project Demonstrates
- Real-time data syncing with Firestore ( onSnapshot )
- Drag-and-drop interactions using @dnd-kit
- Persisting UI state (task order + status) to a backend
- Managing complex state structures (object with multiple arrays)
- Grouping and transforming backend data into UI-friendly state
- Batch updating multiple documents to maintain ordering

## Challenges
- Maintaining consistent task ordering and implementing persistency across drag-and-drop interactions and Firestore
- Designing a scalable data structure for multi-column task grouping
- Handling cross-column movement while preserving ordering in the source and destination list

## Future Improvements
- Task filterting (search, date created, etc.)
- Due dates and reminders
- Multi-user collaboration/multiple boards per user
- Activity history (which projects/tasks are a bottleneck)
