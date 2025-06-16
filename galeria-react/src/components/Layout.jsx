import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Layout() {
    const { isAuthenticated, logout } = useAuth();
    return (
        <>
        <header>
            <nav>
                <Link to='/'>Home</Link> |{' '}
                <Link to='/galeria'>Galeria</Link> |{' '}
                <Link to='/login'>Login</Link>
                {isAuthenticated && <button className="logout" onClick={logout}>Logout</button>}
            </nav>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            <small>© 2025 - Todos os direitos reservados</small>
        </footer>
        </>
    );
}
export default Layout;