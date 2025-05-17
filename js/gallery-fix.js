document.addEventListener('DOMContentLoaded', function() {
    // Select all gallery item containers that are currently hidden
    const galleryItems = document.querySelectorAll('.gallery-item-container[style*="display:none"]');
    
    // Function to show gallery items with a fade-in effect
    function showGalleryItems() {
        galleryItems.forEach(function(item, index) {
            // Set a timeout to create a staggered effect
            setTimeout(function() {
                // Remove the display:none style
                item.style.display = 'block';
                
                // Fade in the opacity gradually
                setTimeout(function() {
                    item.style.opacity = '1';
                }, 50);
            }, index * 200); // Stagger the appearance of each item
        });
    }
    
    // Call the function to show gallery items
    showGalleryItems();
    
    // If there's a specific gallery container we want to target
    const specificGallery = document.getElementById('pro-gallery-margin-container-comp-m2olsln7');
    if (specificGallery) {
        // Make sure all items inside this specific gallery are visible
        const specificItems = specificGallery.querySelectorAll('.gallery-item-container');
        specificItems.forEach(function(item) {
            item.style.display = 'block';
            item.style.opacity = '1';
        });
    }
});
