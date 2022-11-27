import './App.css';
import "./bootstrap.min.css"
import {Route, Routes} from "react-router"
import {BrowserRouter} from "react-router-dom";
import LoginScreen from "./components/login/login-screen";
import MainView from "./components/main/main-view";
import AdminMainView from "./components/admin/admin-main-view";
import TechnicianMainView from "./components/technician/tech-main-view";


function App() {
  return (
    <div className="App container-fluid m-0 p-0">
        <BrowserRouter>
                <Routes>
                    <Route index element={<LoginScreen/>}/>
                    <Route path="/main" element={<MainView/>}/>
                    <Route path="/admin" element={<AdminMainView/>}/>
                    <Route path="/tech" element={<TechnicianMainView/>}/>
                </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
