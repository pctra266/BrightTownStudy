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
import Login from "./features/Auth/components/Login";
import SignUp from "./features/Auth/components/SignUp";
import User from "./features/Auth/components/User";
import Admin from "./features/Auth/components/Admin";

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
