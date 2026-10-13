const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

  stars = Array.from({ length: Math.min(150, Math.floor(innerWidth / 7)) }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.5 + 0.25,
    a: Math.random() * 0.7 + 0.2,
    s: Math.random() * 0.22 + 0.04,
  }));
}

function draw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (const star of stars) {
    ctx.beginPath();
    ctx.globalAlpha = star.a;
    ctx.fillStyle = '#c9f7ff';
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();

    star.y += star.s;
    if (star.y > innerHeight) {
      star.y = 0;
      star.x = Math.random() * innerWidth;
    }
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

addEventListener('resize', resize);
resize();
draw();

const glow = document.getElementById('glow');
addEventListener('pointermove', (event) => {
  glow.style.left = event.clientX + 'px';
  glow.style.top = event.clientY + 'px';
});

const themeBtn = document.getElementById('themeBtn');
const themeLabel = document.getElementById('themeLabel');

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeLabel.textContent = isLight ? 'Mode gelap' : 'Mode terang';
  showToast(isLight ? 'Mode terang aktif ☀️' : 'Mode galaksi aktif 🌌');
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.bar span').forEach((bar) => {
          bar.style.width = bar.dataset.width;
        });
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

document.querySelectorAll('.project').forEach((card) => {
  const open = () => {
    showToast(card.dataset.title + ': ' + card.dataset.detail);
  };

  card.addEventListener('click', open);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  });
});

const userEmail = 'sakkarepwes23@gmail.com';
const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + userEmail;

const emailButton = document.querySelector('#copyEmail');
if (emailButton) {
  emailButton.remove();
}

const contactActions = document.querySelector('.contact-actions');
if (contactActions) {
  const emailLink = document.createElement('a');
  emailLink.href = gmailUrl;
  emailLink.className = 'btn primary';
  emailLink.target = '_blank';
  emailLink.rel = 'noopener noreferrer';
  emailLink.textContent = '✉ Kirim email';
  contactActions.insertBefore(emailLink, contactActions.lastElementChild);
}

document.getElementById('year').textContent = new Date().getFullYear();
