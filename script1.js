// List of channels with placeholder URLs for each
const channels = [
    { name: "Disney India SD", url: "#" },
    { name: "Disney India SD 2", url: "#" },
    { name: "Disney India SD 3", url: "#" },
    { name: "Disney India SD 4", url: "#" },
    { name: "Disney India SD 5", url: "#" },
    { name: "Disney India SD 6", url: "#" },
    { name: "Hungama Kids 1", url: "#" },
    { name: "Hungama Kids 2", url: "#" },
    { name: "Hungama Kids 3", url: "#" },
    { name: "Hungama Kids 4", url: "#" },
    { name: "Hungama Kids 5", url: "#" },
    { name: "Cartoon Network Hindi", url: "#" },
    { name: "Disney India HD", url: "#" },
    { name: "Discovery Kids", url: "#" },
    { name: "Sony Yay", url: "#" },
    { name: "Sony Yay 2 (GeoRestricted)", url: "#" },
    { name: "Sony Yay 3", url: "#" },
    { name: "Sony Yay 4", url: "#" },
    { name: "SUPER HUNGAMA", url: "#" },
    { name: "Gubbare", url: "#" },
    { name: "Nick Hindi", url: "#" },
    { name: "Nick Junior", url: "#" },
    { name: "Sonic Hindi", url: "#" },
    { name: "POGO", url: "#" },
    { name: "ETV Bal Bharat", url: "#" },
    { name: "Zoo Moo", url: "#" },
    { name: "Disney Junior Hindi", url: "#" },
    { name: "Nick HD+", url: "#" },
    { name: "Cartoon Network HD+", url: "#" },
    { name: "Chutti TV", url: "#" },
    { name: "Masha And The Bear 24/7 (HINDI)", url: "#" },
    { name: "Shiva 24/7", url: "#" },
    { name: "Motu Patlu 24/7 (HINDI)", url: "#" },
    { name: "Doraemon 24/7 (HINDI)", url: "#" },
    { name: "Chhota Bheem 24/7", url: "#" },
    { name: "Oggy and the Cockroaches 24/7 (HINDI)", url: "#" },
    { name: "Shinchan 24/7", url: "#" },
    { name: "WOW KIDS ACTION", url: "#" },
    { name: "Chacha Bhatija 24/7", url: "#" },
    { name: "Tom & Jerry 24/7", url: "#" },
    { name: "WOW Kids", url: "#" },
    { name: "CHU CHU TV 24/7", url: "#" },
    { name: "COCOMELON TV 24/7", url: "#" },
    { name: "PINK PANTHER 24/7", url: "#" },
];

// Function to load channels into the grid
const loadChannels = () => {
    const channelList = document.getElementById("channel-list");
    channelList.innerHTML = '';  // Clear existing list
    channels.forEach(channel => {
        const channelItem = document.createElement("div");
        channelItem.classList.add("channel-item");
        channelItem.innerText = channel.name;
        channelItem.onclick = () => window.open(channel.url, "_blank");
        channelList.appendChild(channelItem);
    });
};

// Function to filter channels based on search input
const filterChannels = () => {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredChannels = channels.filter(channel =>
        channel.name.toLowerCase().includes(searchInput)
    );
    displayChannels(filteredChannels); // Call displayChannels to update the UI
};

// Function to display channels dynamically
const displayChannels = (channelArray) => {
    const channelList = document.getElementById("channel-list");
    channelList.innerHTML = ''; // Clear previous content
    if (channelArray.length === 0) {
        channelList.innerHTML = '<p>No channels found</p>';
    } else {
        channelArray.forEach(channel => {
            const channelItem = document.createElement("div");
            channelItem.classList.add("channel-item");
            channelItem.innerText = channel.name;
            channelItem.onclick = () => window.open(channel.url, "_blank");
            channelList.appendChild(channelItem);
        });
    }
};

// Initial load of channels
loadChannels();
