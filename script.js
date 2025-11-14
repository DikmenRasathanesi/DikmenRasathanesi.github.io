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


    // --- YENİ EKLENDİ: MOBİL MENÜ TOGGLE KODU ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // Menüye 'active' class'ı ekle/çıkar

            // Buton ikonunu değiştir (Bonus)
            if (navLinks.classList.contains('active')) {
                menuToggle.innerHTML = '✕'; // Kapatma ikonu
            } else {
                menuToggle.innerHTML = '☰'; // Hamburger ikonu
            }
        });

        // Bir linke tıklandığında mobil menüyü otomatik kapat
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                }
            });
        });

        // Tema butonuna basınca da menü kapansın
        // Not: ID ile seçmek daha garantidir
        const themeToggleInMenu = document.getElementById('theme-toggle');
        if(themeToggleInMenu) {
            themeToggleInMenu.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        menuToggle.innerHTML = '☰';
                    }
            });
        }
    }


    // --- 2. KARANLIK MOD BUTONU KODU ---
    const themeToggle = document.getElementById('theme-toggle');
    // Yukarıda zaten seçmiştik ama kodun bu kısmının bağımsız çalışması için
    // tekrar seçmekte (veya globalde tanımlamakta) bir sakınca yok.

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = "☀️";
        }
    }

    themeToggle.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');

        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = "🌙";
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = "☀️";
        }
    });


    // --- 3. RESİM RULOSU (CAROUSEL) KODU - CSS SCROLL SNAP İÇİN YENİLENDİ ---
    const wrapper = document.querySelector('.carousel-wrapper');
    if (!wrapper) return;

    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');

    // Buton tıklama olayları
    nextButton.addEventListener('click', () => {
        const slideWidth = wrapper.clientWidth; // Kapsayıcının genişliği kadar kaydır
        wrapper.scrollBy({ left: slideWidth, behavior: 'smooth' });
    });

    prevButton.addEventListener('click', () => {
        const slideWidth = wrapper.clientWidth;
        wrapper.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    });
});
