import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeView from "./view/HomeView";
import AdminView from "./view/AdminView";
const App = () => {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header>
          <Link to="/">React Shopping Cart</Link>
          <Link to="/admin">Admin</Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/admin" element={<AdminView />} />
          </Routes>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
