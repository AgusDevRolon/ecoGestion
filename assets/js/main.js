// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DE LA PÁGINA DE JUEGOS ---
    const gamesGrid = document.querySelector('.games-grid');
    // Este código solo se ejecutará si estamos en la página de juegos (juegos.html).
    if (gamesGrid) {
        // Mapa de Inicializadores de Juegos
        const gameInitializers = {
            'juego-memoria': initMemoryGame,
            'juego-clasificador': initSorterGame,
            'juego-quiz': initQuizGame,
            'juego-sopa-letras': initWordsGame,
            'juego-datos-curiosos': initFactsGame,
            'juego-pathfinder': initPathfinderGame,
            'juego-tetris': initTetrisGame,
            'juego-spot-difference': initSpotDifferenceGame,
            'juego-match-three': initMatchThreeGame,
            'juego-platformer': initPlatformerGame,
            'juego-whack-a-mole': initWhackAMoleGame,
            'juego-runner': initRunnerGame,
            'juego-true-false': initTrueFalseGame,
            'juego-decomposition-clock': initDecompositionClockGame,
            'juego-hangman': initHangmanGame,
            'juego-compost-builder': initCompostBuilderGame,
            'juego-clicker': initClickerGame,
            'juego-restoration': initRestorationGame,
            'juego-separation-challenge': initSeparationChallengeGame,
            'juego-carbon-footprint': initCarbonFootprintGame
        };

        // Lógica para Iniciar y Cerrar Juegos
        document.querySelectorAll('.game-card-container').forEach(container => {
            const startButton = container.querySelector('.game-start-button');
            const closeButton = container.querySelector('.game-close-button');
            const gameId = container.id;

            if (startButton) {
                startButton.addEventListener('click', () => {
                    gamesGrid.classList.add('game-active-mode');
                    container.classList.add('is-active');

                    if (!container.hasAttribute('data-initialized')) {
                        if (gameInitializers[gameId]) {
                            gameInitializers[gameId](container);
                        }
                        container.setAttribute('data-initialized', 'true');
                    }
                });
            }

            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    gamesGrid.classList.remove('game-active-mode');
                    container.classList.remove('is-active');
                });
            }
        });
    }
    
    // --- LÓGICA DE LA PÁGINA DE INICIO (INDEX.HTML) ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    // Este código solo se ejecutará si estamos en la página de inicio.
    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Alterna la clase 'is-visible' si el elemento está en la pantalla o no.
                // Esto hace que la animación se repita cada vez que se hace scroll.
                entry.target.classList.toggle('is-visible', entry.isIntersecting);
            });
        }, { 
            threshold: 0.2 // Se activa cuando el 20% del elemento es visible
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

});