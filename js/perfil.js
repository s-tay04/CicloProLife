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

            localStorage.setItem('usuarioPerfil', JSON.stringify(novoPerfil));
            alert('Dados atualizados com sucesso!');
            window.location.href = 'perfil.html';
        });
    }
});