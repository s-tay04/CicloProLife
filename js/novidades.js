function enviar() {
    let textoReceita = document.getElementById("receita").value;
    let textoCusto = document.getElementById("custo").value;
    let textoPorcoes = document.getElementById("porcoes").value;

    if (textoReceita.trim() === "" || textoCusto.trim() === "" || textoPorcoes.trim() === "") {
        alert("Preencha todos os campos antes de enviar a receita!");
        return; 
    }

    const novaReceita = {
        receita: textoReceita,
        custo: textoCusto,
        porcoes: textoPorcoes,
        data: new Date().toLocaleDateString()
    };

    let receitasSalvas = JSON.parse(localStorage.getItem("listaReceitas")) || [];

    receitasSalvas.push(novaReceita);

    localStorage.setItem("listaReceitas", JSON.stringify(receitasSalvas));

    alert("Receita salva no protótipo com sucesso!");
    
    document.getElementById("receita").value = "";
    document.getElementById("custo").value = "";
    document.getElementById("porcoes").value = "";
}