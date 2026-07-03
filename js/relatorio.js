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

        // CARREGA RELATÓRIOS
        carregarRelatorios();

    } catch (error) {

        alert('Você precisa estar logado.');

        window.location.href = 'login.html';
    }
});

// CARREGAR RELATÓRIOS
async function carregarRelatorios() {

    const lista = document.getElementById('lista-relatorios');

    const ordenacao = document.getElementById('ordenacao');

    if (!lista || !ordenacao) return;

    const ordem = ordenacao.value;

    lista.innerHTML = "";

    try {

        const response = await fetch(
            `https://localhost:7108/Relatorio/listar?ordem=${ordem}`,
            {
                method: 'GET',
                credentials: 'include'
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao carregar relatórios.");
        }

        const relatorios = await response.json();

        // SEM RELATÓRIOS
        if (relatorios.length === 0) {

            const mensagem = document.createElement('p');

            mensagem.textContent = "Nenhum relatório encontrado.";

            lista.appendChild(mensagem);

            return;
        }

        // LISTA RELATÓRIOS
        relatorios.forEach(relatorio => {

            // CARD
            const item = document.createElement('div');

            item.classList.add('item-relatorio');

            // INFO
            const info = document.createElement('div');

            info.classList.add('info-relatorio');

            // NOME
            const nome = document.createElement('strong');

            nome.textContent = relatorio.nomeArquivo;

            // DATA
            const data = document.createElement('p');

            data.textContent =
                new Date(relatorio.dataUpload)
                .toLocaleString('pt-BR');

            // BOTÃO DOWNLOAD
            const botao = document.createElement('a');

            botao.href =
                `https://localhost:7108/Relatorio/download/${relatorio.idRelatorio}`;

            botao.target = "_blank";

            botao.classList.add('btn-download');

            botao.textContent = "Baixar";

            // ORGANIZAÇÃO
            info.appendChild(nome);

            info.appendChild(data);

            item.appendChild(info);

            item.appendChild(botao);

            lista.appendChild(item);
        });

    } catch (error) {

        console.error(error);

        const erro = document.createElement('p');

        erro.textContent = "Erro ao carregar relatórios.";

        lista.appendChild(erro);
    }
}

// ENVIAR RELATÓRIO
async function enviarRelatorio() {

    const fileInput = document.getElementById('input-arquivo');

    const textoArquivo = document.getElementById('texto-arquivo');

    if (!fileInput || fileInput.files.length === 0) {

        alert("Por favor, selecione um arquivo primeiro!");

        return;
    }

    const formData = new FormData();

    formData.append("file", fileInput.files[0]);

    try {

        const response = await fetch(
            'https://localhost:7108/Relatorio/upload',
            {
                method: 'POST',
                credentials: 'include',
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error(
                "Erro na comunicação com o servidor."
            );
        }

        const dados = await response.json();

        alert(dados.mensagem);

        // LIMPA INPUT
        fileInput.value = "";

        textoArquivo.textContent =
            "Clique aqui para selecionar o arquivo";

        textoArquivo.style.fontWeight = "normal";

        textoArquivo.style.color = "inherit";

        // RECARREGA LISTA
        carregarRelatorios();

    } catch (erro) {

        console.error("Erro no upload:", erro);

        alert(
            "Ocorreu um erro ao enviar o relatório."
        );
    }
}

// ALTERAR ORDENAÇÃO
document.addEventListener('DOMContentLoaded', () => {

    const ordenacao = document.getElementById('ordenacao');

    if (ordenacao) {

        ordenacao.addEventListener(
            'change',
            carregarRelatorios
        );
    }
});

// INPUT FILE
document.addEventListener('DOMContentLoaded', () => {

    const dropZone = document.getElementById('drop-zone');

    const inputArquivo = document.getElementById('input-arquivo');

    const textoArquivo = document.getElementById('texto-arquivo');

    if (!dropZone || !inputArquivo) return;

    dropZone.addEventListener('click', () => {

        inputArquivo.click();
    });

    inputArquivo.addEventListener('change', () => {

        if (inputArquivo.files.length > 0) {

            textoArquivo.textContent =
                inputArquivo.files[0].name;

            textoArquivo.style.fontWeight = "bold";
        }
    });
});

// MODO ESCURO
document.addEventListener("DOMContentLoaded", function () {

    const botaoTema = document.getElementById("toggle-tema");

    const iconeTema = document.getElementById("icone-tema");

    if (!botaoTema) return;

    function aplicarTema(modo) {

        if (modo === "dark") {

            document.body.classList.add("dark");

            if (iconeTema) {

                iconeTema.src = "../imagem/lua2.png";
            }

        } else {

            document.body.classList.remove("dark");

            if (iconeTema) {

                iconeTema.src = "../imagem/lua.png";
            }
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

    const temaSalvo =
        localStorage.getItem("tema") || "light";

    aplicarTema(temaSalvo);
});

// MOSTRAR / ESCONDER RELATÓRIOS

document.addEventListener('DOMContentLoaded', () => {

    const botaoToggle =
        document.getElementById('toggle-relatorios');

    const conteudo =
        document.getElementById('conteudo-relatorios');

    if (!botaoToggle || !conteudo) return;

    botaoToggle.addEventListener('click', () => {

        const estaOculto =
            conteudo.classList.contains('oculto');

        if (estaOculto) {

            conteudo.classList.remove('oculto');

            botaoToggle.textContent =
                'Esconder Relatórios';

        } else {

            conteudo.classList.add('oculto');

            botaoToggle.textContent =
                'Mostrar Relatórios';
        }
    });
});

function toggleRelatorios() {

    const lista = document.getElementById("lista-relatorios");

    const botao = document.querySelector(".btn-toggle-relatorios");

    lista.classList.toggle("oculto");

    if(lista.classList.contains("oculto")){

        botao.textContent = "Mostrar Relatórios";

    } else {

        botao.textContent = "Ocultar Relatórios";

    }
}