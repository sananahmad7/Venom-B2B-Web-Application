import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import HomePage from "./pages/HomePage";
import ProductCatalog from "./pages/ProductCatalog";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Inquiry from "./pages/Inquiry";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";
// Protect admin routes
const ProtectedRoute = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const isAdmin = useAuthStore((state) => state.authUser?.role === "admin");

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductCatalog />} />
      <Route path="/about" element={<About />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/inquiry" element={<Inquiry />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Admin Routes (Protected) */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute isAllowed={isAdmin}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
