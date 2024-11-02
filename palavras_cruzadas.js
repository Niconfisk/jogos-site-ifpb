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
