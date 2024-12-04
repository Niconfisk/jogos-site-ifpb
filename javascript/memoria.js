// Lógica do jogo da memória
// Objetivo: criar um jogo da memória com cartas e suas respectivas imagens (imagens do Campus)
// Implentar ao jogo da memória as seguintes funcionalidades: Adicionar um texto referente a imagem que o usuário acertou no jogo, o texto aparecendo em pop-up quando o usuário acertar o par e o texto será respectivo a imagem.

document.addEventListener("DOMContentLoaded", () => {
    const locations = [
        { id: 1, title: 'biblioteca', description: 'Dedicada ao professor Ribamar da Silva, a biblioteca tem como missão “organizar, preservar e disseminar a informação para a produção do conhecimento, dando suporte às atividades educacionais, científicas, tecnológicas e culturais do IFPB Cajazeiras.”' },
        { id: 2, title: 'entrada', description: 'O campus Cajazeiras foi inaugurado em 4 de dezembro de 1994, com o início das aulas em 27 de março de 1995, uma segunda-feira. A missão do instituto é oferecer educação profissional, tecnológica e humanística em todos os níveis e modalidades por meio do ensino.' },
        { id: 3, title: 'ginasio', description: 'O ginásio foi inaugurado em 17 de setembro de 1996, como parte das celebrações do 87º aniversário de fundação da Escola Técnica Federal da Paraíba, em homenagem à professora Eudna Maria Barbosa de Araújo. Desde então, o espaço serve de apoio para o desenvolvimento de atividades esportivas, culturais e para a celebração de momentos importantes para o campus.' },
        { id: 4, title: 'lab_eletronica', description: 'Este laboratório é utilizado pelos alunos do curso superior e do curso integrado em Eletromecânica. O espaço é destinado ao desenvolvimento de circuitos eletrônicos e à aplicação prática dos conhecimentos adquiridos em sala de aula.  ' },
        { id: 5, title: 'lab_informatica', description: 'Este laboratório serve como uma ferramenta de apoio aos estudos do curso de Análise e Desenvolvimento de Sistemas (ADS) e do curso integrado em Informática. Ele é essencial para explicar e apresentar os conteúdos aos estudantes, sendo utilizado diariamente para atividades práticas e didáticas.  ' },
        { id: 6, title: 'lab_matematica', description: 'O Laboratório de Ensino de Matemática foi inaugurado em 6 de maio de 2014 em homenagem à professora Maria José Araújo, o Laboratório de Matemática apoia as aulas dos alunos do Ensino Médio Integrado e oferece práticas complementares para estudantes de Licenciatura em Matemática, enriquecendo sua formação acadêmica.' },
        { id: 7, title: 'lab_mat_construcao', description: 'Localizado no bloco 04 do campus, este laboratório atende os estudantes do Curso Técnico em Edificações, tanto na modalidade integrada quanto subsequente. Ele é utilizado como um ambiente de suporte para atividades práticas. ' },
        { id: 8, title: 'lab_fisica', description: 'Reestruturado em 21 de julho de 2017, o laboratório homenageia o professor José Pereira da Silva, que leciona no campus Cajazeiras desde o início, em 27 de março de 1995. O laboratório é uma ferramenta para aprofundar os conteúdos teóricos e possibilitar a aplicação prática dos conhecimentos.' },
        { id: 9, title: 'piscina', description: 'A piscina do IFPB Campus Cajazeiras é um espaço utilizado para atividades práticas de Educação Física, eventos esportivos e treinamentos. Além de atender os alunos, também é disponibilizada para a comunidade.' },
        { id: 10, title: 'refeitorio', description: 'O refeitório estudantil, inaugurado em 11 de outubro de 2013, homenageia a professora e líder sindical Maria de Fátima Ferreira Cartaxo. Com capacidade para 96 alunos, o refeitório atende diariamente cerca de 378 estudantes.' }
     ];

    const gameBoard = document.getElementById("game-board");
    const popup = document.getElementById("popup");
    const locationTitle = document.getElementById("location-title");
    const locationDescription = document.getElementById("location-description");
    const closePopupButton = document.getElementById("close-popup");

    let gameGrid = [...locations, ...locations];
    gameGrid.sort(() => Math.random() - 0.5);

    let firstCard = null;
    let lockBoard = false;

    function createCard({ id, title }) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = id;

        const img = document.createElement("img");
        img.src = `assets/${title}.jpg`;
        img.alt = title;

        card.appendChild(img);
        card.addEventListener("click", handleCardClick);

        return card;
    }

    function createBoard() {
        gameGrid.forEach(location => gameBoard.appendChild(createCard(location)));
    }

    function handleCardClick() {
        if (lockBoard || this === firstCard || this.classList.contains("hidden")) return;

        this.classList.add("flipped");
        this.querySelector("img").style.display = "block";

        if (!firstCard) {
            firstCard = this;
            return;
        }

        const secondCard = this;
        checkForMatch(firstCard, secondCard);
    }

    function checkForMatch(card1, card2) {
        lockBoard = true;

        const isMatch = card1.dataset.id === card2.dataset.id;
        if (isMatch) {
            setTimeout(() => {
                card1.classList.add("hidden");
                card2.classList.add("hidden");
                showLocationInfo(card1.dataset.id);
                resetBoard();
            }, 500);
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1.querySelector("img").style.display = "none";
                card2.querySelector("img").style.display = "none";
                resetBoard();
            }, 1000);
        }
    }

    function showLocationInfo(id) {
        const location = locations.find(loc => loc.id == id);
        if (location) {
            locationTitle.textContent = location.title;
            locationDescription.textContent = location.description;
            popup.classList.remove("hidden");
        }
    }

    function resetBoard() {
        [firstCard, lockBoard] = [null, false];
    }

    closePopupButton.addEventListener("click", () => popup.classList.add("hidden"));

    createBoard();
});
