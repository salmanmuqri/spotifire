let audioPlayer = document.getElementById("audio-player");
let playPauseButton = document.getElementById("play-pause");
let prevButton = document.getElementById("prev-btn");
let nextButton = document.getElementById("next-btn");
let seekBar = document.getElementById("seek-bar");
let volumeBar = document.getElementById("volume-bar");

let miniPlayPauseButton = document.getElementById("mini-play-pause");
let miniSongTitle = document.getElementById("mini-song-title");

let currentTrackIndex = 0;
let isPlaying = false;
let tracks = [];

// Fetch MP3 files dynamically from the server
fetch('/music')
  .then(response => response.json())
  .then(mp3Files => {
    // Assuming you have mp3 files in the 'music' directory
    tracks = mp3Files.map((fileName) => {
      return {
        name: fileName.replace('.mp3', ''), // Removing the .mp3 extension for the name
        src: `music/${fileName}`,
        artwork: 'album1.jpg', // Static artwork for now (can be dynamic too)
        artist: 'Unknown Artist' // You can also make this dynamic if needed
      };
    });
    updatePlaylist();
    updatePlayer(currentTrackIndex); // Automatically start with the first track
  })
  .catch(error => {
    console.error('Error fetching MP3 files:', error);
  });

// Update the player with the selected track
function updatePlayer(trackIndex) {
    audioPlayer.src = tracks[trackIndex].src;
    document.getElementById("album-art").src = tracks[trackIndex].artwork;
    document.getElementById("song-title").textContent = tracks[trackIndex].name;
    document.getElementById("artist-name").textContent = tracks[trackIndex].artist;
    miniSongTitle.textContent = tracks[trackIndex].name;
    audioPlayer.play();
    playPauseButton.textContent = "Pause";
    miniPlayPauseButton.textContent = "Pause";
    isPlaying = true;
}

// Toggle play/pause for the main player
function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseButton.textContent = "Play";
        miniPlayPauseButton.textContent = "Play";
    } else {
        audioPlayer.play();
        playPauseButton.textContent = "Pause";
        miniPlayPauseButton.textContent = "Pause";
    }
    isPlaying = !isPlaying;
}

// Update the playlist UI
function updatePlaylist() {
    let trackList = document.getElementById("track-list");
    trackList.innerHTML = ''; // Clear current list
    tracks.forEach((track, index) => {
        let li = document.createElement("li");
        li.classList.add("track");
        li.innerHTML = `
            <img src="${track.artwork}" alt="${track.name}">
            <span>${track.name}</span>
            <button class="play-btn">Play</button>
        `;
        trackList.appendChild(li);

        li.querySelector(".play-btn").addEventListener("click", () => {
            currentTrackIndex = index;
            updatePlayer(currentTrackIndex);
        });
    });
}

// Track Controls
playPauseButton.addEventListener("click", togglePlayPause);
miniPlayPauseButton.addEventListener("click", togglePlayPause);

prevButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    updatePlayer(currentTrackIndex);
});

nextButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    updatePlayer(currentTrackIndex);
});

audioPlayer.addEventListener("timeupdate", () => {
    let value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    seekBar.value = value;
});

seekBar.addEventListener("input", () => {
    let seekTime = (seekBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});

volumeBar.addEventListener("input", () => {
    audioPlayer.volume = volumeBar.value / 100;
});
