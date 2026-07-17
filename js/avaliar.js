const parametros = new URLSearchParams(window.location.search);

const idReceita = parametros.get("id");

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

async function enviar(event) {

    event.preventDefault();

    const textoAvaliacao = document.getElementById("receita").value.trim();

    if (textoAvaliacao === "") {
        alert("Digite uma avaliação.");
        return;
    }

    try {

        const response = await fetch(
            `https://localhost:7108/Receita/feedback/${idReceita}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    feedbackChefe: textoAvaliacao
                })
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao enviar avaliação.");
        }

        alert("Avaliação enviada com sucesso!");

        window.location.href = "fasedeteste.html";

    }
    catch (erro) {

        console.log(erro);

        alert("Não foi possível enviar a avaliação.");

    }

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