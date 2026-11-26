# GEMINI / ANTIGRAVITY GUIDELINES - CC INMOBILIARIA (CORRIENTES CAPITAL)

Si estas leyendo este documento, acabas de ser inicializado como agente en el repositorio de `cc-inmobiliaria`. Este archivo centraliza todas las especificaciones tecnicas, reglas operativas, arquitectura Next.js y directrices visuales del proyecto. Todo agente debe leer y respetar este documento antes de crear o modificar cualquier archivo.

---

## 1. REGLAS OPERATIVAS ESTRICTAS PARA AGENTES

1. **PROHIBICION TOTAL DE EMOJIS:** No utilices emojis en ninguna parte del proyecto: ni en el codigo fuente, ni en la interfaz de usuario, ni en textos visibles, ni en logs, ni en este `GEMINI.md`. Todo simbolo visual debe implementarse exclusivamente mediante `react-icons/pi`.
2. **PROHIBICION DE GUION LARGO (EM-DASH y EN-DASH):** No usar guiones largos en textos visibles ni en codigo. Usar punto, coma, barra `/` o guion corto `-`.
3. **EDICION DE ARCHIVOS NATIVA (WINDOWS ENCODING):** Esta terminantemente prohibido usar redirecciones o comandos de PowerShell (`Set-Content`, `Out-File`, `echo >`) para crear o editar archivos de codigo fuente o configuracion, ya que introducen BOM y corrompen archivos. Usar siempre las herramientas nativas de escritura y edicion.
4. **SIN COMANDOS DE BUILD, RUN O GIT NO SOLICITADOS:** No ejecutes `npm run dev`, `npm run build`, `npm start` ni comandos de Git (`git commit`, `git push`, `git status`, etc.) a menos que el usuario lo solicite de forma explicita. El usuario se encarga de levantar y versionar la aplicacion.
5. **POCOS COMENTARIOS:** El codigo debe ser limpio, directo y autoexplicativo. Evitar bloques JSDoc innecesarios o comentarios redundantes.
6. **ACTUALIZACION CONTINUA DE ESTE DOCUMENTO:** Cada vez que se agregue una ruta, componente, propiedad o regla de negocio, actualizar este `GEMINI.md`.

---

## 2. STACK TECNOLOGICO Y ARQUITECTURA (NEXT.JS 16 + REACT 19)

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** JavaScript (ES6+, `.js` y `.jsx`). No utilizar TypeScript (`.ts` / `.tsx`).
- **UI Library:** React 19
  - **Server Components por defecto:** `layout.js`, `page.js`, `catalogo/page.js`, `vender/page.js`, `[slug]/page.js`, `not-found.js` y `Footer.jsx` son Server Components para maximizar SEO y LCP.
  - **Client Components (`"use client"`) aislados:** Solo en componentes con estado, observers o hooks de navegador (`Navbar.jsx`, `Reveal.jsx`, `HeroVideo.jsx`, `CatalogClient.jsx`, `PropertyGallery.jsx`, `PropertyActionsBar.jsx`, `PropertyFloorplan.jsx`, `LocationMap3D.jsx`, `PropertyInquiryForm.jsx`, `ValuationFunnelForm.jsx`).
- **Estilos:** Tailwind CSS v4 (`@tailwindcss/postcss`) configurado en `src/app/globals.css`.
- **Iconografia:** `react-icons/pi` (Phosphor Icons) exclusivamente.
- **Imagenes:** `next/image` sirviendo activos locales desde `public/images/`, con `allowedDevOrigins` configurado en `next.config.mjs` para pruebas en red local.
- **Alias de importacion:** `@/*` apunta a `./src/*` (`jsconfig.json`).

### Mapa de Archivos Clave
```text
public/
  maplibre-gl-worker.js          # Web Worker local de MapLibre GL JS v6
  images/
    hero/hero_loop_1080p.mp4, hero_loop_720p.mp4, hero_poster_1080p.jpg, hero_16x9.jpg
    logo/logo_oficial.jpg
    unidades/{slug}/principal_16x10.jpg, galeria_*.jpg

src/
  app/
    icon.jpg                     # Favicon oficial de CC Inmobiliaria
    fonts/                       # Fuentes locales .woff2 (Plus Jakarta Sans, Newsreader, JetBrains Mono)
    layout.js                    # RootLayout Server Component (next/font/local + metadata + skip link)
    globals.css                  # Tailwind v4 + variables de marca + textura papel y transiciones
    page.js                      # Portada editorial en 5 actos (Hero con video + Destacada y grilla + Mapa callejero y barrios + Tasaciones MP 20 + Contacto)
    catalogo/page.js             # Catalogo filtrable (Server wrapper que lee searchParams)
    vender/page.js               # Pagina dedicada de Tasaciones y Venta MP 20 (estrategia en 3 fases + embudo 2 pasos + FAQ)
    [slug]/page.js               # Ficha tecnica de propiedad (breadcrumbs SEO + galeria con croquis + entorno + mapa callejero + generateStaticParams)
    not-found.js                 # Pagina 404 editorial
  components/
    layout/
      Navbar.jsx                 # Header editorial sticky (Propiedades, Mapa, Vender)
      Footer.jsx                 # Footer editorial (Server Component)
    ui/
      Reveal.jsx                 # Wrapper IntersectionObserver con soporte prefers-reduced-motion
    home/
      HeroVideo.jsx              # Video full-bleed responsive (1080p desktop / 720p movil) con poster LCP y pausa discreta
    catalog/
      CatalogClient.jsx          # Buscador compacto en 2 bandas, vista Lista/Mapa, chips de atributos, estrella destacadas y alerta WhatsApp
    property/
      PropertyGallery.jsx        # Visor principal scrolleable con cinta VENTA + collage derecho a altura completa (+N si > 4 fotos) + miniatura de croquis + modal desenfocado
      PropertyActionsBar.jsx     # Acciones directas de ficha (Croquis interactivo, Ver en el mapa, Compartir, Copiar enlace)
      PropertyFloorplan.jsx      # Croquis arquitectonico SVG sobre fondo #F4F1EA sin marco (capas Mobiliario/Zonas/Luz natural, zoom, vinculo a foto real y consulta por ambiente)
      LocationMap3D.jsx          # Mapa callejero MapLibre + OpenFreeMap Liberty (inicio 2D con auto-3D al centrar en pantalla o elegir pin, hover con foto y cinta diagonal VENTA)
      PropertyInquiryForm.jsx    # Formulario sticky con agenda hibrida (Presencial / Videollamada) hacia WhatsApp
    valuation/
      ValuationFunnelForm.jsx    # Embudo progresivo de tasacion en 2 pasos con canal preferido hacia WhatsApp
  data/
    properties.js                # Configuracion CC Inmobiliaria + barrios + FAQS + fases de tasacion + 7 propiedades (CC-01 a CC-07)
```

---

## 3. IDENTIDAD VISUAL Y REGLAS DE DISENO (EDITORIAL ARQUITECTONICO)

- **Paleta cromatica:**
  - Lienzo piedra calida: `#F4F1EA` (`surfaceBg: #ECE8DF`)
  - Texto principal: `#121312` (`textMuted: #5A5852`)
  - Bordes divisorios: `#D5D0C5`
  - Acento institucional CC Inmobiliaria (MP 20): `#A80038` (hover `#7F002A`, soft `#FCE7EE`)
- **Tipografia:**
  - Titulares editoriales: `Newsreader` (`--font-newsreader`)
  - Cuerpo e interfaz: `Plus Jakarta Sans` (`--font-jakarta`)
  - Codigos, precios y referencias: `JetBrains Mono` (`--font-jetbrains`) con `.tabular-nums`
- **Geometria y Regla Anti-Slop:**
  - Esquinas rectas a 90 grados (`rounded-none`) en tarjetas fotograficas, formularios y botones (excepto el contenedor del isotipo `rounded-xl` con `bg-white` y `object-contain` para preservar el logo cuadrado original).
  - Prohibido anidar cajas dentro de cajas (`cards-inside-cards`). Usar espacio negativo, fotografia amplia 16:10 y lineas divisorias (`border-t`, `divide-y`).
  - Conversion directa hacia WhatsApp (`5493794602943`) con referencia, ubicacion y precio en USD.
  - Politica de resenas: no inventar testimonios; mostrar exclusivamente el dato verificado de Google Maps (`4.0`, `1 reseña`) en el footer.
