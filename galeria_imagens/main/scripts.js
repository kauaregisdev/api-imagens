let token;
const TOKEN_URL = 'http://localhost:8000/token';
const API_URL = 'http://localhost:8000/api/images/';

function criarElementoImagem(img) {
    const li = document.createElement('li');
    const image = document.createElement('img');
    image.src = img.image;
    image.alt = img.title || 'Imagem';
    image.style.maxWidth = '100%';
    li.appendChild(image);
    return li;
}

function carregarImagens() {
    const ul = document.getElementById('imagens');
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
    ul.innerHTML = '';

    axios.post(TOKEN_URL, {
        username: 'admin',
        password: 'admin123'
    })
    .then(res => {
        token = res.data.access;
        return axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    })
    .then(res => {
        ul.innerHTML = '';
        res.data.forEach(img => {
            ul.appendChild(criarElementoImagem(img));
        });
        loading.style.display = 'none';
    })
    .catch(err => {
        ul.innerHTML = '<li>Erro ao carregar imagens.</li>';
        loading.style.display = 'none';
        console.error(err);
    });
}

carregarImagens();