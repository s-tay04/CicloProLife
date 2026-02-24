function cadastro() {

    const usuario = document.getElementById("usuario").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!usuario || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    // cria objeto usuário
    const novoUsuario = {
        usuario: usuario,
        email: email,
        senha: senha
    };

    // pega lista já existente (ou cria uma vazia)
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // verifica se email já existe
    const existe = usuarios.find(u => u.email === email);

    if (existe) {
        alert("Esse email já está cadastrado!");
        return;
    }

    // adiciona novo usuário
    usuarios.push(novoUsuario);

    // salva de volta no localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");

    // redireciona pro login
    window.location.href = "../html/login.html";
}

// Seleciona o campo de input pelo ID
const inputCpf = document.getElementById('cpf');

// Ouve toda vez que o usuário digita algo no campo
inputCpf.addEventListener('input', function(e) {
    // Pega o valor atual e remove tudo que NÃO for número (letras, símbolos, etc)
    let valor = e.target.value.replace(/\D/g, ''); 

    // Aplica a formatação (000.000.000-00)
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    // Atualiza o valor do campo com a máscara aplicada
    e.target.value = valor;
});