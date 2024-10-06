import { StrictMode, useEffect, useState } from 'react' //useStateをインポートしないと状態管理はできない。
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from "./components/Navbar";

function Main() {
  //ローカルストレージから状態を読み込む
  const [isAuth, setIsAuth] = useState(() => {
    const storedIsAuth = localStorage.getItem("IsAuth");
    return storedIsAuth ? JSON.parse(storedIsAuth) : false; 
    //ローカルストレージに保存された値を初期値に設定
  });

  useEffect(() => {
    localStorage.setItem("IsAuth", JSON.stringify(isAuth));
  }, [isAuth]);

  return (
  <StrictMode>
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />}></Route>
        {/* <Route path="/login" element={<Login setIsAuth={setIsAuth} />}></Route> */}
        <Route path='/app' element={<App/>}></Route>
      </Routes>
    </Router>
    {/* <App /> */}
  </StrictMode>
  )
}
createRoot(document.getElementById('root')).render(<Main />);
