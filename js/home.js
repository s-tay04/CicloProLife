

const receitas = [
    { id: 'empada', garantiaNome: 'Empada', nome: 'Empada', img: '../imagem/empada.png' },
    { id: 'coxinha', nome: 'Coxinha', img: '../imagem/coxinhanormal.png' },
    { id: 'bolo-vulcao', nome: 'Bolo vulcão', img: '../imagem/bolo.png' },
    { id: 'pudim', nome: 'Pudim', img: '../imagem/pudim.png' }
];

const container = document.getElementById('lista-receitas');

function exibirReceitas(lista) {
    if (!container) return; // evita erro fora da home

    container.innerHTML = '';

    lista.forEach(item => {
        const link = document.createElement('a');
        link.href = `receita.html?id=${item.id}`;
        link.className = 'card-link';

        link.style.textDecoration = 'none';
        link.style.color = 'inherit';

        const card = document.createElement('div');
        card.className = 'card';

        const imagem = document.createElement('img');
        imagem.src = item.img;
        imagem.alt = item.nome;

        const titulo = document.createElement('h3');
        titulo.textContent = item.nome;

        card.appendChild(imagem);
        card.appendChild(titulo);
        link.appendChild(card);

        container.appendChild(link);
    });
}

// só executa se estiver na HOME
if (container) {
    exibirReceitas(receitas);
}


//modo escuro

document.addEventListener("DOMContentLoaded", function () {

    const botaoTema = document.getElementById("toggle-tema");
    const iconeTema = document.getElementById("icone-tema");

    if (!botaoTema) return;

    function aplicarTema(modo) {
        if (modo === "dark") {
            document.body.classList.add("dark");
            iconeTema.src = "../imagem/lua2.png"; // imagem nova
        } else {
            document.body.classList.remove("dark");
            iconeTema.src = "../imagem/lua.png"; // imagem original
        }
    }

    botaoTema.addEventListener("click", function () {
        const novoModo = document.body.classList.contains("dark") ? "light" : "dark";
        localStorage.setItem("tema", novoModo);
        aplicarTema(novoModo);
    });

    // mantém salvo ao atualizar
    const temaSalvo = localStorage.getItem("tema") || "light";
    aplicarTema(temaSalvo);

});