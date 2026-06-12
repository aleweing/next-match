⚽ **Next Match** ⚽
==================

Aplicación web para visualizar los partidos de la Copa Mundial 2026, con resultados en tiempo real.

## Características

✅ **Navegación por swipe/desliza**
- Desliza hacia la derecha para ver el partido anterior
- Desliza hacia la izquierda para ver el próximo partido
- Rebote visual al llegar al final o inicio

✅ **Resultados en tiempo real**
- Integración con la API de football-data.org via proxy Cloudflare Workers
- Muestra marcador en vivo durante el partido (⚽ En juego · X - X)
- Muestra resultado final automáticamente (Finalizado · X - X)
- Se actualiza cada minuto cuando hay un partido en curso

✅ **Countdown inteligente**
- Cuenta regresiva hasta el partido (días, horas, minutos)
- Al iniciar el partido muestra "⚽ Partido iniciado"
- A las 2,5 horas marca el partido como finalizado si la API no responde
- La fecha y hora se muestran siempre en la zona horaria del dispositivo

✅ **Filtro por equipo**
- Filtra partidos de tu equipo favorito
- Búsqueda en tiempo real

✅ **Salto a fecha específica**
- Calendario seleccionable
- Ir al próximo partido disponible

✅ **Tema claro/oscuro**
- Toggle para cambiar tema
- Preferencia guardada en localStorage

✅ **Diseño adaptable**
- Vista vertical: equipo 1, bandera, vs, equipo 2, bandera, fecha, hora, countdown
- Vista horizontal: equipos y banderas en fila, datos debajo
- Tamaños fluidos con clamp() para adaptarse a cualquier pantalla
- Optimizado para iPhone y Android de cualquier tamaño

✅ **Banderas**
- Emojis de bandera para la mayoría de países
- SVG inline para banderas británicas (Inglaterra, Escocia, Gales, Irlanda del Norte)

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

2. Abre `index.html` desde un servidor local (necesario para la API):
   ```bash
   npx serve .
   # o
   python3 -m http.server 8000
   ```

> ⚠️ No funciona abriendo el archivo directamente (`file://`) por restricciones CORS de la API.

## Uso

### Navegación
- **Swipe derecha**: Partido anterior
- **Swipe izquierda**: Próximo partido
- **Flechas del teclado**: ← → (escritorio)
- **Botón Próximo partido**: Salta siempre al siguiente partido pendiente

### Menú (☰)
- **Tema**: Cambia entre claro y oscuro
- **Filtrar por equipo**: Escribe el nombre de tu equipo
- **Ir a una fecha**: Selecciona una fecha específica del calendario
- **Próximo partido**: Vuelve al próximo partido disponible

## Arquitectura de datos

Los resultados se obtienen en tiempo real mediante:

```
GitHub Pages → Cloudflare Worker (proxy) → football-data.org API
```

El Worker resuelve el problema de CORS permitiendo llamadas desde cualquier dominio. Se actualiza automáticamente cada minuto cuando hay un partido en curso.

Los 104 partidos están hardcodeados en `js/data.js` con:
- Fecha (formato ISO: YYYY-MM-DD)
- Hora UTC
- Nombres de equipos en español
- Banderas emoji

## Tecnología

- **HTML5**: Estructura semántica
- **CSS3**: Responsive con clamp(), dvh, y media queries por orientación
- **JavaScript vanilla**: Sin dependencias externas
- **Cloudflare Workers**: Proxy gratuito para la API de resultados
- **football-data.org**: API de resultados en tiempo real

## Licencia

MIT - Siéntete libre de usar y modificar este proyecto.

---

Hecho con ⚽ para los amantes del fútbol mundial.
