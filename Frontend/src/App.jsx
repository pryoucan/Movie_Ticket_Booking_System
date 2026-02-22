import GlobalMovie from "./components/globalNovel";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const API_BASE_URL = "http://localhost:3000/api/v1";
  const isLoggedIn = true;

  return (
    <>
    {isLoggedIn ? <Header/> : null}
    
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GlobalMovie API_BASE_URL={API_BASE_URL}/>} />
        <Route path="/register" element={<Signup API_BASE_URL={API_BASE_URL}/>} />
        <Route path="/login" element={<Login API_BASE_URL={API_BASE_URL}/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
};