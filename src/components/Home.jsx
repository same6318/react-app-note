import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom' //画面遷移
import { auth, provider } from '../firebase';

const Home = ({ setIsAuth }) => {
  const navigate = useNavigate();

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
    <div>
      ここはホーム画面です。
      <button onClick={loginInWithGoogle}>
        Googleでログイン
      </button>
    </div>
  )
}

export default Home
