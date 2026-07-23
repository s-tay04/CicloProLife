async function pesquisar() { //pesquisar

    let nome = document
        .getElementById("pesquisa")
        .value
        .trim();


    if (nome === "") {
        exibirReceitas(receitas);
        return;
    }


    let resposta = await fetch(
        `https://localhost:7108/Receita/filtrar?titulo=${nome}`
    );


    let receitasPesquisa = await resposta.json();


    container.innerHTML = "";


    receitasPesquisa.forEach(item => {

        const link = document.createElement("a");
        link.href = `receita.html?id=${item.idReceita}`;
        link.className = "card-link";

        link.style.textDecoration = "none";
        link.style.color = "inherit";


        const card = document.createElement("div");
        card.className = "card";


        card.innerHTML = `
            <img src="https://localhost:7108/uploads/${item.imagem}">
            <h3>${item.titulo}</h3>
        `;


        link.appendChild(card);
        container.appendChild(link);

    });

}


let receitas = [];
let container;


// idLogado
document.addEventListener("DOMContentLoaded", async () => {

    container = document.getElementById("lista-receitas");

    const campoPesquisa = document.getElementById("pesquisa");

    campoPesquisa.addEventListener("input", () => {
        pesquisar();
    });


    try {

        const response = await fetch(
            "https://localhost:7108/Usuario/inicial",
            {
                method: "GET",
                credentials: "include"
            }
        );

        const dados = await response.json();

        if (!response.ok) {
            throw new Error(dados.mensagem);
        }

        console.log("Usuário logado:", dados.nome);

        await carregarDestaques();

    } catch (error) {

        alert("Você precisa estar logado.");

        window.location.href = "login.html";

    }

});




async function carregarDestaques() {

    try {

        const response = await fetch(
            "https://localhost:7108/Receita/destaques",
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao carregar destaques.");
        }

        receitas = await response.json();

        exibirReceitas(receitas);

    } catch (erro) {

        console.error(erro);

    }

}


function exibirReceitas(lista) {

    container.innerHTML = "";

    lista.forEach(item => {

        const link = document.createElement("a");

        link.href = `receita.html?id=${item.idReceita}`;
        link.className = "card-link";

        link.style.textDecoration = "none";
        link.style.color = "inherit";


        const card = document.createElement("div");

        card.className = "card";


        card.innerHTML = `
            <img src="https://localhost:7108/uploads/${item.imagem}" alt="${item.titulo}">
            <h3>${item.titulo}</h3>
        `;


        link.appendChild(card);

        container.appendChild(link);

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


    const temaSalvo = localStorage.getItem("tema") || "light";

    aplicarTema(temaSalvo);

});