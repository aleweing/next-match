⚽ **Next Match** ⚽
==================

Aplicación web para visualizar el próximo partido de la Copa Mundial 2026.

## Características

✅ **Navegación por swipe/desliza**
- Desliza hacia la derecha para ver el partido anterior
- Desliza hacia la izquierda para ver el próximo partido
- Rebote visual al llegar al final o inicio

✅ **Filtro por equipo**
- Filtra partidos de tu equipo favorito
- Búsqueda en tiempo real

✅ **Salto a fecha específica**
- Calendario seleccionable
- Ir al próximo partido disponible

✅ **Información de cada partido**
- Equipos con banderas emoji
- Fecha completa en español
- Hora respetando la zona horaria del dispositivo
- Countdown hasta el partido (días, horas, minutos)

✅ **Tema claro/oscuro**
- Toggle para cambiar tema
- Preferencia guardada en localStorage

✅ **Responsive**
- Optimizado para móvil (cualquier tamaño de pantalla)
- Compatible con iPhone y Android

## Estructura

```
├── index.html          # HTML5 principal
├── css/
│   └── style.css       # Estilos y temas
├── js/
│   ├── data.js         # 104 partidos del Mundial 2026
│   └── app.js          # Lógica de la aplicación
└── README.md           # Este archivo
```

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/aleweing/next-match.git
   cd next-match
   ```

2. Abre `index.html` en tu navegador (funciona offline)

## Uso

### Navegación
- **Swipe derecha**: Partido anterior
- **Swipe izquierda**: Próximo partido
- **Flechas del teclado**: ← → (si estás en escritorio)

### Menú (☰)
- **Tema**: Cambia entre claro y oscuro
- **Filtrar por equipo**: Escribe el nombre de tu equipo
- **Ir a una fecha**: Selecciona una fecha específica del calendario
- **Próximo partido**: Vuelve al próximo partido disponible

## Tecnología

- **HTML5**: Estructura semántica
- **CSS3**: Estilos responsive con temas
- **JavaScript vanilla**: Sin dependencias externas
- **Emojis**: Para banderas y iconos (máxima compatibilidad)

## Datos

Los 104 partidos están hardcodeados en `js/data.js` con:
- Fecha (formato ISO: YYYY-MM-DD)
- Hora UTC
- Nombres de equipos
- Banderas emoji (🇲🇽, 🇿🇦, etc.)

## Licencia

MIT - Siéntete libre de usar y modificar este proyecto.

---

Hecho con ⚽ para los amantes del fútbol mundial.