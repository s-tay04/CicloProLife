const receitas = [
    { id: 'empada', nome: 'Empada', img: '../imagem/empada.png' },
    { id: 'coxinha', nome: 'Coxinha', img: '../imagem/coxinhanormal.png' },
    { id: 'joelho', nome: 'Joelho', img: '../imagem/joelho.png' },
    { id: 'enroladinho', nome: 'Enroladinho', img: '../imagem/enroladinho.png' },
    { id: 'bem-casado', nome: 'Bem casado', img: '../imagem/bemcasado.png' },
    { id: 'bolo-vulcao', nome: 'Bolo vulcão', img: '../imagem/bolo.png' },
    { id: 'pudim', nome: 'Pudim', img: '../imagem/pudim.png' },
    { id: 'donut', nome: 'Donut', img: '../imagem/donut.png' }
];

const container = document.getElementById('lista-receitas');

function exibirReceitas(lista) {

    container.innerHTML = '';

    lista.forEach(item => {
        const link = document.createElement('a');
        link.href = `receita.html?id=${item.id}`;
        link.className = 'card-link';

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

function ordenarReceitas() {
    receitas.sort((a, b) => a.nome.localeCompare(b.nome));
    exibirReceitas(receitas);
}

exibirReceitas(receitas);