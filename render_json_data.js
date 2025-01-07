// Fetch video metadata from JSON file
async function loadVideoDetails() {
    try {
        const response = await fetch('video_data.json');
        const data = await response.json();
        displayVideoDetails(data.video);
    } catch (error) {
        console.error('Error loading video details:', error);
    }
}

// Dynamically render the video details
function displayVideoDetails(video) {
    const container = document.getElementById('video-description');

    const descriptionHTML = `
      <h2>Video Description</h2>
      <p><strong>Stock Video ID:</strong> ${video.id}</p>
      <p>${video.description}</p>
      <h3>Video Formats</h3>
      <ul>
        ${video.formats.map(format => `
          <li><strong>${format.quality}:</strong> ${format.resolution} • ${format.format}</li>
        `).join('')}
      </ul>
      <p><strong>Frames per second:</strong> ${video.fps}</p>
      <p><strong>Duration:</strong> ${video.duration}</p>
    `;

    container.innerHTML = descriptionHTML;
}

// Load the video details when the page is ready
document.addEventListener('DOMContentLoaded', loadVideoDetails);
