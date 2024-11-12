 // Fetch the M3U playlist (replace with actual URL or local path)
    fetch('path_to_your_playlist.m3u')
      .then(response => response.text())
      .then(m3uContent => {
        channels = parseM3U(m3uContent);
        displayChannels(channels); // Display channels once the M3U is parsed
      })
      .catch(err => console.error('Error loading M3U file:', err));

    // Function to parse M3U playlist
    function parseM3U(content) {
      const lines = content.split('\n');
      const channelList = [];
      let channelName = '';
      let channelUrl = '';

      lines.forEach(line => {
        if (line.startsWith('#EXTINF:')) {
          // Extract the channel name (assuming the name is in the metadata line)
          const nameMatch = line.match(/,(.*)$/);
          if (nameMatch) {
            channelName = nameMatch[1].trim();
          }
        } else if (line.startsWith('http')) {
          // Extract the URL (assuming the URL is on the next line)
          channelUrl = line.trim();
          if (channelName && channelUrl) {
            channelList.push({ name: channelName, url: channelUrl });
            channelName = ''; // Reset for next channel
            channelUrl = '';
          }
        }
      });

      return channelList;
    }

    // Display channels in the list
    function displayChannels(filteredChannels) {
      const channelList = document.getElementById('channelList');
      channelList.innerHTML = ''; // Clear the current list

      filteredChannels.forEach(channel => {
        const li = document.createElement('li');
        li.classList.add('channel-item');
        li.innerHTML = `<a href="${channel.url}" target="_blank">${channel.name}</a>`;
        channelList.appendChild(li);
      });
    }

    // Search function to filter the channels
    function searchChannels() {
      const searchInput = document.getElementById('searchInput').value.toLowerCase();
      const filteredChannels = channels.filter(channel => channel.name.toLowerCase().includes(searchInput));
      displayChannels(filteredChannels);
    }
  </script>

