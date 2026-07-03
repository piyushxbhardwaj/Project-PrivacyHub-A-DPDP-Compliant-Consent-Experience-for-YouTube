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
    
    // Segment Switcher Interactive Data Logic
    const dashSelectBtns = document.querySelectorAll('.dash-select-btn');
    const kpiConsentRate = document.getElementById('kpi-consent-rate');
    const kpiSignupConv = document.getElementById('kpi-signup-conv');
    const kpiSignupDiff = document.getElementById('kpi-signup-diff');
    const chartValDisplay = document.getElementById('chart-val-display');
    const chartLinePath = document.getElementById('chart-line-path');

    let activePlatform = 'Android';
    let activeUser = 'all';
    let activeGeo = 'IN';

    // Mock segment dataset
    const mockData = {
        'Android-all-IN': { consent: '97.8%', signup: '98.4%', diff: '-1.6% vs legacy', chartVal: '97.8% Final', path: 'M 10 90 L 130 70 L 260 45 L 390 20' },
        'Android-new-IN': { consent: '98.2%', signup: '96.8%', diff: '-3.2% vs legacy', chartVal: '98.2% Final', path: 'M 10 92 L 130 72 L 260 48 L 390 18' },
        'Android-all-tier1': { consent: '98.5%', signup: '98.7%', diff: '-1.3% vs legacy', chartVal: '98.5% Final', path: 'M 10 88 L 130 65 L 260 38 L 390 15' },
        'Android-new-tier1': { consent: '98.9%', signup: '97.5%', diff: '-2.5% vs legacy', chartVal: '98.9% Final', path: 'M 10 90 L 130 68 L 260 40 L 390 11' },
        'Android-all-tier2': { consent: '97.1%', signup: '98.1%', diff: '-1.9% vs legacy', chartVal: '97.1% Final', path: 'M 10 92 L 130 75 L 260 52 L 390 29' },
        'Android-new-tier2': { consent: '97.5%', signup: '96.1%', diff: '-3.9% vs legacy', chartVal: '97.5% Final', path: 'M 10 95 L 130 78 L 260 55 L 390 25' },
        
        'iOS-all-IN': { consent: '96.5%', signup: '97.2%', diff: '-2.8% vs legacy', chartVal: '96.5% Final', path: 'M 10 95 L 130 80 L 260 55 L 390 35' },
        'iOS-new-IN': { consent: '96.0%', signup: '95.8%', diff: '-4.2% vs legacy', chartVal: '96.0% Final', path: 'M 10 97 L 130 85 L 260 62 L 390 40' },
        'iOS-all-tier1': { consent: '97.5%', signup: '98.0%', diff: '-2.0% vs legacy', chartVal: '97.5% Final', path: 'M 10 92 L 130 72 L 260 48 L 390 25' },
        'iOS-new-tier1': { consent: '97.0%', signup: '96.8%', diff: '-3.2% vs legacy', chartVal: '97.0% Final', path: 'M 10 94 L 130 76 L 260 52 L 390 30' },
        'iOS-all-tier2': { consent: '95.5%', signup: '96.4%', diff: '-3.6% vs legacy', chartVal: '95.5% Final', path: 'M 10 98 L 130 88 L 260 70 L 390 45' },
        'iOS-new-tier2': { consent: '95.0%', signup: '94.8%', diff: '-5.2% vs legacy', chartVal: '95.0% Final', path: 'M 10 100 L 130 92 L 260 75 L 390 50' }
    };

    function updateDashboardData() {
        const key = `${activePlatform}-${activeUser}-${activeGeo}`;
        const data = mockData[key] || mockData['Android-all-IN'];
        
        kpiConsentRate.textContent = data.consent;
        kpiSignupConv.textContent = data.signup;
        kpiSignupDiff.textContent = data.diff;
        chartValDisplay.textContent = data.chartVal;
        chartLinePath.setAttribute('d', data.path);
    }

    dashSelectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const parent = e.target.parentElement;
            
            // Toggle active class inside parent select group
            parent.querySelectorAll('.dash-select-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Update active variables
            if (parent.id === 'group-platform') activePlatform = e.target.dataset.value;
            if (parent.id === 'group-user') activeUser = e.target.dataset.value;
            if (parent.id === 'group-geo') activeGeo = e.target.dataset.value;
            
            updateDashboardData();
        });
    });

    // ==========================================================================
    // Mobile App Prototype Navigation Logic
    // ==========================================================================
    const screens = {
        1: document.getElementById('screen-1'),
        2: document.getElementById('screen-2'),
        3: document.getElementById('screen-3'),
        4: document.getElementById('screen-4'),
        5: document.getElementById('screen-5'),
        6: document.getElementById('screen-6')
    };

    function goToPhoneScreen(screenId) {
        // Hide all screens
        Object.values(screens).forEach(scr => {
            if (scr) {
                scr.classList.remove('active');
            }
        });
        
        // Show selected screen
        const targetScreen = screens[screenId];
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }

    // Screen 1 Event (Welcome -> Data Usage Details)
    document.getElementById('btn-welcome-next').addEventListener('click', () => {
        goToPhoneScreen(2);
    });

    // Screen 2 Events (Data Usage Back -> Screen 1; Next -> Settings)
    document.getElementById('btn-screen-2-back').addEventListener('click', () => {
        goToPhoneScreen(1);
    });
    document.getElementById('btn-screen-2-next').addEventListener('click', () => {
        goToPhoneScreen(3);
    });

    // Screen 3 Events (Granular Settings Back -> Screen 2; All Defaults / Custom Confirm -> Screen 4)
    document.getElementById('btn-screen-3-back').addEventListener('click', () => {
        goToPhoneScreen(2);
    });

    const chkWatch = document.getElementById('toggle-watch-history');
    const chkAds = document.getElementById('toggle-ad-history');
    const chkLoc = document.getElementById('toggle-location-history');
    const chkNotif = document.getElementById('toggle-notification-history');

    const dashChkWatch = document.getElementById('dash-toggle-watch');
    const dashChkAds = document.getElementById('dash-toggle-ads');

    function syncConsentToSuccessAndDashboard() {
        const watchVal = chkWatch.checked;
        const adsVal = chkAds.checked;
        const locVal = chkLoc.checked;

        // Update Success Summary Card (Screen 4)
        const sWatch = document.getElementById('summary-watch');
        const sAds = document.getElementById('summary-ads');
        const sLoc = document.getElementById('summary-location');

        sWatch.innerHTML = `✔ Personalization: <span style="font-weight: 700; color: ${watchVal ? 'var(--color-success)' : 'var(--color-danger)'};">${watchVal ? 'ON' : 'OFF'}</span>`;
        sAds.innerHTML = `✔ Targeted Ads: <span style="font-weight: 700; color: ${adsVal ? 'var(--color-success)' : 'var(--color-danger)'};">${adsVal ? 'ON' : 'OFF'}</span>`;
        sLoc.innerHTML = `✔ Location Curation: <span style="font-weight: 700; color: ${locVal ? 'var(--color-success)' : 'var(--color-danger)'};">${locVal ? 'ON' : 'OFF'}</span>`;

        // Sync Dashboard toggles (Screen 5)
        dashChkWatch.checked = watchVal;
        dashChkAds.checked = adsVal;
    }

    document.getElementById('btn-screen-3-confirm').addEventListener('click', () => {
        syncConsentToSuccessAndDashboard();
        goToPhoneScreen(4);
    });

    document.getElementById('btn-screen-3-all').addEventListener('click', () => {
        chkWatch.checked = true;
        chkAds.checked = true;
        chkLoc.checked = true;
        chkNotif.checked = true;
        syncConsentToSuccessAndDashboard();
        goToPhoneScreen(4);
    });

    // Screen 4 Event (Success -> PrivacyHub Dashboard)
    document.getElementById('btn-screen-4-next').addEventListener('click', () => {
        goToPhoneScreen(5);
    });

    // Screen 5 Events (Dashboard Back -> Screen 4; Buttons -> Download/Delete)
    document.getElementById('btn-screen-5-back').addEventListener('click', () => {
        goToPhoneScreen(4);
    });

    // Toast Alert Trigger
    const phoneToast = document.getElementById('phone-toast');
    const toastText = document.getElementById('toast-text');

    function showPhoneToast(message, isSuccess = true) {
        toastText.innerHTML = message;
        phoneToast.classList.add('show');
        setTimeout(() => {
            phoneToast.classList.remove('show');
        }, 3000);
    }

    // Download Data Click
    document.getElementById('btn-dash-download').addEventListener('click', () => {
        showPhoneToast("✔ Data copy link sent to your email!");
    });

    // Delete Personal Data Click
    document.getElementById('btn-dash-delete').addEventListener('click', () => {
        goToPhoneScreen(6);
    });

    // Sync Dashboard changes back to main variables
    dashChkWatch.addEventListener('change', () => {
        chkWatch.checked = dashChkWatch.checked;
        syncConsentToSuccessAndDashboard();
        showPhoneToast(`Watch personalization toggled ${dashChkWatch.checked ? 'ON' : 'OFF'}`);
    });
    dashChkAds.addEventListener('change', () => {
        chkAds.checked = dashChkAds.checked;
        syncConsentToSuccessAndDashboard();
        showPhoneToast(`Targeted advertising toggled ${dashChkAds.checked ? 'ON' : 'OFF'}`);
    });

    // Screen 6 Events (Delete Confirm/Cancel)
    document.getElementById('btn-screen-6-back').addEventListener('click', () => {
        goToPhoneScreen(5);
    });
    document.getElementById('btn-screen-6-cancel').addEventListener('click', () => {
        goToPhoneScreen(5);
    });

    document.getElementById('btn-screen-6-confirm').addEventListener('click', () => {
        // Wiping all history actions
        chkWatch.checked = false;
        chkAds.checked = false;
        chkLoc.checked = false;
        chkNotif.checked = false;
        syncConsentToSuccessAndDashboard();
        
        goToPhoneScreen(5);
        showPhoneToast("⚠ Wiped all profiling logs from servers!", false);
        
        // Return to splash after a brief pause
        setTimeout(() => {
            goToPhoneScreen(1);
        }, 2200);
    });

    // Custom trigger for initialization (will be bound once slide elements are injected)
    window.initializeSlides = () => {
        totalSlides = document.querySelectorAll('.slide-item').length;
        totalSlidesNum.textContent = totalSlides;
        generateSlideDots();
        goToSlide(1);
    };
});
