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
  const synth = speechSynthesis;
  const utt = new SpeechSynthesisUtterance(text);
  if (selectedVoice) utt.voice = selectedVoice;
  utt.rate = speechRate;
  synth.cancel();
  synth.speak(utt);
}

window.speechSynthesis.onvoiceschanged = populateVoices;
document.addEventListener("DOMContentLoaded",()=>{
  const sel = document.getElementById("voiceSelect");
  const range = document.getElementById("rateRange");
  if (sel) sel.addEventListener("change",()=>{ selectedVoice = voices[sel.value]; });
  if (range) range.addEventListener("input",()=>{
    speechRate = parseFloat(range.value);
    const out = document.getElementById("rateValue");
    if (out) out.textContent = speechRate.toFixed(1);
  });
});
