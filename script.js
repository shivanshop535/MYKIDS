fetch('M3UPlus-Playlist-20241019222427.m3u')
    .then(response => response.text())
    .then(data => {
        const channels = parseM3U(data);
        console.log('Parsed Channels:', channels); // Debugging: Logs parsed channels
        displayChannels(channels);
    })
    .catch(error => console.error('Error fetching M3U file:', error));

function parseM3U(data) {
    const lines = data.split('\n');
    const channels = [];
    let currentChannel = {};

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('#EXTINF:')) {
            if (currentChannel.name) {
                channels.push(currentChannel);
                currentChannel = {};
            }
            const nameMatch = line.match(/,(.+)$/);
            const logoMatch = line.match(/tvg-logo="([^"]+)"/); // Extracts logo from M3U
            if (nameMatch) {
                currentChannel.name = nameMatch[1].trim();
            }
            if (logoMatch) {
                currentChannel.logo = logoMatch[1];
            }
        } else if (line && !line.startsWith('#')) {
            currentChannel.url = line.trim();
        }
    });

    // Push last channel if exists
    if (currentChannel.name) {
        channels.push(currentChannel);
    }

    return channels;
}

// Display channels in the HTML
function displayChannels(channels) {
    const container = document.getElementById('channel-list');
    container.innerHTML = ''; // Clear any existing content

    if (channels.length === 0) {
        container.innerHTML = '<p>No channels found</p>';
        console.warn('No channels were parsed from the M3U file.');
    } else {
        channels.forEach(channel => {
            console.log('Displaying channel:', channel); // Debug each channel
            const channelDiv = document.createElement('div');
            channelDiv.classList.add('channel');
            channelDiv.innerHTML = `
                <img src="${channel.logo || 'path/to/default_logo.png'}" alt="${channel.name}" class="channel-logo" onclick="playStream('${encodeURIComponent(channel.url)}', '${encodeURIComponent(channel.name)}')">
                <p>${channel.name}</p>
            `;
            container.appendChild(channelDiv);
        });
    }
}

function playStream(url, name) {
    window.location.href = `player.html?url=${url}&name=${name}`;
}
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('search-bar');
    const channelList = document.getElementById('channel-list');
    const videos = [
        // Add your video data here
        { title: 'Video 1', url: 'video1.mp4' },
        { title: 'Video 2', url: 'video2.mp4' },
        // Add more videos as needed
    ];

    function displayVideos(videos) {
        channelList.innerHTML = '';
        videos.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.className = 'video-item';
            videoElement.innerHTML = `<a href="${video.url}">${video.title}</a>`;
            channelList.appendChild(videoElement);
        });
    }

    searchBar.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(searchTerm));
        displayVideos(filteredVideos);
    });

    // Display all videos initially
    displayVideos(videos);
});
