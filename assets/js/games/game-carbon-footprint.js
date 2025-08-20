// assets/js/games/game-carbon-footprint.js

function initCarbonFootprintGame(container) {
    const questionEl = container.querySelector('#fp-question');
    const optionsEl = container.querySelector('#fp-options');
    const feedbackEl = container.querySelector('#fp-feedback');
    const finalScoreEl = container.querySelector('#fp-final-score');
    const finalPointsEl = container.querySelector('#fp-final-points');
    const finalMessageEl = container.querySelector('#fp-final-message');
    const carbonBar = container.querySelector('.footprint-bar');
    const resetButton = container.querySelector('.game-reset-button');

    const scenarios = [
        {
            question: "¿Cómo te desplazas por la mañana?",
            options: [
                { text: "Auto particular (gasolina)", value: 20, feedback: "El auto es cómodo, pero es el que más CO2 emite por persona." },
                { text: "Transporte público (colectivo)", value: 5, feedback: "El transporte público reduce mucho las emisiones al mover a muchas personas juntas." },
                { text: "Bicicleta o caminando", value: -10, feedback: "¡Excelente! El transporte activo tiene una huella de carbono nula y es bueno para tu salud." }
            ]
        },
        {
            question: "Para el almuerzo, eliges...",
            options: [
                { text: "Carne vacuna", value: 25, feedback: "La ganadería es una de las mayores fuentes de gases de efecto invernadero." },
                { text: "Pollo", value: 10, feedback: "El pollo tiene una huella de carbono menor que la carne vacuna, pero sigue siendo significativa." },
                { text: "Un plato vegetariano con productos locales", value: -15, feedback: "¡La mejor opción! Los alimentos vegetales y locales tienen la menor huella de carbono." }
            ]
        },
        {
            question: "Necesitas comprar ropa. ¿Qué haces?",
            options: [
                { text: "Comprar en una tienda de 'fast fashion'", value: 15, feedback: "La moda rápida tiene un alto costo ambiental por su producción y transporte masivo." },
                { text: "Comprar en una tienda de segunda mano", value: -10, feedback: "Reutilizar ropa es una forma fantástica de reducir el consumo y la contaminación." },
                { text: "Reparar una prenda que ya tienes", value: -15, feedback: "¡La decisión más sostenible! Reparar evita el consumo por completo." }
            ]
        },
        {
            question: "Al salir de una habitación, ¿qué haces con la luz?",
            options: [
                { text: "La dejo encendida por si vuelvo pronto", value: 5, feedback: "Cada minuto de luz encendida consume energía innecesariamente." },
                { text: "La apago siempre", value: -10, feedback: "Un pequeño gesto que, sumado, ahorra una gran cantidad de energía." }
            ]
        }
    ];

    let currentFootprint = 0;
    let currentQuestionIndex = 0;
    const maxFootprint = 100;

    function startGame() {
        currentFootprint = 0;
        currentQuestionIndex = 0;
        finalScoreEl.classList.add('is-hidden');
        questionEl.style.display = 'block';
        optionsEl.style.display = 'grid';
        updateMeter();
        displayNextQuestion();
    }

    function displayNextQuestion() {
        feedbackEl.textContent = '';
        if (currentQuestionIndex >= scenarios.length) {
            endGame();
            return;
        }

        const currentScenario = scenarios[currentQuestionIndex];
        questionEl.textContent = currentScenario.question;
        optionsEl.innerHTML = '';

        currentScenario.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'fp-option-btn';
            button.textContent = option.text;
            button.onclick = () => selectOption(option);
            optionsEl.appendChild(button);
        });
    }

    function selectOption(option) {
        currentFootprint += option.value;
        if (currentFootprint < 0) currentFootprint = 0;
        
        feedbackEl.textContent = option.feedback;
        updateMeter();

        // Marcar visualmente la opción elegida
        Array.from(optionsEl.children).forEach(btn => {
            btn.disabled = true; // Deshabilitar botones
            if(btn.textContent === option.text) {
                btn.classList.add(option.value > 0 ? 'is-selected-bad' : 'is-selected-good');
            }
        });

        currentQuestionIndex++;
        setTimeout(displayNextQuestion, 2500); // Esperar 2.5 segundos antes de la siguiente pregunta
    }

    function updateMeter() {
        let percentage = (currentFootprint / maxFootprint) * 100;
        if (percentage > 100) percentage = 100;
        carbonBar.style.setProperty('--footprint-level', `${percentage}%`);
    }

    function endGame() {
        questionEl.style.display = 'none';
        optionsEl.style.display = 'none';
        feedbackEl.textContent = '';

        finalPointsEl.textContent = currentFootprint;
        let message = "";
        if (currentFootprint < 15) {
            message = "¡Eres un Eco-Héroe! Tus decisiones diarias tienen un impacto muy positivo en el planeta.";
        } else if (currentFootprint < 40) {
            message = "¡Buen trabajo! Estás en el camino correcto. Sigue tomando decisiones conscientes.";
        } else {
            message = "Hay espacio para mejorar. Pequeños cambios en tu rutina pueden reducir significativamente tu huella de carbono.";
        }
        finalMessageEl.textContent = message;
        finalScoreEl.classList.remove('is-hidden');
    }

    resetButton.addEventListener('click', startGame);
    startGame();
}