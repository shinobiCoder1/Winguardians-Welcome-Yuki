document.addEventListener('DOMContentLoaded', () => {
    const letter = document.getElementById('letter');
    letter.style.opacity = '1';
    letter.style.transform = 'none';
    const video = document.getElementById('hogwartsVideo');
    let animationComplete = false;

    var music = document.getElementById('backgroundMusic');

    // Set initial volume
    music.volume = 0.5; // Set initial volume to 50%

    // Create a button to unmute
    var unmuteButton = document.createElement('button');
    unmuteButton.innerHTML = 'Mute Music';
    unmuteButton.id = 'unmuteButton';
    document.body.appendChild(unmuteButton);

    unmuteButton.addEventListener('click', function() {
        if (music.muted) {
            music.muted = false;
            this.innerHTML = 'Mute Music';
        } else {
            music.muted = true;
            this.innerHTML = 'Unmute Music';
        }
    });

    // Feather-like flying animation
    anime({
        targets: '.letter',
        translateY: [-1000, 0], // Start from above the screen
        translateX: {
            value: function() {
                return anime.random(-50, 50); // Slight horizontal movement
            },
            duration: 4000,
            easing: 'easeInOutSine'
        },
        rotate: {
            value: function() {
                return anime.random(-10, 10); // Slight rotation
            },
            duration: 4000,
            easing: 'easeInOutSine'
        },
        scale: [0.5, 1], // Start smaller and grow to full size
        opacity: {
            value: [0, 1],
            duration: 1000,
            easing: 'linear'
        },
        duration: 4000,
        easing: 'easeOutQuad',
        complete: function(anim) {
            letter.style.transform = 'none'; // Reset transform after animation
            animationComplete = true;
            letter.classList.add('animation-complete');
            
            // Add tilt effect listeners only after animation is complete
            addTiltEffect();
        }
    });

    function addTiltEffect() {
        letter.addEventListener('mousemove', handleTilt);
        letter.addEventListener('mouseleave', resetTilt);
    }

    function handleTilt(e) {
        if (!letter.classList.contains('open')) {
            const letterRect = letter.getBoundingClientRect();
            const letterCenterX = letterRect.left + letterRect.width / 2;
            const letterCenterY = letterRect.top + letterRect.height / 2;
            const mouseX = e.clientX - letterCenterX;
            const mouseY = e.clientY - letterCenterY;
            
            const tiltX = (mouseY / letterRect.height) * 20;
            const tiltY = -(mouseX / letterRect.width) * 20;
            
            letter.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        }
    }

    function resetTilt() {
        if (!letter.classList.contains('open')) {
            letter.style.transform = 'none';
        }
    }

    // Click to flip
    letter.addEventListener('click', () => {
        if (animationComplete) {
            letter.classList.toggle('open');
            letter.style.transform = 'none'; // Reset tilt when flipping
            
            if (letter.classList.contains('open')) {
                // If opening, scroll to the video after a short delay
                // setTimeout(() => {
                //     video.scrollIntoView({ behavior: 'smooth' });
                // }, 600);
            } else {
                // If closing, pause the video
                video.pause();
            }
        }
    });
});