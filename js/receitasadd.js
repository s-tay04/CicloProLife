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
    
    const botaoTeste = document.querySelector("#link-fase-teste button");
    const botaoFinal = document.querySelector("#link-fase-final button");

    // Chefe de Cozinha
    if (cargo === "Chefe de Cozinha") {

    botaoTeste.classList.remove("cadeado");
    botaoTeste.classList.add("comum");

    }

    // Gestor
    if (cargo === "Gestor") {

    botaoTeste.classList.remove("cadeado");
    botaoFinal.classList.remove("cadeado");

    botaoTeste.classList.add("comum");
    botaoFinal.classList.add("comum");

    }

    const linkFaseTeste = document.getElementById("link-fase-teste");
    const linkFaseFinal = document.getElementById("link-fase-final");

    if (cargo === "Colaborador" && linkFaseTeste) {

    linkFaseTeste.addEventListener("click", function(event) {

        event.preventDefault();

        alert("Apenas Chefes de Cozinha e Gestores podem acessar a Fase de Teste.");

    });

}

if (cargo !== "Gestor" && linkFaseFinal) {

    linkFaseFinal.addEventListener("click", function(event) {

        event.preventDefault();

        alert("Apenas Gestores podem acessar a Fase Final.");

    });

}

    } catch (error) {

        alert('Você precisa estar logado.');

        window.location.href = 'login.html';
    }
});

async function carregarReceitas() {

    try {

        const response = await fetch(
            "https://localhost:7108/Receita/pendentes",
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