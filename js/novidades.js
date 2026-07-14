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

// CONTROLE DE PORÇÕES

const inputPorcao = document.getElementById("porcao");

const btnAumentar = document.getElementById("btnAumentar");

const btnDiminuir = document.getElementById("btnDiminuir");

btnAumentar.addEventListener("click", () => {

    inputPorcao.value = parseInt(inputPorcao.value) + 1;

});

btnDiminuir.addEventListener("click", () => {

    if (parseInt(inputPorcao.value) > 1) {

        inputPorcao.value = parseInt(inputPorcao.value) - 1;

    }

});

// INGREDIENTES

document.addEventListener("DOMContentLoaded", () => {

    const listaIngredientes = document.getElementById("listaIngredientes");
    const botaoAdicionarIngrediente = document.getElementById("btnAdicionarIngrediente");

    botaoAdicionarIngrediente.addEventListener("click", adicionarLinhaIngrediente);

    function adicionarLinhaIngrediente() {

        const linha = document.createElement("div");
        linha.className = "linha-ingrediente";

        linha.innerHTML = `
            <input
                type="number"
                class="quantidade"
                placeholder="Qtd"
                step="0.01"
                min="0">

            <select class="unidade">
                <option value="">Unidade</option>
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="L">L</option>
                <option value="un">un</option>
                <option value="colher">colher</option>
                <option value="xícara">xícara</option>
                <option value="pitada">pitada</option>
            </select>

            <input
                type="text"
                class="ingrediente"
                placeholder="Nome do ingrediente">

            <button
                type="button"
                class="btn-remover">
                ✕
            </button>
        `;

        linha.querySelector(".btn-remover").addEventListener("click", () => {

            if (listaIngredientes.children.length > 1) {
                linha.remove();
            }

        });

        listaIngredientes.appendChild(linha);

    }

    // Faz o botão remover da primeira linha funcionar
    document.querySelector(".btn-remover").addEventListener("click", function () {

        if (listaIngredientes.children.length > 1) {
            this.parentElement.remove();
        }

    });

});

// ENVIAR RECEITA

async function enviar() {

    const textoTitulo = document.getElementById("titulo").value;

    const textoModoPreparo = document.getElementById("modoPreparo").value;

    const textoCusto = document.getElementById("custo").value;

    const textoPorcao = document.getElementById("porcao").value;

    const arquivo = document.getElementById("imagem").files[0];

    const ingredientes = [];

    document.querySelectorAll(".linha-ingrediente").forEach(linha => {

        const quantidade = linha.querySelector(".quantidade").value;

        const unidade = linha.querySelector(".unidade").value;

        const nome = linha.querySelector(".ingrediente").value;

        if (nome.trim() !== "") {

            ingredientes.push({

                quantidade: quantidade,

                unidade: unidade,

                nome: nome

            });

        }

    });

    if (

        textoTitulo.trim() === "" ||
        ingredientes.length === 0 ||
        textoModoPreparo.trim() === "" ||
        textoCusto.trim() === "" ||
        textoPorcao.trim() === ""

    ) {

        alert("Preencha todos os campos!");

        return;

    }

    const formData = new FormData();

    formData.append("Titulo", textoTitulo);

    console.log("Ingredientes:", ingredientes);
console.log("JSON:", JSON.stringify(ingredientes));

    formData.append("Ingredientes", JSON.stringify(ingredientes));

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

        document.getElementById("titulo").value = "";

        document.getElementById("modoPreparo").value = "";

        document.getElementById("custo").value = "";

        document.getElementById("porcao").value = 1;

        document.getElementById("imagem").value = "";

        document.querySelectorAll(".linha-ingrediente").forEach((linha, indice) => {

            if (indice === 0) {

                linha.querySelector(".quantidade").value = "";

                linha.querySelector(".unidade").selectedIndex = 0;

                linha.querySelector(".ingrediente").value = "";

            } else {

                linha.remove();

            }

        });

    } catch (erro) {

        console.error(erro);

        alert("Erro ao cadastrar receita.");

    }

}

async function aprovarReceita(id) {

    const resposta = await fetch(
        `https://localhost:7108/Receita/aprovar/${id}`,
        {
            method: "PUT",
            credentials: "include"
        }
    );

    if (resposta.ok) {

        alert("Receita enviada para o chefe!");

        location.reload();

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

        }

        else {

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