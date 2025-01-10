// Select DOM elements
const video = document.getElementById('custom-video');
const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');
const rewindButton = document.getElementById('rewind');
const forwardButton = document.getElementById('forward');
const progressBar = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Constants for rewind and forward
const SKIP_TIME = 10; // seconds to skip forward or backward

// Play or pause the video
function toggleVideoStatus() {
  video.paused ? video.play() : video.pause();
}

// Update the play/pause icon dynamically
function updatePlayIcon() {
  const icon = video.paused ? 'fa-play' : 'fa-pause';
  playButton.innerHTML = `<i class="fa ${icon} fa-2x"></i>`;
}

// Update the progress bar and timestamp
function updateProgress() {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.value = progressPercent;

  const mins = Math.floor(video.currentTime / 60).toString().padStart(2, '0');
  const secs = Math.floor(video.currentTime % 60).toString().padStart(2, '0');
  timestamp.textContent = `${mins}:${secs}`;
}

// Seek to a specific time based on progress bar input
function setVideoProgress() {
  video.currentTime = (progressBar.value / 100) * video.duration;
}

// Stop the video and reset progress
function stopVideo() {
  video.pause();
  video.currentTime = 0;
  updateProgress();
}

// Rewind the video by SKIP_TIME seconds
function rewindVideo() {
  const wasPlaying = !video.paused;
  video.pause();
  video.currentTime = Math.max(video.currentTime - SKIP_TIME, 0);
  if (wasPlaying) video.play();
  updateProgress();
}

// Forward the video by SKIP_TIME seconds
function forwardVideo() {
  const wasPlaying = !video.paused;
  video.pause();
  video.currentTime = Math.min(video.currentTime + SKIP_TIME, video.duration);
  if (wasPlaying) video.play();
  updateProgress();
}

// Add event listeners
function addEventListeners() {
  video.addEventListener('click', toggleVideoStatus);
  video.addEventListener('play', updatePlayIcon);
  video.addEventListener('pause', updatePlayIcon);
  video.addEventListener('timeupdate', updateProgress);

  playButton.addEventListener('click', toggleVideoStatus);
  stopButton.addEventListener('click', stopVideo);
  progressBar.addEventListener('input', setVideoProgress);

  rewindButton.addEventListener('click', rewindVideo);
  forwardButton.addEventListener('click', forwardVideo);
}

// Initialize player
function initVideoPlayer() {
  addEventListeners();
  updatePlayIcon(); // Set initial icon state
  updateProgress(); // Ensure progress bar and timestamp are accurate on load
}

// Initialize the video player when the DOM is loaded
document.addEventListener('DOMContentLoaded', initVideoPlayer);
