const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';

let linhas = '';
const notas = [];
const nomesAtividades = [];  // Array para armazenar os nomes das atividades

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');
    const inputNotaMinima = document.getElementById('nota-minima');

    const nomeAtividade = inputNomeAtividade.value.trim();
    const nota = parseFloat(inputNotaAtividade.value);
    const notaMinima = parseFloat(inputNotaMinima.value);

    // Verifica se a nota inserida é válida
    if (isNaN(nota) || nota < 0 || nota > 10) {
        alert("Por favor, insira uma nota válida entre 0 e 10.");
        return;
    }

    // Verifica se o nome da atividade já foi inserido
    if (nomesAtividades.includes(nomeAtividade)) {
        alert("Essa atividade já foi inserida! Por favor, insira um nome diferente.");
        return;
    }

    // Adiciona o nome da atividade ao array
    nomesAtividades.push(nomeAtividade);

    // Cria a linha da tabela
    let linha = '<tr>';
    linha += `<td>${nomeAtividade}</td>`;
    linha += `<td>${nota}</td>`;
    linha += `<td>${nota >= notaMinima ? imgAprovado : imgReprovado}</td>`;
    linha += '</tr>';

    linhas += linha;
    notas.push(nota);

    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;

    atualizarMediaFinal();

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
});

// Atualiza a média final
function atualizarMediaFinal() {
    const soma = notas.reduce((total, nota) => total + nota, 0);
    const media = soma / notas.length;

    const campoMedia = document.getElementById('media-final');
    const resultadoFinal = document.getElementById('resultado-final');

    const mediaAjustada = Math.round(media * 2) / 2;
    campoMedia.textContent = Number.isInteger(mediaAjustada) ? mediaAjustada : mediaAjustada.toFixed(1);
    
    if (media >= 7) {
        resultadoFinal.textContent = 'Aprovado';
        resultadoFinal.classList.remove('reprovado');
        resultadoFinal.classList.add('aprovado');
    } else {
        resultadoFinal.textContent = 'Reprovado';
        resultadoFinal.classList.remove('aprovado');
        resultadoFinal.classList.add('reprovado');
    }
}


