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

        const cargo = dados.cargo;

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