import './vendor_styles/bootstrap.min.css'
import './App.css';
import {Route, Routes} from "react-router"
import {RouterProvider} from "react-router";
import {BrowserRouter} from "react-router-dom";
import LoginPopup from "./components/login/login-popup";

function App() {
  return (
    <div className="App container-fluid">
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPopup/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
