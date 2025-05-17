// Script to remove Wix Studio error div
document.addEventListener('DOMContentLoaded', function() {
    // Function to remove the Wix error div
    function removeWixError() {
        // Target the specific div with id="root" containing the Wix error
        const rootDiv = document.getElementById('root');
        if (rootDiv) {
            // Check if it contains the Wix Studio error content
            const wixErrorContent = rootDiv.querySelector('.hwvPoO, .xeyxCY, .Jstvba');
            if (wixErrorContent) {
                // Remove the entire root div
                rootDiv.remove();
                console.log('Wix Studio error div removed successfully');
            }
        }
    }

    // Run immediately
    removeWixError();

    // Also set up a mutation observer to catch if the div is added dynamically after page load
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                removeWixError();
            }
        });
    });

    // Start observing the document body for DOM changes
    observer.observe(document.body, { childList: true, subtree: true });
});
