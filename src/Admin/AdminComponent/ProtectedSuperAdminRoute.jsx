import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

// Gates the superadmin portal routes to accounts with role "superadmin".
// Triggers checkAdminAuth() on initial mount so staff session is verified.
const ProtectedSuperAdminRoute = ({ children }) => {
  const { isAdminAuthenticated, admin, loading, checkAdminAuth } = useAdminAuth();

  useEffect(() => {
    checkAdminAuth();
  }, [checkAdminAuth]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading…
      </div>
    );
  }

  if (!isAdminAuthenticated || admin?.role !== "superadmin") {
    return <Navigate to="/admin/auth" replace />;
  }

  return children;
};

export default ProtectedSuperAdminRoute;
