import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClassicMode from "./pages/ClassicMode.tsx";
import BattleMode from "./pages/BattleMode.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/classic" element={<ClassicMode />} />
      <Route path="/battle" element={<BattleMode />} />
    </Routes>
  );
}

export default App;
