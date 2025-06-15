// esse componente é um formulário de envio de imagens, que recebe os inputs do usuário (título, URL da imagem e descrição) e envia para o banco de dados

import { useState } from "react";
import { getToken, api } from "../services/api";
import '../styles/FormUpload.css';

function FormUpload({ onUpload }) {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let token = localStorage.getItem('token');
        if (!token) {
            token = await getToken('admin', 'admin123');
            localStorage.setItem('token', token);
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        if (desc.trim() !== '') {
            formData.append('description', desc);
        }

        try {
            await api.post('', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            if (onUpload) onUpload();
            alert('Imagem enviada com sucesso!');
            setImage(null);
            setTitle('');
            setDesc('');
            e.target.reset();
        } catch (err) {
            alert('Erro ao enviar imagem.');
            console.error(err);
        }
    };

    return (
        <form id="form-upload" encType="multipart/form-data" onSubmit={handleSubmit}>
            <input
                type="file"
                name="image"
                id="image"
                required
                onChange={(e) => setImage(e.target.files[0])}
            />
            <input
                type="text"
                name="title"
                id="title"
                placeholder="Título da imagem:"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                name="description"
                id="description"
                placeholder="Descrição da imagem (opcional):"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <button type="submit">Enviar imagem</button>
        </form>
    );
}
export default FormUpload;