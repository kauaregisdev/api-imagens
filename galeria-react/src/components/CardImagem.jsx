// esse componente recebe um JSON com as informações da imagem e retorna um item de lista contendo a imagem com título e, se houver, descrição
// contém também um botão específico para cada imagem que deleta a imagem em questão

import '../styles/CardImagem.css';

function CardImagem({ image, onRemover }) {
    return (
        <>
            <li>
                <h3>{image.title}</h3>
                <img src={image.image} alt={image.title} />
                <p>{image.desc}</p>
                <button className="remover-imagem" onClick={onRemover}>Remover</button>
            </li>
        </>
    );
}
export default CardImagem;