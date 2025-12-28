/* ==========================================
   SITRASEDH - JavaScript Principal
   ========================================== */

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Manejar imágenes que no cargan (placeholder)
    // ==========================================
    document.querySelectorAll('.card-photo img').forEach(img => {
        img.addEventListener('error', function() {
            // Ocultar la imagen rota
            this.style.display = 'none';
            
            // Crear el placeholder si no existe
            if (!this.parentElement.querySelector('.photo-placeholder')) {
                const placeholder = document.createElement('div');
                placeholder.className = 'photo-placeholder';
                placeholder.innerHTML = '<i class="fas fa-user"></i>';
                this.parentElement.insertBefore(placeholder, this);
            }
        });
        
        // Verificar si la imagen ya falló (para imágenes cacheadas)
        if (img.complete && img.naturalHeight === 0) {
            img.dispatchEvent(new Event('error'));
        }
    });
    
    // ==========================================
    // Menú Hamburguesa
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // Smooth Scroll para enlaces internos
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // Botón Scroll to Top
    // ==========================================
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // Animaciones al hacer scroll (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animación escalonada para cards
                const cards = entry.target.querySelectorAll('.card, .estatuto-item, .evento-card, .contacto-item');
                cards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.15}s`;
                    card.classList.add('fade-up');
                });

                // Animación para filas de tabla
                const rows = entry.target.querySelectorAll('.miembros-table tbody tr');
                rows.forEach((row, index) => {
                    row.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
                    row.style.opacity = '0';
                });
            }
        });
    }, observerOptions);

    // Observar secciones
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // ==========================================
    // Efecto Parallax en Hero
    // ==========================================
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
            }
        });
    }

    // ==========================================
    // Navbar cambia de estilo al hacer scroll
    // ==========================================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                navbar.style.padding = '0.5rem 2rem';
                navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.4)';
            } else {
                navbar.style.padding = '1rem 2rem';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
            }
        });
    }

});
