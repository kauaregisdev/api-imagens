import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getToken as apiLogin } from "../services/api";
import '../styles/FormLogin.css';

function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const data = await apiLogin(username, password);
            login(data.access, data.refresh);
            setMessage('Login realizado com sucesso!');
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setMessage('Usuário ou senha inválidos.');
        }
    };

    return (
        <form id="form-login" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Usuário:"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Senha:"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit">Entrar</button>
            {message && <p>{message}</p>}
        </form>
    );
}
export default Login;