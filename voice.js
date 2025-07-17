let voices=[], selectedVoice=null, speechRate=0.5;
function populateVoices() {
  voices = speechSynthesis.getVoices();
  const sel = document.getElementById("voiceSelect");
  if (!sel) return;
  sel.innerHTML = "";
  voices.forEach((v,i)=>{
    if (v.lang.startsWith("ja")) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = `${v.name} (${v.lang})`;
      sel.appendChild(opt);
    }
  });
  selectedVoice = voices[sel.value] || voices.find(v=>v.name.toLowerCase().includes("kyoto"));
}
function speak(text) {
  const utt = new SpeechSynthesisUtterance(text);
  utt.voice = selectedVoice || utt.voice;
  utt.rate = speechRate;
  speechSynthesis.cancel();
  speechSynthesis.speak(utt);
}
window.speechSynthesis.onvoiceschanged = populateVoices;
document.addEventListener("DOMContentLoaded",()=>{
  const sel = document.getElementById("voiceSelect");
  const range = document.getElementById("rateRange");
  sel && sel.addEventListener("change",()=>{ selectedVoice = voices[sel.value]; });
  range && range.addEventListener("input",()=>{
    speechRate = parseFloat(range.value);
    document.getElementById("rateValue").textContent = speechRate.toFixed(1);
  });
  populateVoices();
});
