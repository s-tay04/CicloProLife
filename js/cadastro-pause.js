async function cadastro(event) {
    if (event) event.preventDefault();

    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (cpf === "" || email === "" || senha === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const dadosUsuario = {
        name: cpf,
        email: email,
        password: senha,
        job: "Programador"
    };

    try {
        const resposta = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosUsuario)
        });

        const resultado = await resposta.json();

        if (resposta.status === 201) {
            alert(`Cadastro realizado com sucesso! ID: ${resultado.id}`);
            document.querySelector('.formulario').reset();
        } else {
            alert("Erro ao cadastrar. Tente novamente.");
        }

    } catch (erro) {
        console.error(erro);
        alert("Erro de conexão com o servidor.");
    }
}