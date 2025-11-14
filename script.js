// Kod, sayfa yüklendiğinde çalışmaya başlar
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ABARTILI ANİMASYON KODU ---
    const sections = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Elemanın %10'u göründüğü an animasyonu başlat
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- 2. KARANLIK MOD BUTONU KODU - DÜZELTİLDİ ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = "☀️";
        }
    }
    
    themeToggle.addEventListener('click', () => {
        // HATA DÜZELTİLDİ: 'data-theme' olmalı
        let currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = "🌙";
        } else {
            // 'light' veya null (tanımsız) ise
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = "☀️";
        }
    });

    // --- 3. RESİM RULOSU (CAROUSEL) KODU ---
    const track = document.querySelector('.carousel-track');
    if (!track) return; 

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    
    const getSlideWidth = () => {
        if (slides.length === 0) return 0;
        return slides[0].getBoundingClientRect().width;
    }

    let slideWidth = getSlideWidth();
    let currentIndex = 0;

    nextButton.addEventListener('click', e => {
        if (slides.length === 0) return;
        if (currentIndex === slides.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
    });

    prevButton.addEventListener('click', e => {
        if (slides.length === 0) return;
        if (currentIndex === 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex--;
        }
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
    });
    
    window.addEventListener('resize', () => {
        slideWidth = getSlideWidth();
        if (slideWidth === 0) return;
        track.style.transition = 'none';
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    });
});