const scriptUrl = 'https://script.google.com/macros/s/AKfycbzakyKFwPo3KsvaYPjMk92OJ_h0Dzy7jgUapVroc-r5tc3cEqqh3ES0IkVoN8nnayPMRg/exec';

function loadVideos() {
    fetch(scriptUrl)
        .then(response => response.json())
        .then(data => renderThumbnails(data))
        .catch(error => {
            console.error('Error loading data:', error);
            document.getElementById('videoList').innerHTML = 'Failed to load videos.';
        });
}

function renderThumbnails(data) {
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = '';
    data.forEach(entry => {
        const videoItem = document.createElement('div');
        videoItem.className = 'videoItem';
        videoItem.onclick = () => showPopup(entry.videoId);

        const img = document.createElement('img');
        img.src = entry.thumbnail;
        img.alt = "Thumbnail";
        img.className = 'thumbnail';

        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = entry.title;

        videoItem.appendChild(img);
        videoItem.appendChild(title);
        videoList.appendChild(videoItem);
    });
}

function showPopup(videoId) {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const videoPlayer = document.getElementById('videoPlayer');

    videoPlayer.innerHTML = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
    
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const videoPlayer = document.getElementById('videoPlayer');

    popup.style.display = 'none';
    overlay.style.display = 'none';
    videoPlayer.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', loadVideos);
