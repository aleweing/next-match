// App principal para Next Match
// Datos obtenidos directamente desde la API de football-data.org

class NextMatchApp {
    constructor() {
        this.currentMatchIndex = 0;
        this.allMatches = [];
        this.filteredMatches = [];
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isDarkTheme = this.loadTheme();
        this.filterTeam = "";
        this._resizeTimer = null;
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.applyTheme();
        await this.loadApiData();
    }

    async loadApiData() {
        try {
            const response = await fetch("https://test-api-futbol-8791.alewein.workers.dev/");
            const data = await response.json();

            if (data.errorCode === 429 || !data.matches) {
                console.warn("Límite de API, reintentando en 15s...");
                setTimeout(() => this.loadApiData(), 15000);
                return;
            }

            // Construir allMatches directamente desde la API
            this.allMatches = data.matches.map(m => ({
                date: m.utcDate.slice(0, 10),
                time: m.utcDate.slice(11, 16),
                team1: this.translateName(m.homeTeam.name),
                team2: this.translateName(m.awayTeam.name),
                crest1: m.homeTeam.crest,
                crest2: m.awayTeam.crest,
                status: m.status,
                home: m.score?.fullTime?.home,
                away: m.score?.fullTime?.away,
            })).sort((a, b) => {
                return new Date(`${a.date}T${a.time}Z`) - new Date(`${b.date}T${b.time}Z`);
            });

            this.filteredMatches = [...this.allMatches];
            this.updateTotalMatches();
            this.goToNextMatch();

        } catch (err) {
            console.warn("No se pudieron cargar datos:", err);
        }
    }

    translateName(name) {
        const nameMap = {
            "Mexico": "México",
            "South Africa": "Sudáfrica",
            "South Korea": "República de Corea",
            "Czechia": "República Checa",
            "Canada": "Canadá",
            "Bosnia-Herzegovina": "Bosnia y Herzegovina",
            "United States": "Estados Unidos",
            "Paraguay": "Paraguay",
            "Qatar": "Catar",
            "Switzerland": "Suiza",
            "Brazil": "Brasil",
            "Morocco": "Marruecos",
            "Haiti": "Haití",
            "Scotland": "Escocia",
            "Australia": "Australia",
            "Turkey": "Turquía",
            "Germany": "Alemania",
            "Curaçao": "Curazao",
            "Netherlands": "Países Bajos",
            "Japan": "Japón",
            "Ivory Coast": "Costa de Marfil",
            "Ecuador": "Ecuador",
            "Sweden": "Suecia",
            "Tunisia": "Túnez",
            "Spain": "España",
            "Cape Verde Islands": "Cabo Verde",
            "Belgium": "Bélgica",
            "Egypt": "Egipto",
            "Saudi Arabia": "Arabia Saudí",
            "Uruguay": "Uruguay",
            "Iran": "RI de Irán",
            "New Zealand": "Nueva Zelanda",
            "France": "Francia",
            "Senegal": "Senegal",
            "Iraq": "Irak",
            "Argentina": "Argentina",
            "Algeria": "Argelia",
            "Austria": "Austria",
            "Jordan": "Jordania",
            "Portugal": "Portugal",
            "Congo DR": "RD Congo",
            "England": "Inglaterra",
            "Croatia": "Croacia",
            "Ghana": "Ghana",
            "Panama": "Panamá",
            "Uzbekistan": "Uzbekistán",
            "Colombia": "Colombia",
            "Norway": "Noruega",
        };
        return nameMap[name] || name;
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
            this.filteredMatches = [...this.allMatches];
        } else {
            this.filteredMatches = this.allMatches.filter(match =>
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
            if (match.status === "FINISHED") return false;
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

    getFlag(crest, teamName) {
        if (crest) {
            return `<img src="${crest}" class="flag-crest" alt="${teamName}" onerror="this.style.display='none'">`;
        }
        return "";
    }

    getCountdown(match) {
        const matchDateTime = new Date(`${match.date}T${match.time}Z`);
        const now = new Date();
        const diff = matchDateTime - now;

        if (match.status === "FINISHED") {
            return `Finalizado · ${match.home} - ${match.away}`;
        }
        if (match.status === "IN_PLAY" || match.status === "PAUSED") {
            const home = match.home ?? 0;
            const away = match.away ?? 0;
            return `⚽ En juego · ${home} - ${away}`;
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

    updateDisplay() {
        const match = this.filteredMatches[this.currentMatchIndex];
        if (!match) return;

        const card = document.getElementById("matchCard");
        if (!card) return;

        const localTime = this.convertToLocalTime(match.date, match.time);
        const countdown = this.getCountdown(match);
        const isLandscape = window.innerWidth > window.innerHeight;
        const flag1 = this.getFlag(match.crest1, match.team1);
        const flag2 = this.getFlag(match.crest2, match.team2);

        if (isLandscape) {
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
        const utcDate = new Date(`${dateStr}T${timeStr}:00Z`);
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        return utcDate.toLocaleDateString("es-ES", options);
    }

    updatePositionIndicator() {
        document.getElementById("currentPosition").textContent = this.currentMatchIndex + 1;
        document.getElementById("totalMatches").textContent = this.filteredMatches.length;
    }

    updateTotalMatches() {
        document.getElementById("totalMatches").textContent = this.filteredMatches.length;
    }

    startCountdownUpdates() {
        setInterval(async () => {
            const hasLiveMatch = this.allMatches.some(m =>
                m.status === "IN_PLAY" || m.status === "PAUSED"
            );
            if (hasLiveMatch) {
                await this.loadApiData();
            } else {
                this.updateDisplay();
            }
        }, 60000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const app = new NextMatchApp();
    window._app = app;
    app.startCountdownUpdates();
});
