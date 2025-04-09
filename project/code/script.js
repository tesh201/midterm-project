window.addEventListener('load', function() {
    const listingContainer = document.getElementById('listingContainer');
    const searchInput = document.getElementById('searchInput');
    let listings = JSON.parse(localStorage.getItem('listings')) || [];

    function renderListings(filter = '') {
        listingContainer.innerHTML = '';
        const filteredListings = listings.filter(listing =>
            listing.title.toLowerCase().includes(filter.toLowerCase()) ||
            listing.address.toLowerCase().includes(filter.toLowerCase())
        );

        filteredListings.forEach((listing, index) => {
            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = listing.image;
            img.alt = listing.title;

            const details = document.createElement('div');
            details.className = 'details';

            const addressElem = document.createElement('p');
            addressElem.className = 'address';
            addressElem.textContent = listing.address;

            const titleElem = document.createElement('h2');
            titleElem.textContent = listing.title;

            const descriptionElem = document.createElement('p');
            descriptionElem.textContent = listing.description;

            const priceElem = document.createElement('p');
            priceElem.className = 'price';
            priceElem.textContent = `KSh ${listing.price}`;

            const featuresElem = document.createElement('p');
            featuresElem.className = 'features';
            featuresElem.textContent = listing.features;

            details.appendChild(addressElem);
            details.appendChild(titleElem);
            details.appendChild(descriptionElem);
            details.appendChild(priceElem);
            details.appendChild(featuresElem);

            card.appendChild(img);
            card.appendChild(details);

            card.addEventListener('click', function() {
                window.location.href = `property.html?id=${listing.id}`;
            });

            listingContainer.appendChild(card);
        });
    }

    searchInput.addEventListener('input', function() {
        renderListings(this.value);
    });

    renderListings();
});
