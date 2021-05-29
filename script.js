const musicCard = document.querySelector(".music-card");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const songTrivia = document.querySelector("#song-trivia");
const singer = document.querySelector("#singer");

// Song Titles
const songs = [
  "Bittersweet",
  "The Nights",
  "Light",
  "Lucky Man",
  "Not Afraid",
  "Sugar",
  "Unbreakable",
];

// song trivia
const trivia = [
  "'BitterSweet Symphony' is a song by English rock band The Verve. It is the lead track on their third studio album 'Urban Hymns (1997)'. It is based on a sample it uses from the Andrew Loog Oldham orchestral cover of The Rolling Stones song 'The Last Time'",
  "'The Nights' is a song by Swedish DJ and record producer Avicii. It features uncredited vocals by singer/songwriter Nicholas Furlong. The song peaked at number six on the UK Singles Chart and number one on the UK Dance Chart. On 23 January 2015, Avicii released his own remix of the song. ",
  "'A Light That Never Comes' is a song written and recorded by American rock band Linkin Park, and is their first collaboration with American DJ and record producer Steve Aoki. It was included on the band's second remix album, Recharged. It is the twenty-sixth single by the band.",
  "'Lucky Man' is a song by English rock band the Verve. It was written by singer Richard Ashcroft. The song was released as the third single from the band's third studio album, Urban Hymns (1997). It was released on 24 November 1997, charting at number seven on the UK Singles Chart.",
  "'Not Afraid' is a song by American rapper Eminem from his seventh studio album Recovery (2010). It was released as the album's lead single on April 29, 2010, by Interscope Records. 'Not Afraid' was first revealed as a single by Eminem via Twitter, after which the song debuted on radio.",
  "'Sugar' is a song by German DJ and record producer Robin Schulz. It features the vocals from Canadian singer Francesco Yates. The song was released in Germany on 17 July 2015 as the second single from his second studio album of the same name.",
  "'Unbreakable' is an official soundtrack from 2000 American superhero thriller film 'Unbreakable' written, produced, and directed by M. Night Shyamalan, and starring Bruce Willis, Samuel L. Jackson, Robin Wright Penn, Spencer Treat Clark, and Charlayne Woodard. ",
];

// singer
const singers = [
  "The Verve",
  "Avicii",
  "Linkin Park",
  "The Verve",
  "Eminem",
  "Robin Schulz",
  "James Newton",
];

// keep track of songs
let songIndex = 0;

// Initial load song info DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  songTrivia.innerText = trivia[songIndex];
  singer.innerText = singers[songIndex];
}

function playSong() {
  musicCard.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicCard.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex == songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicCard.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
