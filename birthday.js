document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.birthday-card');
    const openBtn = document.querySelector('.open-btn');
    const floatingHearts = document.querySelector('.floating-hearts');
    const confettiContainer = document.querySelector('.confetti-container');

    // Card flip animation
    openBtn.addEventListener('click', () => {
        card.classList.add('flipped');
        createFloatingHearts();
        createConfetti();
        playBirthdaySong();
    });

    // Create floating hearts
    function createFloatingHearts() {
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 3 + 's';
            heart.style.opacity = Math.random();
            heart.style.transform = `rotate(${Math.random() * 360}deg)`;
            floatingHearts.appendChild(heart);

            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }
    }

    // Create confetti
    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confettiContainer.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }

    // Get random color for confetti
    function getRandomColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#06d6a0', '#118ab2'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Play birthday song
    function playBirthdaySong() {
        const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        audio.volume = 0.3;
        audio.play();
    }

    // Add hover effect to photo frames
    const photoFrames = document.querySelectorAll('.photo-frame');
    photoFrames.forEach(frame => {
        frame.addEventListener('mouseenter', () => {
            gsap.to(frame, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        frame.addEventListener('mouseleave', () => {
            gsap.to(frame, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Add initial animations
    gsap.from('.birthday-card', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.cake', {
        duration: 1,
        scale: 0,
        rotation: 360,
        ease: 'back.out(1.7)',
        delay: 0.5
    });
}); 