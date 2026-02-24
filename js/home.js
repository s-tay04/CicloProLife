const receitas = [
    { id: 'empada', nome: 'Empada', img: '../imagem/empada.png' },
    { id: 'coxinha', nome: 'Coxinha', img: '../imagem/coxinhanormal.png' },
    { id: 'bolo-vulcao', nome: 'Bolo vulcão', img: '../imagem/bolo.png' },
    { id: 'pudim', nome: 'Pudim', img: '../imagem/pudim.png' }
];

const container = document.getElementById('lista-receitas');

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

function ordenarReceitas() {
    receitas.sort((a, b) => a.nome.localeCompare(b.nome));
    exibirReceitas(receitas);
}

exibirReceitas(receitas);

const bancoDeReceitas = {
    'empada': {
        titulo: 'Empada de Frango',
        imagem: '../imagem/empada.png',
        ingredientes: [
            '2 xícaras de farinha de trigo',
            '100g de manteiga ou margarina',
            '1 gema de ovo',
            'Sal a gosto',
            '300g de frango desfiado temperado (recheio)'
        ],
        preparo: 'Misture a farinha com a manteiga até virar uma farofa. Adicione a gema e o sal, amasse até soltar da mão. Forre as forminhas, coloque o recheio, feche com mais massa e pincele gema. Asse por 30min.'
    },
    'coxinha': {
        titulo: 'Coxinha de Frango',
        imagem: '../imagem/coxinhanormal.png',
        ingredientes: [
            '500ml de caldo de galinha',
            '500g de farinha de trigo',
            '2 colheres de sopa de óleo',
            'Frango desfiado e temperado',
            'Farinha de rosca para empanar'
        ],
        preparo: 'Ferva o caldo com o óleo. Jogue a farinha de uma vez e mexa rápido até desgrudar da panela. Deixe esfriar, sove a massa, recheie modelando a coxinha. Passe na água/ovo, na farinha de rosca e frite.'
    },
    'bolo-vulcao': {
        titulo: 'Bolo Vulcão de Chocolate',
        imagem: '../imagem/bolo.png',
        ingredientes: [
            '3 ovos e 1 xícara de óleo',
            '1 xícara de leite e 2 de açúcar',
            '3 xícaras de farinha e 1 de chocolate em pó',
            '1 colher de fermento',
            'Cobertura: 2 latas de leite condensado + creme de leite'
        ],
        preparo: 'Bata a massa no liquidificador (menos fermento e farinha, que vão por último). Asse em forma de furo central. Faça um brigadeiro mole para a cobertura e despeje no furo central do bolo desenformado.'
    },
    'pudim': {
        titulo: 'Pudim de Leite Condensado',
        imagem: '../imagem/pudim.png',
        ingredientes: [
            '1 lata de leite condensado',
            'A mesma medida de leite',
            '3 ovos inteiros',
            '1 xícara de açúcar (para a calda)'
        ],
        preparo: 'Derreta o açúcar na forma até virar caramelo. Bata os outros ingredientes no liquidificador. Despeje na forma caramelizada e asse em banho-maria por cerca de 1h30. Gele antes de desenformar.'
    },

};

const urlParams = new URLSearchParams(window.location.search);
const idReceita = urlParams.get('id');

const tituloElemento = document.getElementById('titulo-receita');
const imagemElemento = document.getElementById('imagem-receita');
const listaIngredientes = document.getElementById('lista-ingredientes'); // ONDE A LISTA VAI FICAR
const preparoElemento = document.getElementById('preparo-receita');

if (bancoDeReceitas[idReceita]) {
    const receita = bancoDeReceitas[idReceita];

    tituloElemento.innerText = receita.titulo;
    imagemElemento.src = receita.imagem;
    preparoElemento.innerText = receita.preparo;
    
    listaIngredientes.innerHTML = '';

    receita.ingredientes.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        listaIngredientes.appendChild(li);
    });

} else {
    tituloElemento.innerText = "Receita não encontrada";
    listaIngredientes.innerHTML = "";
    preparoElemento.innerHTML = "<a href='index.html'>Voltar para o início</a>";
}

exibirReceitas(receitas);

campoPesquisa.addEventListener("input", function () {
    const textoDigitado = campoPesquisa.value.toLowerCase();

    // pesquisar
    const receitas = document.querySelectorAll("#lista-receitas > *");

    receitas.forEach(function(receita) {
        const conteudo = receita.innerText.toLowerCase();

        if (conteudo.includes(textoDigitado)) {
            receita.style.display = ""; 
        } else {
            receita.style.display = "none"; 
        }
    });
});