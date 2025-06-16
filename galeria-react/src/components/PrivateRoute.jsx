import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}
export default PrivateRoute;