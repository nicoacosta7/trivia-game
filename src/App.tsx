import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClassicMode from "./pages/ClassicMode.tsx";
import BattleMode from "./pages/BattleMode.tsx";

function App() {
    const questionCount = 10;
    const timePerQuestion = 15;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/classic" element={<ClassicMode questionCount={questionCount} timePerQuestion={timePerQuestion} />} />
      <Route path="/battle" element={<BattleMode />} />
    </Routes>
  );
}

export default App;
