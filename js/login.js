function login(event) {
    if (event) event.preventDefault();

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

    const url = 'https://futura-api.com/api/login';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credenciais)
    })
    .then(response => {
        console.log("Login feito na API com sucesso!");
        
        localStorage.setItem("usuarioLogado", JSON.stringify(credenciais));
        
        alert("Login realizado com sucesso!");
        window.location.href = "../html/home.html";
    })
    .catch(error => {
        console.error("API não encontrada, verificando LocalStorage...");

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioValido = usuarios.find(u => u.email === email && u.senha === senha);

        if (usuarioValido) {
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));
            
            alert("Login realizado com sucesso!");
            window.location.href = "../html/home.html";
        } else {
            alert("E-mail ou senha incorretos!");
        }
    });
}