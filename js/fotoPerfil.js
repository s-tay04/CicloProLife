document.addEventListener("DOMContentLoaded", function () {

    console.log("fotoPerfil.js carregou");

    const fotoMenu = document.getElementById("foto-menu");
    console.log("Imagem:", fotoMenu);

    const fotoSalva = localStorage.getItem("fotoPerfil");
    console.log("Foto salva:", fotoSalva);

    if (fotoMenu && fotoSalva) {
        fotoMenu.src = fotoSalva;
        console.log("Imagem trocada!");
    }

});