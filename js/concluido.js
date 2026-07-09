const API_URL = 'https://futura-api.com/api/receita';

const parametros = new URLSearchParams(window.location.search);
const idReceita = parametros.get('id') || 1; // Valor padrão caso não haja parâmetro



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

        console.log('Usuário logado:', dados.nome);

    } catch (error) {

        alert('Você precisa estar logado.');

        window.location.href = 'login.html';
    }
});

function exibirReceitas(lista){
    container.innerHTML = '';

    lista.forEach(item => {

        const card = document.createElement('div');
        card.className = 'card';

        /* ESQUERDA */
        const left = document.createElement('div');
        left.className = 'card-left';

        const imagem = document.createElement('img');
        imagem.src = item.img;

        const info = document.createElement('div');
        info.className = 'card-info';

        const titulo = document.createElement('h2');
        titulo.textContent = item.nome;

        const avaliacao = document.createElement('p');
        avaliacao.textContent = "Avaliação do Chef: ⭐ 4.3";

        const descricao = document.createElement('p');
        descricao.textContent = "Sabor equilibrado, tempero marcante e massa leve.";

        info.appendChild(titulo);
        info.appendChild(avaliacao);
        info.appendChild(descricao);

        left.appendChild(imagem);
        left.appendChild(info);

        /* DIREITA */
        const right = document.createElement('div');
        right.className = 'card-right';

        const pergunta = document.createElement('p');
        pergunta.textContent = "Receita Aprovada?";

        const chef = document.createElement('img');
        chef.src = "../imagem/chef.png"; 

        const botoes = document.createElement('div');
        botoes.className = 'botoes';

        const sim = document.createElement('button');
        sim.className = 'btn-sim';
        sim.textContent = "Sim ✓";

        const nao = document.createElement('button');
        nao.className = 'btn-nao';
        nao.textContent = "Não ✗";

        botoes.appendChild(sim);
        botoes.appendChild(nao);

        right.appendChild(pergunta);
        right.appendChild(chef);
        right.appendChild(botoes);

        /* CARD */
        card.appendChild(left);
        card.appendChild(right);

        container.appendChild(card);
    });
}


    fetch(url, { // Substitua 'url' pela URL real do seu endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaEnviar)
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Sucesso! Receita "${nomeDaReceita}" foi ${status} no servidor:`, data);
        alert(`Status enviado ao servidor: ${status}! Abra o console (F12) para ver a resposta.`);
    })
    .catch(error => {
        console.error('Erro ao enviar para o servidor:', error);
    });

function aprovar(botao) {
    const cardPrincipal = botao.closest('.card');
    const nomeDaReceita = cardPrincipal.querySelector('.card-left h2').textContent;

    const cardRight = botao.closest('.card-right');
    const texto = cardRight.querySelector('p');
    const imagem = cardRight.querySelector('img');
    const divBotoes = cardRight.querySelector('.botoes');

    texto.textContent = 'Receita Aprovada!';
    imagem.src = '../imagem/aprovada.png'; 

    imagem.style.width = '200px';
    imagem.style.height = '180px';
    imagem.style.objectFit = 'contain';
    
    divBotoes.style.display = 'none';

    fetch(`${API_URL}/aprovar/${idReceita}`, { // Substitua pelo ID real da receita
    method: "PUT",
    credentials: "include"
})
.then(response => {
    if (!response.ok) {
        throw new Error("Erro ao aprovar receita");
    }

    alert("Receita aprovada com sucesso!");
})
.catch(error => {
    console.error("Erro ao aprovar:", error);
    alert("Erro ao aprovar receita.");
});
}

function rejeitar(botao) {
    const cardPrincipal = botao.closest('.card');
    const nomeDaReceita = cardPrincipal.querySelector('.card-left h2').textContent;

    const cardRight = botao.closest('.card-right');
    const texto = cardRight.querySelector('p');
    const imagem = cardRight.querySelector('img');
    const divBotoes = cardRight.querySelector('.botoes');

    texto.textContent = 'Receita Excluída!';
    imagem.src = '../imagem/excluida.png';

    imagem.style.width = '350px';
    imagem.style.height = '300px';
    imagem.style.objectFit = 'contain';
    
    divBotoes.style.display = 'none';

fetch(`${API_URL}/reprovar/${idReceita}`, { // Substitua pelo ID real da receita
    method: "DELETE",
    credentials: "include"
})
.then(response => {
    if (!response.ok) {
        throw new Error("Erro ao reprovar receita");
    }

    alert("Receita reprovada e deletada com sucesso!");
})
.catch(error => {
    console.error("Erro ao reprovar:", error);
    alert("Erro ao reprovar receita.");
});

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
}