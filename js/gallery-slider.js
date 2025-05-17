

    // Start the auto-sliding
    function startAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        
        autoSlideInterval = setInterval(nextSlide, config.slideDelay);
    }

    // Pause auto-sliding on mouse hover
    gallerySlider.addEventListener('mouseenter', function() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    });

    // Resume auto-sliding when mouse leaves
    gallerySlider.addEventListener('mouseleave', function() {
        startAutoSlide();
    });

    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    gallerySlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        
        // Pause auto-sliding during touch
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }, { passive: true });

    gallerySlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        
        // Resume auto-sliding after touch
        startAutoSlide();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next slide
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous slide
            prevSlide();
        }
    }

    // Apply responsive styles initially
    applyResponsiveStyles();

    // Update styles when window is resized
    window.addEventListener('resize', function() {
        applyResponsiveStyles();
    });

    // Initialize auto-sliding
    startAutoSlide();
});
