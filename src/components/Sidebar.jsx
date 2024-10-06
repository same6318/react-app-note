import React from 'react'
import "./Sidebar.css";
import { useNavigate } from 'react-router-dom' //画面遷移
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from "../firebase";
import { useState, useEffect } from 'react';

const Sidebar = ({ onAddNote, notes, activeNote, setActiveNote, onDeleteNote }) => {
  
  const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);
  const navigate = useNavigate();

  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(collection(db, "notes"));
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));//data関数で取り出す
      setNoteList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));//data関数で取り出す
    }
    getNotes();
  }, []);

  useEffect(() => {
    setNoteList(notes); //Appコンポーネントから受け取ったnotesをセットする
  }, [notes]);//notesが変更された時に更新する。

  return (
    <div className="app-sidebar">
      <div className='app-sidebar-header'>
        <h1>ノート</h1>
        <button onClick={onAddNote}>追加</button>
      </div>
      <div className="app-sidebar-notes">
      {sortedNotes.map((note) => (
        <div className={`app-sidebar-note ${note.id === activeNote && "active"}`} key={note.id} onClick={() => setActiveNote(note.id)}>
          {/* クリックしたIDを比較してCSSを当てる */}
          <div className="sidebar-note-title">
            <strong>{note.title}</strong>
            <button onClick={() => onDeleteNote(note.id)}>削除</button>
            {/* 押した時に削除関数が発火するように、アロー関数で定義する */}
          </div>
          <p>{note.content}</p>
          <small>
            {new Date(note.modDate).toLocaleDateString("ja-JP", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>
          {/* <button onClick={() => handleDelete(note.id)}>削除</button> */}
        </div>
        ))};
      </div>
    </div>
  );
};

export default Sidebar;
