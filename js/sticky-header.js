// Sticky Header Script
document.addEventListener('DOMContentLoaded', function() {
    // Variables to track scroll position
    let lastScrollTop = 0;
    let headerElement = null;
    
    // Find the header element - looking for common header identifiers
    // This function tries multiple selectors to find the header
    function findHeaderElement() {
        // Try common header selectors
        const possibleSelectors = [
            'header',
            '#SITE_HEADER',
            '.site-header',
            '#site-header',
            '[data-mesh-id*="SITE_HEADER"]',
            '[data-testid="SITE_HEADER"]',
            // For Wix sites, often the first section or a section with navigation is the header
            'section:first-of-type',
            'nav',
            // Look for elements that might contain navigation
            '.u4cNtA', // This class was found in your HTML and might be related to navigation
            // If none of the above work, try to find an element with logo and menu
            '[class*="logo"]',
            '[class*="menu"]',
            '[class*="navigation"]'
        ];
        
        // Try each selector
        for (const selector of possibleSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                console.log('Header element found with selector:', selector);
                return element;
            }
        }
        
        // If no specific header element is found, use the first major container element
        // This is a fallback approach
        const fallbackElement = document.querySelector('#SITE_CONTAINER') || 
                               document.querySelector('div[id^="comp-"]') ||
                               document.querySelector('section');
        
        if (fallbackElement) {
            console.log('Using fallback header element:', fallbackElement);
            return fallbackElement;
        }
        
        console.warn('Could not find a suitable header element');
        return null;
    }
    
    // Initialize the header
    function initStickyHeader() {
        headerElement = findHeaderElement();
        
        if (!headerElement) return;
        
        // Create a placeholder to prevent content jump when header becomes fixed
        const headerHeight = headerElement.offsetHeight;
        const placeholder = document.createElement('div');
        placeholder.style.height = headerHeight + 'px';
        placeholder.style.display = 'none';
        headerElement.parentNode.insertBefore(placeholder, headerElement);
        
        // Store original styles to restore when not sticky
        const originalStyles = {
            position: headerElement.style.position,
            top: headerElement.style.top,
            left: headerElement.style.left,
            right: headerElement.style.right,
            zIndex: headerElement.style.zIndex,
            background: headerElement.style.background,
            boxShadow: headerElement.style.boxShadow,
            transition: headerElement.style.transition
        };
        
        // Apply initial styles
        headerElement.style.transition = 'transform 0.3s ease, background-color 0.3s ease, opacity 0.3s ease';
        
        // Handle scroll events
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // If we're at the top of the page, reset the header
            if (scrollTop <= 0) {
                headerElement.style.position = originalStyles.position;
                headerElement.style.top = originalStyles.top;
                headerElement.style.left = originalStyles.left;
                headerElement.style.right = originalStyles.right;
                headerElement.style.zIndex = originalStyles.zIndex;
                headerElement.style.background = originalStyles.background;
                headerElement.style.boxShadow = originalStyles.boxShadow;
                headerElement.style.transform = 'translateY(0)';
                headerElement.style.opacity = '1';
                placeholder.style.display = 'none';
                return;
            }
            
            // Make header sticky when scrolling up
            if (scrollTop < lastScrollTop) {
                // Scrolling UP - show the header
                headerElement.style.position = 'fixed';
                headerElement.style.top = '0';
                headerElement.style.left = '0';
                headerElement.style.right = '0';
                headerElement.style.zIndex = '1000';
                headerElement.style.background = 'linear-gradient(180deg, rgba(49, 48, 48, 0.56) 40.61814692982456%, rgba(147, 145, 143, 0) 100%)'; // Gradient background fading to transparent
                headerElement.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0)';
                // No border radius for a seamless appearance
                headerElement.style.transform = 'translateY(0)';
                headerElement.style.opacity = '1';
                placeholder.style.display = 'block';
                
                // Add dropdown animation
                if (headerElement.classList.contains('header-hidden')) {
                    headerElement.classList.remove('header-hidden');
                    headerElement.style.transform = 'translateY(0)';
                }
            } else {
                // Scrolling DOWN - hide the header
                headerElement.classList.add('header-hidden');
                headerElement.style.transform = 'translateY(-100%)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Initialize after a short delay to ensure all elements are loaded
    setTimeout(initStickyHeader, 500);
});
