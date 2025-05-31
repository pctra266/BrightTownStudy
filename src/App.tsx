import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Flashcard from "./pages/Flashcard/Flashcard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/flashcard" element={<Flashcard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
