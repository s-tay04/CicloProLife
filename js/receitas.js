const bancoDeReceitas = {
    'empada': {
        titulo: 'Empada de Frango',
        imagem: '../imagem/empada.png',
        ingredientes: [
            '2 xícaras de farinha de trigo',
            '100g de manteiga ou margarina',
            '1 gema de ovo',
            'Sal a gosto',
            '300g de frango desfiado temperado (recheio)'
        ],
        preparo: 'Misture a farinha com a manteiga até virar uma farofa. Adicione a gema e o sal, amasse até soltar da mão. Forre as forminhas, coloque o recheio, feche com mais massa e pincele gema. Asse por 30min.'
    },
    'coxinha': {
        titulo: 'Coxinha de Frango',
        imagem: '../imagem/coxinhanormal.png',
        ingredientes: [
            '500ml de caldo de galinha',
            '500g de farinha de trigo',
            '2 colheres de sopa de óleo',
            'Frango desfiado e temperado',
            'Farinha de rosca para empanar'
        ],
        preparo: 'Ferva o caldo com o óleo. Jogue a farinha de uma vez e mexa rápido até desgrudar da panela. Deixe esfriar, sove a massa, recheie modelando a coxinha. Passe na água/ovo, na farinha de rosca e frite.'
    },
    'joelho': {
        titulo: 'Joelho de Queijo e Presunto',
        imagem: '../imagem/joelho.png',
        ingredientes: [
            '500g de farinha de trigo',
            '10g de fermento biológico seco',
            '300ml de leite morno',
            'Presunto e Queijo muçarela',
            'Orégano a gosto'
        ],
        preparo: 'Faça a massa misturando os secos e depois o leite. Deixe crescer por 1h. Abra a massa, coloque presunto e queijo, enrole como rocambole. Corte os pedaços, deixe crescer mais 20min e asse.'
    },
    'enroladinho': {
        titulo: 'Enroladinho de Salsicha',
        imagem: '../imagem/enroladinho.png',
        ingredientes: [
            '1 xícara de leite morno',
            '1 colher de fermento biológico',
            'Farina de trigo (até dar o ponto)',
            '10 salsichas aferventadas',
            'Gema para pincelar'
        ],
        preparo: 'Misture o leite, fermento e farinha até desgrudar das mãos. Deixe descansar 30 min. Abra a massa em tiras e enrole em volta das salsichas. Pincele gema e asse em forno médio até dourar.'
    },

    'bem-casado': {
        titulo: 'Bem Casado Clássico',
        imagem: '../imagem/bemcasado.png',
        ingredientes: [
            '4 ovos',
            '4 colheres de açúcar',
            '1 colher de fermento',
            'Farinha de trigo',
            'Doce de leite (para rechear)'
        ],
        preparo: 'Bata os ovos com açúcar até ficar fofo. Adicione farinha e fermento delicadamente. Pingue a massa em forma untada e asse rápido (8 min). Recheie com doce de leite e passe no açúcar de confeiteiro.'
    },

    'bolo-vulcao': {
        titulo: 'Bolo Vulcão de Chocolate',
        imagem: '../imagem/bolo.png',
        ingredientes: [
            '3 ovos e 1 xícara de óleo',
            '1 xícara de leite e 2 de açúcar',
            '3 xícaras de farinha e 1 de chocolate em pó',
            '1 colher de fermento',
            'Cobertura: 2 latas de leite condensado + creme de leite'
        ],
        preparo: 'Bata a massa no liquidificador (menos fermento e farinha, que vão por último). Asse em forma de furo central. Faça um brigadeiro mole para a cobertura e despeje no furo central do bolo desenformado.'
    },

    'pudim': {
        titulo: 'Pudim de Leite Condensado',
        imagem: '../imagem/pudim.png',
        ingredientes: [
            '1 lata de leite condensado',
            'A mesma medida de leite',
            '3 ovos inteiros',
            '1 xícara de açúcar (para a calda)'
        ],
        preparo: 'Derreta o açúcar na forma até virar caramelo. Bata os outros ingredientes no liquidificador. Despeje na forma caramelizada e asse em banho-maria por cerca de 1h30. Gele antes de desenformar.'
    },

    'donut': {
        titulo: 'Donuts Americanos',
        imagem: '../imagem/donut.png',
        ingredientes: [
            '500g de farinha de trigo',
            '70g de açúcar',
            '2 ovos e 1 colher de manteiga',
            '15g de fermento biológico',
            'Cobertura rosa e granulado'
        ],
        preparo: 'Misture os ingredientes da massa e sove bem. Deixe crescer até dobrar. Abra, corte em rodelas (com furo no meio) e frite em óleo não muito quente. Mergulhe na cobertura e decore.'
    },
    
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