import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCO4xN3_ZtoLYpY-rmVPqmlM-GC_fjOWVo",
  authDomain: "blog-46941.firebaseapp.com",
  projectId: "blog-46941",
  storageBucket: "blog-46941.appspot.com",
  messagingSenderId: "388871692463",
  appId: "1:388871692463:web:8cc72b783425d34671f45a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };