// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfpK7Y2ggWBnb-o5j76EUud6mNNMeyA6s",
  authDomain: "kanban-final-e7e8b.firebaseapp.com",
  projectId: "kanban-final-e7e8b",
  storageBucket: "kanban-final-e7e8b.firebasestorage.app",
  messagingSenderId: "835731628220",
  appId: "1:835731628220:web:056a7933e880139c32f0b9"
};

// Initialize Firebase
const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app;