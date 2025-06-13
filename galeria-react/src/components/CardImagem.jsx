function CardImagem({ title, url, desc }) {
    return (
        <>
            <li>
                <h3>{title}</h3>
                <img src={url} alt={title} />
                <p>{desc}</p>
            </li>
        </>
    )
}
export default CardImagem;