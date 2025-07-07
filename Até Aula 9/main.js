// Seleciona o elemento que mostra o número de caracteres da senha
const numeroSenha = document.querySelector('.parametro-senha__texto');

// Valor inicial do tamanho da senha
let tamanhoSenha = 12;

// Exibe o valor inicial no HTML
numeroSenha.textContent = tamanhoSenha;

// Conjuntos de caracteres disponíveis para compor a senha
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '123456789'; // Exclui o zero propositalmente
const simbolos = '!@%*?';
const zero = '0'; // Zero separado como opção adicional

// Captura os elementos do DOM usados no script
const botoes = document.querySelectorAll('.parametro-senha__botao'); // Botões de + e -
const campoSenha = document.querySelector('#campo-senha'); // Campo onde a senha aparece
const checkbox = document.querySelectorAll('.checkbox'); // Todos os checkboxes de opções
const forcaSenha = document.querySelector('.forca'); // Div que mostra a força da senha visualmente

// Atribui função ao botão "-" para diminuir o tamanho da senha
botoes[0].onclick = diminuiTamanho;

// Atribui função ao botão "+" para aumentar o tamanho da senha
botoes[1].onclick = aumentaTamanho;

// Função para diminuir o tamanho da senha (mínimo de 1 caractere)
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha(); // Gera nova senha com o novo tamanho
}

// Função para aumentar o tamanho da senha (máximo de 64 caracteres)
function aumentaTamanho() {
    if (tamanhoSenha < 64) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha(); // Gera nova senha com o novo tamanho
}

// Toda vez que um checkbox for clicado, gera uma nova senha automaticamente
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Gera a senha automaticamente ao carregar a página
geraSenha();

// Função principal para gerar a senha
function geraSenha() {
    let alfabeto = ''; // Conjunto de caracteres que será usado

    // Adiciona os conjuntos conforme os checkboxes marcados
    if (checkbox[0].checked) alfabeto += letrasMaiusculas;
    if (checkbox[1].checked) alfabeto += letrasMinusculas;
    if (checkbox[2].checked) alfabeto += numeros;
    if (checkbox[3].checked) alfabeto += simbolos;
    if (checkbox[4].checked) alfabeto += zero;

    let senha = '';

    // Gera cada caractere da senha de forma aleatória
    for (let i = 0; i < tamanhoSenha; i++) {
        const indice = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto.charAt(indice);
    }

    // Exibe a senha gerada no campo de texto
    campoSenha.value = senha;

    // Classifica visualmente a força da senha
    classificaSenha(alfabeto.length);
}

// Função que calcula a entropia e classifica a força da senha
function classificaSenha(tamanhoAlfabeto) {
    // Fórmula de entropia: tamanho da senha * log2 do tamanho do alfabeto
    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia); // (opcional) imprime no console a entropia

    // Remove qualquer classe anterior da barra de força
    forcaSenha.className = 'forca';

    // Aplica uma nova classe com base na entropia
    if (entropia < 28) {
        forcaSenha.classList.add('muito-fraca');
    } else if (entropia >= 28 && entropia < 36) {
        forcaSenha.classList.add('fraca');
    } else if (entropia >= 36 && entropia < 60) {
        forcaSenha.classList.add('media');
    } else if (entropia >= 60 && entropia < 100) {
        forcaSenha.classList.add('forte');
    } else {
        forcaSenha.classList.add('muito-forte');
    }

    // Calcula uma estimativa de dias para quebrar a senha, considerando 100 milhões de tentativas por segundo
    const valorEntropia = document.querySelector('.entropia');
    const diasEstimados = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));

    // Mostra essa estimativa no texto abaixo da barra
    valorEntropia.textContent = `Um computador pode levar até ${diasEstimados} dias para descobrir essa senha.`;
}





