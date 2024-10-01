import { useEffect, useState } from 'react';
import './App.css'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import uuid from 'react-uuid';


function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []); 
    //ローカルストレージに保存したnotes。json形式なので、parseで取り出す
    //データがない時は、空の配列を用意する（サイドバーにノートを追加していくときに配列形式で保存していくため）
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    //ローカルストレージにノートを保存する
    localStorage.setItem("notes", JSON.stringify(notes)); //JSON形式に変換する関数
  }, [notes]);//notesの中身が変わる度にコールバック関数が発火する

  useEffect(() => {
    if(notes.length > 0) {
      setActiveNote(notes[0].id);
    }
  }, []); //最新の更新されたノート＝配列の0を常に取ってくる

  const onAddNote = () => {
    console.log("新しくノートが追加されました");
    const newNote = {
      id: uuid(), //ランダムIDの作成
      title: "新しいノート",
      content: "",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]); //以前のnotesの情報にnewNoteの情報が追加されていく。スプレッド構文が重要
    console.log(notes);
  };

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    // 押したID以外のnoteを残す為のfilter関数
    setNotes(filterNotes);
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote)
  } //activeNoteの中にはIDが入っていて、notesの中のIDと照合する

  const onUpdateNote = (updatedNote) => {
    //修正された新しいノートの配列を返す。
    const updatedNotesArray = notes.map((note) => {
      if(note.id === updatedNote.id) {
        return updatedNote; //編集されたノート
      } else {
        return note; //編集されていないノート。これはそのまま返す
      }
    });

    //console.log(updatedNotesArray)
    setNotes(updatedNotesArray); //編集された後のnoteの配列を入れたものをsetNotesとして出力する
  };

  return (
    <div className='App'>
      <Sidebar
        onAddNote={onAddNote} 
        notes={notes} 
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  )
}

export default App
