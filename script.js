document.addEventListener('DOMContentLoaded', () => {
    const secciones = document.querySelectorAll('.section');
  
    // 1) Observador para que cada sección “aparezca” con fade-in al hacer scroll
    const opcionesObserver = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25
    };
    const callbackObserver = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    };
    const observer = new IntersectionObserver(callbackObserver, opcionesObserver);
    secciones.forEach(sec => observer.observe(sec));
  
    // 2) Convertir el <h1 class="rainbow-text">Alessandro Leonel</h1> en varios <span>
    const paletaPastel = [
      getComputedStyle(document.documentElement).getPropertyValue('--pastel-1').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--pastel-2').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--pastel-3').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--pastel-4').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--pastel-5').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--pastel-6').trim()
    ];
  
    document.querySelectorAll('.rainbow-text').forEach(el => {
      // Tomamos el texto original y lo convertimos a mayúsculas
      const textoOriginal = el.textContent.trim().toUpperCase();
      // Limpiamos el contenido del <h1>
      el.textContent = '';
      // Recorremos cada carácter
      textoOriginal.split('').forEach((caracter, i) => {
        const span = document.createElement('span');
        if (caracter === ' ') {
          // Para los espacios, simplemente hacemos un span con &nbsp;
          span.innerHTML = '&nbsp;';
        } else {
          span.textContent = caracter;
          // Asignamos un color pastel ciclando en el array
          span.style.color = paletaPastel[i % paletaPastel.length];
          const popDelay = i * 0.1;
          const danceDuration = (1 + Math.random()).toFixed(2); // 1–2s aleatorios
          const danceDelay = (popDelay + 0.6).toFixed(2);
          // animación de entrada escalonada
          // primera aparición con pop, luego rebote infinito
          span.style.animation = 
            `letter-pop 0.6s ease forwards ${popDelay}s, ` +
            `letter-dance ${danceDuration}s ease-in-out ${danceDelay}s infinite alternate`;
        }
        el.appendChild(span);
      });
    });
  });
