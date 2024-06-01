// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOvXRbnQs3-kROAF66ie_M4xRSDq7AW_k",
  authDomain: "chatapp-ad5fd.firebaseapp.com",
  projectId: "chatapp-ad5fd",
  storageBucket: "chatapp-ad5fd.appspot.com",
  messagingSenderId: "996239264218",
  appId: "1:996239264218:web:0131c867cde6c5a9d1d8e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Auth ve Firestore nesnelerini oluşturuyoruz.
export const db = getFirestore(app);  //db nesnesi ile Firestore işlemlerini gerçekleştireceğiz.
export const auth = getAuth(app);
//Google ile giriş yapabilmek için provider nesnesini oluşturuyoruz.
export const provider = new GoogleAuthProvider();