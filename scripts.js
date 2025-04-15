// Seleciona os elementos do DOM
let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');
let container = document.querySelector('.container');
let items = container.querySelectorAll('.list .item');
let indicator = document.querySelector('.indicators');
let dots = indicator.querySelectorAll('ul li');
let numberElement = indicator.querySelector('.number');
let listElement = document.querySelector('.list'); // Elemento que contém a variável --calculation

// Variáveis de controle
let active = 0; // Índice do item ativo
let firstPosition = 0; // Primeiro item
let lastPosition = items.length - 1; // Último item

// Função para atualizar os dots (indicadores) e o número
const updateIndicators = () => {
    // Atualiza os dots
    dots.forEach((dot, index) => {
        if (index === active) {
            dot.classList.add('active'); // Ativa o dot correspondente ao item atual
        } else {
            dot.classList.remove('active'); // Desativa os outros dots
        }
    });

    // Atualiza o número (adiciona um zero à esquerda se necessário)
    numberElement.textContent = (active + 1).toString().padStart(2, '0');
};

// Função para avançar para o próximo item
const nextItem = () => {
    let itemOld = container.querySelector('.list .item.active');
    itemOld.classList.remove('active'); // Remove a classe do item atual

    // Define a direção da animação (vem da direita)
    listElement.style.setProperty('--calculation', '1');

    // Avança para o próximo item
    active = active + 1 > lastPosition ? 0 : active + 1;
    items[active].classList.add('active'); // Adiciona a classe ao novo item
    updateIndicators(); // Atualiza os dots e o número
};

// Função para retroceder para o item anterior
const prevItem = () => {
    let itemOld = container.querySelector('.list .item.active');
    itemOld.classList.remove('active'); // Remove a classe do item atual

    // Define a direção da animação (vem da esquerda)
    listElement.style.setProperty('--calculation', '-1');

    // Retrocede para o item anterior
    active = active - 1 < firstPosition ? lastPosition : active - 1;
    items[active].classList.add('active'); // Adiciona a classe ao novo item
    updateIndicators(); // Atualiza os dots e o número
};

// Inicializa os indicadores e o número
updateIndicators();

// Adiciona os eventos de clique aos botões
nextButton.addEventListener('click', nextItem);
prevButton.addEventListener('click', prevItem);

// Filtros mobile
document.querySelector('.filtros-mobile-btn').addEventListener('click', () => {
    document.querySelector('.filtros-sidebar').classList.toggle('ativo');
});

// Fechar filtros ao clicar fora
document.addEventListener('click', (e) => {
    if(!e.target.closest('.filtros-sidebar') && !e.target.closest('.filtros-mobile-btn')) {
        document.querySelector('.filtros-sidebar').classList.remove('ativo');
    }
});