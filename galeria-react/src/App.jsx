import Galeria from './components/Galeria';
import FormUpload from './components/FormUpload';
import './App.css';

function App() {
  return (
    <>
      <header>
        <h1>Galeria de imagens</h1>
      </header>
      <main>
        <div id="galeria" className="galeria">
          <h2>Lista de imagens</h2>
          <ul id="imagens">
            <Galeria />
          </ul>
        </div>
        <FormUpload />
      </main>
    </>
  )
}

export default App;
