document.addEventListener('DOMContentLoaded', () => {
    // Копирование номера телефона в буфер обмена по клику
    const copyButtons = document.querySelectorAll('.copy-phone-btn');
    const toast = document.getElementById('copyToast');
    const phoneNumber = '+79933513004';

    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Если это не кнопка-ссылка tel:, либо для удобства пользователя: копируем номер в буфер
            navigator.clipboard.writeText(phoneNumber).then(() => {
                if (toast) {
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 2500);
                }
            }).catch(err => {
                console.error('Ошибка при копировании текста: ', err);
            });
        });
    });

    // Плавный скролл для якорных ссылок меню
    const navLinks = document.querySelectorAll('.nav a, .hero__cta a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
