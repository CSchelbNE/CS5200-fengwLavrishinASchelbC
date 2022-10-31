import './App.css';
import "./bootstrap.min.css"
import {Route, Routes} from "react-router"
import {BrowserRouter} from "react-router-dom";
import LoginScreen from "./components/login/login-screen";
import MainView from "./components/main/main-view";


function App() {
  return (
    <div className="App container-fluid">
        <BrowserRouter>
                <Routes>
                    <Route index element={<LoginScreen/>}/>
                    <Route path="/main" element={<MainView/>}/>
                </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
