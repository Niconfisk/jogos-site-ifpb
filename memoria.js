// Lógica do jogo da memória
// Objetivo: criar um jogo da memória com cartas e suas respectivas imagens (imagens do Campus)
// Implentar ao jogo da memória as seguintes funcionalidades: Adicionar um texto referente a imagem que o usuário acertou no jogo, o texto aparecendo em pop-up quando o usuário acertar o par e o texto será respectivo a imagem.

document.addEventListener("DOMContentLoaded", () => {
    const locations = [];
    for (let i = 1; i <= 10; i++) {
        let locate = {
            id: i,
            title: `Local ${i}`,
            description: `Breve história do Local ${i}`,
        };
        locations.push(locate);
    }

    let gameGrid = [...locations, ...locations]; // Criando os pares
    gameGrid.sort(() => 0.5 - Math.random()); // Embaralhando as cartas

    const gameBoard = document.getElementById("game-board");
    let firstCard, secondCard;
    let lockBoard = false;

    // Função para criar as cartas dinamicamente
    function createBoard() {
        gameGrid.forEach((location) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.id = location.id;

            const img = document.createElement("img");
            img.src = "img/local.jpg"; // Imagens locais
            card.appendChild(img);

            card.addEventListener("click", flipCard);
            gameBoard.appendChild(card);
        });
    }

    // Função para virar a carta
    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.classList.add("flipped");

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    // Função para checar se é um par
    function checkForMatch() {
        const isMatch = firstCard.dataset.id === secondCard.dataset.id;

        if (isMatch) {
            disableCards();
            showLocationInfo(firstCard.dataset.id);
        } else {
            unflipCards();
        }
    }

    // Desabilitar cartas quando o par for encontrado
    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);

        setTimeout(() => {
            firstCard.classList.add("hidden");
            secondCard.classList.add("hidden");
            resetBoard();
        }, 500);
    }

    // Voltar as cartas para o estado inicial se não houver par
    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }

    // Resetar o estado do tabuleiro
    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    // Mostrar pop-up com a história do local
    function showLocationInfo(id) {
        const location = locations.find((loc) => loc.id == id);

        document.getElementById("location-title").textContent = location.title;
        document.getElementById("location-description").textContent =
            location.description;
        document.getElementById("popup").classList.remove("hidden");
    }

    // Fechar o pop-up
    document.getElementById("close-popup").addEventListener("click", () => {
        document.getElementById("popup").classList.add("hidden");
    });

    // Inicializar o jogo
    createBoard();
});
