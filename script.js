document.addEventListener("DOMContentLoaded", () => {
  const jokes = [
    { text: "Why don’t scientists trust atoms? Because they make up everything!", img: "joke1.png" },
    { text: "Why did the bicycle fall over? Because it was two-tired!", img: "joke2.png" },
    { text: "I'm reading a book on anti-gravity. It's impossible to put down!", img: "joke3.png" }
  ];
  const motivations = [
    { text: "Believe you can and you're halfway there.", img: "mot1.png" },
    { text: "Keep going, you're getting there!", img: "mot2.png" },
    { text: "Progress, not perfection.", img: "mot3.png" }
  ];
  const musicList = ["5qap5aO4i9A","hHW1oY26kxQ","DWcJFNfaw9c"];
  let jokeIndex = 0, motIndex = 0, musicIndex = 0;

  window.selectMood = mood => {
    document.querySelector(".emoji-options").classList.add("hidden");
    document.querySelector(".options").classList.remove("hidden");
    dynamicHTML(`<div class="content-card"><h2>You feel: ${mood}</h2></div>`);
  };

  window.showJoke = () => {
    const j = jokes[jokeIndex];
    dynamicHTML(`
      <div class="content-card">
        <h2>😂 Joke</h2>
        <img src="${j.img}" alt="Joke Image" />
        <p>${j.text}</p>
        <div class="btn-group">
          <button class="btn secondary" onclick="changeJoke()">Another Joke ↻</button>
        </div>
      </div>`);
  };

  window.changeJoke = () => {
    jokeIndex = (jokeIndex + 1) % jokes.length;
    showJoke();
  };

  window.showMotivation = () => {
    const m = motivations[motIndex];
    dynamicHTML(`
      <div class="content-card">
        <h2>💡 Motivation</h2>
        <img src="${m.img}" alt="Motivation Image" />
        <p>${m.text}</p>
        <div class="btn-group">
          <button class="btn secondary" onclick="changeMotivation()">Another Motivation ↻</button>
        </div>
      </div>`);
  };

  window.changeMotivation = () => {
    motIndex = (motIndex + 1) % motivations.length;
    showMotivation();
  };

  window.playMusic = () => {
    dynamicHTML(`
      <div class="content-card">
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/${musicList[musicIndex]}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <div class="music-controls">
          <button class="btn secondary" onclick="nextMusic()">Next Song ▶️</button>
        </div>
      </div>`);
  };

  window.nextMusic = () => {
    musicIndex = (musicIndex + 1) % musicList.length;
    playMusic();
  };

  window.makeNote = () => {
    dynamicHTML(`
      <div class="content-card note-container">
        <textarea id="noteText" placeholder="Write your note..."></textarea>
        <button class="btn secondary" onclick="saveNote()">Save Note</button>
        <div id="noteList"></div>
      </div>`);
    renderNotes();
  };

  const notes = JSON.parse(localStorage.getItem("mindWaveNotes")||"[]");
  window.saveNote = () => {
    const txt = document.getElementById("noteText").value.trim();
    if (!txt) return;
    notes.push(txt);
    localStorage.setItem("mindWaveNotes", JSON.stringify(notes));
    renderNotes();
    document.getElementById("noteText").value = "";
  };

  function renderNotes() {
    const list = document.getElementById("noteList");
    list.innerHTML = "";
    notes.forEach((n,i) => {
      const div = document.createElement("div");
      div.className = "note-card";
      div.innerHTML = `
        <p>${n}</p>
        <div class="note-actions btn-group">
          <button class="btn" onclick="speakNote(${i})">🔊 Speak</button>
          <button class="btn secondary" onclick="editNote(${i})">✏ Edit</button>
          <button class="btn warning" onclick="deleteNote(${i})">🗑 Delete</button>
        </div>`;
      list.appendChild(div);
    });
  }

  window.speakNote = i => speechSynthesis.speak(new SpeechSynthesisUtterance(notes[i]));
  window.editNote = i => {
    const u = prompt("Edit note:", notes[i]);
    if (u!==null) { notes[i] = u; localStorage.setItem("mindWaveNotes", JSON.stringify(notes)); renderNotes(); }
  };
  window.deleteNote = i => { notes.splice(i,1); localStorage.setItem("mindWaveNotes", JSON.stringify(notes)); renderNotes(); };

  window.themeToggle = document.getElementById("themeToggle");
  window.themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "Switch to Light Theme" : "Switch to Dark Theme";
  };

  function dynamicHTML(html) {
    document.getElementById("dynamic-content").innerHTML = html;
  }
});
