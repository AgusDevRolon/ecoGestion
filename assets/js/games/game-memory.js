// assets/js/game-memory.js

function initMemoryGame() {
    const container = document.getElementById('juego-memoria');
    if (!container) return;

    const resetButton = container.querySelector('.game-reset-button');
    const board = container.querySelector('.memory-game-board');
    const intentosDisplay = container.querySelector('#intentos-memoria');
    const cardData = [
        { name: 'plastico', img: 'assets/images/juego-memoria/plastico.svg' },
        { name: 'vidrio', img: 'assets/images/juego-memoria/vidrio.svg' },
        { name: 'papel', img: 'assets/images/juego-memoria/papel.svg' },
        { name: 'organico', img: 'assets/images/juego-memoria/organico.svg' },
        { name: 'metal', img: 'assets/images/juego-memoria/metal.svg' },
        { name: 'baterias', img: 'assets/images/juego-memoria/baterias.svg' },
    ];
    let firstCard, secondCard, hasFlippedCard = false, lockBoard = false, intentos = 0;

    function resetGame() {
        board.innerHTML = '';
        intentos = 0;
        intentosDisplay.textContent = 0;
        hasFlippedCard = false; lockBoard = false;
        const gameCards = [...cardData, ...cardData].sort(() => 0.5 - Math.random());
        gameCards.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.name = item.name;
            card.innerHTML = `<div class="card-face card-front"></div><div class="card-face card-back"><img src="${item.img}" alt="${item.name}"></div>`;
            board.appendChild(card);
            card.addEventListener('click', flipCard);
        });
    }

    function flipCard() {
        if (lockBoard || this.classList.contains('is-flipped')) return;
        this.classList.add('is-flipped');
        if (!hasFlippedCard) {
            hasFlippedCard = true; firstCard = this; return;
        }
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        lockBoard = true;
        intentos++;
        intentosDisplay.textContent = intentos;
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.classList.add('is-matched');
        secondCard.classList.add('is-matched');
        resetBoardState();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('is-flipped');
            secondCard.classList.remove('is-flipped');
            resetBoardState();
        }, 1200);
    }

    function resetBoardState() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    resetButton.addEventListener('click', resetGame);
    resetGame();
}