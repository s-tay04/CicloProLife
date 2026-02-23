function enviar() {
    let textoAvaliacao = document.getElementById("receita").value;
    if (textoAvaliacao.trim() === "") {
        alert("Escreva a avaliação primeiro!");
    } else {
        alert("Avaliação enviada com sucesso!");
        document.getElementById("receita").value = "";
    }
}