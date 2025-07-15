document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("quizContainer");
  const allQuestions = [...DATA.quiz];
  const MAX_QUESTIONS = 50;

  let shuffled = allQuestions.sort(() => 0.5 - Math.random()).slice(0, MAX_QUESTIONS);
  let current = 0;
  let score = 0;
  let wrong = [];

  function renderQuestion() {
    if (current >= shuffled.length) {
      showResult();
      return;
    }

    const q = shuffled[current];
    const choicesHtml = q.choices
      .map(
        (choice, i) => `
      <button class="choice" data-choice="${choice}">${i + 1}. ${choice}</button>
    `
      )
      .join("");

    container.innerHTML = `
      <div class="question-box">
        <div class="status">第 ${current + 1} 題 / ${shuffled.length}</div>
        <div class="question">${q.question}</div>
        <div class="choices">${choicesHtml}</div>
      </div>
    `;
  }

  function showResult() {
    const wrongList = wrong
      .map(
        (w, i) => `
      <div class="wrong-item">
        ${i + 1}. ${w.question}<br>
        你的答案：${w.userAnswer}<br>
        正確答案：${w.answer}
      </div>
    `
      )
      .join("");

    container.innerHTML = `
      <div class="result">
        <h2>測驗完成！</h2>
        <p>你的分數：${score} / ${shuffled.length}</p>
        ${
          wrong.length > 0
            ? `<h3>錯誤題目：</h3>${wrongList}`
            : "<p>全部答對，太厲害了！</p>"
        }
        <button id="retry">再試一次</button>
      </div>
    `;

    document.getElementById("retry").addEventListener("click", () => {
      location.reload();
    });
  }

  container.addEventListener("click", e => {
    if (e.target.classList.contains("choice")) {
      const userAnswer = e.target.dataset.choice;
      const correct = shuffled[current].answer;

      if (userAnswer === correct) {
        score++;
      } else {
        wrong.push({
          question: shuffled[current].question,
          userAnswer,
          answer: correct
        });
      }

      current++;
      renderQuestion();
    }
  });

  renderQuestion();
});
