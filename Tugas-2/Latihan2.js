const btnTema = document.querySelector('#btnToggleTema');
const bodyHalaman = document.querySelector('body');

btnTema.addEventListener('click', function () {
    bodyHalaman.classList.toggle('light-mode');
    const modeTerang = bodyHalaman.classList.contains('light-mode');
    btnTema.textContent = modeTerang ? '🌙 Mode Gelap' : '☀️ Mode Terang';
    btnTema.setAttribute('aria-pressed', String(modeTerang));
});

const btnBukaModal = document.querySelector('#btnKontak');
const elemenModal = document.querySelector('#modalKontak');
const btnTutupModal = document.querySelector('#btnTutupModal');

function tutupModal() {
    elemenModal.classList.remove('show');
}

btnBukaModal.addEventListener('click', function (event) {
    event.preventDefault();
    elemenModal.classList.add('show');
    btnTutupModal.focus();
});

btnTutupModal.addEventListener('click', tutupModal);

elemenModal.addEventListener('click', function (event) {
    if (event.target === elemenModal) tutupModal();
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && elemenModal.classList.contains('show')) {
        tutupModal();
        btnBukaModal.focus();
    }
});
