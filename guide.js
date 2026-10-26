const dialog = document.querySelector('#image-dialog');
const enlarged = document.querySelector('#large-image');
const caption = document.querySelector('#image-caption');
if (dialog && typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-enlarge]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const image = link.querySelector('img');
      enlarged.src = image.src;
      enlarged.alt = image.alt;
      caption.textContent = image.alt;
      dialog.showModal();
      document.body.classList.add('modal-open');
    });
  });
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
}
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.contents nav a')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of links) {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'step');
        else link.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('section.step').forEach(section => observer.observe(section));
}
