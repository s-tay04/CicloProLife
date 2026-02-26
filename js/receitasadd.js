const container = document.getElementById('lista-receitas');

const receitas = [
    { id: 'brownie', nome: 'Brownie de sorvete', img: '../imagem/brownie.png' },
    { id: 'coxinha_jaca', nome: 'Coxinha de jaca', img: '../imagem/coxinhajaca.png' },
    { id: 'cookie_pistache', nome: 'Cookie de pistache', img: '../imagem/cookie.png' },
];

function mockFetch() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ok: true,
                json: () => Promise.resolve(receitas)
            });
        }, 500); 
    });
}

function buscarReceitasFalso() {

    mockFetch()
        .then(response => response.json())
        .then(dadosRecebidos => {
            exibirReceitas(dadosRecebidos);
        })
        .catch(error => {
            console.error("Erro ao simular o fetch:", error);
        });
}

function exibirReceitas(lista) {
    container.innerHTML = '';

    lista.forEach(item => {
        const link = document.createElement('a');
        link.href = `receita.html?id=${item.id}`;
        link.className = 'card-link';

        link.style.textDecoration = 'none';
        link.style.color = 'inherit';

        const card = document.createElement('div');
        card.className = 'card';

        const imagem = document.createElement('img');
        imagem.src = item.img;
        imagem.alt = item.nome;

        const titulo = document.createElement('h3');
        titulo.textContent = item.nome;

        card.appendChild(imagem);
        card.appendChild(titulo);
        link.appendChild(card);

        container.appendChild(link);
    });
}

buscarReceitasFalso();