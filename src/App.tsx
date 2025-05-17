import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClassicMode from "./pages/ClassicMode.tsx";
import BattleMode from "./pages/BattleMode.tsx";

function App() {
    const questionCount = 10;
    const timePerQuestionClassic = 15;
    const timePerQuestionBattle = 15;
    const questionCountPerPlayer = 5;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/classic" element={<ClassicMode questionCount={questionCount} timePerQuestion={timePerQuestionClassic} />} />
      <Route path="/battle" element={<BattleMode questionCount={questionCountPerPlayer} timePerQuestion={timePerQuestionBattle} />} />
    </Routes>
  );
}

export default App;
