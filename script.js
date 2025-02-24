function verificaStatus() {
    let acum = new Date();
    let ziua = acum.getDay(); // 0 = Duminică, 1 = Luni, ..., 6 = Sâmbătă
    let ora = acum.getHours();
    let minute = acum.getMinutes();
    let status = document.getElementById("status");

    if (!status) {
        console.error("Elementul cu id 'status' nu există!");
        return;
    }

    // Definirea programului
    const orar = {
        0: [[11, 30, 23, 30]], // Duminică
        1: [[11, 30, 14, 30], [17, 30, 23, 30]], // Luni
        2: [[11, 30, 14, 30], [17, 30, 23, 30]], // Marți
        3: [[11, 30, 14, 30], [17, 30, 23, 30]], // Miercuri
        4: [], // Joi - Închis
        5: [[11, 30, 14, 30], [17, 30, 23, 30]], // Vineri
        6: [[17, 0, 23, 30]]  // Sâmbătă
    };

    let deschis = false;

    if (orar[ziua].length > 0) {
        for (let interval of orar[ziua]) {
            let [startH, startM, endH, endM] = interval;

            let start = startH * 60 + startM;
            let end = endH * 60 + endM;
            let current = ora * 60 + minute;

            if (current >= start && current <= end) {
                deschis = true;
                break;
            }
        }
    }

    status.innerHTML = deschis ? "✅ Acum deschis" : "❌ Închis";
    status.style.color = deschis ? "green" : "red";
}

// Rulează verificarea imediat
verificaStatus();

// Actualizare la fiecare minut
setInterval(verificaStatus, 60000);
