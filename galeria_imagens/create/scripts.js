let token;
const API_URL = 'http://localhost:8000/api/images/';
const TOKEN_URL = 'http://localhost:8000/token';

axios.post(TOKEN_URL, {
    username: 'admin',
    password: 'admin123'
})
.then(res => {
    token = res.data.access;
})
.catch(err => {
    alert('Erro ao obter token!');
    console.error(err);
});

document.getElementById('form-upload').addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();
    formData.append('image', form.image.files[0]);
    formData.append('title', form.title.value);

    if (form.description.value.trim() !== '') {
        FormData.append('description', form.description.value);
    }

    axios.post(API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        alert('Imagem enviada com sucesso!');
        form.reset();
    })
    .catch(err => {
        alert('Erro ao enviar imagem.');
        console.error(err);
    })
});