import Routes from "./routes";
import { Toaster } from "react-hot-toast";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div id="program">
        <Toaster />
        <Routes />
      </div>
    </div>
  );
}

export default App;
