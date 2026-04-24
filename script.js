document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.teacher-card, .message-note, .section-title').forEach((el) => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Wish Jar Logic
    const wishes = [
        "Your impact will definitely last a lifetime.",
        "Thank you for believing in us when we didn't believe in ourselves.",
        "You always made learning feel like an adventure.",
        "The world needs more teachers like you.",
        "We promise to keep making you proud!",
        "Thank you for your infinite patience.",
        "You taught us to reach for the stars.",
        "Your classroom was a sanctuary for so many of us."
    ];

    const jarElement = document.getElementById('jar-element');
    const openJarBtn = document.getElementById('open-jar-button');
    const wishDisplay = document.getElementById('wish-display');
    const wishText = document.getElementById('wish-text');

    function createConfetti() {
        const colors = ['#38bdf8', '#818cf8', '#c084fc', '#f43f5e', '#fb923c', '#10b981'];
        for (let i = 0; i < 40; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random animation duration and delay
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 0.5;
            
            confetti.style.animation = `fall ${duration}s linear ${delay}s forwards`;
            document.body.appendChild(confetti);
            
            // Cleanup
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }
    }

    // Add confetti falling animation dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(720deg);
            }
        }
    `;
    document.head.appendChild(style);

    function pullWish() {
        // Close display if it's already open
        wishDisplay.classList.remove('show');
        
        setTimeout(() => {
            // Animate jar lid opening
            jarElement.classList.add('open');
            
            // Wait for jar to open before showing text
            setTimeout(() => {
                const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
                wishText.textContent = `"${randomWish}"`;
                
                wishDisplay.classList.remove('hidden');
                // Trigger reflow
                void wishDisplay.offsetWidth;
                wishDisplay.classList.add('show');
                
                createConfetti();
                
                // Reset jar
                setTimeout(() => {
                    jarElement.classList.remove('open');
                }, 1000);
                
            }, 600);
            
        }, 300);
    }

    openJarBtn.addEventListener('click', pullWish);
    jarElement.addEventListener('click', pullWish);

    // --- Edit Mode Logic ---
    const editToggle = document.getElementById('edit-toggle');
    const editableSelectors = 'h1, h2, h3, .subtitle, .teacher-name, .teacher-subject, .teacher-legacy, .note-text, .note-author';
    const editableElements = document.querySelectorAll(editableSelectors);

    // Initialize indexing and load saved content
    editableElements.forEach((el, index) => {
        const key = `editable_text_${index}`;
        el.setAttribute('data-edit-key', key);

        // Load if exists
        const savedText = localStorage.getItem(key);
        if (savedText && savedText !== el.innerHTML) {
            el.innerHTML = savedText;
        }

        // Add auto-save listener
        el.addEventListener('input', () => {
            if (el.getAttribute('contenteditable') === 'true') {
                localStorage.setItem(key, el.innerHTML);
            }
        });
    });

    // Toggle logic
    editToggle.addEventListener('change', (e) => {
        const isEditMode = e.target.checked;
        editableElements.forEach(el => {
            el.setAttribute('contenteditable', isEditMode ? 'true' : 'false');
        });
    });

});
