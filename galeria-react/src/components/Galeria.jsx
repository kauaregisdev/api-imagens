import { useState, useEffect } from "react";
import CardImagem from "./CardImagem";
import FormUpload from "./FormUpload";
import { getToken, api } from "../services/api";
import '../styles/Galeria.css';

function Galeria() {
    const [imagens, setImagens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarImagens();
    }, []);

    async function carregarImagens() {
        setLoading(true);
        let token = localStorage.getItem('token');
        if (!token) {
            token = await getToken('admin', 'admin123');
            localStorage.setItem('token', token);
        }
        api.get('', {
            headers: {
                Authorization: `Bearer ${token}`
            }
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
    }

    async function deletarImagem(id) {
        if (window.confirm("Deseja realmente excluir esta imagem?")) {
            let token = localStorage.getItem('token');
            if (!token) {
                token = await getToken('admin', 'admin123');
            }
            api.delete(`${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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

    return (
        <>
            <div id="galeria" className="galeria">
                <h2 id="lista-imagens-title">Imagens existentes</h2>
                <ul id="imagens">
                    {imagens.map((img) => (
                        <CardImagem
                            key={img.id}
                            image={img}
                            onRemover={() => deletarImagem(img.id)}
                        />
                    ))}
                </ul>
                <h2 id="form-upload-title">Enviar imagens</h2>
                <FormUpload onUpload={carregarImagens} />
            </div>
        </>
    );
}
export default Galeria;