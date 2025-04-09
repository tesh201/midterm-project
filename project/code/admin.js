document.addEventListener('DOMContentLoaded', function() {
    const listingForm = document.getElementById('listingForm');
    const listingsContainer = document.getElementById('listingsContainer');

    // Load existing listings from localStorage
    let listings = JSON.parse(localStorage.getItem('listings')) || [];

    // Function to render the listings in the admin panel
    function renderListings() {
        listingsContainer.innerHTML = ''; // Clear the container before rendering
        listings.forEach(listing => {
            const listingElement = document.createElement('div');
            listingElement.classList.add('listing');
            listingElement.innerHTML = `
                <div>
                    <h2>${listing.title}</h2>
                    <p>${listing.address}</p>
                    <p>Category: ${listing.category}</p>
                    <p>KSh ${listing.price}</p>
                </div>
                <div>
                    <img src="${listing.image}" alt="${listing.title}">
                    <button class="delete-btn" data-id="${listing.id}">Delete</button>
                </div>
            `;
            listingsContainer.appendChild(listingElement);
        });

        // Add event listeners for delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteListing(id);
            });
        });
    }

    // Function to handle the deletion of a listing
    function deleteListing(id) {
        listings = listings.filter(listing => listing.id !== id); // Remove the listing by ID
        localStorage.setItem('listings', JSON.stringify(listings)); // Update localStorage
        renderListings(); // Re-render the listings
    }

    // Handle the form submission to add a new listing
    listingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const address = document.getElementById('address').value;
        const category = document.getElementById('category').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const image = document.getElementById('image').value;

        const newListing = {
            id: new Date().getTime(), // Generate a unique ID based on timestamp
            title,
            address,
            category,
            price,
            description,
            image
        };

        listings.push(newListing); // Add new listing to the array
        localStorage.setItem('listings', JSON.stringify(listings)); // Save the updated array to localStorage

        renderListings(); // Re-render the listings to include the new one
        listingForm.reset(); // Clear the form fields
    });

    renderListings(); // Initial render of listings on page load
});
