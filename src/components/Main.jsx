import React from 'react'
import "./Main.css";
import ReactMarkdown from "react-markdown";

const Main = ({ activeNote, onUpdateNote }) => {
  const onEditNote = (key, value) => {
    onUpdateNote({
      ...activeNote, //元々のオブジェクトの状態に情報を追加する
      [key]: value, //動的keyを使用して、どちらのinputからのデータなのかを判定する
      modDate: Date.now(),
    })
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
          onChange={(e) => onEditNote("title", e.target.value)} 
        />
        <textarea 
          id="content" 
          placeholder='ノート内容を記入'
          value={activeNote.content}
          onChange={(e) => onEditNote("content", e.target.value)} 
        ></textarea>
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