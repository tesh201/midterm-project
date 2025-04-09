document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('id');

    const listings = JSON.parse(localStorage.getItem('listings')) || [];
    const listing = listings.find(item => item.id == listingId);

    if (listing) {
        // Populate property details
        document.getElementById('propertyTitle').innerText = listing.title;
        document.getElementById('propertyPrice').innerText = `KSh ${listing.price}`;
        document.getElementById('propertyLocation').innerText = listing.address;
        document.getElementById('propertyType').innerText = listing.type;
        document.getElementById('propertyCategory').innerText = listing.category;
        document.getElementById('propertyFeatures').innerText = listing.features;
        document.getElementById('propertyDescription').innerText = listing.description;

        // Display the main image and thumbnails
        document.getElementById('mainImage').src = listing.images[0];
        const thumbnailContainer = document.getElementById('thumbnailContainer');
        listing.images.forEach((imageSrc, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = imageSrc;
            imgElement.alt = `Thumbnail ${index + 1}`;
            imgElement.addEventListener('click', () => {
                document.getElementById('mainImage').src = imageSrc;
                currentSlideIndex = index; // Update the slide index
            });
            thumbnailContainer.appendChild(imgElement);
        });

        // Automatic slideshow functionality
        let currentSlideIndex = 0;
        const mainImage = document.getElementById('mainImage');
        setInterval(() => {
            currentSlideIndex = (currentSlideIndex + 1) % listing.images.length;
            mainImage.src = listing.images[currentSlideIndex];
        }, 3000); // Change image every 3 seconds
    }
});
