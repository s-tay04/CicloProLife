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

    // transforma arquivo em texto
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
    if(fileInput.files.length === 0) {
        alert("Por favor, selecione um arquivo primeiro!");
    } else {
        alert(`Relatório "${fileInput.files[0].name}" enviado com sucesso!`);
        // back-end
    }
}