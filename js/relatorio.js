document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('graficoConsumo');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Coxinha', 'Joelho', 'Brownie'], 
            datasets: [{
                data: [45, 30, 25],
                backgroundColor: [
                    '#E85D04',
                    '#FAA307',
                    '#FFD2B6'
                ],
                borderWidth: 0 
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('input-arquivo');
    const textoArquivo = document.getElementById('texto-arquivo');

    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        if (fileInput.files.length > 0) {
            textoArquivo.textContent = "Arquivo selecionado: " + fileInput.files[0].name;
            textoArquivo.style.fontWeight = "bold";
            textoArquivo.style.color = "#333";
        }
    });
});

function enviarRelatorio() {
    const fileInput = document.getElementById('input-arquivo');
    const textoArquivo = document.getElementById('texto-arquivo');

    if(fileInput.files.length === 0) {
        alert("Por favor, selecione um arquivo primeiro!");
        return;
    } 

    const formData = new FormData();
    formData.append("arquivo", fileInput.files[0]);

    fetch('https://futura-api.com/api//posts', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na comunicação com o servidor.");
        }
        return response.json();
    })
    .then(dadosDoServidor => {
        console.log("Simulação de envio do arquivo feita com sucesso:", dadosDoServidor);
        
        alert(`Relatório "${fileInput.files[0].name}" enviado com sucesso!`);
        
        fileInput.value = "";
        textoArquivo.textContent = "Arraste e solte o arquivo aqui ou clique para selecionar";
        textoArquivo.style.fontWeight = "normal";
        textoArquivo.style.color = "inherit";
    })
    .catch(erro => {
        console.error("Erro no fetch:", erro);
        alert("Ocorreu um erro ao enviar o relatório. Tente novamente.");
    });
}