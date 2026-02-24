function cadastro() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(u => 
        u.email === email && u.senha === senha
    );

    if (!usuarioEncontrado) {
        alert("Email ou senha inválidos!");
        return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

    alert("Login realizado!");

    window.location.href = "../html/home.html";
}

const inputCpf = document.getElementById('cpf');

inputCpf.addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\D/g, ''); 

    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    e.target.value = valor;
});