import "./App.css";
import MyLayouts from "./components/MyLayouts";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<MyLayouts />} />
        {/* 打开页面之后直接跳转到登录页 */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </>
  );
}

export default App;
