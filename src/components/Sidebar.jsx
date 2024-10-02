import React from 'react'
import "./Sidebar.css";
import { signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom' //画面遷移
import { auth, provider } from '../firebase';

const Sidebar = ({ onAddNote, notes, onDeleteNote, activeNote, setActiveNote, setIsAuth }) => {
  
  const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);
  const navigate = useNavigate();

  const logout = () => {
    //ログアウト
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/");
    })
    .catch((error) => {
      console.error("ログアウト中にエラーが発生しました", error);
    })
  }

  return (
    <div className="app-sidebar">
      <div className='app-sidebar-header'>
        <h1>ノート</h1>
        <button onClick={onAddNote}>追加</button>
        <button onClick={logout}>ログアウト</button>
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
        </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
