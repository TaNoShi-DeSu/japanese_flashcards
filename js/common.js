// 建立全域變數以儲存聲線
let voices = [];
let synth = window.speechSynthesis;

// 初始化聲線
function initVoices() {
  voices = synth.getVoices().filter(v => v.lang.startsWith("ja"));
  const voiceSelect = document.getElementById("voiceSelect");
  if (!voiceSelect) return;

  voiceSelect.innerHTML = "";
  voices.forEach(voice => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

// 執行播放語音
function speakText(text) {
  if (!synth) return;
  const utter = new SpeechSynthesisUtterance(text);

  const voiceSelect = document.getElementById("voiceSelect");
  if (voiceSelect && voices.length > 0) {
    const selectedVoice = voices.find(v => v.name === voiceSelect.value);
    if (selectedVoice) {
      utter.voice = selectedVoice;
    }
  }

  const rateRange = document.getElementById("rateRange");
  if (rateRange) {
    utter.rate = parseFloat(rateRange.value);
  }

  synth.speak(utter);
}

// 有些瀏覽器需要等 voices loaded 才能抓到聲線
if (typeof speechSynthesis !== "undefined") {
  speechSynthesis.onvoiceschanged = initVoices;
} else {
  console.log("SpeechSynthesis not supported in this browser.");
}
Add common.js for shared speech functions
