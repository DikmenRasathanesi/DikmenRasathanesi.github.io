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

    
    // --- 3. RESİM RULOSU (CAROUSEL) KODU - DÜZELTİLDİ ---
    const track = document.querySelector('.carousel-track');
    if (!track) return; 

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    
    // GÜVENLİ FONKSİYON: Her zaman doğru genişliği alır
    const getSlideWidth = () => {
        if (slides.length === 0) return 0;
        // slides[0] o an DOM'da varsa genişliğini al
        return slides[0] ? slides[0].getBoundingClientRect().width : 0;
    }

    let currentIndex = 0;
    
    // 'slideWidth' değişkenini globalde hesaplamayı kaldırdık.

    nextButton.addEventListener('click', e => {
        let slideWidth = getSlideWidth(); // Genişliği *tıklama anında* al
        if (slides.length === 0 || slideWidth === 0) return;
        
        if (currentIndex === slides.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
    });

    prevButton.addEventListener('click', e => {
        let slideWidth = getSlideWidth(); // Genişliği *tıklama anında* al
        if (slides.length === 0 || slideWidth === 0) return;

        if (currentIndex === 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex--;
        }
        track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
    });
    
    // Yeniden boyutlandırma dinleyicisi
    window.addEventListener('resize', () => {
        let slideWidth = getSlideWidth(); // Genişliği *yeniden boyutlandırma anında* al
        if (slideWidth === 0) return;
        
        track.style.transition = 'none'; // Kaydırma animasyonunu geçici kapat
        track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
        
        // Geçişi çok kısa bir süre sonra geri ekle
        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    });
});