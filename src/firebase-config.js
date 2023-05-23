import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpdoryq_z_RbucgEjxfXHleYORIIm5Twk",
  authDomain: "seek-and-find-33dd4.firebaseapp.com",
  projectId: "seek-and-find-33dd4",
  storageBucket: "seek-and-find-33dd4.appspot.com",
  messagingSenderId: "635412325658",
  appId: "1:635412325658:web:300a1a7a39c7de9362b8a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
const db = getFirestore(app);

//Collection ref
const personsRef = collection(db, "persons");

export { app, personsRef };
