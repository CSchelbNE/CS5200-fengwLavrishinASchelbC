import './App.css';
import "./bootstrap.min.css"
import {Route, Routes} from "react-router"
import {BrowserRouter} from "react-router-dom";
import LoginScreen from "./components/login/login-screen";
import MainView from "./components/main/main-view";
import AdminMainView from "./components/main/admin-main-view";
import TechMainView from "./components/main/tech-main-view";


function App() {
  return (
    <div className="App container-fluid">
        <BrowserRouter>
                <Routes>
                    <Route index element={<LoginScreen/>}/>
                    <Route path="/main" element={<MainView/>}/>
                    <Route path="/admin" element={<AdminMainView/>}/>
                    <Route path="/tech" element={<TechMainView/>}/>
                </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
