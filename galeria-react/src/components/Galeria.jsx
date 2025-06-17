// esse componente reúne o card de imagens e o formulário num único componente

import { useState, useEffect } from "react";
import CardImagem from "./CardImagem";
import FormUpload from "./FormUpload";
import { getToken, api } from "../services/api";
import '../styles/Galeria.css';

function Galeria() {
    const [imagens, setImagens] = useState([]); // estado inicial de imagens
    const [loading, setLoading] = useState(true); // elemento UX: loading message

    useEffect(() => {
        carregarImagens(); // consumo da API
    }, []);

    async function carregarImagens() { // função que busca as imagens existentes no banco de dados
        setLoading(true); // ativa o loading message
        let token = localStorage.getItem('access'); // obtendo o token
        if (!token) {
            let data = await getToken('admin', 'admin123');
            token = data.access;
            localStorage.setItem('access', token);
        }
        api.get('images/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }) // obtendo as imagens
        .then(res => {
            setImagens(res.data);
            setLoading(false);
        })
        .catch(err => {
            setImagens([]);
            setLoading(false);
            console.error(err);
        });
    }

    async function deletarImagem(id) { // função que deleta a imagem ao receber seu ID
        if (window.confirm("Deseja realmente excluir esta imagem?")) {
            let token = localStorage.getItem('token'); // obtendo o token
            if (!token) {
                let data = await getToken('admin', 'admin123');
                token = data.access;
            }
            api.delete(`images/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }) // deletando a imagem
            .then(() => {
                alert("Imagem excluída com sucesso!");
                setImagens(imagens.filter(img => img.id !== id));
            })
            .catch(err => {
                alert("Erro ao excluir imagem.");
                console.error(err);
            })
        }
    }

    if (loading) return <p id="loading">Carregando imagens...</p>;

    return ( // retornando o bloco HTML
        <div id="galeria" className="galeria">
            <h2 id="lista-imagens-title">Imagens existentes</h2>
            <ul id="imagens">
                {imagens.map((img) => (
                    <CardImagem
                        key={img.id}
                        image={img}
                        onRemover={() => deletarImagem(img.id)}
                    /> // retorna um card de imagem para cada imagem existente
                ))} 
            </ul>
            <h2 id="form-upload-title">Enviar imagens</h2>
            <FormUpload onUpload={carregarImagens} />
        </div>
    );
}
export default Galeria;