document.addEventListener('DOMContentLoaded', function () {
    // Função para calcular o resultado
    function calcularResultado() {
        const pontuacoes = { A: 0, B: 0, C: 0 };
        const form = document.forms['quizForm'];
        const divResultado = document.getElementById('resultado');

        // Verifica respostas e conta pontuações
        for (let i = 1; i <= 10; i++) {
            const resposta = form['q' + i]?.value;
            if (!resposta) {
                divResultado.innerHTML = 'Por favor, responda todas as perguntas!';
                divResultado.classList.add('show');
                return;
            }
            pontuacoes[resposta]++;
        }

        // Define o texto de resultado com base nas pontuações
        let textoResultado;
        const { A, B, C } = pontuacoes;

        if (A > B && A > C) {
            textoResultado = 'Você se encaixa melhor no curso de Informática!';
        } else if (B > A && B > C) {
            textoResultado = 'Você se encaixa melhor no curso de Eletromecânica!';
        } else if (C > A && C > B) {
            textoResultado = 'Você se encaixa melhor no curso de Edificações!';
        } else {
            textoResultado = 'Você tem interesses equilibrados entre as áreas. Avalie mais suas preferências!';
        }

        // Exibe o resultado
        divResultado.innerHTML = textoResultado;
        divResultado.classList.add('show');
    }
//Quiz finalizado.Faltando, apenas, o css e possíveis alterações no html.
    // Adiciona o evento de clique ao botão
    const btnSubmit = document.querySelector('.submit-btn');
    btnSubmit.addEventListener('click', calcularResultado);
});
