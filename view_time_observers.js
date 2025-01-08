// Observer Class
class Observer {
    constructor() {
        this.subscribers = [];
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    unsubscribe(callback) {
        this.subscribers = this.subscribers.filter(sub => sub !== callback);
    }

    notify(data) {
        this.subscribers.forEach(callback => callback(data));
    }
}

// Initialize observers
const playObserver = new Observer();
const stopObserver = new Observer();
const pauseObserver = new Observer();

// DOM Elements
const custom_video = document.getElementById("custom-video");
const stopButtonObs = document.getElementById("stop");
const display = document.getElementById("video-description");
const timeWatchedElement = document.getElementById("time-watched");

// State tracking
let playTime = 0;
let startTime = null;

// Helper function to create and append message
const appendMessage = (message) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    display.appendChild(messageElement);
    
    // Optional: Scroll to the bottom to show latest message
    display.scrollTop = display.scrollHeight;
};

// Event Handlers
const onPlay = () => {
    if (!startTime) {
        startTime = new Date(); // Track when the video starts playing
    }
    playObserver.notify("Video is playing...");
};

const onPause = () => {
    if (startTime) {
        const elapsed = (new Date() - startTime) / 1000; // Calculate elapsed time in seconds
        playTime += elapsed;
        startTime = null;
    }
    pauseObserver.notify(`Paused after watching ${playTime.toFixed(2)} seconds.`);
    timeWatchedElement.textContent = `You have watched ${playTime.toFixed(2)} seconds of this video.`;
};

const onStop = () => {
    if (startTime) {
        const elapsed = (new Date() - startTime) / 1000;
        playTime += elapsed;
        startTime = null;
    }
    stopObserver.notify(`Stopped after watching ${playTime.toFixed(2)} seconds.`);
    timeWatchedElement.textContent = `You have watched ${playTime.toFixed(2)} seconds of this video.`;
    playTime = 0; // Reset play time after stopping
};

// Subscribe to Observers
playObserver.subscribe(message => {
    console.log(message);
    appendMessage(message);
});

pauseObserver.subscribe(message => {
    console.log(message);
    appendMessage(message);
});

stopObserver.subscribe(message => {
    console.log(message);
    appendMessage(message);
});

// Attach Event Listeners
custom_video.addEventListener("play", onPlay);
custom_video.addEventListener("pause", onPause);
stopButtonObs.addEventListener("click", onStop);