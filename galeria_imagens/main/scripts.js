let token;
const TOKEN_URL = 'http://localhost:8000/token';
const API_URL = 'http://localhost:8000/api/images/';

axios.post(TOKEN_URL, {
    username: 'admin',
    password: 'admin123'
})
.then(response => {
    token = response.data.access;
    return axios.get(API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
})
.then(response => {
    const imagens = response.data;
    const ul = document.getElementById('imagens');
    imagens.forEach(img => {
        const li = document.createElement('li');
        const image = document.createElement('img');
        image.src = img.image;
        image.alt = img.title || 'Imagem';
        image.style.maxWidth = '100%';
        li.appendChild(image);
        ul.appendChild(li);
    });
})
.catch(error => {
    const ul = document.getElementById('imagens');
    ul.innerHTML = '<li>Erro ao carregar imagens.</li>';
    console.error(error);
});