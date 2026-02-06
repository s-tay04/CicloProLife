function ordenarReceitas(){
    const conteiner = document.getElementById('lista-receitas');
    const receitas = Array.from(conteiner.getElementsByTagName('card'));

    receitas.sort((a,b) => {
        const nomeA = a.querySelector('h3').innerHTML.toLocaleLowerCase();
        const nomeB = b.querySelector('h3').innerHTML.toLocaleLowerCase();
        return
        nomeA.localeCompare(nomeB);
    })

    conteiner.innerHTML = " ";
    receitas.forEach(card =>
        conteiner.appendChild(card));
        
}