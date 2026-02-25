function cadastro(event) {
    if (event) event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido (ex: seuemail@gmail.com).");
        return;
    }

    const novoUsuario = {
        email: email,
        senha: senha
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(u => u.email === email);

    if (existe) {
        alert("Esse e-mail já está cadastrado!");
        return;
    }

    const url = 'https://futura-api.com/api/usuarios';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
    })
    .then(response => {
        console.log("Dados enviados para a API com sucesso!");
        
        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cadastro realizado com sucesso!");
        window.location.href = "../html/login.html";
    })
    .catch(error => {
        console.error("Erro ao conectar com a API:", error);
        
        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cadastro realizado com sucesso (Salvo localmente)!");
        window.location.href = "../html/login.html";
    });
}