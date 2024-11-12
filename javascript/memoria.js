// Lógica do jogo da memória
// Objetivo: criar um jogo da memória com cartas e suas respectivas imagens (imagens do Campus)
// Implentar ao jogo da memória as seguintes funcionalidades: Adicionar um texto referente a imagem que o usuário acertou no jogo, o texto aparecendo em pop-up quando o usuário acertar o par e o texto será respectivo a imagem.

document.addEventListener("DOMContentLoaded", () => {
    const locations = [
        { id: 1, title: 'biblioteca', description: 'Dedicada ao professor Ribamar da Silva, a biblioteca tem como missão “organizar, preservar e disseminar a informação para a produção do conhecimento, dando suporte às atividades educacionais, científicas, tecnológicas e culturais do IFPB Cajazeiras.”' },
        { id: 2, title: 'entrada', description: 'O campus Cajazeiras foi inaugurado em 4 de dezembro de 1994, com o início das aulas em 27 de março de 1995, uma segunda-feira. A missão do instituto é oferecer educação profissional, tecnológica e humanística em todos os níveis e modalidades por meio do ensino.' },
        { id: 3, title: 'ginasio', description: 'O ginásio foi inaugurado em 17 de setembro de 1996, como parte das celebrações do 87º aniversário de fundação da Escola Técnica Federal da Paraíba, em homenagem à professora Eudna Maria Barbosa de Araújo. Desde então, o espaço serve de apoio para o desenvolvimento de atividades esportivas, culturais e para a celebração de momentos importantes para o campus.' },
        { id: 4, title: 'lab_eletronica', description: 'Breve história do Local 4' },
        { id: 5, title: 'lab_informatica', description: 'Breve história do Local 5' },
        { id: 6, title: 'lab_matematica', description: 'O Laboratório de Ensino de Matemática foi inaugurado em 6 de maio de 2014 em homenagem à professora Maria José Araújo, o Laboratório de Matemática apoia as aulas dos alunos do Ensino Médio Integrado e oferece práticas complementares para estudantes de Licenciatura em Matemática, enriquecendo sua formação acadêmica.' },
        { id: 7, title: 'lab_mat_construcao', description: 'Breve história do Local 6' },
        { id: 8, title: 'lab_fisica', description: 'Reestruturado em 21 de julho de 2017, o laboratório homenageia o professor José Pereira da Silva, que leciona no campus Cajazeiras desde o início, em 27 de março de 1995. O laboratório é uma ferramenta para aprofundar os conteúdos teóricos e possibilitar a aplicação prática dos conhecimentos.' },
        { id: 9, title: 'piscina', description: 'Breve história do Local 8' },
        { id: 10, title: 'refeitorio', description: 'O refeitório estudantil, inaugurado em 11 de outubro de 2013, homenageia a professora e líder sindical Maria de Fátima Ferreira Cartaxo. Com capacidade para 96 alunos, o refeitório atende diariamente cerca de 378 estudantes.' }
     ];

    let gameGrid = [...locations, ...locations]; // Criando pares de cartas
    gameGrid.sort(() => Math.random() - 0.5); // Embaralhando as cartas

    const gameBoard = document.getElementById("game-board");
    let firstCard, secondCard;
    let isBoardLocked = false;

    // Função para criar o tabuleiro
    function createBoard() {
        gameGrid.forEach(createCard);
    }

    // Função para criar cada carta
    function createCard(location) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = location.id;

        const img = document.createElement("img");
        img.src = `assets/${location.title}.jpg`; // Imagens locais
        img.style.display = "none"; // Imagem oculta até virar a carta
        card.appendChild(img);

        card.addEventListener("click", handleCardClick);
        gameBoard.appendChild(card);
    }

    // Função para manipular clique nas cartas
    function handleCardClick() {
        if (isBoardLocked || this === firstCard) return;

        revealCard(this);

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    // Função para revelar carta
    function revealCard(card) {
        card.classList.add("flipped");
        card.querySelector("img").style.display = "block"; // Exibe a imagem
    }

    // Função para ocultar carta
    function hideCard(card) {
        card.classList.remove("flipped");
        card.querySelector("img").style.display = "none"; // Oculta a imagem
    }

    // Função para verificar se houve um par
    function checkForMatch() {
        const isMatch = firstCard.dataset.id === secondCard.dataset.id;

        isMatch ? handleMatch() : unflipCards();
    }

    // Função para tratar o caso de um par correto
    function handleMatch() {
        disableCardClick(firstCard);
        disableCardClick(secondCard);

        showLocationInfo(firstCard.dataset.id);
        resetBoard();
    }

    // Função para desativar o clique em cartas pareadas
    function disableCardClick(card) {
        card.removeEventListener("click", handleCardClick);
        setTimeout(() => card.classList.add("hidden"), 1500); // Oculta as cartas após um tempo
    }

    // Função para desvirar cartas que não formaram par
    function unflipCards() {
        isBoardLocked = true;
        setTimeout(() => {
            hideCard(firstCard);
            hideCard(secondCard);
            resetBoard();
        }, 1000);
    }

    // Função para resetar o estado do tabuleiro
    function resetBoard() {
        [firstCard, secondCard, isBoardLocked] = [null, null, false];
    }

    // Função para exibir informações do local pareado
    function showLocationInfo(id) {
        const location = locations.find(loc => loc.id == id);
        document.getElementById("location-title").textContent = location.title;
        document.getElementById("location-description").textContent = location.description;
        togglePopup(true);
    }

    // Função para alternar o estado do pop-up
    function togglePopup(show) {
        document.getElementById("popup").classList.toggle("hidden", !show);
    }

    // Fechar o pop-up ao clicar no botão de fechar
    document.getElementById("close-popup").addEventListener("click", () => {
        togglePopup(false);
    });

    // Inicializar o jogo
    createBoard();
});
