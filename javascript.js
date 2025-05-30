

const elementos = [
    { id: 'Tun', nombre: 'Tundra', enlace: 'Areas/MarcaCamioneta/ModeloMarca1/Modelos/tundra.html',imagen:'Source/tundra.png' },
    { id: 'Suz', nombre: 'Suzuki', enlace: 'Areas/MarcaMoto/ModeloMarca1/Modelos/vs250.html'  ,imagen:'Source/VS250.png' },
    { id: 'Cor', nombre: 'Corolla', enlace: 'Areas/MarcaAuto/ModeloMarca1/Modelos/corolla.html'  ,imagen:'Source/corolla.png' },
];

let visitas = JSON.parse(localStorage.getItem('visitasElementos')) || {};


function guardarVisitaYRedirigir(event, id, urlDestino) {
    event.preventDefault(); // Evita que se abra la página de inmediato

    // Guardar visita
    visitas[id] = (visitas[id] || 0) + 1;
    localStorage.setItem('visitasElementos', JSON.stringify(visitas));

    // Esperar un pequeño momento para asegurar que se guarda, luego redirigir
    setTimeout(() => {
        window.location.href = urlDestino;
    }, 100); // 100 ms de retraso
    mostrarElementos();
}


function crearTarjeta(elemento) {
    const div = document.createElement('div');
    div.className = `cardP w3-card`;
    div.innerHTML = `
        <img src="${elemento.imagen}" alt="${elemento.nombre}" ">
        <h3>${elemento.nombre}</h3>
        <p>Visitas: ${visitas[elemento.id] || 0}</p>
        <a href="${elemento.enlace}" class="w3-btn w3-block w3-red"> Ver Mas</a>
      `;
    return div;
}


function mostrarElementos() {
    // Ordenar elementos por visitas
    const masVisitados = [...elementos].sort((a, b) => (visitas[b.id] || 0) - (visitas[a.id] || 0)).slice(0, 3);

    const contMasVisitados = document.getElementById('masVisitados');
    const contTodos = document.getElementById('todosLosElementos');

    contMasVisitados.innerHTML = '';
    contTodos.innerHTML = '';

    masVisitados.forEach(el => {
        contMasVisitados.appendChild(crearTarjeta(el, 'highlight'));
    });

    elementos.forEach(el => {
        contTodos.appendChild(crearTarjeta(el));
    });
}

mostrarElementos();

