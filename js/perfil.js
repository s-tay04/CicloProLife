    const API_PERFIL = 'https://localhost:7108/Usuario/perfil';
    const API_EDITAR = 'https://localhost:7108/Usuario/alterarPerfil';
    const API_EXCLUIR = "https://localhost:7108/Usuario/excluir";
    
    document.addEventListener('DOMContentLoaded', async () => {

    const nomeExibicao = document.getElementById('nome-exibicao');
    const emailExibicao = document.getElementById('email-exibicao');
    const cargoExibicao = document.getElementById('cargo-exibicao');

    // BUSCAR PERFIL
    async function buscarPerfil() {

        const response = await fetch(API_PERFIL, {
            method: 'GET',
            credentials: 'include'
        });

        let dados = {};

        try {
            dados = await response.json();
        } catch {
            dados = {};
        }

        if (!response.ok) {
            throw new Error(dados.mensagem || 'Erro ao buscar perfil');
        }

        return dados;
    }

    // MOSTRAR PERFIL
    if (nomeExibicao && emailExibicao && cargoExibicao) {

        try {

            const usuario = await buscarPerfil();

            nomeExibicao.innerText = usuario.nome;
            emailExibicao.innerText = usuario.email;
            cargoExibicao.innerText = usuario.cargo;

        } catch (error) {

            console.error("ERRO AO BUSCAR PERFIL:", error);

            alert("Erro: " + error.message);
        }
    }

    // FORMULÁRIO EDITAR PERFIL
    const form = document.getElementById('form-perfil');

    if (form) {

        try {

            const usuario = await buscarPerfil();

            document.getElementById('input-nome').value = usuario.nome;
            document.getElementById('input-email').value = usuario.email;
            document.getElementById('input-cargo').value = usuario.cargo;

        } catch (error) {

            console.error("ERRO AO CARREGAR PERFIL:", error);

            alert("Erro: " + error.message);
        }

        // SALVAR ALTERAÇÕES
        form.addEventListener('submit', async (e) => {

            e.preventDefault();

            const usuarioAtualizado = {
                nome: document.getElementById('input-nome').value,
                email: document.getElementById('input-email').value,
                cargo: document.getElementById('input-cargo').value
            };

            console.log("DADOS ENVIADOS:");
            console.log(usuarioAtualizado);

            try {

                const response = await fetch(API_EDITAR, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(usuarioAtualizado)
                });

                console.log("STATUS:", response.status);

                let dados = {};

                try {
                    dados = await response.json();
                } catch {
                    dados = {};
                }

                console.log("RESPOSTA DO BACK:");
                console.log(dados);

                if (!response.ok) {
                    throw new Error(dados.mensagem || 'Erro ao atualizar perfil');
                }

                alert(dados.mensagem || 'Perfil atualizado!');

                window.location.href = 'perfil.html';

            } catch (error) {

                console.error("ERRO COMPLETO:");
                console.error(error);

                alert("Erro: " + error.message);
            }
        });
    }

            const btnDelete = document.getElementById("btn-delete");

            if (btnDelete) {
              btnDelete.addEventListener("click", excluirConta);
            }
});

// LOGOUT
async function fazerLogout(event) {

    event.preventDefault();

    try {

        const response = await fetch('https://localhost:7108/Usuario/logout', {
            method: 'POST',
            credentials: 'include'
        });

        let dados = {};

        try {
            dados = await response.json();
        } catch {
            dados = {};
        }

        alert(dados.mensagem || 'Logout realizado');

        window.location.href = 'login.html';

    } catch (error) {

        console.error("ERRO LOGOUT:", error);

        alert('Erro ao realizar logout.');
    }
}

 //EXCLUIR CONTA
 async function excluirConta() {

    const confirmar = confirm("Tem certeza que deseja excluir sua conta?");

    if (!confirmar) {
        return;
    }

    try {

        const response = await fetch(API_EXCLUIR, {
            method: "DELETE",
            credentials: "include"
        });

        let dados = {};

        try {
            dados = await response.json();
        } catch {
            dados = {};
        }

        if (!response.ok) {
            throw new Error(dados.mensagem || "Erro ao excluir conta.");
        }

        alert(dados.mensagem || "Conta excluída com sucesso!");

        window.location.href = "login.html";

    } catch (error) {

        console.error("ERRO:", error);

        alert(error.message);
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

        } else {

            document.body.classList.remove("dark");
            iconeTema.src = "../imagem/lua.png";
        }
    }

    botaoTema.addEventListener("click", function () {

        const novoModo = document.body.classList.contains("dark")
            ? "light"
            : "dark";

        localStorage.setItem("tema", novoModo);

        aplicarTema(novoModo);
    });

    const temaSalvo = localStorage.getItem("tema") || "light";

    aplicarTema(temaSalvo);
});