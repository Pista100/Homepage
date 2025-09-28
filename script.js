document.addEventListener('DOMContentLoaded', () => {

    const videoItems = document.querySelectorAll('.video-item');
    const modal = document.getElementById('video-player-modal');
    const closeBtn = document.getElementById('close-video-btn');
    const youtubePlayer = document.getElementById('youtube-player');

    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoId = item.getAttribute('data-video-id');
            if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                youtubePlayer.setAttribute('src', embedUrl);
                modal.style.display = 'flex';
            }
        });
    });

    const closeModal = () => {
        modal.style.display = 'none';
        // Stop the video from playing in the background
        youtubePlayer.setAttribute('src', '');
    };

    closeBtn.addEventListener('click', closeModal);

    // Also close modal if user clicks on the overlay background
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Optional: Close modal with the Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar'); // Get the navbar to add/remove class

    hamburgerBtn.addEventListener('click', () => {
        navContainer.classList.add('active');
        navbar.classList.add('menu-open'); // Add class to navbar to show/hide buttons
    });

    closeMenuBtn.addEventListener('click', () => {
        navContainer.classList.remove('active');
        navbar.classList.remove('menu-open'); // Remove class from navbar
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navContainer.classList.remove('active');
            navbar.classList.remove('menu-open'); // Remove class from navbar
        });
    });

});
