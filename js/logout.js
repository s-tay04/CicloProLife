function fazerLogout() {
    const urlFake = 'https://futura-api.com/api/logout';

    fetch(urlFake, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {

        console.log('Sessão encerrada no servidor.');

        localStorage.removeItem('meuToken');
        localStorage.removeItem('dadosUsuario');

        window.location.href = '../html/login.html';
    })
    .catch(error => {
        console.error('Erro de conexão:', error);
        
        localStorage.clear(); 
        window.location.href = '../html/login.html';
    });
}