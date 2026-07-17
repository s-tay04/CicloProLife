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

        const params = new URLSearchParams(window.location.search);
        const idReceita = params.get("id");

        await carregarReceita(idReceita);

    } catch (error) {

        alert('Você precisa estar logado.');

    }

});

async function carregarReceita(id) {

    try {

        const response = await fetch(
            `https://localhost:7108/Receita/${id}`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Receita não encontrada.");
        }

        const receita = await response.json();

        document.getElementById("titulo-receita").innerText = receita.titulo;

        document.getElementById("imagem-receita").src =
            `https://localhost:7108/uploads/${receita.imagem}`;

        document.getElementById("preparo-receita").innerText =
            receita.modoPreparo;

            const listaIngredientes = document.getElementById("lista-ingredientes");

listaIngredientes.innerHTML = "";

if (receita.ingredientes && receita.ingredientes.length > 0) {

    receita.ingredientes.forEach(ingrediente => {

        const li = document.createElement("li");

        li.textContent =
            `${ingrediente.quantidade} ${ingrediente.unidade} - ${ingrediente.nomeIngrediente}`;

        listaIngredientes.appendChild(li);

    });

} else {

    listaIngredientes.innerHTML = "<li>Nenhum ingrediente cadastrado.</li>";

}

    }
    catch(err){

        console.log(err);

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


    const temaSalvo = localStorage.getItem("tema") || "light";
    aplicarTema(temaSalvo);

});