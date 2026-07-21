document.addEventListener("DOMContentLoaded", async function () {

    const fotoMenu = document.getElementById("foto-menu");

    if (!fotoMenu) return;

    try {

        const response = await fetch("https://localhost:7108/Usuario/perfil", {
            method: "GET",
            credentials: "include"
        });

        const usuario = await response.json();

        const fotoSalva = localStorage.getItem("fotoPerfil_" + usuario.email);

        if (fotoSalva) {
            fotoMenu.src = fotoSalva;
        }

    } catch (erro) {
        console.log("Não foi possível carregar a foto.");
    }

});