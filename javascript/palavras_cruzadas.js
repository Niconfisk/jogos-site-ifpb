function checkAnswers() {
    const cells = document.querySelectorAll('#crossword input[type="text"]');
    let allCorrect = true;

    cells.forEach(cell => {
        const userAnswer = cell.value.toUpperCase();
        const correctAnswer = cell.getAttribute('data-answer');

        if (userAnswer === correctAnswer) {
            cell.style.color = 'green';
        } else {
            cell.style.color = 'red';
            allCorrect = false;
        }
    });

    if (allCorrect) {
        alert('Parabéns! Todas as respostas estão corretas.');
    } else {
        alert('Algumas respostas estão incorretas. Tente novamente.');
    }
}

function highlightGroup(group) {
    const cells = document.querySelectorAll(`#crossword input[data-group="${group}"]`);
    cells.forEach(cell => {
        cell.classList.add('highlight');
    });
}

function removeHighlight() {
    const highlightedCells = document.querySelectorAll('#crossword input.highlight');
    highlightedCells.forEach(cell => {
        cell.classList.remove('highlight');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('#crossword input[type="text"]');

    cells.forEach(cell => {
        cell.addEventListener('focus', () => {
            const group = cell.getAttribute('data-group');
            removeHighlight();
            highlightGroup(group);
        });

        cell.addEventListener('input', (event) => {
            const groupCells = document.querySelectorAll(`#crossword input[data-group="${cell.getAttribute('data-group')}"]`);
            const currentIndex = Array.from(groupCells).indexOf(event.target);

            if (currentIndex < groupCells.length - 1 && event.target.value) {
                groupCells[currentIndex + 1].focus();
            }
        });
    });
});
//texto para as palavras cruzadas
//Em 1909, Nilo Peçanha assumiu a presidência do Brasil e, em 23 de setembro, criou as primeiras “Escolas de Aprendizes Artífices” para oferecer ensino gratuito e profissionalizante às classes menos favorecidas, sob o Ministério da Agricultura, Indústria e Comércio. Essa iniciativa marcou o início da Rede Federal de Educação Profissional e Tecnológica, consolidada ao longo de um século como essencial para o acesso ao conhecimento científico e tecnológico.Hoje, a Educação Profissional e Tecnológica no Brasil desempenha um papel crucial, atendendo às demandas do mercado de trabalho e promovendo a elevação da escolaridade e qualificação dos trabalhadores. O Instituto Federal da Paraíba (IFPB) reflete essa missão, com a visão de promover o desenvolvimento profissional, tecnológico e humanístico de forma ética, sustentável e ajustada às necessidades regionais.O Campus Cajazeiras do IFPB foi criado em 1994 como Unidade de Ensino Descentralizada (Uned) da Escola Técnica Federal da Paraíba e, em 2008, com a Lei 11.892, foi oficialmente transformado em campus. Atualmente, oferece cursos técnicos integrados ao ensino médio em Eletromecânica, Edificações e Informática, que combinam formação acadêmica e profissional. Além disso, o campus também oferece 13 cursos de nível superior, entre eles, Licenciatura e Especialização em Matemática, Análise e Desenvolvimento de Sistemas, Engenharia Civil, Engenharia de Controle e Automação, entre outros. 
