function mudarTela() {
    // Pega as duas telas pelo ID
    const grafico = document.getElementById('tela-grafico');
    const upload = document.getElementById('tela-upload');

    // Esconde a primeira e mostra a segunda
    grafico.style.display = 'none';
    upload.style.display = 'flex';
    upload.style.flexDirection = 'column';
    upload.style.alignItems = 'center';
}