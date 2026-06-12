// Datos de los 104 partidos del Mundial 2026
// Basado en la API oficial FIFA: https://givevoicetofootball.fifa.com/api/v1/calendar/matches
// Formato: fecha ISO (YYYY-MM-DD), hora UTC, equipos, banderas emoji

const MATCHES = [
    // FASE DE GRUPOS - Jornada 1
  { date: "2026-06-11", time: "19:00", team1: "México", team2: "Sudáfrica", flag1: "🇲🇽", flag2: "🇿🇦" },
  { date: "2026-06-12", time: "02:00", team1: "República de Corea", team2: "República Checa", flag1: "🇰🇷", flag2: "🇨🇿" },
  { date: "2026-06-12", time: "19:00", team1: "Canadá", team2: "Bosnia y Herzegovina", flag1: "🇨🇦", flag2: "🇧🇦" },
  { date: "2026-06-13", time: "01:00", team1: "Estados Unidos", team2: "Paraguay", flag1: "🇺🇸", flag2: "🇵🇾" },
  { date: "2026-06-13", time: "19:00", team1: "Catar", team2: "Suiza", flag1: "🇶🇦", flag2: "🇨🇭" },
  { date: "2026-06-13", time: "22:00", team1: "Brasil", team2: "Marruecos", flag1: "🇧🇷", flag2: "🇲🇦" },
  { date: "2026-06-14", time: "01:00", team1: "Haití", team2: "Escocia", flag1: "🇭🇹", flag2: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { date: "2026-06-14", time: "04:00", team1: "Australia", team2: "Turquía", flag1: "🇦🇺", flag2: "🇹🇷" },
  { date: "2026-06-14", time: "17:00", team1: "Alemania", team2: "Curazao", flag1: "🇩🇪", flag2: "🇨🇼" },
  { date: "2026-06-14", time: "20:00", team1: "Países Bajos", team2: "Japón", flag1: "🇳🇱", flag2: "🇯🇵" },
  { date: "2026-06-14", time: "23:00", team1: "Costa de Marfil", team2: "Ecuador", flag1: "🇨🇮", flag2: "🇪🇨" },
  { date: "2026-06-15", time: "02:00", team1: "Suecia", team2: "Túnez", flag1: "🇸🇪", flag2: "🇹🇳" },
  { date: "2026-06-15", time: "16:00", team1: "España", team2: "Cabo Verde", flag1: "🇪🇸", flag2: "🇨🇻" },
  { date: "2026-06-15", time: "19:00", team1: "Bélgica", team2: "Egipto", flag1: "🇧🇪", flag2: "🇪🇬" },
  { date: "2026-06-15", time: "22:00", team1: "Arabia Saudí", team2: "Uruguay", flag1: "🇸🇦", flag2: "🇺🇾" },
  { date: "2026-06-16", time: "01:00", team1: "RI de Irán", team2: "Nueva Zelanda", flag1: "🇮🇷", flag2: "🇳🇿" },
  { date: "2026-06-16", time: "19:00", team1: "Francia", team2: "Senegal", flag1: "🇫🇷", flag2: "🇸🇳" },
  { date: "2026-06-16", time: "22:00", team1: "Irak", team2: "Noruega", flag1: "🇮🇶", flag2: "🇳🇴" },
  { date: "2026-06-17", time: "01:00", team1: "Argentina", team2: "Argelia", flag1: "🇦🇷", flag2: "🇩🇿" },
  { date: "2026-06-17", time: "04:00", team1: "Austria", team2: "Jordania", flag1: "🇦🇹", flag2: "🇯🇴" },
  { date: "2026-06-17", time: "18:00", team1: "Portugal", team2: "RD Congo", flag1: "🇵🇹", flag2: "🇨🇩" },
  { date: "2026-06-17", time: "21:00", team1: "Inglaterra", team2: "Croacia", flag1: "🇬🇧", flag2: "🇭🇷" },
  { date: "2026-06-18", time: "00:00", team1: "Ghana", team2: "Panamá", flag1: "🇬🇭", flag2: "🇵🇦" },
  { date: "2026-06-18", time: "03:00", team1: "Uzbekistán", team2: "Colombia", flag1: "🇺🇿", flag2: "🇨🇴" },
 
    // FASE DE GRUPOS - Jornada 2
  { date: "2026-06-18", time: "16:00", team1: "República Checa", team2: "Sudáfrica", flag1: "🇨🇿", flag2: "🇿🇦" },
  { date: "2026-06-18", time: "19:00", team1: "Suiza", team2: "Bosnia y Herzegovina", flag1: "🇨🇭", flag2: "🇧🇦" },
  { date: "2026-06-18", time: "22:00", team1: "Canadá", team2: "Catar", flag1: "🇨🇦", flag2: "🇶🇦" },
  { date: "2026-06-19", time: "01:00", team1: "México", team2: "República de Corea", flag1: "🇲🇽", flag2: "🇰🇷" },
  { date: "2026-06-19", time: "19:00", team1: "Estados Unidos", team2: "Australia", flag1: "🇺🇸", flag2: "🇦🇺" },
  { date: "2026-06-19", time: "22:00", team1: "Escocia", team2: "Marruecos", flag1: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", flag2: "🇲🇦" },
  { date: "2026-06-20", time: "01:00", team1: "Brasil", team2: "Haití", flag1: "🇧🇷", flag2: "🇭🇹" },
  { date: "2026-06-20", time: "04:00", team1: "Turquía", team2: "Paraguay", flag1: "🇹🇷", flag2: "🇵🇾" },
  { date: "2026-06-20", time: "17:00", team1: "Países Bajos", team2: "Suecia", flag1: "🇳🇱", flag2: "🇸🇪" },
  { date: "2026-06-20", time: "20:00", team1: "Alemania", team2: "Costa de Marfil", flag1: "🇩🇪", flag2: "🇨🇮" },
  { date: "2026-06-21", time: "02:00", team1: "Ecuador", team2: "Curazao", flag1: "🇪🇨", flag2: "🇨🇼" },
  { date: "2026-06-21", time: "04:00", team1: "Túnez", team2: "Japón", flag1: "🇹🇳", flag2: "🇯🇵" },
  { date: "2026-06-21", time: "16:00", team1: "España", team2: "Arabia Saudí", flag1: "🇪🇸", flag2: "🇸🇦" },
  { date: "2026-06-21", time: "19:00", team1: "Bélgica", team2: "RI de Irán", flag1: "🇧🇪", flag2: "🇮🇷" },
  { date: "2026-06-21", time: "22:00", team1: "Uruguay", team2: "Cabo Verde", flag1: "🇺🇾", flag2: "🇨🇻" },
  { date: "2026-06-22", time: "01:00", team1: "Nueva Zelanda", team2: "Egipto", flag1: "🇳🇿", flag2: "🇪🇬" },
  { date: "2026-06-22", time: "17:00", team1: "Argentina", team2: "Austria", flag1: "🇦🇷", flag2: "🇦🇹" },
  { date: "2026-06-22", time: "21:00", team1: "Francia", team2: "Irak", flag1: "🇫🇷", flag2: "🇮🇶" },
  { date: "2026-06-23", time: "00:00", team1: "Noruega", team2: "Senegal", flag1: "🇳🇴", flag2: "🇸🇳" },
  { date: "2026-06-23", time: "03:00", team1: "Jordania", team2: "Argelia", flag1: "🇯🇴", flag2: "🇩🇿" },
  { date: "2026-06-23", time: "17:00", team1: "Portugal", team2: "Uzbekistán", flag1: "🇵🇹", flag2: "🇺🇿" },
  { date: "2026-06-23", time: "20:00", team1: "Inglaterra", team2: "Ghana", flag1: "🇬🇧", flag2: "🇬🇭" },
  { date: "2026-06-23", time: "23:00", team1: "Panamá", team2: "Croacia", flag1: "🇵🇦", flag2: "🇭🇷" },
  { date: "2026-06-24", time: "02:00", team1: "Colombia", team2: "RD Congo", flag1: "🇨🇴", flag2: "🇨🇩" },

    // FASE DE GRUPOS - Jornada 3

  { date: "2026-06-24", time: "19:00", team1: "Suiza", team2: "Canadá", flag1: "🇨🇭", flag2: "🇨🇦" },
  { date: "2026-06-24", time: "19:00", team1: "Bosnia y Herzegovina", team2: "Catar", flag1: "🇧🇦", flag2: "🇶🇦" },
  { date: "2026-06-24", time: "22:00", team1: "Escocia", team2: "Brasil", flag1: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", flag2: "🇧🇷" },
  { date: "2026-06-24", time: "22:00", team1: "Marruecos", team2: "Haití", flag1: "🇲🇦", flag2: "🇭🇹" },
  { date: "2026-06-25", time: "01:00", team1: "República Checa", team2: "México", flag1: "🇨🇿", flag2: "🇲🇽" },
  { date: "2026-06-25", time: "01:00", team1: "Sudáfrica", team2: "República de Corea", flag1: "🇿🇦", flag2: "🇰🇷" },
  { date: "2026-06-25", time: "20:00", team1: "Curazao", team2: "Costa de Marfil", flag1: "🇨🇼", flag2: "🇨🇮" },
  { date: "2026-06-25", time: "20:00", team1: "Ecuador", team2: "Alemania", flag1: "🇪🇨", flag2: "🇩🇪" },
  { date: "2026-06-25", time: "23:00", team1: "Japón", team2: "Suecia", flag1: "🇯🇵", flag2: "🇸🇪" },
  { date: "2026-06-25", time: "23:00", team1: "Túnez", team2: "Países Bajos", flag1: "🇹🇳", flag2: "🇳🇱" },
  { date: "2026-06-26", time: "02:00", team1: "Turquía", team2: "Estados Unidos", flag1: "🇹🇷", flag2: "🇺🇸" },
  { date: "2026-06-26", time: "02:00", team1: "Paraguay", team2: "Australia", flag1: "🇵🇾", flag2: "🇦🇺" },
  { date: "2026-06-26", time: "19:00", team1: "Noruega", team2: "Francia", flag1: "🇳🇴", flag2: "🇫🇷" },
  { date: "2026-06-26", time: "19:00", team1: "Senegal", team2: "Irak", flag1: "🇸🇳", flag2: "🇮🇶" },
  { date: "2026-06-27", time: "00:00", team1: "Cabo Verde", team2: "Arabia Saudí", flag1: "🇨🇻", flag2: "🇸🇦" },
  { date: "2026-06-27", time: "00:00", team1: "Uruguay", team2: "España", flag1: "🇺🇾", flag2: "🇪🇸" },
  { date: "2026-06-27", time: "03:00", team1: "Egipto", team2: "RI de Irán", flag1: "🇪🇬", flag2: "🇮🇷" },
  { date: "2026-06-27", time: "03:00", team1: "Nueva Zelanda", team2: "Bélgica", flag1: "🇳🇿", flag2: "🇧🇪" },
  { date: "2026-06-27", time: "21:00", team1: "Panamá", team2: "Inglaterra", flag1: "🇵🇦", flag2: "🇬🇧" },
  { date: "2026-06-27", time: "21:00", team1: "Croacia", team2: "Ghana", flag1: "🇭🇷", flag2: "🇬🇭" },
  { date: "2026-06-27", time: "23:30", team1: "Colombia", team2: "Portugal", flag1: "🇨🇴", flag2: "🇵🇹" },
  { date: "2026-06-27", time: "23:30", team1: "RD Congo", team2: "Uzbekistán", flag1: "🇨🇩", flag2: "🇺🇿" },
  { date: "2026-06-28", time: "02:00", team1: "Argelia", team2: "Austria", flag1: "🇩🇿", flag2: "🇦🇹" },
  { date: "2026-06-28", time: "02:00", team1: "Jordania", team2: "Argentina", flag1: "🇯🇴", flag2: "🇦🇷" },
    
    // DIECISEISAVOS DE FINAL
    { date: "2026-06-28", time: "19:00", team1: "2º Grupo A", team2: "2º Grupo B", flag1: "🥇", flag2: "🥈" },
  { date: "2026-06-29", time: "19:00", team1: "1º Grupo E", team2: "3º Grupo A/B/C/D/F", flag1: "🥇", flag2: "🥈" },
  { date: "2026-06-29", time: "22:00", team1: "1º Grupo F", team2: "2º Grupo C", flag1: "🥇", flag2: "🥈" },
  { date: "2026-06-30", time: "01:00", team1: "1º Grupo C", team2: "2º Grupo F", flag1: "🥇", flag2: "🥈" },
  { date: "2026-06-30", time: "19:00", team1: "1º Grupo I", team2: "3º Grupo C/D/F/G/H", flag1: "🥇", flag2: "🥈" },
  { date: "2026-06-30", time: "22:00", team1: "2º Grupo E", team2: "2º Grupo I", flag1: "🥇", flag2: "🥈" },
  { date: "2026-07-01", time: "01:00", team1: "1º Grupo A", team2: "3º Grupo C/E/F/H/I", flag1: "🥇", flag2: "🥈" },
  { date: "2026-07-01", time: "19:00", team1: "1º Grupo L", team2: "3º Grupo E/H/I/J/K", flag1: "🥇", flag2: "🥈" },  
  { date: "2026-07-01", time: "22:00", team1: "1º Grupo D", team2: "3º Grupo B/E/F/I/J", flag1: "🥇", flag2: "🥈" },
  { date: "2026-07-02", time: "01:00", team1: "1º Grupo G", team2: "3º Grupo A/E/H/I/J", flag1: "🥇", flag2: "🥈" },
  { date: "2026-07-02", time: "19:00", team1: "2º Grupo K", team2: "2º Grupo L", flag1: "🥇", flag2: "🥈" },
  { date: "2026-07-02", time: "22:00", team1: "1º Grupo H", team2: "2º Grupo J", flag1: "🥇", flag2: "🥈" },
  { date: "2026-07-03", time: "01:00", team1: "1º Grupo B", team2: "3º Grupo E/F/G/I/J", flag1: "🥇", flag2: "🥈" },
  { date: "2026-07-03", time: "23:00", team1: "1º Grupo J", team2: "2º Grupo H", flag1: "🥇", flag2: "🥈" },
  { date: "2026-07-04", time: "02:00", team1: "1º Grupo K", team2: "3º Grupo D/E/I/J/L", flag1: "🥇", flag2: "🥈" },
  { date: "2026-07-04", time: "03:00", team1: "2º Grupo D", team2: "2º Grupo G", flag1: "🥇", flag2: "🥈" },
    
    // OCTAVOS DE FINAL
  { date: "2026-07-04", time: "19:00", team1: "Ganador Partido 74", team2: "Ganador Partido 77", flag1: "🏆", flag2: "🏆" },
  { date: "2026-07-04", time: "22:00", team1: "Ganador Partido 73", team2: "Ganador Partido 75", flag1: "🏆", flag2: "🏆" },
  { date: "2026-07-05", time: "19:00", team1: "Ganador Partido 76", team2: "Ganador Partido 78", flag1: "🏆", flag2: "🏆" },
  { date: "2026-07-05", time: "22:00", team1: "Ganador Partido 79", team2: "Ganador Partido 80", flag1: "🏆", flag2: "🏆" },
  { date: "2026-07-06", time: "19:00", team1: "Ganador Partido 83", team2: "Ganador Partido 84", flag1: "🏆", flag2: "🏆" },
  { date: "2026-07-06", time: "22:00", team1: "Ganador Partido 81", team2: "Ganador Partido 82", flag1: "🏆", flag2: "🏆" },
  { date: "2026-07-07", time: "19:00", team1: "Ganador Partido 86", team2: "Ganador Partido 88", flag1: "🏆", flag2: "🏆" },
  { date: "2026-07-07", time: "22:00", team1: "Ganador Partido 85", team2: "Ganador Partido 87", flag1: "🏆", flag2: "🏆" },
    
    // CUARTOS DE FINAL
  { date: "2026-07-09", time: "19:00", team1: "Ganador Partido 89", team2: "Ganador Partido 90", flag1: "🏆", flag2: "🏆" },
  { date: "2026-07-10", time: "19:00", team1: "Ganador Partido 93", team2: "Ganador Partido 94", flag1: "🏆", flag2: "🏆" },
  { date: "2026-07-11", time: "19:00", team1: "Ganador Partido 91", team2: "Ganador Partido 92", flag1: "🏆", flag2: "🏆" },
  { date: "2026-07-11", time: "22:00", team1: "Ganador Partido 95", team2: "Ganador Partido 96", flag1: "🏆", flag2: "🏆" },
    
    // SEMIFINALES
  { date: "2026-07-14", time: "19:00", team1: "Ganador Partido 97", team2: "Ganador Partido 98", flag1: "🏆", flag2: "🏆" },
  { date: "2026-07-15", time: "19:00", team1: "Ganador Partido 99", team2: "Ganador Partido 100", flag1: "🏆", flag2: "🏆" },
    
    // TERCER PUESTO
  { date: "2026-07-18", time: "19:00", team1: "Perdedor Partido 101", team2: "Perdedor Partido 102", flag1: "🥉", flag2: "🏅" },
    
    // FINAL
{ date: "2026-07-19", time: "19:00", team1: "Ganador Partido 101", team2: "Ganador Partido 102", flag1: "👑", flag2: "🏆" },
];

// Combinar todos los partidos ordenados
const ALL_MATCHES = MATCHES.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}Z`);
    const dateB = new Date(`${b.date}T${b.time}Z`);
    return dateA - dateB;
});
