/* ==========================================================================
   JavaScript UI Engine: YouTube PrivacyHub PM Case Study
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Presentation Navigation References
    const slidesContainer = document.getElementById('slides-container');
    const prevSlideBtn = document.getElementById('prev-slide-btn');
    const nextSlideBtn = document.getElementById('next-slide-btn');
    const slideDotsContainer = document.getElementById('slide-dots');
    const currentSlideNum = document.getElementById('current-slide-num');
    const totalSlidesNum = document.getElementById('total-slides-num');
    
    // Theme Toggle References
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Mobile View Toggle References
    const btnShowPresentation = document.getElementById('btn-show-presentation');
    const btnShowPrototype = document.getElementById('btn-show-prototype');
    const presentationPanel = document.getElementById('presentation-panel');
    const prototypePanel = document.getElementById('prototype-panel');

    let currentSlide = 1;
    let totalSlides = 10;

    // Theme Toggle Action
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
        
        const isLightTheme = document.body.classList.contains('light-theme');
        if (isLightTheme) {
            // Moon Icon for switching to dark mode
            themeIcon.innerHTML = `
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.5-8.9 8.2-9.8.6-.1 1.2.3 1.3.9.1.6-.3 1.2-.9 1.3-3.5.7-6 3.8-6 7.6 0 4.4 3.6 8 8 8 3.8 0 6.9-2.5 7.6-6 .1-.6.7-1 1.3-.9.6.1 1 .7.9 1.3-.9 4.7-5 8.2-9.8 8.2z"/>
                </svg>
            `;
        } else {
            // Sun Icon for switching to light mode
            themeIcon.innerHTML = `
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-12.37a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.02.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06a.996.996 0 0 0-1.41 0zm-12.37 12.37a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06a.996.996 0 0 0-1.41 0z"/>
                </svg>
            `;
        }
    });

    // Mobile View Toggle Actions
    btnShowPresentation.addEventListener('click', () => {
        btnShowPresentation.classList.add('active');
        btnShowPrototype.classList.remove('active');
        presentationPanel.classList.remove('hidden-mobile');
        prototypePanel.classList.add('hidden-mobile');
    });

    btnShowPrototype.addEventListener('click', () => {
        btnShowPrototype.classList.add('active');
        btnShowPresentation.classList.remove('active');
        prototypePanel.classList.remove('hidden-mobile');
        presentationPanel.classList.add('hidden-mobile');
    });

    // Generate Slide Dots
    function generateSlideDots() {
        slideDotsContainer.innerHTML = '';
        for (let i = 1; i <= totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slide-dot');
            if (i === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            slideDotsContainer.appendChild(dot);
        }
    }

    // Slide Navigation Functions
    function goToSlide(index) {
        if (index < 1 || index > totalSlides) return;
        
        // Remove active class from old slide and dot
        const currentActiveSlide = document.querySelector('.slide-item.active');
        if (currentActiveSlide) currentActiveSlide.classList.remove('active');
        
        currentSlide = index;
        
        // Add active class to new slide
        const nextActiveSlide = document.getElementById(`slide-${currentSlide}`);
        if (nextActiveSlide) nextActiveSlide.classList.add('active');
        
        // Update Dots
        const dots = document.querySelectorAll('.slide-dot');
        dots.forEach((dot, idx) => {
            if (idx + 1 === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update Footer Info
        currentSlideNum.textContent = currentSlide;
        
        // Button disable state handling
        prevSlideBtn.style.opacity = currentSlide === 1 ? '0.5' : '1';
        prevSlideBtn.style.cursor = currentSlide === 1 ? 'default' : 'pointer';
        nextSlideBtn.style.opacity = currentSlide === totalSlides ? '0.5' : '1';
        nextSlideBtn.style.cursor = currentSlide === totalSlides ? 'default' : 'pointer';
    }

    prevSlideBtn.addEventListener('click', () => {
        if (currentSlide > 1) goToSlide(currentSlide - 1);
    });

    nextSlideBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            if (currentSlide > 1) goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
        }
    });

    // Initialize slide counters and dots
    totalSlidesNum.textContent = totalSlides;
    generateSlideDots();
    
    // Custom trigger for initialization (will be bound once slide elements are injected)
    window.initializeSlides = () => {
        totalSlides = document.querySelectorAll('.slide-item').length;
        totalSlidesNum.textContent = totalSlides;
        generateSlideDots();
        goToSlide(1);
    };
});
