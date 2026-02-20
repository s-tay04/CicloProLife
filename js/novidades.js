function enviar() {
    let textoReceita = document.getElementById("receita").value;
    let textoCusto = document.getElementById("custo").value;
    let textoPorcoes = document.getElementById("porcoes").value;

    if (textoReceita.trim() === "" || textoCusto.trim() === "" || textoPorcoes.trim() === "") {
        
        alert("Preencha todos os campos antes de enviar a receita!");
        
    } else {
        alert("Receita enviada com sucesso!");
        
        document.getElementById("receita").value = "";
        document.getElementById("custo").value = "";
        document.getElementById("porcoes").value = "";
    }
}