const bancoDeReceitas = {
    'coxinha_jaca': {
        titulo: 'Coxinha de Jaca (Vegana)',
        imagem: '../imagem/coxinhajaca.png',
        ingredientes: [
            '2 xícaras de carne de jaca verde desfiada',
            '2 xícaras de farinha de trigo',
            '500ml de caldo de legumes',
            'Temperos (alho, cebola, páprica) a gosto',
            'Farinha de rosca para empanar'
        ],
        preparo: 'Refogue a jaca com temperos. Para a massa: ferva o caldo, junte a farinha e mexa até desgrudar. Sove a massa fria, recheie com a jaca, empane na farinha de rosca e frite.'
    },
    'brownie': {
        titulo: 'Brownie com Sorvete',
        imagem: '../imagem/brownie.png',
        ingredientes: [
            '200g de chocolate meio amargo derretido',
            '100g de manteiga',
            '3 ovos e 1 xícara de açúcar',
            '1/2 xícara de farinha de trigo',
            'Sorvete de creme para acompanhar'
        ],
        preparo: 'Misture chocolate derretido e manteiga. Bata ovos com açúcar e incorpore. Adicione a farinha delicadamente. Asse a 180°C por 25min (deve ficar úmido no meio). Sirva quente com sorvete.'
    },
    'cookie_pistache': {
        titulo: 'Cookie de Pistache',
        imagem: '../imagem/cookie_pistache.png',
        ingredientes: [
            '100g de manteiga gelada em cubos',
            '1/2 xícara de açúcar mascavo + 1/3 de branco',
            '1 ovo e 1 xícara de farinha de trigo',
            '1/2 xícara de pistache triturado',
            'Gotas de chocolate branco a gosto'
        ],
        preparo: 'Misture a manteiga com os açúcares até formar uma pasta. Junte o ovo. Adicione farinha, pistache e chocolate. Faça bolinhas, deixe 10min na geladeira e asse a 180°C por 12-15min.'
    }
};

const urlParams = new URLSearchParams(window.location.search);
const idReceita = urlParams.get('id');

const tituloElemento = document.getElementById('titulo-receita');
const imagemElemento = document.getElementById('imagem-receita');
const listaIngredientes = document.getElementById('lista-ingredientes'); // ONDE A LISTA VAI FICAR
const preparoElemento = document.getElementById('preparo-receita');

if (bancoDeReceitas[idReceita]) {
    const receita = bancoDeReceitas[idReceita];

    tituloElemento.innerText = receita.titulo;
    imagemElemento.src = receita.imagem;
    preparoElemento.innerText = receita.preparo;
    
    listaIngredientes.innerHTML = '';

    receita.ingredientes.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        listaIngredientes.appendChild(li);
    });

} else {
    tituloElemento.innerText = "Receita não encontrada";
    listaIngredientes.innerHTML = "";
    preparoElemento.innerHTML = "<a href='index.html'>Voltar para o início</a>";
}