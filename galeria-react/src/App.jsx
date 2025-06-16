import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import PaginaHome from './pages/Home';
import PaginaLogin from './pages/Login';
import PaginaGaleria from './pages/Galeria';
import PaginaNotFound from './pages/NotFound';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<PaginaHome />} />
            <Route path='login' element={<PaginaLogin />} />
            <Route element={<PrivateRoute />}>
              <Route path='galeria' element={<PaginaGaleria />} />
            </Route>
            <Route path='*' element={<PaginaNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App;
