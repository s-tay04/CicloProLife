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