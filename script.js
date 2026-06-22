const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.sidebar nav a')];
const toast = document.querySelector('#toast');
const themeToggle = document.querySelector('#themeToggle');
const revealItems = [...document.querySelectorAll('.reveal')];

function setActiveLink() {
  const position = window.scrollY + 160;
  let current = sections[0]?.id;

  for (const section of sections) {
    if (position >= section.offsetTop) current = section.id;
  }

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1400);
}

document.querySelectorAll('[data-copy]').forEach(item => {
  item.addEventListener('click', async () => {
    const value = item.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast(`${value} copiado!`);
    } catch {
      showToast(value);
    }
  });
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('comandasmart-theme', isLight ? 'light' : 'dark');
});

if (localStorage.getItem('comandasmart-theme') === 'light') {
  document.body.classList.add('light-mode');
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();
