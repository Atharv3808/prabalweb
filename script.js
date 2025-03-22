// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    // Add hover effect for clickable elements
    const clickables = document.querySelectorAll('a, button, .weapon-card');
    clickables.forEach((element) => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    
    // Animation for weapon cards
    const weaponCards = document.querySelectorAll('.weapon-card');
    if (weaponCards.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        weaponCards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }
    
    // Navigation highlight on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
const roadEvents = document.querySelectorAll('.road-event');
        
const maesterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed-by-raven');
        }
    });
}, {
    threshold: 0.5
});

roadEvents.forEach(event => {
    maesterObserver.observe(event);
});

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
    document.querySelector('.hamburger .bar1').classList.toggle('change1');
    document.querySelector('.hamburger .bar2').classList.toggle('change2');
    document.querySelector('.hamburger .bar3').classList.toggle('change3');
}

// Toggle Chatbot Visibility
document.getElementById("chatbot-button").addEventListener("click", function () {
    var chatbot = document.getElementById("chatbot-container");
    chatbot.style.display = chatbot.style.display === "block" ? "none" : "block";
});

document.addEventListener('DOMContentLoaded', (event) => {
    var loader = document.getElementById('loader');
    var video = loader.querySelector('video');

    video.addEventListener('ended', function() {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000); // Loader fades out over 1 second
    });

    // Ensure loader disappears even if video doesn't end (e.g., if it's a loop)
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000); // Loader fades out over 1 second
    }, 14000); // Loader disappears after 12 seconds
});

document.addEventListener('DOMContentLoaded', (event) => {
    const loader = document.getElementById('loader');
    const video = document.getElementById('loaderVideo');
    const unmuteBtn = document.getElementById('unmuteBtn');
    
    // Set initial state
    let isMuted = true;
    video.muted = true; // Start muted to comply with autoplay policies
    
    // Minimum display time (3 seconds)
    const minimumLoadTime = 14000;
    const startTime = Date.now();
    
    // Mute/unmute control
    unmuteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        video.muted = isMuted;
        unmuteBtn.innerHTML = isMuted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
    });
    
    // Handle video autoplay
    const playVideo = () => {
        video.play().catch(error => {
            // Show fallback play button
            const playOverlay = document.createElement('div');
            playOverlay.className = 'play-overlay';
            playOverlay.innerHTML = '<button class="play-btn">Click to Start</button>';
            loader.appendChild(playOverlay);
            
            document.querySelector('.play-btn').addEventListener('click', () => {
                video.play();
                playOverlay.remove();
            });
        });
    }
    
    // iOS detection
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS) {
        // Show custom play button for iOS
        const iosPlayBtn = document.createElement('div');
        iosPlayBtn.className = 'ios-play-overlay';
        iosPlayBtn.innerHTML = '<button class="play-btn">Tap to Play</button>';
        loader.appendChild(iosPlayBtn);
        
        iosPlayBtn.querySelector('button').addEventListener('click', () => {
            video.play();
            iosPlayBtn.remove();
        });
    } else {
        playVideo();
    }
    
    // Handle loader dismissal
    const dismissLoader = () => {
        const loadTime = Date.now() - startTime;
        const remainingTime = Math.max(minimumLoadTime - loadTime, 0);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                video.pause();
            }, 14000);
        }, remainingTime);
    }
    
    video.addEventListener('playing', dismissLoader);
    video.addEventListener('ended', dismissLoader);
    
    // Fallback timeout
    setTimeout(dismissLoader, 5000);
});





