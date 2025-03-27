function verificaStatus() {
    // Folosim un formatter pentru ora Germaniei (Europe/Berlin)
    let formatData = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    });

    let dataCurenta = new Date();
    let [ora, minute] = formatData.format(dataCurenta).split(":").map(Number);

    let ziua = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Berlin", weekday: "short" })
        .format(dataCurenta)
        .toLowerCase();

    let status = document.getElementById("status");
    if (!status) return console.error("Elementul cu id 'status' nu există!");

    // Program optimizat cu chei string (în loc de numere)
    const orar = {
        sun: [[17, 0, 22, 0]], // Duminică
        mon: [[12, 0, 22, 0]], // Luni
        tue: [[12, 0, 22, 0]], // Marți
        wed: [[12, 0, 22, 0]], // Miercuri
        thu: [[12, 0, 22, 0]], // Joi - Închis
        fri: [[12, 0, 22, 0]], // Vineri
        sat: [[12, 0, 22, 0]], // Sâmbătă
    };

    let deschis = orar[ziua]?.some(([startH, startM, endH, endM]) => {
        let start = startH * 60 + startM;
        let end = endH * 60 + endM;
        let current = ora * 60 + minute;
        return current >= start && current <= end;
    }) ?? false;

    status.innerHTML = deschis ? "deschis" : "inchis";
    status.style.color = deschis ? "green" : "red";
}

// Rulează verificarea imediat
verificaStatus();

// Actualizare mai rapidă (la fiecare 1 secundă)
setInterval(verificaStatus, 1000);
