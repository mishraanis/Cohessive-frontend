import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./Pages/NUXDashboard";
import Workspace from "./Pages/Workspace";
// import Script
function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="dashboard" element={<Dashboard/>} />
              <Route path="workspace" element={<Workspace/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
