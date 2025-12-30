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

// Validación de captcha (Matemático + Google reCAPTCHA v3)
async function validateCaptcha(formId) {
    // 1. Validación matemática manual
    const captchaInput1 = document.getElementById('captcha1');
    const captchaInput2 = document.getElementById('captcha2');

    if (formId === 'confirmar') {
        if (parseInt(captchaInput1.value) !== 7) {
            alert('Respuesta de seguridad incorrecta (3 + 4).');
            captchaInput1.focus();
            return false;
        }
    } else if (formId === 'mensaje') {
        if (parseInt(captchaInput2.value) !== 7) {
            alert('Respuesta de seguridad incorrecta (5 + 2).');
            captchaInput2.focus();
            return false;
        }
    }

    // 2. Validación invisible de Google
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

// Interceptar envíos de formulario para manejar validación asíncrona y limitación de un envío
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.confirm-form');

    // Comprobar si ya ha enviado un mensaje anteriormente
    if (localStorage.getItem('form_submitted')) {
        disableForms();
    }

    forms.forEach(form => {
        form.onsubmit = async (e) => {
            e.preventDefault();

            if (localStorage.getItem('form_submitted')) {
                alert('Ya has enviado un mensaje anteriormente.');
                return;
            }

            try {
                const isValid = await validateCaptcha(form.closest('section').id);
                if (isValid) {
                    const formData = new FormData(form);
                    const btn = form.querySelector('button[type="submit"]');
                    const originalText = btn.innerText;

                    btn.innerText = 'Enviando...';
                    btn.disabled = true;

                    // Envío mediante AJAX para no recargar la página
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        // Guardar en LocalStorage que ya ha enviado
                        localStorage.setItem('form_submitted', 'true');

                        // Mostrar éxito y bloquear
                        form.innerHTML = `
                            <div class="success-message" style="text-align: center; padding: 2rem;">
                                <i data-lucide="check-circle" style="color: var(--secondary); width: 48px; height: 48px; margin-bottom: 1rem;"></i>
                                <h3>¡Enviado con éxito!</h3>
                                <p>Gracias por tu apoyo. Tu mensaje ha sido recibido.</p>
                            </div>
                        `;
                        lucide.createIcons();
                        disableForms();
                    } else {
                        throw new Error('Error en el envío');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al enviar. Por favor, inténtalo de nuevo.');
                const btn = form.querySelector('button[type="submit"]');
                if (btn) {
                    btn.innerText = 'Reintentar';
                    btn.disabled = false;
                }
            }
        };
    });
});

function disableForms() {
    const forms = document.querySelectorAll('.confirm-form');
    forms.forEach(form => {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
            btn.disabled = true;
            btn.innerText = 'Mensaje ya enviado';
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        }
        // Opcionalmente deshabilitar inputs
        form.querySelectorAll('input, textarea').forEach(el => el.disabled = true);
    });
}
