document.addEventListener('DOMContentLoaded', async () => {

    const API_URL = 'https://localhost:7108/Usuario/perfil';

    const nomeExibicao = document.getElementById('nome-exibicao');
    const emailExibicao = document.getElementById('email-exibicao');
    const cargoExibicao = document.getElementById('cargo-exibicao');

    async function buscarPerfil() {

        const response = await fetch(API_URL, {
            method: 'GET',
            credentials: 'include'
        });

        const dados = await response.json();

        if (!response.ok) {
            throw new Error(dados.mensagem);
        }

        return dados;
    }

    if (nomeExibicao && emailExibicao && cargoExibicao) {

        try {

            const usuario = await buscarPerfil();

            nomeExibicao.innerText = usuario.nome;
            emailExibicao.innerText = usuario.email;
            cargoExibicao.innerText = usuario.cargo;

        } catch (error) {

            console.error(error);

            alert(error.message);
        }
    }

    const form = document.getElementById('form-perfil');

    if (form) {

        try {

            const usuario = await buscarPerfil();

            document.getElementById('input-nome').value = usuario.nome;
            document.getElementById('input-email').value = usuario.email;
            document.getElementById('input-cargo').value = usuario.cargo;

        } catch (error) {

            console.error(error);

            alert(error.message);
        }

        form.addEventListener('submit', async (e) => {

            e.preventDefault();

            const usuarioAtualizado = {
                nome: document.getElementById('input-nome').value,
                email: document.getElementById('input-email').value,
                cargo: document.getElementById('input-cargo').value
            };

            try {

                const response = await fetch(API_URL, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(usuarioAtualizado)
                });

                const dados = await response.json();

                if (!response.ok) {
                    throw new Error(dados.mensagem);
                }

                alert(dados.mensagem);

                window.location.href = 'perfil.html';

            } catch (error) {

                console.error(error);

                alert(error.message);
            }
        });
    }
});

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