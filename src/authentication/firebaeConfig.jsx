// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD08BX5LSP8AJ_5CA9g6NV96n28IhiWTOQ",
  authDomain: "todo-v-4.firebaseapp.com",
  projectId: "todo-v-4",
  storageBucket: "todo-v-4.appspot.com",
  messagingSenderId: "961209810701",
  appId: "1:961209810701:web:5b46d59381c60252cffa44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig