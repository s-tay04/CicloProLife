function enviar() {
    let textoNome = document.getElementById("nome").value;
    let textoIngredientes = document.getElementById("ingredientes").value;
    let textoReceita = document.getElementById("receita").value;
    let textoCusto = document.getElementById("custo").value;
    let textoPorcoes = document.getElementById("porcoes").value;

    if (textoNome.trim() === "" || textoIngredientes.trim() === "" || textoReceita.trim() === "" || textoCusto.trim() === "" || textoPorcoes.trim() === "") {
        alert("Preencha todos os campos antes de enviar a receita!");
        return; 
    }

    const novaReceita = {
        nome: textoNome,
        ingredientes: textoIngredientes,
        receita: textoReceita,
        custo: textoCusto,
        porcoes: textoPorcoes,
        data: new Date().toLocaleDateString()
    };

    fetch("https://futura-api.com/api/adicionar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novaReceita)
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
        receitasSalvas.push(novaReceita);
        localStorage.setItem("listaReceitas", JSON.stringify(receitasSalvas));

        alert("Receita salva no navegador com sucesso!");

        document.getElementById("nome").value = "";
        document.getElementById("ingredientes").value = "";
        document.getElementById("receita").value = "";
        document.getElementById("custo").value = "";
        document.getElementById("porcoes").value = "";
    })
    .catch(erro => {
        console.error("Erro no fetch:", erro);
        alert("Ocorreu um erro ao tentar salvar a receita.");
    });
}