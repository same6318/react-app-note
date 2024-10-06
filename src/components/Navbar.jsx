import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css";
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom' //画面遷移



const Navbar = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();
  const auth = getAuth();

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

  const loginInWithGoogle = () => {
    //googleでログイン
    signInWithPopup(auth, provider).then((result)=> {
      // console.log(result);
      localStorage.setItem("IsAuth", true);
      setIsAuth(true);
      navigate("/app");
    })
  }

  return (
    <nav>
      <Link to="/">ホーム</Link>
      {!isAuth ?
        (<button className="navButton" onClick={loginInWithGoogle}>ログイン</button>)
      :
      <>
      <Link to="/app">ノート編集画面</Link>
      <button className="navButton" onClick={logout}>ログアウト</button>
      {/* 画面遷移せずにボタンアクションのみ */}
      </>
      }
    </nav>
  )
}

export default Navbar
