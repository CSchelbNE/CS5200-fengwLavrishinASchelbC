import './vendor_styles/bootstrap.min.css'
import './App.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="App container-fluid">
      <header className="App-header">
        <FontAwesomeIcon icon={faCoffee}/>
      </header>
    </div>
  );
}

export default App;
