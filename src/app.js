// Lógica principal de Alke Wallet

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicializar o recuperar el saldo actual desde localStorage
    if (localStorage.getItem("saldoAlke") === null) {
        localStorage.setItem("saldoAlke", "250000"); // Saldo inicial por defecto
    }

    let saldoActual = parseInt(localStorage.getItem("saldoAlke"));

    // 2. Si estamos en el menú, mostrar el saldo actual formateado
    const elementoSaldo = document.getElementById("saldoActual");
    if (elementoSaldo) {
        elementoSaldo.textContent = `$${saldoActual.toLocaleString('es-CL')}`;
    }

    // 3. Lógica para la pantalla de depósitos (deposit.html)
    const depositForm = document.getElementById("depositForm");
    if (depositForm) {
        depositForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const inputMonto = document.getElementById("montoDeposito");
            const montoIngresado = parseInt(inputMonto.value);

            if (isNaN(montoIngresado) || montoIngresado <= 0) {
                alert("Por favor, ingresa un monto válido mayor a 0.");
                return;
            }

            saldoActual += montoIngresado;
            localStorage.setItem("saldoAlke", saldoActual.toString());

            alert(`¡Depósito exitoso de $${montoIngresado.toLocaleString('es-CL')}!`);
            window.location.href = "menu.html";
        });
    }

    // 4. Lógica para la pantalla de envíos de dinero (send.html)
    const sendForm = document.getElementById("sendForm");
    if (sendForm) {
        sendForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const inputContacto = document.getElementById("contacto").value;
            const inputMontoEnvio = document.getElementById("montoEnvio");
            const montoEnvio = parseInt(inputMontoEnvio.value);

            if (isNaN(montoEnvio) || montoEnvio <= 0) {
                alert("Por favor, ingresa un monto válido mayor a 0.");
                return;
            }

            // Validar que tenga suficiente saldo
            if (montoEnvio > saldoActual) {
                alert("Saldo insuficiente para realizar esta transferencia.");
                return;
            }

            // Restar el dinero del saldo actual
            saldoActual -= montoEnvio;
            localStorage.setItem("saldoAlke", saldoActual.toString());

            alert(`¡Envío exitoso de $${montoEnvio.toLocaleString('es-CL')} a ${inputContacto}!`);
            window.location.href = "menu.html";
        });
    }
});