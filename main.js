const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';

let linhas = '';
const notas = [];
const nomesAtividades = [];

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');
    const inputNotaMinima = document.getElementById('nota-minima');

    const nomeAtividade = inputNomeAtividade.value.trim();
    const nota = parseFloat(inputNotaAtividade.value);
    const notaMinima = parseFloat(inputNotaMinima.value);

    if (isNaN(nota) || nota < 0 || nota > 10) {
        alert("Por favor, insira uma nota válida entre 0 e 10.");
        return;
    }

    if (notaMinima < 0 || notaMinima > 10) {
        alert("Por favor, insira uma nota mínima válida entre 0 e 10.");
        return;
    }

    if (nomesAtividades.includes(nomeAtividade)) {
        alert("Essa atividade já foi inserida! Por favor, insira um nome diferente.");
        return;
    }

    nomesAtividades.push(nomeAtividade);

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

// Atualiza a média final e verifica aprovação/reprovação
function atualizarMediaFinal() {
    if (notas.length === 0) {
        const campoMedia = document.getElementById('media-final');
        const resultadoFinal = document.getElementById('resultado-final');
        campoMedia.textContent = '0';
        resultadoFinal.textContent = 'Nenhuma atividade inserida';
        resultadoFinal.classList.remove('aprovado', 'reprovado');
        return;
    }

    const soma = notas.reduce((total, nota) => total + nota, 0);
    const media = soma / notas.length;

    const campoMedia = document.getElementById('media-final');
    const resultadoFinal = document.getElementById('resultado-final');
    const notaMinima = parseFloat(document.getElementById('nota-minima').value);

    const mediaAjustada = Math.round(media * 2) / 2;
    campoMedia.textContent = Number.isInteger(mediaAjustada) ? mediaAjustada : mediaAjustada.toFixed(1);

    if (media >= notaMinima) {
        resultadoFinal.textContent = 'Aprovado';
        resultadoFinal.classList.remove('reprovado');
        resultadoFinal.classList.add('aprovado');
    } else {
        resultadoFinal.textContent = 'Reprovado';
        resultadoFinal.classList.remove('aprovado');
        resultadoFinal.classList.add('reprovado');
    }
}

// Função para limpar os dados
document.getElementById('limpar').addEventListener('click', function() {
    linhas = '';
    notas.length = 0;
    nomesAtividades.length = 0;

    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = '';

    const campoMedia = document.getElementById('media-final');
    const resultadoFinal = document.getElementById('resultado-final');
    campoMedia.textContent = '0';
    resultadoFinal.textContent = 'Nenhuma atividade inserida';
    resultadoFinal.classList.remove('aprovado', 'reprovado');
});
