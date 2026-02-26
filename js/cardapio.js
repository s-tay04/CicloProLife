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

const botaoOrdenar = document.getElementById('btn-ordenar');
const botaoLimpar = document.getElementById('btn-limpar');

function ordenarReceitas() {
    const listaOrdenada = [...receitas].sort((a, b) => a.nome.localeCompare(b.nome));
    exibirReceitas(listaOrdenada);

    botaoOrdenar.classList.add('ativo');
    botaoLimpar.classList.remove('ativo');
}

function restaurarOrdem() {
    exibirReceitas(receitas);
}

exibirReceitas(receitas);

function limparFiltro() {
    exibirReceitas(receitas);

    botaoLimpar.classList.add('ativo');
    botaoOrdenar.classList.remove('ativo');
}

const input = document.getElementById("pesquisa");
const cards = document.querySelectorAll("grid-receitas");

const campoPesquisa = document.getElementById("pesquisar");

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

//modo escuro

document.addEventListener("DOMContentLoaded", function () {

    const botaoTema = document.getElementById("toggle-tema");
    const iconeTema = document.getElementById("icone-tema");

    if (!botaoTema) return;

    function aplicarTema(modo) {
        if (modo === "dark") {
            document.body.classList.add("dark");
            iconeTema.src = "../imagem/lua2.png"; 
        } else {
            document.body.classList.remove("dark");
            iconeTema.src = "../imagem/lua.png"; 
        }
    }

    botaoTema.addEventListener("click", function () {
        const novoModo = document.body.classList.contains("dark") ? "light" : "dark";
        localStorage.setItem("tema", novoModo);
        aplicarTema(novoModo);
    });

    // mantém salvo 
    const temaSalvo = localStorage.getItem("tema") || "light";
    aplicarTema(temaSalvo);

});