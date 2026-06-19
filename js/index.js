function cadastro(event) {
    if (event) event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const cargo = document.getElementById("cargo").value;

    if (!nome || !email || !senha || !cargo) {
        alert("Preencha todos os campos!");
        return;
    }

    // Validação do formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido (ex: seuemail@gmail.com).");
        return;
    }

    const novoUsuarioAPI = {
        Nome: nome,
        Email: email,
        Senha: senha,
        Cargo: cargo
    };

    // LocalStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(u => u.email === email);

    if (existe) {
        alert("Esse e-mail já está cadastrado!");
        return;
    }

    const url = 'https://localhost:7108/Usuario/cadastrar'; 

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuarioAPI)
    })
    .then(async response => {
        const dados = await response.json();

        if (response.ok) {
            console.log("Dados enviados para a API com sucesso!");

            usuarios.push({ nome, email, senha, cargo });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert(dados.mensagem || "Cadastro realizado com sucesso!");
            window.location.href = "../html/login.html";
        } else {
            alert(dados.mensagem || "Erro ao realizar o cadastro no servidor.");
        }
    })
    .catch(error => {
        console.error("Erro ao conectar com a API:", error);
        alert("Não foi possível conectar ao servidor Back-end.");
    });
}