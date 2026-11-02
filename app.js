document.addEventListener('DOMContentLoaded', () => {
  const phoneNumber = '+79933513004';
  const toast = document.getElementById('copyToast');

  function showToast() {
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  const copyButtons = document.querySelectorAll('.copy-phone-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      navigator.clipboard.writeText(phoneNumber).then(() => {
        showToast();
      }).catch(err => {
        console.error('Ошибка копирования: ', err);
      });

      setTimeout(() => {
        window.location.href = `tel:${phoneNumber}`;
      }, 400);
    });
  });
});

// Функции для модального окна документов
function openDocModal(imageSrc, title) {
  const modal = document.getElementById('docModal');
  const modalImg = document.getElementById('modalImage');
  
  if (modalImg) modalImg.src = imageSrc;
  if (modal) modal.classList.add('active');
}

function closeDocModalDirect() {
  const modal = document.getElementById('docModal');
  if (modal) modal.classList.remove('active');
}

function closeDocModal(event) {
  if (event.target.id === 'docModal') {
    closeDocModalDirect();
  }
}