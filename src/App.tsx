import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Library from "./pages/Library";
import Flashcards from "./features/Flashcard/Flashcards";
import FlashcardsCreate from "./features/Flashcard/FlashcardsCreate";
import FlashcardsUpdate from "./features/Flashcard/FlashcardsUpdate";
import NotFound from "./pages/NotFound";
import FlashcardsPlay from "./features/Flashcard/FlashcardsPlay";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/library" element={<Library />} />
          <Route path="/flashcard" element={<Flashcards/>} />
          <Route path="/flashcard/new" element={<FlashcardsCreate/>} />
          <Route path="/flashcard/edit/:id" element={<FlashcardsUpdate/>} />
          <Route path="/flashcard/:id/play" element={<FlashcardsPlay/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
