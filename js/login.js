function login(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {

        alert("Preencha todos os campos!");

        return;
    }

    const credenciais = {
        email: email,
        senha: senha
    };

    fetch('https://localhost:7108/Usuario/login', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        credentials: 'include',

        body: JSON.stringify(credenciais)
    })

    .then(async response => {

        const dados = await response.json();

        if (!response.ok) {
            throw new Error(dados.mensagem);
        }

        return dados;
    })

    .then(dados => {

        alert("Login realizado com sucesso!");

        window.location.href = "../html/home.html";
    })

    .catch(error => {

        console.error(error);

        alert(error.message);
    });
}