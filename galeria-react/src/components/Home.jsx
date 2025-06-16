import '../styles/Home.css';

function Home() {
    return (
        <div className="home">
            <h1>Seja bem-vindo à galeria de imagens!</h1>
            <h2>Como funciona?</h2>
            <ul>
                <li><p>Acesse a aba de login para poder acessar a galeria, clicando em "Login" logo acima.</p></li>
                <li><p>Insira um usuário e uma senha, depois clique em "Entrar". Se a autenticação funcionar, você deve visualizar uma mensagem de sucesso e um botão "Logout".</p></li>
                <li><p>Após isso, acesse a aba "Galeria" e veja as imagens existentes, ou adicione mais se desejar.</p></li>
            </ul>
        </div>
    );
}
export default Home;