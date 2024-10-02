import { StrictMode, useState } from 'react' //useStateをインポートしないと状態管理はできない。
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';

function Main() {
  const [isAuth, setIsAuth] = useState(false);

  return (
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Home setIsAuth={setIsAuth} />}></Route>
        <Route path='/app' element={<App setIsAuth={setIsAuth} />}></Route>
      </Routes>
    </Router>
    {/* <App /> */}
  </StrictMode>
  )
}
createRoot(document.getElementById('root')).render(<Main />);
