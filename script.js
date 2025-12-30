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

// Validación de captcha (Google reCAPTCHA v3)
async function validateCaptcha(formId) {
    return new Promise((resolve) => {
        grecaptcha.ready(function () {
            grecaptcha.execute('6LcasTssAAAAANA_M6d1L7kJmY4_Dt5QU6ZKnie4', { action: 'submit' }).then(function (token) {
                // Añadir el token al formulario antes de enviar
                const form = document.querySelector(`#${formId} .confirm-form`) || document.getElementById(formId).querySelector('form');
                let input = form.querySelector('input[name="g-recaptcha-response"]');
                if (!input) {
                    input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = 'g-recaptcha-response';
                    form.appendChild(input);
                }
                input.value = token;
                resolve(true);
            });
        });
    });
}

// Interceptar envíos de formulario para manejar validación asíncrona
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.confirm-form');
    forms.forEach(form => {
        form.onsubmit = async (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            // Feedback visual
            btn.innerText = 'Verificando...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            try {
                const isValid = await validateCaptcha(form.closest('section').id);
                if (isValid) {
                    form.submit();
                } else {
                    btn.innerText = originalText;
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }
            } catch (error) {
                console.error('Error en reCAPTCHA:', error);
                btn.innerText = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
                alert('Hubo un error con la verificación de seguridad. Por favor, recarga la página.');
            }
        };
    });
});
