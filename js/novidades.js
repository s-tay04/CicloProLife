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

const inputPorcao = document.getElementById("porcao");

const btnAumentar = document.getElementById("btnAumentar");

const btnDiminuir = document.getElementById("btnDiminuir");


btnAumentar.addEventListener("click", () => {

    inputPorcao.value = parseInt(inputPorcao.value) + 1;

});


btnDiminuir.addEventListener("click", () => {

    if(parseInt(inputPorcao.value) > 1){

        inputPorcao.value = parseInt(inputPorcao.value) - 1;

    }

});

async function enviar() {

    let textoTitulo = document.getElementById("titulo").value;
    let textoIngredientes = document.getElementById("ingredientes").value;
    let textoModoPreparo = document.getElementById("modoPreparo").value;
    let textoCusto = document.getElementById("custo").value;
    let textoPorcao = document.getElementById("porcao").value;

    let arquivo = document.getElementById("imagem").files[0];

    if (
        textoTitulo.trim() === "" ||
        textoIngredientes.trim() === "" ||
        textoModoPreparo.trim() === "" ||
        textoCusto.trim() === "" ||
        textoPorcao.trim() === ""
    ) {

        alert("Preencha todos os campos!");

        return;
    }

    const formData = new FormData();

    formData.append("Titulo", textoTitulo);
    formData.append("Ingredientes", textoIngredientes);
    formData.append("ModoPreparo", textoModoPreparo);
    formData.append("Custo", textoCusto);
    formData.append("Porcao", textoPorcao);

    if (arquivo) {
        formData.append("ArquivoImagem", arquivo);
    }

    try {

        const response = await fetch(
            "https://localhost:7108/Receita/cadastrar",
            {
                method: "POST",
                credentials: "include",
                body: formData
            }
        );

        if (!response.ok) {

            const erro = await response.text();

            throw new Error(erro);
        }

        const dados = await response.json();

        console.log("Receita cadastrada:", dados);

        alert("Receita cadastrada com sucesso!");

        // LIMPAR CAMPOS

        document.getElementById("titulo").value = "";
        document.getElementById("ingredientes").value = "";
        document.getElementById("modoPreparo").value = "";
        document.getElementById("custo").value = "";
        document.getElementById("porcao").value = 1;
        document.getElementById("imagem").value = "";

    } catch (erro) {

        console.error("Erro:", erro);

        alert("Erro ao cadastrar receita.");
    }
}



// MODO ESCURO
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

        const novoModo =
            document.body.classList.contains("dark")
            ? "light"
            : "dark";

        localStorage.setItem("tema", novoModo);

        aplicarTema(novoModo);

    });

    const temaSalvo = localStorage.getItem("tema") || "light";

    aplicarTema(temaSalvo);

});