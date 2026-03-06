import { BrowserRouter, Routes, Route } from "react-router-dom"
import Reg from "./reg"
import Home from "./home"
import Login from "./login"
import Dashboard from "./dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/h" element={<Home />} />
        <Route path="/reg" element={<Reg />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App