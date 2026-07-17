let receitas = [];
let container;

// idLogado
document.addEventListener('DOMContentLoaded', async () => {

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

        console.log("Nome:", dados.nome);
        console.log("Cargo:", dados.cargo);

        container = document.getElementById("lista-receitas");

        await carregarReceitas();

        const cargo = dados.cargo;

        const botaoTeste = document.getElementById("botao-fase-teste");
        const botaoFinal = document.getElementById("botao-fase-final");

        if (cargo === "Chefe de cozinha") {
        botaoTeste.classList.remove("cadeado");
        }

        if (cargo === "Gestor") {
        botaoTeste.classList.remove("cadeado");
        botaoFinal.classList.remove("cadeado");
        }

        if (cargo !== "Gestor") {

            alert("Apenas Gestores podem acessar esta página.");
        
            window.location.href = "receitasadd.html";
        
        }

    } catch (error) {

        alert('Você precisa estar logado.');

        window.location.href = 'login.html';
    }
});

async function carregarReceitas() {

    try {

        const response = await fetch(
            "https://localhost:7108/Receita/fase-final",
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

        const card = document.createElement("div");
        card.className = "card";
        
        card.innerHTML = `
        <img src="https://localhost:7108/uploads/${item.imagem}" alt="${item.titulo}">
        <h3>${item.titulo}</h3>
    
        <a href="concluido.html?id=${item.idReceita}">
            <button class="concluir">
                Concluir
            </button>
        </a>
    `;

        container.appendChild(card);

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