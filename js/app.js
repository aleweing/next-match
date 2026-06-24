// App principal para Next Match

class NextMatchApp {
    constructor() {
        this.currentMatchIndex = 0;
        this.filteredMatches = [...ALL_MATCHES];
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isDarkTheme = this.loadTheme();
        this.filterTeam = "";
        this.apiMatches = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.loadApiResults();
        this.goToNextMatch(); // ← punto 1: siempre inicia en el próximo partido
        this.updateTotalMatches();
    }

    setupEventListeners() {
        const menuToggle = document.getElementById("menuToggle");
        const menu = document.getElementById("menu");
        const menuOverlay = document.getElementById("menuOverlay");
        const menuClose = document.getElementById("menuClose");

        menuToggle.addEventListener("click", () => this.toggleMenu(menu, menuOverlay));
        menuClose.addEventListener("click", () => this.closeMenu(menu, menuOverlay));
        menuOverlay.addEventListener("click", () => this.closeMenu(menu, menuOverlay));

        document.getElementById("themeToggle").addEventListener("click", () => this.toggleTheme());

        document.getElementById("teamFilter").addEventListener("input", (e) => {
            this.filterTeam = e.target.value.toLowerCase();
            this.applyFilter();
        });
        document.getElementById("clearFilter").addEventListener("click", () => {
            this.filterTeam = "";
            document.getElementById("teamFilter").value = "";
            this.applyFilter();
        });

        document.getElementById("jumpButton").addEventListener("click", () => this.jumpToDate());
        document.getElementById("todayButton").addEventListener("click", () => this.goToNextMatch());

        const resetButton = document.getElementById("resetButton");
        if (resetButton) {
            resetButton.addEventListener("click", () => this.goToNextMatch());
        }

        const matchContainer = document.getElementById("matchContainer");
        matchContainer.addEventListener("touchstart", (e) => this.handleTouchStart(e));
        matchContainer.addEventListener("touchmove", (e) => e.preventDefault(), false);
        matchContainer.addEventListener("touchend", (e) => this.handleTouchEnd(e));

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") this.prevMatch();
            if (e.key === "ArrowLeft") this.nextMatch();
        });

        // Punto 2: redibujar inmediatamente al rotar
        window.addEventListener("resize", () => {
            clearTimeout(this._resizeTimer);
            this._resizeTimer = setTimeout(() => this.updateDisplay(), 50);
        });
    }

    toggleMenu(menu, overlay) {
        menu.classList.toggle("active");
        overlay.classList.toggle("active");
    }

    closeMenu(menu, overlay) {
        menu.classList.remove("active");
        overlay.classList.remove("active");
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        this.saveTheme();
        this.applyTheme();
        this.updateDisplay();
    }

    applyTheme() {
        const html = document.documentElement;
        const themeToggle = document.getElementById("themeToggle");
        const themeLbl = themeToggle.querySelector(".theme-label");
        const themeIcon = themeToggle.querySelector(".theme-icon");

        if (this.isDarkTheme) {
            html.classList.add("dark-theme");
            themeLbl.textContent = "Tema claro";
            themeIcon.textContent = "☀️";
        } else {
            html.classList.remove("dark-theme");
            themeLbl.textContent = "Tema oscuro";
            themeIcon.textContent = "🌙";
        }
    }

    saveTheme() {
        localStorage.setItem("theme", this.isDarkTheme ? "dark" : "light");
    }

    loadTheme() {
        const saved = localStorage.getItem("theme");
        return saved === "dark" || (saved === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }

    applyFilter() {
        if (!this.filterTeam) {
            this.filteredMatches = [...ALL_MATCHES];
        } else {
            this.filteredMatches = ALL_MATCHES.filter(match =>
                match.team1.toLowerCase().includes(this.filterTeam) ||
                match.team2.toLowerCase().includes(this.filterTeam)
            );
        }
        this.currentMatchIndex = 0;
        this.updateDisplay();
        this.updateTotalMatches();
    }

    jumpToDate() {
        const dateInput = document.getElementById("dateJump").value;
        if (!dateInput) return;

        const selectedDate = new Date(dateInput);
        const matchIndex = this.filteredMatches.findIndex(match => {
            const matchDate = new Date(match.date);
            return matchDate.toDateString() === selectedDate.toDateString();
        });

        if (matchIndex !== -1) {
            this.currentMatchIndex = matchIndex;
            this.updateDisplay();
        } else {
            alert("No hay partidos en esa fecha");
        }
    }

    goToNextMatch() {
        const now = new Date();
        const matchIndex = this.filteredMatches.findIndex(match => {
            const matchDateTime = new Date(`${match.date}T${match.time}Z`);
            const matchEnd = new Date(matchDateTime.getTime() + 2.5 * 60 * 60 * 1000);
            return matchEnd > now;
        });
        this.currentMatchIndex = matchIndex !== -1 ? matchIndex : 0;
        this.updateDisplay();
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchEnd(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - this.touchStartX;
        const deltaY = touchEndY - this.touchStartY;

        if (Math.abs(deltaY) > Math.abs(deltaX)) return;
        if (Math.abs(deltaX) < 50) return;

        if (deltaX > 0) {
            this.prevMatch();
        } else {
            this.nextMatch();
        }
    }

    nextMatch() {
        if (this.currentMatchIndex < this.filteredMatches.length - 1) {
            this.currentMatchIndex++;
            this.addSwipeAnimation("left");
            this.updateDisplay();
        } else {
            this.bounceCard();
        }
    }

    prevMatch() {
        if (this.currentMatchIndex > 0) {
            this.currentMatchIndex--;
            this.addSwipeAnimation("right");
            this.updateDisplay();
        } else {
            this.bounceCard();
        }
    }

    addSwipeAnimation(direction) {
        const card = document.getElementById("matchCard");
        card.classList.remove("slide-left", "slide-right");
        void card.offsetWidth;
        card.classList.add(direction === "left" ? "slide-left" : "slide-right");
    }

    bounceCard() {
        const card = document.getElementById("matchCard");
        card.classList.remove("bounce");
        void card.offsetWidth;
        card.classList.add("bounce");
    }

async loadApiResults() {
    try {
        console.log("Iniciando fetch..."); // ← añadir
        const response = await fetch("https://test-api-futbol-8791.alewein.workers.dev/");
        console.log("Response status:", response.status); // ← añadir
        const data = await response.json();
        console.log("Data keys:", Object.keys(data)); // ← añadir
        
        if (data.errorCode === 429 || !data.matches) {
            console.warn("Límite de API:", data);
            setTimeout(() => this.loadApiResults(), 15000);
            return;
        }
        
        this.apiMatches = data.matches || [];
        console.log("apiMatches cargados:", this.apiMatches.length);
        this.updateDisplay();
    } catch (err) {
        console.error("Error detallado:", err); // ← cambiar warn por error
    }
}

getApiMatch(match) {
    if (!match || !match.team1 || match.team1 === "TBD") return undefined;

    const normalize = (str) => {
        if (!str) return "";
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    };

    const nameMap = {
        "switzerland": "suiza",
        "bosnia-herzegovina": "bosnia y herzegovina",
        "morocco": "marruecos",
        "scotland": "escocia",
        "czechia": "republica checa",
        "south africa": "sudafrica",
        "ecuador": "ecuador",
        "curacao": "curazao",
        "curaçao": "curazao",
        "tunisia": "tunez",
        "japan": "japon",
        "turkey": "turquia",
        "paraguay": "paraguay",
        "norway": "noruega",
        "senegal": "senegal",
        "uruguay": "uruguay",
        "cape verde islands": "cabo verde",
        "new zealand": "nueva zelanda",
        "egypt": "egipto",
        "panama": "panama",
        "croatia": "croacia",
        "colombia": "colombia",
        "congo dr": "rd congo",
        "jordan": "jordania",
        "algeria": "argelia",
        "mexico": "mexico",
        "south korea": "republica de corea",
        "canada": "canada",
        "united states": "estados unidos",
        "qatar": "catar",
        "brazil": "brasil",
        "haiti": "haiti",
        "australia": "australia",
        "netherlands": "paises bajos",
        "germany": "alemania",
        "ivory coast": "costa de marfil",
        "sweden": "suecia",
        "spain": "espana",
        "saudi arabia": "arabia saudi",
        "belgium": "belgica",
        "iran": "ri de iran",
        "argentina": "argentina",
        "austria": "austria",
        "france": "francia",
        "iraq": "irak",
        "portugal": "portugal",
        "uzbekistan": "uzbekistan",
        "england": "inglaterra",
        "ghana": "ghana",
    };

    return this.apiMatches.find(m => {
        if (!m.homeTeam || !m.homeTeam.name) return false;
        const apiDate = m.utcDate.slice(0, 10);
        const apiTime = m.utcDate.slice(11, 16);
        if (apiDate !== match.date || apiTime !== match.time) return false;

        const apiHome = normalize(m.homeTeam.name);
        const mapped = nameMap[apiHome] || apiHome;
        return mapped === normalize(match.team1);
    });
}
    // Punto 3: SVG inline para banderas británicas
    getFlag(flag, teamName) {
        const name = teamName ? teamName.toLowerCase() : "";
        if (name.includes("escocia") || name.includes("scotland")) {
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" class="flag-svg"><rect width="60" height="40" fill="#003399"/><line x1="0" y1="0" x2="60" y2="40" stroke="white" stroke-width="8"/><line x1="60" y1="0" x2="0" y2="40" stroke="white" stroke-width="8"/></svg>`;
        }
        if (name.includes("gales") || name.includes("wales")) {
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" class="flag-svg"><rect width="60" height="20" fill="white"/><rect y="20" width="60" height="20" fill="#CC0000"/><text x="30" y="28" text-anchor="middle" font-size="20">🐉</text></svg>`;
        }
        if (name.includes("irlanda del norte") || name.includes("northern ireland")) {
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" class="flag-svg"><rect width="60" height="40" fill="white"/><line x1="0" y1="0" x2="60" y2="40" stroke="#CC0000" stroke-width="5"/><line x1="60" y1="0" x2="0" y2="40" stroke="#CC0000" stroke-width="5"/><rect x="22" y="0" width="16" height="40" fill="#CC0000"/><rect x="0" y="12" width="60" height="16" fill="#CC0000"/></svg>`;
        }
        if (name.includes("inglaterra") || name.includes("england")) {
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" class="flag-svg"><rect width="60" height="40" fill="white"/><rect x="24" y="0" width="12" height="40" fill="#CC0000"/><rect x="0" y="14" width="60" height="12" fill="#CC0000"/></svg>`;
        }
        return `<span class="flag-emoji">${flag}</span>`;
    }

    updateDisplay() {
        const match = this.filteredMatches[this.currentMatchIndex];
        if (!match) return;

        const card = document.getElementById("matchCard");
        const localTime = this.convertToLocalTime(match.date, match.time);
        const countdown = this.getCountdown(match.date, match.time);
        const isLandscape = window.innerWidth > window.innerHeight;

        const flag1 = this.getFlag(match.flag1, match.team1);
        const flag2 = this.getFlag(match.flag2, match.team2);

        if (isLandscape) {
            // Punto 5: vista horizontal — equipos en fila, datos debajo
            card.innerHTML = `
                <div class="landscape-teams">
                    <div class="team-section">
                        ${flag1}
                        <h2 class="team-name">${match.team1}</h2>
                    </div>
                    <div class="vs-center">
                        <span class="vs-text">vs</span>
                    </div>
                    <div class="team-section">
                        ${flag2}
                        <h2 class="team-name">${match.team2}</h2>
                    </div>
                </div>
                <div class="match-info">
                    <div class="match-date">${this.formatLocalDate(match.date, match.time)}</div>
                    <div class="match-time">${localTime}</div>
                    <div class="countdown"><span class="countdown-value">${countdown}</span></div>
                </div>
            `;
        } else {
            // Punto 4: vista vertical — equipo1, bandera1, vs, equipo2, bandera2, fecha, hora, countdown
            card.innerHTML = `
                <div class="tournament-badge">Copa Mundial 2026</div>
                <div class="team-section">
                    <h2 class="team-name">${match.team1}</h2>
                    ${flag1}
                </div>
                <div class="vs-container">
                    <span class="vs-text">vs</span>
                </div>
                <div class="team-section">
                    <h2 class="team-name">${match.team2}</h2>
                    ${flag2}
                </div>
                <div class="match-info">
                    <div class="match-date">${this.formatLocalDate(match.date, match.time)}</div>
                    <div class="match-time">${localTime}</div>
                    <div class="countdown"><span class="countdown-value">${countdown}</span></div>
                </div>
            `;
        }

        this.updatePositionIndicator();
    }

    convertToLocalTime(dateStr, timeStr) {
        const utcDate = new Date(`${dateStr}T${timeStr}:00Z`);
        const localHours = String(utcDate.getHours()).padStart(2, "0");
        const localMinutes = String(utcDate.getMinutes()).padStart(2, "0");
        return `${localHours}:${localMinutes}`;
    }
    
    formatLocalDate(dateStr, timeStr) {
        // Usar la fecha local derivada del UTC, no el string de fecha directamente
        const utcDate = new Date(`${dateStr}T${timeStr}:00Z`);
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        return utcDate.toLocaleDateString("es-ES", options);
    }

    getCountdown(dateStr, timeStr) {
        const matchDateTime = new Date(`${dateStr}T${timeStr}:00Z`);
        const now = new Date();
        const diff = matchDateTime - now;

        const apiMatch = this.getApiMatch({ date: dateStr, time: timeStr });

        if (apiMatch) {
            if (apiMatch.status === "FINISHED") {
                const home = apiMatch.score.fullTime.home;
                const away = apiMatch.score.fullTime.away;
                return `Finalizado · ${home} - ${away}`;
            }
            if (apiMatch.status === "IN_PLAY" || apiMatch.status === "PAUSED") {
                const home = apiMatch.score.fullTime.home ?? 0;
                const away = apiMatch.score.fullTime.away ?? 0;
                return `⚽ En juego · ${home} - ${away}`;
            }
        }

        if (diff <= 0) {
            const elapsed = Math.abs(diff);
            const twoHalfHours = 2.5 * 60 * 60 * 1000;
            if (elapsed < twoHalfHours) return "⚽ Partido iniciado";
            return "Partido finalizado";
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) return `En ${days}d ${hours}h`;
        if (hours > 0) return `En ${hours}h ${minutes}m`;
        return `En ${minutes}m`;
    }

    updatePositionIndicator() {
        document.getElementById("currentPosition").textContent = this.currentMatchIndex + 1;
        document.getElementById("totalMatches").textContent = this.filteredMatches.length;
    }

    updateTotalMatches() {
        document.getElementById("totalMatches").textContent = this.filteredMatches.length;
    }

    startCountdownUpdates() {
        setInterval(() => {
            const hasLiveMatch = this.apiMatches.some(m =>
                m.status === "IN_PLAY" || m.status === "PAUSED"
            );
            if (hasLiveMatch) {
                this.loadApiResults();
            } else {
                this.updateDisplay();
            }
        }, 60000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const app = new NextMatchApp();
    app.startCountdownUpdates();
});
