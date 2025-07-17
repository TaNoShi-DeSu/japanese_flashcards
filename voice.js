let voices = [];
let selectedVoice = null;
let speechRate = 0.5;

function populateVoices() {
  voices = window.speechSynthesis.getVoices();
  const voiceSelect = document.getElementById("voiceSelect");
  if (!voiceSelect) return;

  voiceSelect.innerHTML = "";
  let defaultIndex = 0;
  voices.forEach((v, i) => {
    if (v.lang.startsWith("ja") && v.name.toLowerCase().includes("kyoto")) {
      defaultIndex = i;
    }
  });

  voices.forEach((v, i) => {
    if (v.lang.startsWith("ja")) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = `${v.name} (${v.lang})`;
      voiceSelect.appendChild(opt);
    }
  });

  voiceSelect.selectedIndex = defaultIndex;
  selectedVoice = voices[defaultIndex];
}

function speak(text) {
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(text);
  if (selectedVoice) {
    utterThis.voice = selectedVoice;
  } else {
    var fallback = voices.find(v => v.name.toLowerCase().includes("kyoto"));
    if (fallback) utterThis.voice = fallback;
  }
  utterThis.rate = speechRate;
  synth.cancel();
  synth.speak(utterThis);
}

window.speechSynthesis.onvoiceschanged = () => {
  populateVoices();
};

document.addEventListener("DOMContentLoaded", () => {
  const voiceSelect = document.getElementById("voiceSelect");
  const rateRange = document.getElementById("rateRange");
  if (voiceSelect) {
    voiceSelect.addEventListener("change", () => {
      selectedVoice = voices[voiceSelect.value];
    });
  }
  if (rateRange) {
    rateRange.addEventListener("input", () => {
      speechRate = parseFloat(rateRange.value);
      document.getElementById("rateValue").textContent = speechRate.toFixed(1);
    });
  }
});
