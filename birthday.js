// Background Music Setup
let backgroundMusic;

function initializeBackgroundMusic() {
    backgroundMusic = new Audio('Perfect.mp3');
    backgroundMusic.volume = 0.3;
    backgroundMusic.loop = true;
}

function playBackgroundMusic() {
    if (window.birthdayAudio) {
        window.birthdayAudio.pause();
    }

    const audio = new Audio('Perfect.mp3');
    audio.volume = 0.2; // Set initial volume to 20%
    audio.loop = true;  // Enable looping

    // Add error handling
    audio.onerror = function() {
        console.error('Error playing the music');
        createMusicButton();
    };

    // Add event listener for successful loading
    audio.oncanplaythrough = function() {
        // Fade in the audio
        let currentVolume = 0;
        audio.volume = currentVolume;
        
        const fadeIn = setInterval(() => {
            currentVolume += 0.01;
            if (currentVolume <= 0.2) {
                audio.volume = currentVolume;
            } else {
                clearInterval(fadeIn);
            }
        }, 100);

        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error('Playback failed:', error);
                createMusicButton();
            });
        }
    };

    // Store audio in window object for later access
    window.birthdayAudio = audio;
}

function createMusicButton() {
    if (!document.querySelector('.music-control')) {
        const musicBtn = document.createElement('button');
        musicBtn.className = 'music-control';
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        musicBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #ff6b6b;
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: all 0.3s ease;
        `;

        let isPlaying = false;

        musicBtn.addEventListener('click', () => {
            if (!backgroundMusic) {
                initializeBackgroundMusic();
            }
            
            if (isPlaying) {
                backgroundMusic.pause();
                musicBtn.innerHTML = '<i class="fas fa-music"></i>';
                musicBtn.style.background = '#ff6b6b';
            } else {
                backgroundMusic.play();
                musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                musicBtn.style.background = '#4ecdc4';
            }
            isPlaying = !isPlaying;
        });

        musicBtn.addEventListener('mouseenter', () => {
            musicBtn.style.transform = 'scale(1.1)';
        });

        musicBtn.addEventListener('mouseleave', () => {
            musicBtn.style.transform = 'scale(1)';
        });

        document.body.appendChild(musicBtn);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize music button
    createMusicButton();
    
    // Try to play music on first interaction
    document.body.addEventListener('click', function initMusic() {
        playBackgroundMusic();
        document.body.removeEventListener('click', initMusic);
    }, { once: true });

    const card = document.querySelector('.birthday-card');
    const openBtn = document.querySelector('.open-btn');
    const floatingHearts = document.querySelector('.floating-hearts');
    const confettiContainer = document.querySelector('.confetti-container');
    const galleryBtn = document.querySelector('.gallery-btn');
    const heartMessageBtn = document.querySelector('.heart-message-btn');
    const galleryModal = document.querySelector('.gallery-modal');
    const heartMessageModal = document.querySelector('.heart-message-modal');
    const closeGallery = document.querySelector('.close-gallery');
    const closeHeartMessage = document.querySelector('.close-heart-message');
    const galleryScroller = document.querySelector('.gallery-scroller');
    const backButtons = document.querySelectorAll('.back-btn');

    // Card flip animation
    openBtn.addEventListener('click', () => {
        card.classList.add('flipped');
        createFloatingHearts();
        createConfetti();
        playBackgroundMusic();
    });

    // Gallery button click
    galleryBtn.addEventListener('click', () => {
        galleryModal.style.display = 'block';
        loadGallery();
        createFloatingHeartsInGallery();
    });

    // Heart message button click
    heartMessageBtn.addEventListener('click', () => {
        heartMessageModal.style.display = 'block';
        createFloatingHeartsInMessage();
    });

    // Back buttons click
    backButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryModal.style.display = 'none';
            heartMessageModal.style.display = 'none';
        });
    });

    // Close buttons
    closeGallery.addEventListener('click', () => {
        galleryModal.style.display = 'none';
    });

    closeHeartMessage.addEventListener('click', () => {
        heartMessageModal.style.display = 'none';
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
        }
        if (e.target === heartMessageModal) {
            heartMessageModal.style.display = 'none';
        }
    });

    // Load gallery images and videos
    function loadGallery() {
        galleryScroller.innerHTML = '';
        
        // Add images from local storage
        const images = [
            {
                path: 'images/1.jpg',
                alt: 'Our Memory 1'
            },
            {
                path: 'images/2.jpg',
                alt: 'Our Memory 2'
            },
            {
                path: 'images/3.jpg',
                alt: 'Our Memory 3'
            },
            {
                path: 'images/4.jpg',
                alt: 'Our Memory 4'
            },
            {
                path: 'images/5.jpg',
                alt: 'Our Memory 5'
            },
            {
                path: 'images/6.jpg',
                alt: 'Our Memory 6'
            },
            {
                path: 'images/7.jpg',
                alt: 'Our Memory 7'
            },
            {
                path: 'images/8.jpg',
                alt: 'Our Memory 8'
            },
            {
                path: 'images/9.jpg',
                alt: 'Our Memory 9'
            },
            {
                path: 'images/10.jpg',
                alt: 'Our Memory 10'
            },
            {
                path: 'images/11.jpg',
                alt: 'Our Memory 11'
            },
            {
                path: 'images/12.jpg',
                alt: 'Our Memory 12'
            },
            {
                path: 'images/13.jpg',
                alt: 'Our Memory 13'
            },
            {
                path: 'images/14.jpg',
                alt: 'Our Memory 14'
            },
            {
                path: 'images/15.jpg',
                alt: 'Our Memory 15'
            }
        ];

        const videos = [
            {
                path: 'images/16.mp4',
                alt: 'Our Special Moment 1',
                thumbnail: 'images/16.jpg'
            },
            {
                path: 'images/17.mp4',
                alt: 'Our Special Moment 2',
                thumbnail: 'images/17.jpg'
            },
            {
                path: 'images/18.mp4',
                alt: 'Our Special Moment 3',
                thumbnail: 'images/18.jpg'
            }
        ];

        // Create sections
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'gallery-sections';

        // Images Section
        const imagesSection = document.createElement('div');
        imagesSection.className = 'images-section';
        imagesSection.innerHTML = '<h2 class="section-title">Our Beautiful Memories 💝</h2>';
        const imageGrid = document.createElement('div');
        imageGrid.className = 'image-grid';

        // Videos Section
        const videosSection = document.createElement('div');
        videosSection.className = 'videos-section';
        videosSection.innerHTML = '<h2 class="section-title">Our Special Moments ❤️</h2>';
        const videoGrid = document.createElement('div');
        videoGrid.className = 'video-grid';

        // Add images
        images.forEach(image => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = image.path;
            img.alt = image.alt;
            img.loading = 'lazy';
            
            // Add error handling for images
            img.onerror = function() {
                this.src = 'images/heart.png';
                this.onerror = null;
            };
            
            // Add hover effect
            imgContainer.addEventListener('mouseenter', () => {
                gsap.to(imgContainer, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out',
                    zIndex: 1
                });
            });

            imgContainer.addEventListener('mouseleave', () => {
                gsap.to(imgContainer, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                    zIndex: 0
                });
            });

            // Add click event to show full-size image
            imgContainer.addEventListener('click', () => {
                const fullImage = document.createElement('div');
                fullImage.className = 'full-image-view';
                fullImage.innerHTML = `
                    <div class="full-view-header">
                        <button class="full-view-back">
                            <i class="fas fa-arrow-left"></i> Back to Gallery
                        </button>
                        <button class="close-full-image">&times;</button>
                    </div>
                    <div class="full-image-content">
                        <img src="${image.path}" alt="${image.alt}" onerror="this.src='images/heart.png'">
                    </div>
                `;
                document.body.appendChild(fullImage);

                // Handle back and close buttons
                const backBtn = fullImage.querySelector('.full-view-back');
                const closeBtn = fullImage.querySelector('.close-full-image');

                backBtn.addEventListener('click', () => {
                    gsap.to(fullImage, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: () => fullImage.remove()
                    });
                });

                closeBtn.addEventListener('click', () => {
                    gsap.to(fullImage, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: () => fullImage.remove()
                    });
                });

                // Close on background click
                fullImage.addEventListener('click', (e) => {
                    if (e.target === fullImage) {
                        gsap.to(fullImage, {
                            opacity: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                            onComplete: () => fullImage.remove()
                        });
                    }
                });

                // Entrance animation
                gsap.from(fullImage.querySelector('.full-image-content'), {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
            
            imgContainer.appendChild(img);
            imageGrid.appendChild(imgContainer);
        });

        // Add videos
        videos.forEach((video, index) => {
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-item';
            
            const videoWrapper = document.createElement('div');
            videoWrapper.className = 'video-wrapper';
            
            const videoElement = document.createElement('video');
            videoElement.src = video.path;
            videoElement.poster = video.thumbnail;
            videoElement.controls = true;
            videoElement.preload = 'metadata';
            
            const playButton = document.createElement('button');
            playButton.className = 'video-play-btn';
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            
            // Video hover effect
            videoContainer.addEventListener('mouseenter', () => {
                gsap.to(videoContainer, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                gsap.to(playButton, {
                    scale: 1.2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            videoContainer.addEventListener('mouseleave', () => {
                gsap.to(videoContainer, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                gsap.to(playButton, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            // Play button click
            playButton.addEventListener('click', () => {
                const fullVideo = document.createElement('div');
                fullVideo.className = 'full-video-view';
                fullVideo.innerHTML = `
                    <div class="full-view-header">
                        <button class="full-view-back">
                            <i class="fas fa-arrow-left"></i> Back to Gallery
                        </button>
                        <button class="close-full-video">&times;</button>
                    </div>
                    <div class="full-video-content">
                        <video src="${video.path}" controls autoplay></video>
                    </div>
                `;
                document.body.appendChild(fullVideo);

                // Handle back and close buttons
                const backBtn = fullVideo.querySelector('.full-view-back');
                const closeBtn = fullVideo.querySelector('.close-full-video');
                const videoElement = fullVideo.querySelector('video');

                backBtn.addEventListener('click', () => {
                    videoElement.pause();
                    gsap.to(fullVideo, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: () => fullVideo.remove()
                    });
                });

                closeBtn.addEventListener('click', () => {
                    videoElement.pause();
                    gsap.to(fullVideo, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: () => fullVideo.remove()
                    });
                });

                // Close on background click
                fullVideo.addEventListener('click', (e) => {
                    if (e.target === fullVideo) {
                        videoElement.pause();
                        gsap.to(fullVideo, {
                            opacity: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                            onComplete: () => fullVideo.remove()
                        });
                    }
                });

                // Entrance animation
                gsap.from(fullVideo.querySelector('.full-video-content'), {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });

            videoWrapper.appendChild(videoElement);
            videoWrapper.appendChild(playButton);
            videoContainer.appendChild(videoWrapper);
            videoGrid.appendChild(videoContainer);
        });

        // Append sections
        imagesSection.appendChild(imageGrid);
        videosSection.appendChild(videoGrid);
        galleryContainer.appendChild(imagesSection);
        galleryContainer.appendChild(videosSection);
        galleryScroller.appendChild(galleryContainer);

        // Add smooth scroll animation
        gsap.from('.gallery-item', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: {
                amount: 1,
                grid: [4, 4]
            },
            ease: 'power2.out'
        });

        gsap.from('.video-item', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power2.out',
            delay: 0.5
        });

        gsap.from('.section-title', {
            duration: 1,
            x: -50,
            opacity: 0,
            ease: 'power2.out',
            stagger: 0.3
        });
    }

    // Create floating hearts in gallery
    function createFloatingHeartsInGallery() {
        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'floating-hearts-gallery';
        galleryModal.appendChild(heartsContainer);

        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 3 + 's';
            heart.style.opacity = Math.random();
            heart.style.transform = `rotate(${Math.random() * 360}deg)`;
            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 6000);
        }
    }

    // Create floating hearts in message
    function createFloatingHeartsInMessage() {
        const heartsContainer = document.querySelector('.floating-hearts-in-message');
        heartsContainer.innerHTML = '';

        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = Math.random() * 3 + 3 + 's';
            heart.style.opacity = Math.random();
            heart.style.transform = `rotate(${Math.random() * 360}deg)`;
            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 6000);
        }
    }

    // Existing functions
    function createFloatingHearts() {
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 3 + 's';
            heart.style.opacity = Math.random();
            heart.style.transform = `rotate(${Math.random() * 360}deg)`;
            floatingHearts.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 6000);
        }
    }

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

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }

    function getRandomColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#06d6a0', '#118ab2'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

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