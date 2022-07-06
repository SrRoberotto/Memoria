const cards = document.querySelectorAll('.card');
const p1 = document.querySelectorAll('.p1');
const p2 = document.querySelectorAll('.p2');
const jogador = document.querySelectorAll('.jogador');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let atual = 0;
let score = [0, 0];

shuffleCards();

//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        score[atual]++;
        disableCards();
        return;
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    //troca jogador atual
    atual = atual==0 ? 1 : 0;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    jogador = "Jogador atual: Jogador " + atual + 1;
    p1 = "Jogador 1: "+ score[0]
    p2 = "Jogador 2: "+ score[1];
}

//função que embaralha as cartas
function shuffleCards() {
    cards.forEach((card) => {
        card.style.order = Math.floor(Math.random() * 12);
    })
}

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});