import { Outlet, Link } from "react-router-dom";

function Layout() {
    return (
        <>
        <header>
            <nav>
                <Link to='/'>Home</Link> |{' '}
                <Link to='/galeria'>Galeria</Link> |{' '}
                <Link to='/login'>Login</Link>
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