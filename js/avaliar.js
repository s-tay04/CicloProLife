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

function enviar(event) {

    event.preventDefault();

    let textoAvaliacao = document.getElementById("receita").value;

    if (textoAvaliacao.trim() === "") {
        alert("Escreva uma avaliação primeiro!");
        return;
    }

    fetch("https://futura-api.com/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avaliacao: textoAvaliacao,
            data: new Date()
        })
    })
    .then(response => response.json())
    .then(data => {
        alert("Avaliação enviada com sucesso!");
        document.getElementById("receita").value = "";
        console.log(data);
    })
    .catch(error => {
        console.error("Erro:", error);
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