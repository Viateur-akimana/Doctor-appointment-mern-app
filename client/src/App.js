import {BrowserRouter, Routes, Route } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
function App() {
  return (
<BrowserRouter>
<Routes>
  <Route to="/" element={<HomePage/>}/>
  <Route to="/login" element={<Login/>}/>
  <Route to="/register" element={<Register/>}/>
</Routes>
</BrowserRouter>
  );
}

export default App;
