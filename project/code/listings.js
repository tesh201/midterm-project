document.addEventListener('DOMContentLoaded', function() {
    const listingContainer = document.getElementById('listingContainer');
    const searchInput = document.getElementById('searchInput');

    let listings = JSON.parse(localStorage.getItem('listings')) || [];

    function renderListings(filter = '') {
        listingContainer.innerHTML = '';
        const filteredListings = listings.filter(listing => 
            listing.title.toLowerCase().includes(filter.toLowerCase()) ||
            listing.address.toLowerCase().includes(filter.toLowerCase())
        );

        filteredListings.forEach(listing => {
            const listingElement = document.createElement('div');
            listingElement.classList.add('listing');
            listingElement.innerHTML = `
                <h2>${listing.title}</h2>
                <p>${listing.address}</p>
                <p>KSh ${listing.price}</p>
                <button onclick="viewDetails(${listing.id})">View Details</button>
            `;
            listingContainer.appendChild(listingElement);
        });
    }

    searchInput.addEventListener('input', function() {
        renderListings(this.value);
    });

    window.viewDetails = function(id) {
        window.location.href = `details.html?id=${id}`;
    }

    renderListings();
});
