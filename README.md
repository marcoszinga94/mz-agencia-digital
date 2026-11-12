# Agencia Digital — Terminal de Gestión

> Idle clicker en el que gestionás una agencia digital: generás recursos, contratás equipo y escalás de proyectos locales a infraestructura planetaria.

![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)

## Características

- **Tres recursos productivos:** líneas de código (LoC), piezas de diseño (PD) y tráfico. Cada uno se genera con clics o de forma pasiva.
- **Equipo contratable:** developers, designers y marketers aportan producción pasiva y aceleran los proyectos en curso.
- **Tienda de mejoras:** 18 mejoras repartidas en las áreas de desarrollo, diseño y marketing, con efectos sobre clics y producción por segundo.
- **Proyectos con progreso:** 15 encargos (12 base y 3 desbloqueables) que consumen recursos, avanzan con el equipo y recompensan dinero y reputación. Incluye cancelación con reembolso parcial y modo de repetición automática.
- **Seguidores:** se obtienen al hacer clic en marketing y generan tráfico y dinero extra de forma pasiva.
- **Prestigio ("rebrand"):** reiniciás la partida a cambio de puntos de prestigio y mejoras permanentes organizadas en un árbol con ramas, tiers y requisitos.
- **Ascensión:** al completar todas las habilidades base se desbloquea una segunda capa de progresión con nuevas ramas y proyectos avanzados.
- **Guardado local:** la partida se persiste en `localStorage` y se recupera al volver a abrir la página.

## Stack

| Capa | Tecnología |
| --- | --- |
| Framework | Astro 5 |
| UI | React 19 (islas) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS 3 + CSS propio |
| Persistencia | `localStorage` |

## Estructura del proyecto

```text
src/
├── pages/index.astro      # Entrada de la isla React
├── components/            # Interfaz del juego (paneles, modales, barra)
│   ├── App.tsx            # Estado, tick de 100 ms y guardado
│   ├── ProjectPanel.tsx   # Lista y progreso de proyectos
│   ├── TeamPanel.tsx      # Contratación del equipo
│   ├── ShopTabs.tsx       # Mejoras y acceso al prestigio
│   └── SkillTreeModal.tsx # Árbol de mejoras de prestigio
├── game/
│   ├── types.ts           # Modelo de datos del juego
│   ├── data.ts            # Mejoras, proyectos y árbol de prestigio
│   └── logic.ts           # Cálculos, acciones, tick y guardado
└── styles/game.css        # Estilos de la terminal
```

## Puesta en marcha

### Requisitos

- Node.js 18 o superior
- npm

### Instalación

```bash
npm install
npm run dev
```

La aplicación queda disponible en el servidor local que imprime Astro.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera el sitio de producción en `dist/` |
| `npm run preview` | Sirve localmente la build de producción |

## Despliegue

Al ser un sitio estático generado por Astro, la salida de `npm run build` puede publicarse en cualquier hosting de archivos estáticos (Netlify, Vercel, GitHub Pages o un servidor propio). No requiere backend: todo el estado vive en el navegador.

## Estado del proyecto

Funcional y jugable de principio a fin, con bucle idle completo, prestigio y ascensión. No incluye tests automatizados ni configuración de linting.

## Licencia

Sin licencia definida.

## Autor

Marcos Zingaretti — https://github.com/marcoszinga94
