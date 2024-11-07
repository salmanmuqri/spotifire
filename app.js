// Select the necessary DOM elements
const playPauseButton = document.getElementById("play-pause-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const audioPlayer = document.getElementById("audio-player");
const currentTime = document.getElementById("current-time");

// Track information display
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");

// List of songs with title, artist, source, and image
const songs = [
  {
    title: "Song 1 Title",
    artist: "Artist Name 1",
    src: "music/song1.mp3",
    image: "images/song1.jpg",
  },
  {
    title: "Song 2 Title",
    artist: "Artist Name 2",
    src: "music/song2.mp3",
    image: "images/song2.jpg",
  },
  {
    title: "Song 3 Title",
    artist: "Artist Name 3",
    src: "music/song3.mp3",
    image: "images/song3.jpg",
  },
];

// Track the current song index
let currentSongIndex = 0;

// Load the first song initially
loadSong(currentSongIndex);

function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = song.src;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  // Optional: Load song image if desired (uncomment if you want to show the image)
  // document.getElementById("song-image").src = song.image;
}

// Handle Play/Pause button click
let isPlaying = false;
playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>'; // Change icon to play
  } else {
    audioPlayer.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Change icon to pause
  }
  isPlaying = !isPlaying;
});

// Update progress bar and current time as the song plays
audioPlayer.addEventListener("timeupdate", () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress;

  // Update current time (minutes and seconds)
  const mins = Math.floor(audioPlayer.currentTime / 60);
  const secs = Math.floor(audioPlayer.currentTime % 60);
  currentTime.textContent = `${mins}:${secs < 10 ? "0" + secs : secs}`;
});

// Handle Next button click (move to next song)
nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length; // Loop to the first song
  loadSong(currentSongIndex);
  audioPlayer.play();
  playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Update to pause icon
  isPlaying = true;
});

// Handle Previous button click (move to previous song)
prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Loop to the last song
  loadSong(currentSongIndex);
  audioPlayer.play();
  playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Update to pause icon
  isPlaying = true;
});
