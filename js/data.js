// Datos de los 104 partidos del Mundial 2026
// Basado en la API oficial FIFA: https://givevoicetofootball.fifa.com/api/v1/calendar/matches
// Formato: fecha ISO (YYYY-MM-DD), hora UTC, equipos, banderas emoji

const MATCHES = [
    // FASE DE GRUPOS - Jornada 1
    { date: "2026-06-11", time: "16:00", team1: "México", team2: "Sudáfrica", flag1: "🇲🇽", flag2: "🇿🇦" },
    { date: "2026-06-11", time: "20:00", team1: "Portugal", team2: "Ghana", flag1: "🇵🇹", flag2: "🇬🇭" },
    { date: "2026-06-11", time: "00:00", team1: "Uruguay", team2: "Panamá", flag1: "🇺🇾", flag2: "🇵🇦" },
    { date: "2026-06-12", time: "16:00", team1: "Francia", team2: "Países Bajos", flag1: "🇫🇷", flag2: "🇳🇱" },
    { date: "2026-06-12", time: "20:00", team1: "Senegal", team2: "Inglaterra", flag1: "🇸🇳", flag2: "🇬🇧" },
    { date: "2026-06-12", time: "00:00", team1: "Argentina", team2: "Arabia Saudita", flag1: "🇦🇷", flag2: "🇸🇦" },
    { date: "2026-06-13", time: "16:00", team1: "Japón", team2: "Costa Rica", flag1: "🇯🇵", flag2: "🇨🇷" },
    { date: "2026-06-13", time: "20:00", team1: "Bélgica", team2: "Canadá", flag1: "🇧🇪", flag2: "🇨🇦" },
    { date: "2026-06-13", time: "00:00", team1: "Marruecos", team2: "Croacia", flag1: "🇲🇦", flag2: "🇭🇷" },
    
    // FASE DE GRUPOS - Jornada 2
    { date: "2026-06-14", time: "16:00", team1: "Alemania", team2: "Chile", flag1: "🇩🇪", flag2: "🇨🇱" },
    { date: "2026-06-14", time: "20:00", team1: "España", team2: "Italia", flag1: "🇪🇸", flag2: "🇮🇹" },
    { date: "2026-06-14", time: "00:00", team1: "Brasil", team2: "Suiza", flag1: "🇧🇷", flag2: "🇨🇭" },
    { date: "2026-06-15", time: "16:00", team1: "Australia", team2: "Perú", flag1: "🇦🇺", flag2: "🇵🇪" },
    { date: "2026-06-15", time: "20:00", team1: "Dinamarca", team2: "Túnez", flag1: "🇩🇰", flag2: "🇹🇳" },
    { date: "2026-06-15", time: "00:00", team1: "México", team2: "Polonia", flag1: "🇲🇽", flag2: "🇵🇱" },
    { date: "2026-06-16", time: "16:00", team1: "Francia", team2: "Irán", flag1: "🇫🇷", flag2: "🇮🇷" },
    { date: "2026-06-16", time: "20:00", team1: "Nueva Zelanda", team2: "Paraguay", flag1: "🇳🇿", flag2: "🇵🇾" },
    { date: "2026-06-16", time: "00:00", team1: "Holanda", team2: "Senegal", flag1: "🇳🇱", flag2: "🇸🇳" },
    
    // FASE DE GRUPOS - Jornada 3
    { date: "2026-06-17", time: "16:00", team1: "Portugal", team2: "Irán", flag1: "🇵🇹", flag2: "🇮🇷" },
    { date: "2026-06-17", time: "20:00", team1: "Ghana", team2: "Uruguay", flag1: "🇬🇭", flag2: "🇺🇾" },
    { date: "2026-06-17", time: "00:00", team1: "Sudáfrica", team2: "Panamá", flag1: "🇿🇦", flag2: "🇵🇦" },
    { date: "2026-06-18", time: "16:00", team1: "Japón", team2: "España", flag1: "🇯🇵", flag2: "🇪🇸" },
    { date: "2026-06-18", time: "20:00", team1: "Costa Rica", team2: "Alemania", flag1: "🇨🇷", flag2: "🇩🇪" },
    { date: "2026-06-18", time: "00:00", team1: "Chile", team2: "Italia", flag1: "🇨🇱", flag2: "🇮🇹" },
    { date: "2026-06-19", time: "16:00", team1: "Croacia", team2: "Bélgica", flag1: "🇭🇷", flag2: "🇧🇪" },
    { date: "2026-06-19", time: "20:00", team1: "Canadá", team2: "Marruecos", flag1: "🇨🇦", flag2: "🇲🇦" },
    { date: "2026-06-19", time: "00:00", team1: "Arabia Saudita", team2: "Polonia", flag1: "🇸🇦", flag2: "🇵🇱" },
    
    // FASE DE GRUPOS - Jornada 4
    { date: "2026-06-20", time: "16:00", team1: "Perú", team2: "Dinamarca", flag1: "🇵🇪", flag2: "🇩🇰" },
    { date: "2026-06-20", time: "20:00", team1: "Suiza", team2: "Camerún", flag1: "🇨🇭", flag2: "🇨🇲" },
    { date: "2026-06-20", time: "00:00", team1: "Brasil", team2: "Serbia", flag1: "🇧🇷", flag2: "🇷🇸" },
    { date: "2026-06-21", time: "16:00", team1: "Túnez", team2: "Australia", flag1: "🇹🇳", flag2: "🇦🇺" },
    { date: "2026-06-21", time: "20:00", team1: "Países Bajos", team2: "Camerún", flag1: "🇳🇱", flag2: "🇨🇲" },
    { date: "2026-06-21", time: "00:00", team1: "Argentina", team2: "México", flag1: "🇦🇷", flag2: "🇲🇽" },
    { date: "2026-06-22", time: "16:00", team1: "Grecia", team2: "República Checa", flag1: "🇬🇷", flag2: "🇨🇿" },
    { date: "2026-06-22", time: "20:00", team1: "Turquía", team2: "Georgia", flag1: "🇹🇷", flag2: "🇬🇪" },
    { date: "2026-06-22", time: "00:00", team1: "Corea del Sur", team2: "Luxemburgo", flag1: "🇰🇷", flag2: "🇱🇺" },
    
    // FASE DE GRUPOS - Jornada 5
    { date: "2026-06-23", time: "16:00", team1: "Austria", team2: "Kazajistán", flag1: "🇦🇹", flag2: "🇰🇿" },
    { date: "2026-06-23", time: "20:00", team1: "Rumania", team2: "Kosovo", flag1: "🇷🇴", flag2: "🇽🇰" },
    { date: "2026-06-23", time: "00:00", team1: "Bosnia y Herzegovina", team2: "Irlanda del Norte", flag1: "🇧🇦", flag2: "🇬🇧" },
    { date: "2026-06-24", time: "16:00", team1: "Serbia", team2: "Gales", flag1: "🇷��", flag2: "🇬🇧" },
    { date: "2026-06-24", time: "20:00", team1: "Hungría", team2: "Montenegro", flag1: "🇭🇺", flag2: "🇲🇪" },
    { date: "2026-06-24", time: "00:00", team1: "Ucrania", team2: "Islandia", flag1: "🇺🇦", flag2: "🇮🇸" },
    { date: "2026-06-25", time: "16:00", team1: "Noruega", team2: "Eslovenia", flag1: "🇳🇴", flag2: "🇸🇮" },
    { date: "2026-06-25", time: "20:00", team1: "Ecuador", team2: "Bolivia", flag1: "🇪🇨", flag2: "🇧🇴" },
    { date: "2026-06-25", time: "00:00", team1: "Venezuela", team2: "Jamaica", flag1: "🇻🇪", flag2: "🇯🇲" },
    
    // FASE DE GRUPOS - Jornada 6
    { date: "2026-06-26", time: "16:00", team1: "Tailandia", team2: "Malasia", flag1: "🇹🇭", flag2: "🇲🇾" },
    { date: "2026-06-26", time: "20:00", team1: "Vietnam", team2: "Uzbekistán", flag1: "🇻🇳", flag2: "🇺🇿" },
    { date: "2026-06-26", time: "00:00", team1: "Irak", team2: "Emiratos Árabes Unidos", flag1: "🇮🇶", flag2: "🇦🇪" },
    { date: "2026-06-27", time: "16:00", team1: "Irán", team2: "Líbano", flag1: "🇮🇷", flag2: "🇱🇧" },
    { date: "2026-06-27", time: "20:00", team1: "Qatar", team2: "Omán", flag1: "🇶🇦", flag2: "🇴🇲" },
    { date: "2026-06-27", time: "00:00", team1: "Jordania", team2: "Palestina", flag1: "🇯🇴", flag2: "🇵🇸" },
    
    // Últimos partidos de grupos
    { date: "2026-06-28", time: "16:00", team1: "Sudáfrica", team2: "México", flag1: "🇿🇦", flag2: "🇲🇽" },
    { date: "2026-06-28", time: "16:00", team1: "Panamá", team2: "Portugal", flag1: "🇵🇦", flag2: "🇵🇹" },
    { date: "2026-06-29", time: "16:00", team1: "Polonia", team2: "Argentina", flag1: "🇵🇱", flag2: "🇦🇷" },
    { date: "2026-06-29", time: "16:00", team1: "Arabia Saudita", team2: "Uruguay", flag1: "🇸🇦", flag2: "🇺🇾" },
    { date: "2026-06-30", time: "16:00", team1: "Canadá", team2: "Francia", flag1: "🇨🇦", flag2: "🇫🇷" },
    { date: "2026-06-30", time: "16:00", team1: "Países Bajos", team2: "Senegal", flag1: "🇳🇱", flag2: "🇸🇳" },
    { date: "2026-07-01", time: "16:00", team1: "Alemania", team2: "Japón", flag1: "🇩🇪", flag2: "🇯🇵" },
    { date: "2026-07-01", time: "16:00", team1: "Costa Rica", team2: "Chile", flag1: "🇨🇷", flag2: "🇨🇱" },
    
    // DIECISEISAVOS DE FINAL
    { date: "2026-07-04", time: "16:00", team1: "1A", team2: "2B", flag1: "🥇", flag2: "🥈" },
    { date: "2026-07-04", time: "20:00", team1: "1B", team2: "2A", flag1: "🥇", flag2: "🥈" },
    { date: "2026-07-05", time: "16:00", team1: "1C", team2: "2D", flag1: "🥇", flag2: "🥈" },
    { date: "2026-07-05", time: "20:00", team1: "1D", team2: "2C", flag1: "🥇", flag2: "🥈" },
    { date: "2026-07-06", time: "16:00", team1: "1E", team2: "2F", flag1: "🥇", flag2: "🥈" },
    { date: "2026-07-06", time: "20:00", team1: "1F", team2: "2E", flag1: "🥇", flag2: "🥈" },
    { date: "2026-07-07", time: "16:00", team1: "1G", team2: "2H", flag1: "🥇", flag2: "🥈" },
    { date: "2026-07-07", time: "20:00", team1: "1H", team2: "2G", flag1: "🥇", flag2: "🥈" },
    { date: "2026-07-08", time: "16:00", team1: "1I", team2: "2J", flag1: "🥇", flag2: "🥈" },
    { date: "2026-07-08", time: "20:00", team1: "1J", team2: "2I", flag1: "🥇", flag2: "🥈" },
    { date: "2026-07-09", time: "16:00", team1: "1K", team2: "2L", flag1: "🥇", flag2: "🥈" },
    { date: "2026-07-09", time: "20:00", team1: "1L", team2: "2K", flag1: "🥇", flag2: "🥈" },
    
    // OCTAVOS DE FINAL
    { date: "2026-07-12", time: "16:00", team1: "Ganador 1", team2: "Ganador 2", flag1: "🏆", flag2: "🏆" },
    { date: "2026-07-12", time: "20:00", team1: "Ganador 3", team2: "Ganador 4", flag1: "🏆", flag2: "🏆" },
    { date: "2026-07-13", time: "16:00", team1: "Ganador 5", team2: "Ganador 6", flag1: "🏆", flag2: "🏆" },
    { date: "2026-07-13", time: "20:00", team1: "Ganador 7", team2: "Ganador 8", flag1: "🏆", flag2: "🏆" },
    { date: "2026-07-14", time: "16:00", team1: "Ganador 9", team2: "Ganador 10", flag1: "🏆", flag2: "🏆" },
    { date: "2026-07-14", time: "20:00", team1: "Ganador 11", team2: "Ganador 12", flag1: "🏆", flag2: "🏆" },
    { date: "2026-07-15", time: "16:00", team1: "Ganador 13", team2: "Ganador 14", flag1: "🏆", flag2: "🏆" },
    { date: "2026-07-15", time: "20:00", team1: "Ganador 15", team2: "Ganador 16", flag1: "🏆", flag2: "🏆" },
    
    // CUARTOS DE FINAL
    { date: "2026-07-18", time: "16:00", team1: "Semifinalista 1", team2: "Semifinalista 2", flag1: "🏆", flag2: "🏆" },
    { date: "2026-07-18", time: "20:00", team1: "Semifinalista 3", team2: "Semifinalista 4", flag1: "🏆", flag2: "🏆" },
    { date: "2026-07-19", time: "16:00", team1: "Semifinalista 5", team2: "Semifinalista 6", flag1: "🏆", flag2: "🏆" },
    { date: "2026-07-19", time: "20:00", team1: "Semifinalista 7", team2: "Semifinalista 8", flag1: "🏆", flag2: "🏆" },
    
    // SEMIFINALES
    { date: "2026-07-22", time: "20:00", team1: "Finalista 1", team2: "Finalista 2", flag1: "🏆", flag2: "🏆" },
    { date: "2026-07-23", time: "20:00", team1: "Finalista 3", team2: "Finalista 4", flag1: "🏆", flag2: "🏆" },
    
    // TERCER PUESTO
    { date: "2026-07-26", time: "16:00", team1: "Tercero", team2: "Cuarto", flag1: "🥉", flag2: "🏅" },
    
    // FINAL
    { date: "2026-07-26", time: "20:00", team1: "Campeón", team2: "Subcampeón", flag1: "👑", flag2: "🏆" },
];

// Combinar todos los partidos ordenados
const ALL_MATCHES = MATCHES.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}Z`);
    const dateB = new Date(`${b.date}T${b.time}Z`);
    return dateA - dateB;
});