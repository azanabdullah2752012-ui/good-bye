document.addEventListener('DOMContentLoaded', () => {

    // --- Interaction Observer for scrolling animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
    });


    // --- Wish Jar Logic ---
    const wishes = [
        "Your impact will definitely last a lifetime.",
        "Thank you for believing in us when we didn't.",
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

    function pullWish() {
        wishDisplay.classList.remove('show');
        
        setTimeout(() => {
            jarElement.classList.add('open');
            
            setTimeout(() => {
                const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
                wishText.textContent = `"${randomWish}"`;
                
                wishDisplay.classList.remove('hidden');
                void wishDisplay.offsetWidth; // Trigger reflow
                wishDisplay.classList.add('show');
                
                // Confetti animation
                const colors = ['#38bdf8', '#818cf8', '#c084fc', '#f43f5e', '#fb923c', '#10b981'];
                for (let i = 0; i < 40; i++) {
                    const confetti = document.createElement('div');
                    confetti.classList.add('confetti');
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.top = '-10px';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    const duration = Math.random() * 3 + 2;
                    confetti.style.animation = `fall ${duration}s linear ${Math.random() * 0.5}s forwards`;
                    document.body.appendChild(confetti);
                    setTimeout(() => confetti.remove(), (duration + 1) * 1000);
                }
                
                setTimeout(() => {
                    jarElement.classList.remove('open');
                }, 1000);
                
            }, 600);
        }, 300);
    }

    // Add confetti styling via JS to keep it standalone
    const style = document.createElement('style');
    style.innerHTML = `@keyframes fall { to { transform: translateY(100vh) rotate(720deg); } }`;
    document.head.appendChild(style);

    openJarBtn.addEventListener('click', pullWish);
    jarElement.addEventListener('click', pullWish);

});
