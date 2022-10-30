import './vendor_styles/bootstrap.min.css'
import './App.css';
import {Route, Routes} from "react-router"
import {BrowserRouter} from "react-router-dom";
import LoginScreen from "./components/login/login-screen";
import SignUpModal from "./components/signup/signup-screen";

function App() {
  return (
    <div className="App container-fluid">
        <BrowserRouter>
            <Routes>
                <Route index element={<LoginScreen/>}/>
                <Route path="/sign-up" element={<SignUpModal/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
