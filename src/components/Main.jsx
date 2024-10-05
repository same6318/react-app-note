import React, { useState } from 'react'
import "./Main.css";
import ReactMarkdown from "react-markdown";
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Main = ({ activeNote, onUpdateNote }) => {
  // titleとnoteTextをuseStateで状態管理する
  const [title, setTitle] = useState(activeNote?.title || "");
  const [noteText, setNoteText] = useState(activeNote?.content || "");

  const onEditNote = (key, value) => {
    // 状態を更新する
    if (key === "title") {
      setTitle(value); //入力されたタイトルを更新する
    } else if (key === "content") {
      setNoteText(value); //入力されたテキストを更新する
    }

    // 更新された状態をactiveNote=選択されたnoteに反映させる
    onUpdateNote({
      ...activeNote, //元々のオブジェクトの状態に情報を追加する
      [key]: value, //動的keyを使用して、どちらのinputからのデータなのかを判定する
      modDate: Date.now(),
    })
  }

  const createNote = async() => {
    try {
      await addDoc(collection(db, "notes"), {
        title: title,
        notesText: noteText,
        author: {
          username: auth.currentUser.displayName,
          id: auth.currentUser.uid
        }
      });
      console.log("ノートが正常に追加されました");
    } catch (error) {
      console.error("ノートの追加でエラーが発生しました：", error);
    }
  }

  if(!activeNote) {
    return <div className='no-active-note'>ノートが選択されていません</div>
  } //初期値がfalseなのでエラーが出現する為、ifで返すものを記載しておく

  return (
    <div className='app-main'>
      <div className="app-main-note-edit">
        <input 
          id='title'
          type="text" 
          value={activeNote.title} 
          // value={title} //useStateで管理されているtitleを使用すると、新規作成のノートまでデータ引継ぎされるので、駄目
          onChange={(e) => onEditNote("title", e.target.value)} 
        />
        <textarea 
          id="content" 
          placeholder='ノート内容を記入'
          value={activeNote.content}
          // value={noteText} //useStateで管理されているnoteTextを使用すると、新規作成のノートまでデータ引継ぎされるので、駄目
          onChange={(e) => onEditNote("content", e.target.value)} 
        ></textarea>
        <button onClick={createNote}>ノートを保存する</button>
      </div>
      <div className="main-note-preview">
        <h1 className='preview-title'>{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default Main