const colores = [
    { color: 'red', activo: true },
    { color: 'black', activo: true },
    { color: 'red', activo: true },
    { color: 'black', activo: true },
    { color: 'red', activo: true },
    { color: 'black', activo: true },
    { color: 'red', activo: true },
    { color: 'black', activo: true },
    { color: 'red', activo: true },
    { color: 'black', activo: true }
];

let anguloActual = 0;

function dibujarRuleta() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const anguloPorColor = (2 * Math.PI) / colores.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    colores.forEach((c, i) => {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, i * anguloPorColor, (i + 1) * anguloPorColor);
        ctx.closePath();
        ctx.fillStyle = c.color;
        ctx.fill();
        ctx.stroke(); // Añade borde al segmento
    });
}

function girarRuleta() {
    const giroCompleto = 360 * 5; // 5 vueltas completas
    const anguloPorColor = 360 / colores.length;
    const anguloSeleccionado = Math.floor(Math.random() * colores.length) * anguloPorColor;
    const anguloFinal = giroCompleto + anguloSeleccionado;

    let angulo = anguloActual;
    const incremento = (anguloFinal - anguloActual) / 100;

    function animar() {
        angulo += incremento;
        anguloActual = angulo % 360;

        dibujarAngulo(anguloActual);
        if (angulo < anguloFinal) {
            requestAnimationFrame(animar);
        } else {
            mostrarResultado(anguloFinal % 360);
        }
    }

    animar();
}

function dibujarAngulo(angulo) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((angulo * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    dibujarRuleta();
    ctx.restore();
}

function mostrarResultado(anguloFinal) {
    console.log('Mostrando resultado');
    const anguloPorColor = 360 / colores.length;
    const indiceColor = Math.floor(anguloFinal / anguloPorColor);
    const colorSeleccionado = colores[indiceColor].color;

    document.getElementById('resultado').textContent = `¡Ha salido ${colorSeleccionado.toUpperCase()}!`;

    if (confetti) {
        confetti({
            particleCount: 200,
            spread: 120,
            startVelocity: 40,
            gravity: 0.6,
            scalar: 1.2,
            origin: { y: 0.6 }
        });
    }

    // Redirigir después de 3 segundos
    setTimeout(() => {
        window.location.href = 'file:///C:/Users/omatp/OneDrive/Escritorio/FeriadeSeguridadGM/end.html';
    }, 3000); // 3000 milisegundos = 3 segundos
}

const colorMap = {
    rojo: 'red',
    negro: 'black'
};

window.onload = dibujarRuleta;
