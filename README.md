# Galeria de imagens com React e Django REST Framework

Este projeto contém:

<li>Uma API de imagens feita com Django REST Framework e integração com JWT e MongoDB</li>
<br>
<li>Uma interface front-end feita em React que consome esta API</li>
<br>
<p>A galeria permite envio, obtenção, atualização e deleção de imagens deste sistema, além de também poder links individuais de cada imagem para download.</p>

<h2>Sobre a API</h2>

<p>A API foi toda feita em Django REST Framework, possui proteção de rotas com JWT e possui também persistência de dados em MongoDB. O usuário consegue enviar imagens com título (obrigatório) e descrição (opcional), além de conseguir obter links de cada imagem disponíveis para download.</p>

<h2>Sobre a interface</h2>

<p>A interface foi feita com a biblioteca React e Axios para consumo da API. Com design simples e UX básico, atualmente a interface não possui rotas extras, funcionando inteiramente numa única página HTML.</p>

<h2>Deploy local</h2>

<p>O sistema ainda não possui deploy na nuvem. Portanto, é necessário que seja feito o deploy local do sistema inteiro. Para rodá-lo localmente, siga os seguintes passos:</p>

<ol>
<li>Clone o repositório remoto numa pasta idealmente vazia de sua preferência.</li>
Exemplo no terminal:

```bash
git clone https://github.com/kauaregisdev/api-imagens.git
```
<br>
<li>Na raiz de todo o projeto (pasta principal), crie um ambiente virtual e instale as dependências necessárias nele.</li>
Exemplo no terminal:

```bash
python -m venv venv
venv\Scripts\Activate
pip install -r requirements.txt
```
<br>
<li>Vá para o diretório raiz do app Django e dê deploy local no respectivo servidor.</li>
Exemplo no terminal:

```bash
cd app_imagens
python manage.py runserver
```
Caso o ambiente virtual não esteja ativado, ative-o.
```bash
activate
# resto do código acima...
```
<br>

![Deploy Django](images/deploydjango.png)
<li>Em outro terminal, acesse o diretório raiz do app React e dê deploy local no respectivo servidor.</li>
Exemplo no terminal:

```bash
cd galeria-react
npm run dev
```
<br>

![Deploy React](images/deployreact.png)
</ol>
<p>É importante que ambos os apps estejam no ar ao mesmo tempo para que o sistema funcione de forma integral. Porém, caso apenas o back-end esteja rodando, ainda será possível testá-lo por meio de curl ou Postman.</p>

<h3>Obter token JWT</h3>

```bash
curl -X POST http://localhost:8000/token \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

<h3>GET</h3>

```bash
curl http://localhost:8000/api/images/ \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

<h3>POST</h3>

```bash
curl -X POST http://localhost:8000/api/images/ \
    -H "Authorization: Bearer SEU_TOKEN_AQUI" \
    -F "title=Minha imagem" \
    -F "image=@caminho/para/imagem.jpg"
```

<h3>DELETE</h3>

```bash
curl -X DELETE http://localhost:8000/api/images/ID_DA_IMAGEM/ \
    -H "Authorization: Bearer SEU_TOKEN_AQUI"
```