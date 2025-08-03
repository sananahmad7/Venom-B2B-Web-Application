import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import HomePage from "./pages/HomePage";
import ProductCatalog from "./pages/ProductCatalog";
import About from "./pages/About";
import Inquiry from "./pages/Inquiry";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdOrders";
import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";

import "./App.css";

import { useEffect } from "react";
import AdProduct from "./pages/AdProduct";

function ProtectedRoute({ children }) {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <div className="text-center mt-10">Checking auth...</div>;
  }

  if (!authUser || authUser.role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Routes>
      {/* Public / User Routes */}
      <Route path="/" element={<UserLayout><HomePage /></UserLayout>} />
      <Route path="/products" element={<UserLayout><ProductCatalog /></UserLayout>} />
      <Route path="/about" element={<UserLayout><About /></UserLayout>} />
      <Route path="/inquiry" element={<UserLayout><Inquiry /></UserLayout>} />

      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Admin Routes */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminOrders />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdProduct />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>

  );
}

export default App;
