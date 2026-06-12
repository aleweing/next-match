// App principal para Next Match

class NextMatchApp {
    constructor() {
        this.currentMatchIndex = 0;
        this.filteredMatches = [...ALL_MATCHES];
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isDarkTheme = this.loadTheme();
        this.filterTeam = "";
        this.apiMatches = []; // Nuevo para usar API
        this.init();
    }
// Nuevo Init para usar API
    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.loadApiResults();
        this.updateDisplay();
        this.updateTotalMatches();
    }

    setupEventListeners() {
        // Menu toggle
        const menuToggle = document.getElementById("menuToggle");
        const menu = document.getElementById("menu");
        const menuOverlay = document.getElementById("menuOverlay");
        const menuClose = document.getElementById("menuClose");

        menuToggle.addEventListener("click", () => this.toggleMenu(menu, menuOverlay));
        menuClose.addEventListener("click", () => this.closeMenu(menu, menuOverlay));
        menuOverlay.addEventListener("click", () => this.closeMenu(menu, menuOverlay));

        // Theme toggle
        document.getElementById("themeToggle").addEventListener("click", () => this.toggleTheme());

        // Team filter
        document.getElementById("teamFilter").addEventListener("input", (e) => {
            this.filterTeam = e.target.value.toLowerCase();
            this.applyFilter();
        });
        document.getElementById("clearFilter").addEventListener("click", () => {
            this.filterTeam = "";
            document.getElementById("teamFilter").value = "";
            this.applyFilter();
        });

        // Date jump
        document.getElementById("jumpButton").addEventListener("click", () => this.jumpToDate());
        document.getElementById("todayButton").addEventListener("click", () => this.goToNextMatch());

        // Reset button (volver al inicio)
        const resetButton = document.getElementById("resetButton");
        if (resetButton) {
            resetButton.addEventListener("click", () => this.goToNextMatch());
        }

        // Swipe
        const matchContainer = document.getElementById("matchContainer");
        matchContainer.addEventListener("touchstart", (e) => this.handleTouchStart(e));
        matchContainer.addEventListener("touchmove", (e) => e.preventDefault(), false);
        matchContainer.addEventListener("touchend", (e) => this.handleTouchEnd(e));

        // Keyboard
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") this.prevMatch();
            if (e.key === "ArrowLeft") this.nextMatch();
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
//            return matchDateTime > now;
        const matchEnd = new Date(matchDateTime.getTime() + 2.5 * 60 * 60 * 1000);
        return matchEnd > now;
        });

        if (matchIndex !== -1) {
            this.currentMatchIndex = matchIndex;
        } else {
            this.currentMatchIndex = 0;
        }
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

        // Si movimiento es más vertical que horizontal, ignorar
        if (Math.abs(deltaY) > Math.abs(deltaX)) return;

        // Requiere movimiento mínimo de 50px
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
        // Trigger reflow
        void card.offsetWidth;
        card.classList.add(direction === "left" ? "slide-left" : "slide-right");
    }

    bounceCard() {
        const card = document.getElementById("matchCard");
        card.classList.remove("bounce");
        // Trigger reflow para reiniciar animación
        void card.offsetWidth;
        card.classList.add("bounce");
    }

    async loadApiResults() {
        try {
            const response = await fetch("https://test-api-futbol-8791.alewein.workers.dev/");
            const data = await response.json();
            this.apiMatches = data.matches || [];
            this.updateDisplay();
        } catch (err) {
            console.warn("No se pudieron cargar resultados:", err);
        }
    }

    getApiMatch(match) {
        return this.apiMatches.find(m => {
            const apiDate = m.utcDate.slice(0, 10);
            const apiTime = m.utcDate.slice(11, 16);
            return apiDate === match.date && apiTime === match.time;
        });
    }
    
    updateDisplay() {
        const match = this.filteredMatches[this.currentMatchIndex];
        if (!match) return;

        const card = document.getElementById("matchCard");
        
        // Convertir hora UTC a hora local del dispositivo
        const localTime = this.convertToLocalTime(match.date, match.time);

        const countdown = this.getCountdown(match.date, match.time);

        card.innerHTML = `
            <div class="tournament-badge">Copa Mundial 2026</div>
            
            <div class="team-section">
                <span class="flag">${match.flag1}</span>
                <h2 class="team-name">${match.team1}</h2>
            </div>

            <div class="vs-container">
                <span class="vs-text">vs</span>
            </div>

            <div class="team-section">
                <span class="flag">${match.flag2}</span>
                <h2 class="team-name">${match.team2}</h2>
            </div>

            <div class="match-date">${this.formatDate(match.date)}</div>
            <div class="match-time">${localTime}</div>
            <div class="countdown">
                <span class="countdown-value">${countdown}</span>
            </div>
        `;

        this.updatePositionIndicator();
    }

    convertToLocalTime(dateStr, timeStr) {
        // Crear fecha en UTC
        const utcDate = new Date(`${dateStr}T${timeStr}:00Z`);
        
        // Obtener hora local del dispositivo
        const localHours = String(utcDate.getHours()).padStart(2, "0");
        const localMinutes = String(utcDate.getMinutes()).padStart(2, "0");
        
        return `${localHours}:${localMinutes}`;
    }

    formatDate(dateStr) {
        const date = new Date(dateStr + "T00:00:00");
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("es-ES", options);
    }

getCountdown(dateStr, timeStr) {
    const matchDateTime = new Date(`${dateStr}T${timeStr}:00Z`);
    const now = new Date();
    const diff = matchDateTime - now;

    // Buscar resultado en la API
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

    // Fallback por tiempo si no hay dato de API
    if (diff <= 0) {
        const elapsed = Math.abs(diff);
        const twoHalfHours = 2.5 * 60 * 60 * 1000;
        if (elapsed < twoHalfHours) {
            return "⚽ Partido iniciado";
        } else {
            return "Partido finalizado";
        }
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
        return `En ${days}d ${hours}h`;
    } else if (hours > 0) {
        return `En ${hours}h ${minutes}m`;
    } else {
        return `En ${minutes}m`;
    }
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
            this.updateDisplay();
        }, 60000); // Actualizar cada minuto
    }
}

// Inicializar app cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    const app = new NextMatchApp();
    app.startCountdownUpdates();
});
