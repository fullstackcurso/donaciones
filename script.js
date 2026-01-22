/**
 * Donation Page Application Logic
 * Encapsulated to prevent global scope pollution
 */
const App = (() => {
    'use strict';

    // Helper function to check if 24 hours have passed
    const canSubmitToday = () => {
        const lastSubmit = localStorage.getItem('form_last_submit');
        if (!lastSubmit) return true;
        const lastDate = new Date(lastSubmit);
        const now = new Date();
        const diffHours = (now - lastDate) / (1000 * 60 * 60);
        return diffHours >= 24;
    };

    // State
    const state = {
        lang: 'es',
        submitted: !canSubmitToday()
    };

    // Configuration & Translations
    const config = {
        recaptchaKey: '6LcasTssAAAAANA_M6d1L7kJmY4_Dt5QU6ZKnie4',
        formEndpoint: 'https://formspree.io/f/mregwjzw',
        translations: {
            es: {
                page_title: "Donaciones | Apoya estos Proyectos",
                nav_home: "Inicio",
                nav_guide: "Guía Solana",
                nav_destiny: "Destino",
                nav_projects: "Proyectos",
                hero_title: "Estos proyectos son posibles <br><span>gracias al apoyo de la comunidad.</span>",
                hero_desc: "Si algún proyecto te ha resultado útil, puedes invitarme a un café ☕<br>Es una forma de ayudar que me permite dedicar más horas a mis aficiones, además de cubrir costes y seguir manteniendo y mejorando estas herramientas.",
                solana_info: "<strong>No soy inversor ni me dedico a las criptomonedas.</strong> Simplemente uso Solana por eficiencia: las pasarelas tradicionales cobran comisiones que hacen inviables las donaciones pequeñas (micro-pagos). Aquí, casi el 100% de tu ayuda llega al proyecto.",
                network_badge: "Red Solana (SOL, USDC, etc.)",
                copy_tooltip: "Copiar dirección",
                donation_note: "Parte de las donaciones se destinará a proyectos de código abierto impulsados por la comunidad y sin ánimo de lucro, como Kodi. Sin ellos, muchos de estos proyectos no serían posibles. Se publicarán pruebas de ello.",
                btn_how_to: "¿Cómo donar con Solana?",
                btn_confirm: "Confirmar Donación",
                guide_title: "Guía para Donar en Solana",
                step1_title: "Crea tu Wallet",
                step1_desc: "Descarga <strong>Phantom</strong> o <strong>Jupiter Wallet</strong> como extensión de navegador o app móvil.",
                step2_title: "Configura tu cuenta",
                step2_desc: "Sigue los pasos para crear una nueva wallet. <strong>Guarda tu Frase Semilla</strong> en un lugar seguro y físico. ¡Nunca la compartas!",
                step3_title: "Añade fondos (SOL)",
                step3_desc: "Compra SOL en un exchange (Binance, Coinbase, Kraken) o directamente desde la wallet y envíalos a tu dirección.",
                step4_title: "Envía la donación",
                step4_desc: "Copia mi dirección de arriba, pégala en el botón \"Send\" de tu wallet, elige el monto y confirma. ¡Listo!",
                form_title: "¿Has realizado una donación?",
                form_desc: "Las transacciones en la red Solana son seudónimas. Si quieres que sepa quién eres para agradecerte el apoyo, por favor rellena este formulario o añade tu nombre en el campo <strong>\"Memo\"</strong> de tu wallet al enviar.",
                label_name: "Nombre o Alias",
                place_name: "Tu nombre o @usuario",
                label_email: "Tu Email (opcional)",
                place_email: "email@ejemplo.com",
                label_txid: "ID de Transacción (opcional)",
                place_txid: "Firma de la transacción (Signature)",
                label_message: "Mensaje (Opcional)",
                place_message: "Puedes decir, por ejemplo, a qué prefieres que se destine tu aportación.",
                label_check_correct: "Confirmo que los datos son correctos",
                label_captcha1: "Seguridad: ¿Cuánto es 3 + 4?",
                place_captcha: "Resuelve la suma",
                btn_send_confirm: "Enviar Confirmación",
                msg_form_title: "¿No has donado pero quieres dejar un mensaje?",
                msg_form_desc: "Tu opinión y tus palabras también son una forma de apoyo. ¡Me encantará leerte!",
                place_message_only: "Tu mensaje aquí...",
                label_check_msg: "Confirmo que quiero enviar este mensaje",
                label_captcha2: "Seguridad: ¿Cuánto es 5 + 2?",
                btn_send_msg: "Enviar Mensaje",
                footer: "&copy; 2025 fullstackcurso | RubenSDFA1labernt.",
                alert_copied: "Dirección copiada",
                alert_sent_already: "Ya has enviado un mensaje.",
                btn_sending: "Enviando...",
                success_title: "¡Enviado con éxito!",
                success_msg: "Gracias por tu apoyo.",
                btn_destiny: "Ver destino",
                destiny_page_title: "Destino de los Fondos | Donaciones",
                destiny_title: "Destino de los <span>Fondos</span>",
                destiny_subtitle: "Cada aporte cuenta, y aquí puedes ver cómo se usa.",
                dest_opensource_title: "Proyectos Open Source",
                dest_opensource_desc: "Parte de las donaciones se destinará a proyectos de código abierto impulsados por la comunidad y sin ánimo de lucro, como Kodi. Sin ellos, muchos de estos proyectos no serían posibles. Se publicarán pruebas de ello.",
                dest_opensource_extra: "Además de donaciones directas, también se destinará parte a comprar merchandising oficial de estos proyectos (camisetas, tazas, etc.). De esta forma, apoyo su trabajo mientras cubro necesidades básicas como ropa. Dos pájaros de un tiro.",
                btn_more_details: "Más detalles",
                dest_opensource_badge: "Open Source",
                dest_infra_title: "Infraestructura y Costes",
                dest_infra_desc: "Dominios, hosting, servicios cloud y otras cosas necesarias para mantener los proyectos activos y accesibles.",
                dest_infra_badge: "Infraestructura",
                dest_time_title: "Tiempo y Dedicación",
                dest_time_desc: "Tu café me permite dedicar más horas a desarrollar, mantener y mejorar estas herramientas gratuitas para toda la comunidad. Y con suerte, tener que dedicar menos tiempo a ganar dinero para vivir y más a estos hobbies.",
                dest_time_badge: "Tiempo",
                manifesto_title: "Antes de nada, quiero ser claro",
                manifesto_p1: "Trabajo como autónomo desarrollando aplicaciones y páginas web para empresas. Ese es mi sustento. Estos proyectos personales son mi hobby, no mi negocio.",
                manifesto_p2: "Durante años he creado herramientas gratuitas, sin publicidad ni ningún tipo de monetización. No pretendo vivir de esto ni hacerme rico con donaciones. En la mayoría de proyectos, las donaciones se pueden contar con los dedos de las manos; en el mejor de los casos, han cubierto los costes de hosting y dominio.",
                destiny_use_title: "¿En qué se usarán las donaciones?",
                future_title: "Planes futuros",
                future_p1: "Se planea crear un foro para dudas y compartir archivos que requerirá una base de datos muy grande y mejor infraestructura.",
                future_p2: "Si en algún momento hay más colaboradores en el proyecto, los fondos se repartirán de forma justa entre todos.",
                proof_title: "Capturas y Fotografías",
                proof_desc: "Próximamente se publicarán aquí los comprobantes de las donaciones realizadas a proyectos open source.",
                proof_coming: "Próximamente...",
                thanks_title: "Agradecimientos",
                thanks_desc: "A todas las personas que han apoyado estos proyectos de alguna forma.",
                thanks_coming: "Próximamente...",
                btn_back_donate: "Volver y Donar"
            },
            en: {
                page_title: "Donations | Support these Projects",
                nav_home: "Home",
                nav_guide: "Solana Guide",
                nav_destiny: "Destiny",
                nav_projects: "Projects",
                hero_title: "These projects are made possible <br><span>thanks to community support.</span>",
                hero_desc: "If any project has been useful to you, you can buy me a coffee ☕<br>Your support helps me dedicate more time to these hobbies, cover costs, and keep maintaining and improving these tools for everyone.",
                solana_info: "<strong>I am not an investor or crypto trader.</strong> I simply use Solana for efficiency: traditional gateways charge fees that make small donations (micro-payments) unviable. Here, almost 100% of your support reaches the project.",
                network_badge: "Solana Network (SOL, USDC, etc.)",
                copy_tooltip: "Copy address",
                donation_note: "Part of the donations will go to community-driven, non-profit open source projects like Kodi. Without them, many of these projects would not be possible. Proof of this will be published.",
                btn_how_to: "How to donate?",
                btn_confirm: "Confirm Donation",
                guide_title: "Solana Donation Guide",
                step1_title: "Create your Wallet",
                step1_desc: "Download <strong>Phantom</strong> or <strong>Jupiter Wallet</strong> as a browser extension or mobile app.",
                step2_title: "Set up your account",
                step2_desc: "Follow the steps to create a new wallet. <strong>Save your Seed Phrase</strong> in a safe, physical place. Never share it!",
                step3_title: "Add funds (SOL)",
                step3_desc: "Buy SOL on an exchange (Binance, Coinbase, Kraken) or directly from the wallet and send it to your address.",
                step4_title: "Send the donation",
                step4_desc: "Copy my address above, paste it in the \"Send\" button of your wallet, choose the amount and confirm. Done!",
                form_title: "Have you made a donation?",
                form_desc: "Transactions on the Solana network are pseudonymous. If you want me to know who you are to thank you, please fill out this form or add your name in the <strong>\"Memo\"</strong> field of your wallet when sending.",
                label_name: "Name or Alias",
                place_name: "Your name or @username",
                label_email: "Your Email (optional)",
                place_email: "email@example.com",
                label_txid: "Transaction ID (optional)",
                place_txid: "Transaction Signature",
                label_message: "Message (Optional)",
                place_message: "You can say, for example, which project you prefer your contribution to support.",
                label_check_correct: "I confirm the data is correct",
                label_captcha1: "Security: 3 + 4?",
                place_captcha: "Solve the sum",
                btn_send_confirm: "Send Confirmation",
                msg_form_title: "Haven't donated but want to leave a message?",
                msg_form_desc: "Your opinion and words are also a form of support. I'd love to hear from you!",
                place_message_only: "Your message here...",
                label_check_msg: "I confirm I want to send this message",
                label_captcha2: "Security: 5 + 2?",
                btn_send_msg: "Send Message",
                footer: "&copy; 2025 fullstackcurso | RubenSDFA1labernt.",
                alert_copied: "Address copied",
                alert_sent_already: "You already sent a message.",
                btn_sending: "Sending...",
                success_title: "Sent Successfully!",
                success_msg: "Thank you for your support.",
                btn_destiny: "See where it goes",
                destiny_page_title: "Where Funds Go | Donations",
                destiny_title: "Where Your <span>Funds Go</span>",
                destiny_subtitle: "Every contribution counts, and here you can see how it's used.",
                dest_opensource_title: "Open Source Projects",
                dest_opensource_desc: "Part of the donations will go to community-driven, non-profit open source projects like Kodi. Without them, many of these projects wouldn't be possible. Proof of this will be published.",
                dest_opensource_extra: "In addition to direct donations, part will also go towards purchasing official merchandise from these projects (t-shirts, mugs, etc.). This way, I support their work while covering basic needs like clothing. Two birds with one stone.",
                btn_more_details: "More details",
                dest_opensource_badge: "Open Source",
                dest_infra_title: "Infrastructure & Costs",
                dest_infra_desc: "Domains, hosting, cloud services and other things needed to keep projects active and accessible.",
                dest_infra_badge: "Infrastructure",
                dest_time_title: "Time & Dedication",
                dest_time_desc: "Your coffee allows me to dedicate more hours to developing, maintaining and improving these free tools for the entire community. And hopefully, spend less time earning a living and more on these hobbies.",
                dest_time_badge: "Time",
                manifesto_title: "First of all, let me be clear",
                manifesto_p1: "I work as a freelancer developing applications and websites for companies. That's my livelihood. These personal projects are my hobby, not my business.",
                manifesto_p2: "For years I've created free tools, without ads or any kind of monetization. I don't intend to make a living from this or get rich from donations. In most projects, donations can be counted on the fingers of both hands; at best, they've covered hosting and domain costs.",
                destiny_use_title: "How will donations be used?",
                future_title: "Future plans",
                future_p1: "We plan to create a forum for questions and file sharing that will require a very large database and better infrastructure.",
                future_p2: "If at some point there are more collaborators on the project, the funds will be distributed fairly among everyone.",
                proof_title: "Screenshots & Photos",
                proof_desc: "Receipts of donations made to open source projects will be published here soon.",
                proof_coming: "Coming soon...",
                thanks_title: "Acknowledgments",
                thanks_desc: "To all the people who have supported these projects in some way.",
                thanks_coming: "Coming soon...",
                btn_back_donate: "Back to Donate"
            }
        }
    };

    // --- Private Methods ---

    const getTranslation = (key) => {
        return config.translations[state.lang][key] || key;
    };

    const updateUI = () => {
        document.documentElement.lang = state.lang;

        // Update Toggle Button
        const toggleBtn = document.querySelector('.lang-text');
        if (toggleBtn) toggleBtn.textContent = state.lang === 'es' ? 'EN' : 'ES';

        // Update Text Content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = getTranslation(key);
            if (translation) el.innerHTML = translation;
        });

        // Update Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const translation = getTranslation(key);
            if (translation) el.placeholder = translation;
        });

        // Update Titles
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const translation = getTranslation(key);
            if (translation) el.title = translation;
        });

        // Disable forms if already submitted
        if (state.submitted) disableAllForms();
    };

    const disableAllForms = () => {
        const forms = document.querySelectorAll('.confirm-form');
        forms.forEach(form => {
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                btn.disabled = true;
                btn.innerText = getTranslation('alert_sent_already');
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            }
            form.querySelectorAll('input, textarea').forEach(el => el.disabled = true);
        });
    };

    const setupEventListeners = () => {
        // 1. Language Toggle
        const langBtn = document.getElementById('lang-toggle');
        if (langBtn) {
            langBtn.addEventListener('click', () => {
                state.lang = state.lang === 'es' ? 'en' : 'es';
                updateUI();
            });
        }

        // 2. Mobile Menu Toggle
        const menuToggle = document.getElementById('menu-toggle');
        const menuClose = document.getElementById('menu-close');
        const nav = document.getElementById('main-nav');
        const overlay = document.getElementById('nav-overlay');
        const navLinks = document.querySelectorAll('#main-nav a');

        const toggleMenu = (show) => {
            if (show) {
                nav?.classList.add('active');
                overlay?.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                nav?.classList.remove('active');
                overlay?.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        if (menuToggle) menuToggle.addEventListener('click', () => toggleMenu(true));
        if (menuClose) menuClose.addEventListener('click', () => toggleMenu(false));
        if (overlay) overlay.addEventListener('click', () => toggleMenu(false));

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        // 3. Copy Wallet
        const copyBtn = document.getElementById('copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', async () => {
                const address = document.getElementById('wallet-address').textContent;
                try {
                    await navigator.clipboard.writeText(address);

                    // Visual Feedback
                    const originalHTML = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<i data-lucide="check" style="color: #14F195"></i>';
                    if (window.lucide) window.lucide.createIcons();

                    setTimeout(() => {
                        copyBtn.innerHTML = originalHTML;
                        if (window.lucide) window.lucide.createIcons();
                    }, 2000);

                } catch (err) {
                    console.error('Failed to copy', err);
                }
            });
        }

        // 4. Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.length > 1) {
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // 5. Forms
        document.querySelectorAll('.confirm-form').forEach(form => {
            form.addEventListener('submit', handleFormSubmit);
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        if (state.submitted) return;

        // Captcha Validation (Math)
        const captchaInput1 = document.getElementById('captcha1');
        const captchaInput2 = document.getElementById('captcha2');
        const isForm1 = document.getElementById('confirmar')?.contains(form);

        const validMath = isForm1
            ? parseInt(captchaInput1?.value) === 7
            : parseInt(captchaInput2?.value) === 7;

        if (!validMath) {
            const msg = state.lang === 'es'
                ? 'Error: Respuesta matemática incorrecta. (3 + 4 = 7 o 5 + 2 = 7)'
                : 'Error: Incorrect Math Answer.';
            alert(msg);
            return;
        }

        const btn = form.querySelector('button[type="submit"]');
        const originalBtnText = btn.innerText;
        btn.disabled = true;
        btn.innerText = getTranslation('btn_sending');

        try {
            // ReCAPTCHA v3 Execution (Robust Fallback)
            if (typeof grecaptcha !== 'undefined') {
                try {
                    const token = await new Promise(resolve => {
                        grecaptcha.ready(() => {
                            grecaptcha.execute(config.recaptchaKey, { action: 'submit' })
                                .then(resolve)
                                .catch(() => resolve(null));
                        });
                    });

                    if (token) {
                        let input = form.querySelector('input[name="g-recaptcha-response"]');
                        if (!input) {
                            input = document.createElement('input');
                            input.type = 'hidden';
                            input.name = 'g-recaptcha-response';
                            form.appendChild(input);
                        }
                        input.value = token;
                    }
                } catch (err) {
                    console.warn('ReCAPTCHA error (proceeding without it):', err);
                }
            }

            // Send Data
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                state.submitted = true;
                localStorage.setItem('form_last_submit', new Date().toISOString());

                form.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <i data-lucide="check-circle" style="color: var(--color-secondary); width: 48px; height: 48px; margin-bottom: 1rem;"></i>
                        <h3>${getTranslation('success_title')}</h3>
                        <p>${getTranslation('success_msg')}</p>
                    </div>
                `;
                if (window.lucide) window.lucide.createIcons();
                disableAllForms();
            } else {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            console.error('Form error:', error);
            const errMsg = state.lang === 'es' ? 'Error al enviar. Inténtalo de nuevo.' : 'Error sending. Please try again.';
            alert(errMsg);
            btn.disabled = false;
            btn.innerText = originalBtnText; // Restore text
        }
    };

    const initAnimations = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.guide-step').forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'all 0.6s ease-out';
            observer.observe(step);
        });
    };

    // --- Public API ---
    return {
        init: () => {
            // Auto-detect Language
            const userLang = navigator.language || navigator.userLanguage;
            if (!userLang.startsWith('es')) {
                state.lang = 'en';
            }

            updateUI();
            setupEventListeners();
            initAnimations();

            // Re-render icons just in case
            if (window.lucide) window.lucide.createIcons();
        }
    };

})();

// Initialize App when DOM is ready

document.addEventListener('DOMContentLoaded', App.init);
