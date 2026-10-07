// ==========================================
// Índice de Tiendas de Belleza - Script
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // --- Elementos del DOM ---
    const inputBusqueda = document.getElementById('inputBusqueda');
    const contadorEnlaces = document.getElementById('contadorEnlaces');
    const sinResultados = document.getElementById('sinResultados');
    const secciones = document.querySelectorAll('.seccion');
    const todosLosItems = document.querySelectorAll('.lista-enlaces li');

    // --- 1. Contador inicial de enlaces ---
    function actualizarContador() {
        const visibles = document.querySelectorAll('.lista-enlaces li:not(.oculto)').length;
        contadorEnlaces.textContent = visibles + (visibles === 1 ? ' enlace' : ' enlaces');
    }
    actualizarContador();

    // --- 2. Filtro de búsqueda ---
    inputBusqueda.addEventListener('input', function () {
        const texto = this.value.toLowerCase().trim();
        let totalVisibles = 0;

        // Recorrer cada sección
        secciones.forEach(function (seccion) {
            const items = seccion.querySelectorAll('.lista-enlaces li');
            let visiblesEnSeccion = 0;

            items.forEach(function (item) {
                // Buscar en el atributo data-nombre y en el texto completo
                const nombre = (item.dataset.nombre || '').toLowerCase();
                const contenido = item.textContent.toLowerCase();

                if (texto === '' || nombre.includes(texto) || contenido.includes(texto)) {
                    item.classList.remove('oculto');
                    visiblesEnSeccion++;
                    totalVisibles++;
                } else {
                    item.classList.add('oculto');
                }
            });

            // Ocultar la sección completa si no tiene items visibles
            if (visiblesEnSeccion === 0 && texto !== '') {
                seccion.style.display = 'none';
            } else {
                seccion.style.display = 'block';
            }
        });

        // Mostrar/ocultar mensaje de "sin resultados"
        if (totalVisibles === 0) {
            sinResultados.style.display = 'block';
        } else {
            sinResultados.style.display = 'none';
        }

        // Actualizar contador
        contadorEnlaces.textContent = totalVisibles +
            (totalVisibles === 1 ? ' enlace' : ' enlaces');
    });

    // --- 3. Limpiar búsqueda con tecla Escape ---
    inputBusqueda.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            this.value = '';
            this.dispatchEvent(new Event('input'));
            this.blur();
        }
    });

    // --- 4. Scroll suave a las anclas ---
    document.querySelectorAll('a[href^="#"]').forEach(function (ancla) {
        ancla.addEventListener('click', function (e) {
            const destino = document.querySelector(this.getAttribute('href'));
            if (destino) {
                e.preventDefault();
                destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- 5. Registrar clics en enlaces externos (opcional, en consola) ---
    document.querySelectorAll('a[target="_blank"]').forEach(function (enlace) {
        enlace.addEventListener('click', function () {
            console.log('🔗 Abriendo tienda:', this.textContent.trim());
        });
    });

});
