import Calc from "./Calc";
import "./style.css";

function App() {
  return (
    <div className="App">
      <div className="mission-header">Leaving Earth Mission Calculator</div>
      <div className="calc-wrapper">
        <Calc />
      </div>
      <div className="mission-footer"></div>
    </div>
  );
}

export default App;
