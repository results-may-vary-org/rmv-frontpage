document.addEventListener('DOMContentLoaded', function() {
    console.log('██████╗ ███╗   ███╗██╗   ██╗    ███████╗██████╗  ██████╗ ███╗   ██╗████████╗██████╗  █████╗  ██████╗ ███████╗\n' +
      '██╔══██╗████╗ ████║██║   ██║    ██╔════╝██╔══██╗██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗██╔════╝ ██╔════╝\n' +
      '██████╔╝██╔████╔██║██║   ██║    █████╗  ██████╔╝██║   ██║██╔██╗ ██║   ██║   ██████╔╝███████║██║  ███╗█████╗  \n' +
      '██╔══██╗██║╚██╔╝██║╚██╗ ██╔╝    ██╔══╝  ██╔══██╗██║   ██║██║╚██╗██║   ██║   ██╔═══╝ ██╔══██║██║   ██║██╔══╝  \n' +
      '██║  ██║██║ ╚═╝ ██║ ╚████╔╝     ██║     ██║  ██║╚██████╔╝██║ ╚████║   ██║   ██║     ██║  ██║╚██████╔╝███████╗\n' +
      '╚═╝  ╚═╝╚═╝     ╚═╝  ╚═══╝      ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝\n');

    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Random letter hover effect for logo
    const logo = document.querySelector('.logo');
    const logoLetters = document.querySelectorAll('.logo-letter');
    const taglineLetters = document.querySelectorAll('.tagline-letter');

    if (logo && logoLetters.length > 0) {
        let currentRedLetter = null;
        let currentRedTaglineLetter = null;

        logo.addEventListener('mouseenter', function() {
            // Remove red from previous letters
            if (currentRedLetter) {
                currentRedLetter.classList.remove('red-accent');
            }
            if (currentRedTaglineLetter) {
                currentRedTaglineLetter.classList.remove('red-accent');
            }

            // Pick random letter and make it red in both logo and tagline
            const randomIndex = Math.floor(Math.random() * logoLetters.length);
            currentRedLetter = logoLetters[randomIndex];
            currentRedLetter.classList.add('red-accent');

            // Apply same random selection to tagline based on logo letter
            if (randomIndex === 0) { // R
                // Find 'r' letters in tagline (positions 0 and 12)
                const rLetters = [taglineLetters[0], taglineLetters[12]];
                currentRedTaglineLetter = rLetters[Math.floor(Math.random() * rLetters.length)];
            } else if (randomIndex === 1) { // M
                // Find 'm' letter in tagline (position 7)
                currentRedTaglineLetter = taglineLetters[7];
            } else if (randomIndex === 2) { // v
                // Find 'v' letter in tagline (position 10)
                currentRedTaglineLetter = taglineLetters[10];
            }

            if (currentRedTaglineLetter) {
                currentRedTaglineLetter.classList.add('red-accent');
            }

            // Scale effect
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });

        logo.addEventListener('mouseleave', function() {
            // Remove red accent when leaving
            if (currentRedLetter) {
                currentRedLetter.classList.remove('red-accent');
                currentRedLetter = null;
            }
            if (currentRedTaglineLetter) {
                currentRedTaglineLetter.classList.remove('red-accent');
                currentRedTaglineLetter = null;
            }

            // Reset scale
            this.style.transform = 'scale(1)';
        });
    }

    // Action links hover effects
    const actionLinks = document.querySelectorAll('.action-link');
    actionLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.opacity = '0.7';
        });

        link.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
    if (loadTime > 3000) {
        console.log('🐌 Results may vary, but this load time definitely needs optimization!');
    } else if (loadTime < 1000) {
        console.log('🚀 Lightning fast! Results are consistently good.');
    }
});

// Error handling with humor
window.addEventListener('error', function(e) {
    console.error('🐛 A wild bug appeared! But don\'t worry, we assume this is an intentional feature.');
    console.error('Error details:', e.message);
});
