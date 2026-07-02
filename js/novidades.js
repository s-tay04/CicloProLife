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

function enviar() {
    let textoTitulo = document.getElementById("titulo").value;
    let textoIngredientes = document.getElementById("ingredientes").value;
    let textoModoPreparo = document.getElementById("modoPreparo").value;
    let textoCusto = document.getElementById("custo").value;
    let textoPorcao = document.getElementById("porcao").value;

    if (textoTitulo.trim() === "" || textoIngredientes.trim() === "" || textoModoPreparo.trim() === "" || textoCusto.trim() === "" || textoPorcao.trim() === "") {
        alert("Preencha todos os campos antes de enviar a receita!");
        return; 
    }

    const formData = new FormData(); 
        formData.append("titulo", textoTitulo);
        formData.append("ingredientes", textoIngredientes);
        formData.append("modoPreparo", textoModoPreparo);
        formData.append("custo", textoCusto);
        formData.append("porcao", textoPorcao);
        let arquivo = document.getElementById("imagem").files[0];
        formData.append("ArquivoImagem", arquivo);
    

    fetch("https://futura-api.com/api/adicionar", {
    method: "POST",
    body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na comunicação com o servidor.");
        }
        return response.json();
    })
    .then(dadosDoServidor => {
        console.log("Simulação de envio feita com sucesso! ID gerado:", dadosDoServidor.id);

        let receitasSalvas = JSON.parse(localStorage.getItem("listaReceitas")) || [];
        receitasSalvas.push({
            titulo: textoTitulo,
            modoPreparo: textoModoPreparo
        });
        localStorage.setItem("listaReceitas", JSON.stringify(receitasSalvas));

        alert("Receita salva no navegador com sucesso!");

        document.getElementById("titulo").value = "";
        document.getElementById("ingredientes").value = "";
        document.getElementById("modoPreparo").value = "";
        document.getElementById("custo").value = "";
        document.getElementById("porcao").value = "";
    })
    .catch(erro => {
        console.error("Erro no fetch:", erro);
        alert("Ocorreu um erro ao tentar salvar a receita.");
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