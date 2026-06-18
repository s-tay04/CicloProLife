let meuGrafico = null;

document.addEventListener('DOMContentLoaded', () => {
    carregarDadosDoGrafico();

    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('input-arquivo');
    const textoArquivo = document.getElementById('texto-arquivo');

    if (dropZone) {
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', (event) => {
            if (fileInput.files.length > 0) {
                textoArquivo.textContent = "Arquivo selecionado: " + fileInput.files[0].name;
                textoArquivo.style.fontWeight = "bold";
                textoArquivo.style.color = "#333";
                
                enviarRelatorio(); 
            }
        });
    }
});

// BUSCA OS DADOS DO BANCO, RENDERIZA O GRÁFICO E CRIA AS LEGENDAS
function carregarDadosDoGrafico() {
    const ctx = document.getElementById('graficoConsumo');
    const listaLegendaContainer = document.getElementById('lista-legenda-dinamica');
    if (!ctx) return;

    fetch('https://localhost:7108/Venda/grafico') 
        .then(response => {
            if (!response.ok) throw new Error("Erro ao buscar dados do servidor.");
            return response.json();
        })
        .then(dados => {
            if (dados.length === 0) {
                if (listaLegendaContainer) listaLegendaContainer.innerHTML = "<li>Nenhum dado encontrado</li>";
                return;
            }

            const labelsProdutos = dados.map(item => item.produto);
            const valoresQuantidades = dados.map(item => item.quantidade);

            const cores = ['#E85D04', '#FAA307', '#FFD2B6', '#FF9F1C', '#FFBF69'];

            if (meuGrafico) {
                meuGrafico.data.labels = labelsProdutos;
                meuGrafico.data.datasets[0].data = valoresQuantidades;
                meuGrafico.data.datasets[0].backgroundColor = cores.slice(0, labelsProdutos.length);
                meuGrafico.update();
            } else {
                meuGrafico = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labelsProdutos, 
                        datasets: [{
                            data: valoresQuantidades,
                            backgroundColor: cores.slice(0, labelsProdutos.length),
                            borderWidth: 0 
                        }]
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }

            if (listaLegendaContainer) {
                listaLegendaContainer.innerHTML = "";

                dados.forEach((item, index) => {
                    const corItem = cores[index % cores.length];

                    const li = document.createElement('li');
                    li.innerHTML = `<span class="bolinha" style="background-color: ${corItem};"></span> ${item.produto}`;
                    
                    listaLegendaContainer.appendChild(li);
                });
            }
        })
        .catch(erro => console.error("Erro ao buscar dados do gráfico:", erro));
}

function enviarRelatorio() {
    const fileInput = document.getElementById('input-arquivo');
    const textoArquivo = document.getElementById('texto-arquivo');

    if (!fileInput || fileInput.files.length === 0) {
        alert("Por favor, selecione um arquivo primeiro!");
        return;
    } 

    const formData = new FormData();
    formData.append("file", fileInput.files[0]); 

    fetch('https://localhost:7108/Relatorio/upload', { 
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na comunicação com o servidor ao processar o arquivo.");
        }
        return response.text();
    })
    .then(mensagem => {
        alert("Relatório processado e salvo no Banco de Dados com sucesso!");
        
        fileInput.value = "";
        textoArquivo.textContent = "Clique aqui para selecionar o arquivo";
        textoArquivo.style.fontWeight = "normal";
        textoArquivo.style.color = "inherit";

        carregarDadosDoGrafico();
    })
    .catch(erro => {
        console.error("Erro no upload:", erro);
        alert("Ocorreu um erro ao enviar o relatório. Verifique a estrutura do arquivo.");
    });
}

// MODO ESCURO
document.addEventListener("DOMContentLoaded", function () {
    const botaoTema = document.getElementById("toggle-tema");
    const iconeTema = document.getElementById("icone-tema");

    if (!botaoTema) return;

    function aplicarTema(modo) {
        if (modo === "dark") {
            document.body.classList.add("dark");
            if(iconeTema) iconeTema.src = "../imagem/lua2.png"; 
        } else {
            document.body.classList.remove("dark");
            if(iconeTema) iconeTema.src = "../imagem/lua.png"; 
        }
    }

    botaoTema.addEventListener("click", function () {
        const novoModo = document.body.classList.contains("dark") ? "light" : "dark";
        localStorage.setItem("tema", novoModo);
        aplicarTema(novoModo);
    });

    const temaSalvo = localStorage.getItem("tema") || "light";
    aplicarTema(temaSalvo);
});