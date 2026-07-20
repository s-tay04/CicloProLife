const idReceita = new URLSearchParams(window.location.search).get("id");

let container;

const API_URL = "https://localhost:7108/Receita";

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

        container = document.getElementById("detalhes-receita");

        await carregarReceita();

    } catch (error) {

        alert('Você precisa estar logado.');

        window.location.href = 'login.html';
    }
});


async function carregarReceita() {

    const response = await fetch(
        `https://localhost:7108/Receita/${idReceita}`,
        {
            method: "GET",
            credentials: "include"
        }
    );

    if (!response.ok) {
        alert("Receita não encontrada.");
        return;
    }

    const receita = await response.json();

    mostrarReceita(receita);

}

function mostrarReceita(receita) {

    let ingredientes = "";

    receita.ingredientes.forEach(i => {

        ingredientes += `
            <p>${i.nomeIngrediente} - ${i.quantidade} ${i.unidade}</p>
        `;

    });

    container.innerHTML = `
        <div class="card">

            <div class="card-left">

                <img src="https://localhost:7108/uploads/${receita.imagem}" alt="">

                <div class="card-info">

                    <h2>${receita.titulo}</h2>

                    <p><strong>Feedback do Chef:</strong></p>

                    <p>${receita.feedbackChefe || "Sem feedback."}</p>

                    <br>

                    <p><strong>Modo de preparo:</strong></p>

                    <p>${receita.modoPreparo}</p>

                    <br>

                    <p><strong>Porções:</strong> ${receita.porcao}</p>

                    <p><strong>Custo:</strong> R$ ${receita.custo}</p>

                    <br>

                    <p><strong>Ingredientes:</strong></p>

                    ${ingredientes}

                </div>

            </div>

            <div class="card-right">

                <p>Receita Aprovada?</p>

                <img id="resultado" src="../imagem/mulher.png">

                <div class="botoes">

                    <button class="btn-sim"
                        onclick="aprovar(this)">
                        Sim ✓
                    </button>

                    <button class="btn-nao"
                        onclick="rejeitar(this)">
                        Não ✗
                    </button>

                </div>

            </div>

        </div>
    `;

}

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

    fetch(`${API_URL}/aprovar-final/${idReceita}`, {
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

fetch(`${API_URL}/delete/${idReceita}`, {
    method: "DELETE",
    credentials: "include"
})

.then(async response => {

    if (!response.ok) {

        const erro = await response.text();

        throw new Error(erro);

    }

    alert("Receita reprovada e deletada com sucesso!");

})
.catch(error => {

    console.error("Erro ao reprovar:", error);

    alert(error.message);

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