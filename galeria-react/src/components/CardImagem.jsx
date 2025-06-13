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