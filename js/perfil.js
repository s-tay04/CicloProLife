document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('nome-exibicao')) {
        const dados = JSON.parse(localStorage.getItem('usuarioPerfil'));
        
        if (dados) {
            document.getElementById('nome-exibicao').innerText = dados.nome;
            document.getElementById('email-exibicao').innerText = dados.email;
            document.getElementById('cargo-exibicao').innerText = dados.cargo;
        }
    }

    const form = document.getElementById('form-perfil');
    if (form) {
        const dadosExistentes = JSON.parse(localStorage.getItem('usuarioPerfil'));
        
        if (dadosExistentes) {
            document.getElementById('input-nome').value = dadosExistentes.nome;
            document.getElementById('input-email').value = dadosExistentes.email;
            document.getElementById('input-cargo').value = dadosExistentes.cargo;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const novoPerfil = {
                nome: document.getElementById('input-nome').value,
                email: document.getElementById('input-email').value,
                cargo: document.getElementById('input-cargo').value
            };

            fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoPerfil)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na comunicação com o servidor.');
                }
                return response.json();
            })
            .then(dadosDoServidor => {
                console.log('Perfil atualizado no servidor fake:', dadosDoServidor);

                localStorage.setItem('usuarioPerfil', JSON.stringify(novoPerfil));
                
                alert('Dados atualizados com sucesso!');
                window.location.href = 'perfil.html';
            })
            .catch(erro => {
                console.error('Erro no fetch:', erro);
                alert('Ocorreu um erro ao tentar atualizar o perfil. Tente novamente.');
            });
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