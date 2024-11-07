const playPauseButton = document.getElementById("play-pause-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const audioPlayer = document.getElementById("audio-player");
const currentTime = document.getElementById("current-time");

// Keep track of whether the player is playing
let isPlaying = false;

// Handle play/pause button click
playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseButton.textContent = "Play";
  } else {
    audioPlayer.play();
    playPauseButton.textContent = "Pause";
  }
  isPlaying = !isPlaying;
});

// Update progress bar as the song plays
audioPlayer.addEventListener("timeupdate", () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress;
  
  const mins = Math.floor(audioPlayer.currentTime / 60);
  const secs = Math.floor(audioPlayer.currentTime % 60);
  currentTime.textContent = `${mins}:${secs < 10 ? "0" + secs : secs}`;
});

// Handle next song button click
nextButton.addEventListener("click", () => {
  audioPlayer.src = "music/song2.mp3"; // Change to next song file
  audioPlayer.play();
});

// Handle previous song button click
prevButton.addEventListener("click", () => {
  audioPlayer.src = "music/song1.mp3"; // Change to previous song file
  audioPlayer.play();
});
