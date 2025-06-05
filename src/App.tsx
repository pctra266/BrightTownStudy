import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Flashcards from "./features/Flashcard/Flashcards";
import FlashcardsCreate from "./features/Flashcard/FlashcardsCreate";
import FlashcardsUpdate from "./features/Flashcard/FlashcardsUpdate";
import NotFound from "./pages/NotFound";
import FlashcardsPlay from "./features/Flashcard/FlashcardsPlay";
import InspirationHall from "./pages/InspirationHall";
import DiscussionHub from "./pages/DiscussionHub";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import Admin from "./pages/Admin";

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requiredRole?: string;
}> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/library" element={<Library />} />
            <Route path="/flashcard" element={<Flashcards />} />
            <Route path="/flashcard/new" element={<FlashcardsCreate />} />
            <Route path="/flashcard/edit/:id" element={<FlashcardsUpdate />} />
            <Route path="/flashcard/:id/play" element={<FlashcardsPlay />} />
            <Route path="/inspo" element={<InspirationHall />} />
            <Route path="/talk" element={<DiscussionHub />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/user"
              element={
                <ProtectedRoute requiredRole="user">
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
