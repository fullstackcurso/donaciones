// Interactividad básica para la landing de donaciones

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-select');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const amount = button.textContent;
            alert(`¡Gracias por elegir donar ${amount}! Serás redirigido a la pasarela de pago.`);
            
            // Simulación de interacción
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Efecto suave al hacer scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animación simple para el contador (simulada)
    let count = 25430;
    const counterElement = document.getElementById('total-amount');
    
    setInterval(() => {
        count += Math.floor(Math.random() * 5);
        counterElement.textContent = `€${count.toLocaleString()}`;
    }, 3000);
});
