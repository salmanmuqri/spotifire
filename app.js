// Get references to the HTML elements
const playPauseButton = document.getElementById("play-pause-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const audioPlayer = document.getElementById("audio-player");
const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const playIcon = playPauseButton.querySelector('i');

// List of songs (updated to use relative paths for GitHub Pages)
const songs = [
  {
    title: "Song 1 Title",
    artist: "Artist Name 1",
    src: "./Music/song1.mp3", // Use relative path for music
    image: "./Images/song1.jpg", // Use relative path for images
  },
  {
    title: "Song 2 Title",
    artist: "Artist Name 2",
    src: "./Music/song2.mp3", // Use relative path for music
    image: "./Images/song2.jpg", // Use relative path for images
  },
  {
    title: "Song 3 Title",
    artist: "Artist Name 3",
    src: "./Music/song3.mp3", // Use relative path for music
    image: "./Images/song3.jpg", // Use relative path for images
  },
];

let currentSongIndex = 0;
let isPlaying = false;

// Load song info into the player
function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = song.src; // Set the source for the audio
  songTitle.textContent = song.title; // Set the song title
  songArtist.textContent = song.artist; // Set the artist name
}

// Update the play/pause button icon
function updatePlayPauseIcon() {
  if (audioPlayer.paused) {
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
  } else {
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
  }
}

// Toggle play/pause functionality
playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause(); // Pause the audio
  } else {
    audioPlayer.play(); // Play the audio
  }
  isPlaying = !isPlaying; // Toggle the state
  updatePlayPauseIcon(); // Update the play/pause button icon
});

// Update progress bar and current time display
audioPlayer.addEventListener("timeupdate", () => {
  const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100; // Calculate the progress percentage
  progressBar.value = progressPercent; // Update the progress bar

  const minutes = Math.floor(audioPlayer.currentTime / 60); // Get the minutes
  const seconds = Math.floor(audioPlayer.currentTime % 60); // Get the seconds
  currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`; // Update the current time display
});

// Seek the audio when the progress bar is clicked
progressBar.addEventListener("click", (e) => {
  const width = progressBar.offsetWidth; // Get the width of the progress bar
  const clickX = e.offsetX; // Get the X position of the click
  const duration = audioPlayer.duration; // Get the duration of the audio
  audioPlayer.currentTime = (clickX / width) * duration; // Set the current time based on the click position
});

// Next button functionality
nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length; // Go to the next song (loop back to the first song)
  loadSong(currentSongIndex); // Load the new song
  audioPlayer.play(); // Play the new song
  updatePlayPauseIcon(); // Update the play/pause button icon
  isPlaying = true; // Set the player to playing state
});

// Previous button functionality
prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Go to the previous song (loop back to the last song)
  loadSong(currentSongIndex); // Load the new song
  audioPlayer.play(); // Play the new song
  updatePlayPauseIcon(); // Update the play/pause button icon
  isPlaying = true; // Set the player to playing state
});

// Initialize player with the first song
loadSong(currentSongIndex);
