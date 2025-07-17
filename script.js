// 語音設置
let currentVoice = "ja-JP";
let currentSpeed = 1;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = currentVoice;
  utterance.rate = currentSpeed;
  speechSynthesis.speak(utterance);
}

// 切換語音聲線與速度
function initControls() {
  const voiceSelect = document.getElementById("voiceSelect");
  const speedSelect = document.getElementById("speedSelect");

  voiceSelect.addEventListener("change", () => {
    currentVoice = voiceSelect.value;
  });

  speedSelect.addEventListener("change", () => {
    currentSpeed = parseFloat(speedSelect.value);
  });
}

// 載入單字資料
function loadVocab() {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  DATA.vocab.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${item.jp}</h3>
      <p><strong>羅馬拼音：</strong>${item.roma}</p>
      <p><strong>中文：</strong>${item.zh}</p>
      <button class="audio-button" data-text="${item.jp}">🔊</button>
      <button class="mark-button" data-index="${index}">⭐</button>
    `;

    // 標記按鈕狀態記憶
    const markBtn = card.querySelector(".mark-button");
    if (localStorage.getItem(`marked_${index}`) === "true") {
      markBtn.classList.add("marked");
    }

    markBtn.addEventListener("click", () => {
      const marked = markBtn.classList.toggle("marked");
      localStorage.setItem(`marked_${index}`, marked);
    });

    // 播放按鈕
    card.querySelector(".audio-button").addEventListener("click", () => {
      speak(item.jp);
    });

    container.appendChild(card);
  });
}

// TOP 按鈕
function setupTopButton() {
  const topBtn = document.getElementById("topBtn");
  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  initControls();
  loadVocab();
  setupTopButton();
});
