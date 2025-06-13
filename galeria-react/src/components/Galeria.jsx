import { useState, useEffect } from "react";
import CardImagem from "./CardImagem";
import axios from "axios";

const API_URL = 'http://localhost:8000/api/images/';
const TOKEN_URL = 'http://localhost:8000/token';

function Galeria() {
    const [imagens, setImagens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post(TOKEN_URL, {
            username: 'admin',
            password: 'admin123'   
        })
        .then(res => {
            const token = res.data.access;
            return axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        })
        .then(res => {
            setImagens(res.data);
            setLoading(false);
        })
        .catch(err => {
            setImagens([]);
            setLoading(false);
            console.error(err);
        });
    }, []);

    if (loading) return <p id="loading">Carregando imagens...</p>;

    return (
        <>
            {imagens.map((img) => (
                <CardImagem
                    key={img.id}
                    title={img.title}
                    url={img.image}
                    desc={img.description || "Sem descrição."}
                />
            ))}
        </>
    )
}
export default Galeria;