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

    const btn = document.createElement('button');
    btn.textContent = 'Remover';
    btn.className = 'remover-imagem';
    btn.onclick = () => {
        if (confirm('Deseja remover esta imagem?')) {
            axios.delete(`http://localhost:8000/api/images/${img.id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                alert('Imagem removida com sucesso!');
                li.remove();
            })
            .catch(err => {
                alert('Erro ao remover imagem.');
                console.error(err);
            })
        }
    };
    li.appendChild(btn);
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