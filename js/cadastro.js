function cadastro() {

    const usuario = document.getElementById("usuario").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!usuario || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    
    const novoUsuario = {
        usuario: usuario,
        email: email,
        senha: senha
    };


    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


    const existe = usuarios.find(u => u.email === email);

    if (existe) {
        alert("Esse email já está cadastrado!");
        return;
    }


    usuarios.push(novoUsuario);


    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");


    window.location.href = "../html/login.html";
}


const inputCpf = document.getElementById('cpf');


inputCpf.addEventListener('input', function(e) {

    let valor = e.target.value.replace(/\D/g, ''); 


    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');


    e.target.value = valor;
});