import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { AuthProvider, useAuth } from "./context/AuthContext";

import "./features/Auth/services/interceptor";
import Home from "./pages/Home";
import Library from "./pages/Library";
import FlashcardsCreate from "./features/Flashcard/FlashcardsCreate";
import FlashcardsUpdate from "./features/Flashcard/FlashcardsUpdate";
import NotFound from "./pages/NotFound";
import FlashcardsPlay from "./features/Flashcard/FlashcardsPlay";
import InspirationHall from "./pages/InspirationHall";
import DiscussionHub from "./features/Discussion/components/DiscussionHub";
import DiscussionDetail from "./features/Discussion/components/DiscussionDetail";
import CreateDiscussion from "./features/Discussion/components/CreateDiscussion";
import Login from "./features/Auth/components/Login";
import SignUp from "./features/Auth/components/SignUp";
import User from "./features/Auth/components/User";
import Admin from "./features/Auth/components/Admin";
import ForgotPassword from "./features/Auth/components/ForgotPassword";

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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/flashcard/new" element={<FlashcardsCreate />} />
            <Route path="/library/flashcard/edit/:id" element={<FlashcardsUpdate />} />
            <Route path="/library/flashcard/:id/play" element={<FlashcardsPlay />} />
            <Route path="/inspo" element={<InspirationHall />} />
            <Route path="/talk" element={<DiscussionHub />} />
            <Route path="/talk/:id" element={<DiscussionDetail />} />
            <Route
              path="/talk/new"
              element={
                <ProtectedRoute>
                  <CreateDiscussion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute requiredRole="2">
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="1">
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
