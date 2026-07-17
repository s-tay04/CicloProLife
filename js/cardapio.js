// receitas
let receitas = [];
let container;

document.addEventListener('DOMContentLoaded', async () => {

    container = document.getElementById("lista-receitas");

    try {

        const response = await fetch(
            'https://localhost:7108/Usuario/inicial',
            {
                method: 'GET',
                credentials: 'include'
            }
        );

        const dados = await response.json();

        if (!response.ok) {
            throw new Error(dados.mensagem);
        }

        console.log('Usuário logado:', dados.nome);

        await carregarReceitas();

    } catch (error) {

        alert('Você precisa estar logado.');

    }

});

async function carregarReceitas() {

    try {

        const response = await fetch(
            "https://localhost:7108/Receita/cardapio",
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar receitas.");
        }

        receitas = await response.json();

        exibirReceitas(receitas);

    } catch (err) {

        console.log(err);

    }

}

function exibirReceitas(lista) {

    container.innerHTML = "";

    lista.forEach(item => {

        const link = document.createElement("a");
        link.href = `receita.html?id=${item.idReceita}`;
        link.className = "card-link";

        const card = document.createElement("div");
        card.className = "card";

        const imagem = document.createElement("img");
        imagem.src = `https://localhost:7108/uploads/${item.imagem}`;
        imagem.alt = item.titulo;

        const titulo = document.createElement("h3");
        titulo.textContent = item.titulo;

        card.appendChild(imagem);
        card.appendChild(titulo);

        link.appendChild(card);
        container.appendChild(link);

    });

}

const botaoOrdenar = document.getElementById('btn-ordenar');
const botaoLimpar = document.getElementById('btn-limpar');

function ordenarReceitas() {
    const listaOrdenada = [...receitas].sort((a, b) =>
    a.titulo.localeCompare(b.titulo)
);
    exibirReceitas(listaOrdenada);

    botaoOrdenar.classList.add('ativo');
    botaoLimpar.classList.remove('ativo');
}

function restaurarOrdem() {
    exibirReceitas(receitas);
}

function limparFiltro() {
    exibirReceitas(receitas);

    botaoLimpar.classList.add('ativo');
    botaoOrdenar.classList.remove('ativo');
}

const campoPesquisa = document.getElementById("pesquisar");

if (campoPesquisa) {

    campoPesquisa.addEventListener("input", function () {

        const textoDigitado = campoPesquisa.value.toLowerCase();

        const receitas = document.querySelectorAll("#lista-receitas > *");

        receitas.forEach(function(receita) {

            const conteudo = receita.innerText.toLowerCase();

            receita.style.display =
                conteudo.includes(textoDigitado) ? "" : "none";

        });

    });

}

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