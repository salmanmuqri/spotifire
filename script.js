// Get references to the HTML elements
const playPauseButton = document.getElementById("play-pause-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const audioPlayer = document.getElementById("audio-player");

let isPlaying = false;

// List of songs (make sure these paths are relative and work with GitHub Pages)
const songs = [
  {
    title: "Song 1 Title",
    artist: "Artist Name 1",
    src: "./Music/song1.mp3", // Relative path to the song
    image: "./Images/song1.jpg", // Relative path to the image
  },
  {
    title: "Song 2 Title",
    artist: "Artist Name 2",
    src: "./Music/song2.mp3", // Relative path to the song
    image: "./Images/song2.jpg", // Relative path to the image
  },
  {
    title: "Song 3 Title",
    artist: "Artist Name 3",
    src: "./Music/song3.mp3", // Relative path to the song
    image: "./Images/song3.jpg", // Relative path to the image
  },
];

let currentSongIndex = 0;

// Load song info into the player
function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = song.src; // Set the audio source
  // Update any additional UI elements like song title/artist here if needed
}

// Play/Pause functionality
playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseButton.textContent = "Play"; // Change text to Play
  } else {
    audioPlayer.play();
    playPauseButton.textContent = "Pause"; // Change text to Pause
  }
  isPlaying = !isPlaying;
});

// Update progress bar
audioPlayer.addEventListener("timeupdate", () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress; // Set the value of the progress bar
});

// Next button functionality
nextButton.addEventListener("click", () => {
  // Move to the next song in the list
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex); // Load the next song
  audioPlayer.play(); // Start playing the next song
  playPauseButton.textContent = "Pause"; // Ensure the play button shows 'Pause'
  isPlaying = true; // Update the playing state
});

// Previous button functionality
prevButton.addEventListener("click", () => {
  // Move to the previous song in the list
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex); // Load the previous song
  audioPlayer.play(); // Start playing the previous song
  playPauseButton.textContent = "Pause"; // Ensure the play button shows 'Pause'
  isPlaying = true; // Update the playing state
});

// Initialize the player with the first song
loadSong(currentSongIndex);
