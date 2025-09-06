import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { AppProvider } from "./AppContext";
import NormalToDo from "./NormalToDo";
import GamifiedToDo from "./GamifiedToDo";
import "./App.css";

const App: React.FC = () => (
  <AppProvider>
    <Router>
      <nav className="nav-bar">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>To-Do List</NavLink>
        <NavLink to="/gamified" className={({ isActive }) => (isActive ? "active" : "")}>Gamified Grid</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<NormalToDo />} />
        <Route path="/gamified" element={<GamifiedToDo />} />
      </Routes>
    </Router>
  </AppProvider>
);

export default App;
