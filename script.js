function copyWallet() {
    const address = document.getElementById('wallet-address').textContent;
    navigator.clipboard.writeText(address).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalIcon = btn.innerHTML;

        // Cambiar icono temporalmente
        btn.innerHTML = '<i data-lucide="check" style="color: #14F195"></i>';
        lucide.createIcons();

        setTimeout(() => {
            btn.innerHTML = originalIcon;
            lucide.createIcons();
        }, 2000);

        // Opcional: Notificación visual
        console.log('Copiado: ' + address);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Revelar elementos al hacer scroll (opcional)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.guide-step').forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'all 0.6s ease-out';
        observer.observe(step);
    });
});

// Validación de captcha simple
function validateCaptcha(id) {
    const input = document.getElementById(id);
    const value = parseInt(input.value);

    // Captcha 1: 3 + 4 = 7
    if (id === 'captcha1' && value !== 7) {
        alert('Respuesta de seguridad incorrecta (3 + 4). Por favor, inténtalo de nuevo.');
        input.focus();
        return false;
    }

    // Captcha 2: 5 + 2 = 7
    if (id === 'captcha2' && value !== 7) {
        alert('Respuesta de seguridad incorrecta (5 + 2). Por favor, inténtalo de nuevo.');
        input.focus();
        return false;
    }

    return true;
}
