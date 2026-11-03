document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Копирование номера телефона в буфер обмена по клику
    const copyButtons = document.querySelectorAll('.copy-phone-btn');
    const toast = document.getElementById('copyToast');
    const phoneNumber = '+79933513004';

    const showToast = () => {
        if (!toast) return;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    };

    const fallbackCopy = () => {
        const area = document.createElement('textarea');
        area.value = phoneNumber;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        try {
            document.execCommand('copy');
            showToast();
        } catch (err) {
            console.error('Ошибка при копировании текста: ', err);
        }
        document.body.removeChild(area);
    };

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(phoneNumber).then(showToast).catch(fallbackCopy);
            } else {
                fallbackCopy();
            }
        });
    });

    // Мобильное меню
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');

    const setMenu = (open) => {
        if (!nav || !navToggle) return;
        nav.classList.toggle('is-open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    };

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setMenu(false);
    });

    // Плавный скролл для якорных ссылок меню
    const navLinks = document.querySelectorAll('.nav a, .hero__cta a, .logo');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: reduceMotion ? 'auto' : 'smooth'
                    });
                }
                setMenu(false);
            }
        });
    });

    // Тень у шапки при прокрутке
    const header = document.getElementById('header');
    const onScroll = () => {
        if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Просмотр фото портфолио
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCap = document.getElementById('lightboxCap');
    const lightboxClose = document.getElementById('lightboxClose');

    if (lightbox && typeof lightbox.showModal === 'function') {
        document.querySelectorAll('.project-img').forEach(btn => {
            btn.addEventListener('click', () => {
                const title = btn.dataset.title || '';
                lightboxImg.src = btn.dataset.full;
                lightboxImg.alt = title;
                lightboxCap.textContent = title;
                lightbox.showModal();
            });
        });

        lightboxClose.addEventListener('click', () => lightbox.close());

        // Закрытие по клику на затемнённый фон
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.close();
        });
    }
});
