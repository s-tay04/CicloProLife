function exibirReceitas(lista){
    container.innerHTML = '';

    lista.forEach(item => {

        const card = document.createElement('div');
        card.className = 'card';

        /* -------- ESQUERDA -------- */
        const left = document.createElement('div');
        left.className = 'card-left';

        const imagem = document.createElement('img');
        imagem.src = item.img;

        const info = document.createElement('div');
        info.className = 'card-info';

        const titulo = document.createElement('h2');
        titulo.textContent = item.nome;

        const avaliacao = document.createElement('p');
        avaliacao.textContent = "Avaliação do Chef: ⭐ 4.3";

        const descricao = document.createElement('p');
        descricao.textContent = "Sabor equilibrado, tempero marcante e massa leve.";

        info.appendChild(titulo);
        info.appendChild(avaliacao);
        info.appendChild(descricao);

        left.appendChild(imagem);
        left.appendChild(info);

        /* -------- DIREITA -------- */
        const right = document.createElement('div');
        right.className = 'card-right';

        const pergunta = document.createElement('p');
        pergunta.textContent = "Receita Aprovada?";

        const chef = document.createElement('img');
        chef.src = "../imagem/chef.png"; 

        const botoes = document.createElement('div');
        botoes.className = 'botoes';

        const sim = document.createElement('button');
        sim.className = 'btn-sim';
        sim.textContent = "Sim ✓";

        const nao = document.createElement('button');
        nao.className = 'btn-nao';
        nao.textContent = "Não ✗";

        botoes.appendChild(sim);
        botoes.appendChild(nao);

        right.appendChild(pergunta);
        right.appendChild(chef);
        right.appendChild(botoes);

        /* -------- MONTA CARD -------- */
        card.appendChild(left);
        card.appendChild(right);

        container.appendChild(card);
    });
}

function sim(botao) {
    const cardRight = botao.closest('.card-right');
    
    const texto = cardRight.querySelector('p');
    const imagem = cardRight.querySelector('img');
    const divBotoes = cardRight.querySelector('.botoes');

    texto.textContent = 'Receita Aprovada!';
    imagem.src = '../imagem/aprovada.png'; 

    imagem.style.width = '200px'; // Ajuste esse número para o tamanho que achar melhor
    imagem.style.height = '180px'; // Mantenha a altura igual à largura
    imagem.style.objectFit = 'contain'; // Garante que a imagem não fique esticada ou amassada
    
    
    // Esconde os botões (opcional, mas recomendado)
    divBotoes.style.display = 'none';
}

function nao(botao) {
    const cardRight = botao.closest('.card-right');
    
    const texto = cardRight.querySelector('p');
    const imagem = cardRight.querySelector('img');
    const divBotoes = cardRight.querySelector('.botoes');

    // Altera o texto e a imagem
    texto.textContent = 'Receita Excluída!';
    imagem.src = '../imagem/excluida.png'; // Coloque o nome da sua imagem de exclusão aqui

    imagem.style.width = '350px'; // Ajuste esse número para o tamanho que achar melhor
    imagem.style.height = '300px'; // Mantenha a altura igual à largura
    imagem.style.objectFit = 'contain'; // Garante que a imagem não fique esticada ou amassada
    
    // Esconde os botões
    divBotoes.style.display = 'none';
}