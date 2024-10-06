import { signInWithPopup, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' //画面遷移
import { auth, provider } from '../firebase';
import "./Home.css";
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from "../firebase";

const Home = ({ isAuth }) => {
  const [noteList, setNoteList] = useState([]);

  const handleDelete = async(id) => {
    await deleteDoc(doc(db, "notes", id));
    window.location.href = "/";
  }

  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(collection(db, "notes"));
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));//data関数で取り出す
      setNoteList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));//data関数で取り出す
    }
    getNotes();
  }, []);

  // const navigate = useNavigate();

  // const loginInWithGoogle = () => {
  //   //googleでログイン
  //   signInWithPopup(auth, provider).then((result)=> {
  //     // console.log(result);
  //     localStorage.setItem("IsAuth", true);
  //     setIsAuth(true);
  //     navigate("/app");
  //   })
  // }

  return (
    <>
      {/* <div>
        ここはホーム画面です。
        <button onClick={loginInWithGoogle}>
          Googleでログイン
        </button>
      </div>
      <div>
        <button onClick={logout}>
          ログアウト
        </button>
      </div> */}
      <div className='homePage'>
        {noteList.map((note) => {
          return (
              <div className="noteContents" key={note.id}>
              <div className="noteHeader">
                <h1>{note.title}</h1>
              </div>
              <div className="noteTextContainer">
                {note.notesText}
              </div>
              <div className="nameAndDeleteButton">
                <h3>投稿者ネーム : {note.author.username}</h3>
                {isAuth && note.author.id === auth.currentUser.uid &&(
                <button onClick={() => handleDelete(note.id)}>削除</button>
              )}
            </div>
          </div>
          )
        })}
      </div>
    </>
  )
}

export default Home
