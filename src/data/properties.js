export const SITE_CONFIG = {
  brandName: "CC Inmobiliaria",
  brandInitials: "CC",
  brandTagline: "Corredora Inmobiliaria MP 20 · Corrientes Capital",
  locationLabel: "Corrientes Capital",
  whatsappNumber: "5493795151903",
  phoneDisplay: "3795 15-1903",
  addressDisplay: "Don Bosco 1180, Corrientes Capital",
  officeCoords: { lat: -27.4697304, lng: -58.8495903 },
  officeHours: "Lunes a viernes de 9:00 a 13:00 y 17:00 a 20:00 hs",
  googleRating: "4.0",
  googleReviewsCount: "1",
  logoUrl: "/images/logo/logo_oficial.jpg",
  primaryCtaLabel: "Agendar visita",
  secondaryCtaLabel: "Explorar cartera",
  catalogTitle: "Propiedades en Venta en Corrientes Capital",
  catalogSubtitle:
    "Cartera curada en B° Libertad, B° La Cruz, B° San Martín y Av. 3 de Abril con documentación verificada y valores en USD.",
  catalogBannerImage: "/images/unidades/depto_belgrano_2000_b_libertad/galeria_01_16x10.jpg",
  unitSingular: "Propiedad",
  unitPlural: "Propiedades",
  detailCtaLabel: "Abrir ficha técnica",
  hero: {
    eyebrow: "Matrícula Profesional 20",
    titleMain: "Arquitectura residencial en",
    titleItalic: "Corrientes Capital.",
    subtitle:
      "Departamentos céntricos y casas familiares desde USD 55.000, con atención directa en Don Bosco 1180.",
    image: "/images/hero/hero_poster_1080p.jpg",
    videoDesktopUrl: "/images/hero/hero_loop_1080p.mp4",
    videoMobileUrl: "/images/hero/hero_loop_720p.mp4",
    featuredCaption: "Arquitectura residencial moderna y departamentos luminosos en Corrientes Capital",
    featuredSlug: "depto_torre_santa_rita_b_la_cruz",
    searchLabels: {
      field1Label: "Tipología",
      field1Options: ["Todas", "Departamentos", "Casas"],
      field2Label: "Zona",
      field2Options: ["Todas", "B° Libertad / La Cruz", "B° San Martín / 3 de Abril"],
      field3Label: "Rango USD",
      field3Options: ["Todas", "USD 55k a 119k", "USD 120k a 200k"],
      submitLabel: "Buscar propiedades",
    },
  },
  highlightsSection: {
    eyebrow: "Criterio MP 20",
    title: "Comercialización directa con respaldo registral y lectura real de mercado",
    subtitle:
      "Cada propiedad se publica con situación documental verificada, detalles de cochera y valores expresados en USD.",
    valuationCtaLabel: "Solicitar tasación MP 20",
    valuationMessage:
      "Hola CC Inmobiliaria, quisiera solicitar una tasación profesional para vender una propiedad en Corrientes Capital.",
    items: [
      {
        iconKey: "shield",
        title: "Auditoría documental previa",
        description:
          "Revisión de títulos, planos y estado de expensas antes de publicar unidades en Torre Santa Rita, Edificio Jen y barrios consolidados.",
      },
      {
        iconKey: "key",
        title: "Tickets reales de USD 55k a 200k",
        description:
          "Alternativas concretas para primera vivienda, renta universitaria y casas familiares amplias con valores comparables de cierre.",
      },
      {
        iconKey: "car",
        title: "Cocheras, pisos y orientación claros",
        description:
          "Fichas técnicas transparentes especificando superficie cubierta, disposición, cochera propia y antigüedad real.",
      },
    ],
  },
  ctaBanner: {
    badge: "Atención en Don Bosco 1180",
    title: "Coordine una visita o evalúe su próxima operación hoy",
    description:
      "Asesoramiento directo en oficina o por WhatsApp al 3795 15-1903 para compradores y propietarios vendedores.",
    buttonLabel: "Escribir por WhatsApp",
    image: "/images/unidades/depto_madariaga_900_3_dorm_cochera/principal_16x10.jpg",
  },
  bookingFormConfig: {
    panelTitle: "Consulta directa con un asesor",
    panelSubtitle: "Atención personalizada para coordinar visita o recibir documentación.",
    date1Label: "Fecha tentativa de visita",
    date2Label: "Franja horaria",
    selectLabel: "Motivo de contacto",
    selectOptions: [
      "Coordinar visita presencial al inmueble",
      "Solicitar planos y ficha técnica completa",
      "Consultar forma de pago / financiación / permuta",
      "Tasar una propiedad propia para vender",
    ],
    submitLabel: "Enviar consulta por WhatsApp",
  },
};

export const NEIGHBORHOODS = [
  {
    name: "B° Libertad",
    zoneFilter: "B° Libertad / La Cruz",
    character: "Entorno residencial consolidado sobre eje Belgrano",
    summary:
      "Calles arboladas, cercanía inmediata al centro cívico y edificios de escala media con unidades de 1 a 3 ambientes.",
    priceRange: "USD 119.000 - 120.000",
  },
  {
    name: "B° La Cruz",
    zoneFilter: "B° Libertad / La Cruz",
    character: "Torres contemporáneas y perfil urbano renovado",
    summary:
      "Ubicación estratégica sobre Buenos Aires al 1400 con desarrollos modernos, aberturas DVH y alta demanda de renta.",
    priceRange: "Desde USD 100.000",
  },
  {
    name: "B° San Martín",
    zoneFilter: "B° San Martín / 3 de Abril",
    character: "Conectividad universitaria y ticket accesible en USD",
    summary:
      "Departamentos funcionales de 2 y 3 dormitorios sobre Madariaga y viviendas familiares con patio y entrada vehicular.",
    priceRange: "USD 55.000 - 100.000",
  },
  {
    name: "Av. 3 de Abril",
    zoneFilter: "B° San Martín / 3 de Abril",
    character: "Corredor principal apto vivienda o estudio profesional",
    summary:
      "Frente directo sobre avenida de alto tránsito y rápida conexión al puente, ideal para residencia amplia o consultorio.",
    priceRange: "Hasta USD 200.000",
  },
];

export const FAQS = [
  {
    question: "Qué documentación se verifica antes de reservar una propiedad",
    answer:
      "Revisamos escritura traslativa de dominio, estado parcelario, libre deuda de expensas e impuestos municipales y situación registral antes de firmar cualquier reserva.",
  },
  {
    question: "Cómo se calcula el valor de tasación para vender en Corrientes",
    answer:
      "Trabajamos con comparables reales de cierre en el mismo barrio, estado constructivo, orientación, cochera y demanda activa en USD, evitando precios inflados que estancan la venta.",
  },
  {
    question: "Se pueden coordinar recorridos si vivo fuera de Corrientes Capital",
    answer:
      "Sí. Además de visitas presenciales coordinamos recorridos guiados por videollamada en vivo y enviamos ficha técnica, medidas y documentación previa por WhatsApp.",
  },
  {
    question: "Qué documentación se necesita para vender una propiedad",
    answer:
      "Escritura original, planos aprobados si corresponden, DNI de titulares y últimas boletas de impuestos y expensas. Te acompañamos en todo el relevamiento previo sin costo.",
  },
];

export const VALUATION_PHASES = [
  {
    phase: "Fase 1",
    title: "Relevamiento documental y valor real de cierre",
    description:
      "Evaluamos títulos, planos, expensas y operaciones recientes en tu corredor urbano para definir un precio de salida competitivo en USD en menos de 24 horas.",
  },
  {
    phase: "Fase 2",
    title: "Presentación editorial y cartera activa",
    description:
      "Fotografía luminosa cuidada, ficha técnica transparente sin letra chica y presentación anticipada a compradores calificados que ya consultaron por esa zona.",
  },
  {
    phase: "Fase 3",
    title: "Visitas filtradas, negociación y escritura",
    description:
      "Coordinamos visitas presenciales o por videollamada solo con interesados reales y acompañamos toda la negociación junto a escribanía hasta la entrega de llaves.",
  },
];

export const PROPERTIES = [
  {
    slug: "depto_belgrano_2000_b_libertad",
    code: "CC-01",
    title: "Depto 2 Dorm. Belgrano 2000 · B° Libertad",
    location: "Belgrano 2000, Piso 2, B° Libertad, Corrientes",
    neighborhood: "B° Libertad",
    category: "Departamentos",
    zoneFilter: "B° Libertad / La Cruz",
    typeFilter: "USD 55k a 119k",
    priceValue: 119000,
    priceLabel: "USD 119.000",
    hasGarage: false,
    hasOutdoor: true,
    updatedLabel: "Cartera verificada MP 20",
    legalStatus: "Documentación lista para escriturar",
    primaryMetric: "2 Dorm. · 3 Amb.",
    secondaryMetric: "15 años",
    tertiaryMetric: "Muy Bueno",
    mapCoords: { lat: -27.47322, lng: -58.8258085, streetLabel: "Belgrano 2000 y Uruguay" },
    floorplan: {
      orientation: "N",
      scaleLabel: "Distribución tipo 3 ambientes · Piso 2",
      rooms: [
        { id: "balcon", label: "Balcón", detail: "Expansión al frente con espacio para hamaca", x: 30, y: 18, w: 144, h: 36, kind: "exterior", furniture: "balcony", photoIndex: 0 },
        { id: "living", label: "Living comedor", detail: "Ambiente principal amplio conectado al balcón", x: 30, y: 54, w: 144, h: 74, kind: "social", furniture: "living", photoIndex: 0 },
        { id: "cocina", label: "Cocina", detail: "Cocina equipada separada del estar", x: 174, y: 40, w: 94, h: 66, kind: "service", furniture: "kitchen", photoIndex: 1 },
        { id: "lavadero", label: "Lavadero", detail: "Sector de lavado independiente ventilado", x: 224, y: 106, w: 66, h: 42, kind: "service", furniture: "laundry", photoIndex: 2 },
        { id: "dorm1", label: "Dormitorio 1", detail: "Dormitorio principal con ventilación natural", x: 46, y: 128, w: 94, h: 74, kind: "private", furniture: "bed", photoIndex: 2 },
        { id: "bano", label: "Baño", detail: "Baño completo con acceso desde paso central", x: 140, y: 128, w: 54, h: 60, kind: "service", furniture: "bath", photoIndex: 3 },
        { id: "dorm2", label: "Dormitorio 2", detail: "Segundo dormitorio de dimensiones cómodas", x: 194, y: 148, w: 90, h: 54, kind: "private", furniture: "bed", photoIndex: 3 },
      ],
    },
    image: "/images/unidades/depto_belgrano_2000_b_libertad/principal_16x10.jpg",
    gallery: [
      "/images/unidades/depto_belgrano_2000_b_libertad/principal_16x10.jpg",
      "/images/unidades/depto_belgrano_2000_b_libertad/galeria_01_16x10.jpg",
      "/images/unidades/depto_belgrano_2000_b_libertad/galeria_02_16x10.jpg",
      "/images/unidades/depto_belgrano_2000_b_libertad/galeria_03_16x10.jpg",
    ],
    summary:
      "Amplio departamento de 3 ambientes en segundo piso sobre Belgrano y Uruguay, con balcón al frente y cocina independiente.",
    specs: [
      { label: "Precio", value: "USD 119.000" },
      { label: "Ambientes", value: "3 (2 dorm. / 1 baño)" },
      { label: "Antigüedad", value: "15 años" },
      { label: "Estado", value: "Muy Bueno" },
    ],
    amenities: [
      "Balcón con hamaca",
      "Cocina equipada",
      "Lavadero independiente",
      "Esquina Belgrano y Uruguay",
    ],
    nearbyHighlights: [
      "Eje Belgrano con conectividad directa al microcentro",
      "Entorno residencial arbolado de escala media",
      "Comercios de cercanía, farmacias y líneas urbanas a pasos",
    ],
  },
  {
    slug: "depto_madariaga_900_3_dorm_cochera",
    code: "CC-02",
    title: "Depto 3 Dormitorios c/ Cochera · Madariaga 900",
    location: "Madariaga 900, Piso 3, B° San Martín, Corrientes",
    neighborhood: "B° San Martín",
    category: "Departamentos",
    zoneFilter: "B° San Martín / 3 de Abril",
    typeFilter: "USD 55k a 119k",
    priceValue: 65000,
    priceLabel: "USD 65.000",
    hasGarage: true,
    hasOutdoor: true,
    updatedLabel: "Cartera verificada MP 20",
    legalStatus: "Documentación verificada · Cochera incluida",
    primaryMetric: "3 Dorm. · 4 Amb.",
    secondaryMetric: "1 Cochera",
    tertiaryMetric: "Piso 3",
    mapCoords: { lat: -27.4825722, lng: -58.8413021, streetLabel: "Madariaga 900 · Piso 3" },
    floorplan: {
      orientation: "NE",
      scaleLabel: "Distribución tipo 4 ambientes + cochera · Piso 3",
      rooms: [
        { id: "balcon", label: "Balcón", detail: "Balcón amplio enrejado con vista abierta", x: 48, y: 14, w: 144, h: 34, kind: "exterior", furniture: "balcony", photoIndex: 0 },
        { id: "living", label: "Living comedor", detail: "Estar comedor principal equipado y luminoso", x: 36, y: 48, w: 156, h: 70, kind: "social", furniture: "living", photoIndex: 0 },
        { id: "cocina", label: "Cocina / Lav.", detail: "Cocina separada con lavadero integrado", x: 192, y: 34, w: 98, h: 66, kind: "service", furniture: "kitchen", photoIndex: 1 },
        { id: "dorm3", label: "Dormitorio 3", detail: "Tercer dormitorio apto escritorio o habitación", x: 202, y: 100, w: 88, h: 56, kind: "private", furniture: "bed", photoIndex: 2 },
        { id: "dorm1", label: "Dormitorio 1", detail: "Dormitorio principal de uso familiar", x: 22, y: 118, w: 92, h: 78, kind: "private", furniture: "bed", photoIndex: 2 },
        { id: "bano", label: "Baño", detail: "Baño completo en sector privado", x: 114, y: 118, w: 54, h: 62, kind: "service", furniture: "bath", photoIndex: 3 },
        { id: "dorm2", label: "Dormitorio 2", detail: "Segundo dormitorio ventilado + cochera en PB", x: 168, y: 156, w: 96, h: 50, kind: "private", furniture: "bed", photoIndex: 3 },
      ],
    },
    image: "/images/unidades/depto_madariaga_900_3_dorm_cochera/principal_16x10.jpg",
    gallery: [
      "/images/unidades/depto_madariaga_900_3_dorm_cochera/principal_16x10.jpg",
      "/images/unidades/depto_madariaga_900_3_dorm_cochera/galeria_01_16x10.jpg",
      "/images/unidades/depto_madariaga_900_3_dorm_cochera/galeria_02_16x10.jpg",
      "/images/unidades/depto_madariaga_900_3_dorm_cochera/galeria_03_16x10.jpg",
    ],
    summary:
      "Departamento familiar de 4 ambientes completamente funcional con living equipado, balcón enrejado, cocina separada y cochera.",
    specs: [
      { label: "Precio", value: "USD 65.000" },
      { label: "Dormitorios", value: "3" },
      { label: "Cochera", value: "1 incluida" },
      { label: "Barrio", value: "San Martín" },
    ],
    amenities: [
      "Cochera propia",
      "Balcón amplio",
      "Lavadero en cocina",
      "Excelente relación precio/m²",
    ],
    nearbyHighlights: [
      "Rápida salida hacia Av. 3 de Abril y corredores troncales",
      "Zona consolidada con alta demanda familiar y universitaria",
      "Servicios, supermercados y escuelas en radio caminable",
    ],
  },
  {
    slug: "edificio_jen_belgrano_200_cochera",
    code: "CC-03",
    title: "Edificio Jen · Depto 1 Dorm. c/ Cochera",
    location: "Belgrano 200, Piso 2, Corrientes Capital",
    neighborhood: "B° Libertad",
    category: "Departamentos",
    zoneFilter: "B° Libertad / La Cruz",
    typeFilter: "USD 120k a 200k",
    priceValue: 120000,
    priceLabel: "USD 120.000",
    hasGarage: true,
    hasOutdoor: false,
    updatedLabel: "Cartera verificada MP 20",
    legalStatus: "Listo para escriturar · Cochera incluida",
    pinned: true,
    primaryMetric: "49 m² cubiertos",
    secondaryMetric: "1 Dorm. · 1 Cochera",
    tertiaryMetric: "A estrenar / moderno",
    mapCoords: { lat: -27.4711878, lng: -58.8483495, streetLabel: "Belgrano 200 · Edificio Jen" },
    floorplan: {
      orientation: "N",
      scaleLabel: "Planta compacta 49 m² cubiertos + cochera · Piso 2",
      rooms: [
        { id: "living", label: "Living comedor", detail: "Estar luminoso con pisos símil madera y split instalado", x: 34, y: 34, w: 176, h: 88, kind: "social", furniture: "living", photoIndex: 0 },
        { id: "acceso", label: "Hall acceso", detail: "Ingreso privado y circulación limpia hacia dormitorios", x: 210, y: 20, w: 72, h: 46, kind: "service", furniture: "entry", photoIndex: 0 },
        { id: "cocina", label: "Cocina", detail: "Mesada de granito, horno y campana extractora", x: 210, y: 66, w: 82, h: 68, kind: "service", furniture: "kitchen", photoIndex: 1 },
        { id: "dorm1", label: "Dormitorio", detail: "Dormitorio principal amplio con placard", x: 58, y: 122, w: 132, h: 78, kind: "private", furniture: "bed", photoIndex: 2 },
        { id: "bano", label: "Baño diseño", detail: "Vanitory moderno y porcelanato de primera calidad", x: 190, y: 134, w: 76, h: 60, kind: "service", furniture: "bath", photoIndex: 3 },
      ],
    },
    image: "/images/unidades/edificio_jen_belgrano_200_cochera/principal_16x10.jpg",
    gallery: [
      "/images/unidades/edificio_jen_belgrano_200_cochera/principal_16x10.jpg",
      "/images/unidades/edificio_jen_belgrano_200_cochera/galeria_01_16x10.jpg",
      "/images/unidades/edificio_jen_belgrano_200_cochera/galeria_02_16x10.jpg",
      "/images/unidades/edificio_jen_belgrano_200_cochera/galeria_03_16x10.jpg",
    ],
    summary:
      "Departamento contemporáneo de 2 ambientes en Edificio Jen con pisos símil madera, cocina con campana extractora y cochera.",
    specs: [
      { label: "Precio", value: "USD 120.000" },
      { label: "Superficie cubierta", value: "49 m²" },
      { label: "Cochera", value: "1 incluida" },
      { label: "Terminaciones", value: "Porcelanato y granito" },
    ],
    amenities: [
      "Aire split instalado",
      "Campana y horno",
      "Vanitory de diseño",
      "Cochera",
    ],
    nearbyHighlights: [
      "Ubicación céntrica sobre Belgrano al 200 cerca de Costanera",
      "Edificio de diseño actual con terminaciones de bajo mantenimiento",
      "Ideal vivienda profesional o renta corporativa en USD",
    ],
  },
  {
    slug: "casa_venta_av_3_de_abril_1000",
    code: "CC-04",
    title: "Casa en Venta 5 Ambientes · Av. 3 de Abril 1000",
    location: "Av. 3 de Abril 1000, Corrientes Capital",
    neighborhood: "Av. 3 de Abril",
    category: "Casas",
    zoneFilter: "B° San Martín / 3 de Abril",
    typeFilter: "USD 120k a 200k",
    priceValue: 200000,
    priceLabel: "USD 200.000",
    hasGarage: true,
    hasOutdoor: true,
    updatedLabel: "Cartera verificada MP 20",
    legalStatus: "Apto vivienda o consultorio · Títulos verificados",
    primaryMetric: "5 Ambientes",
    secondaryMetric: "2 dorm. · 2 baños",
    tertiaryMetric: "Cochera cubierta",
    mapCoords: { lat: -27.4756237, lng: -58.8389852, streetLabel: "Av. 3 de Abril 1000" },
    floorplan: {
      orientation: "NO",
      scaleLabel: "Casa 5 ambientes sobre avenida · Apto vivienda / consultorio",
      rooms: [
        { id: "cochera", label: "Cochera cubierta", detail: "Ingreso vehicular techado con rejas perimetrales", x: 18, y: 16, w: 96, h: 86, kind: "exterior", furniture: "garage", photoIndex: 0 },
        { id: "living", label: "Living principal", detail: "Gran salón revestido en madera apto recepción o estar", x: 114, y: 34, w: 154, h: 72, kind: "social", furniture: "living", photoIndex: 1 },
        { id: "comedor", label: "Cocina comedor", detail: "Comedor diario amplio integrado a sector cocina", x: 34, y: 106, w: 140, h: 48, kind: "social", furniture: "kitchen", photoIndex: 2 },
        { id: "bano1", label: "Baño 1", detail: "Baño de recepción y uso diario", x: 174, y: 106, w: 74, h: 48, kind: "service", furniture: "bath", photoIndex: 3 },
        { id: "dorm1", label: "Dormitorio 1", detail: "Dormitorio o consultorio principal", x: 24, y: 154, w: 102, h: 52, kind: "private", furniture: "bed", photoIndex: 2 },
        { id: "bano2", label: "Baño 2", detail: "Segundo baño completo en área íntima", x: 126, y: 154, w: 52, h: 44, kind: "service", furniture: "bath", photoIndex: 3 },
        { id: "dorm2", label: "Dormitorio 2", detail: "Segundo dormitorio o privado profesional", x: 178, y: 154, w: 106, h: 52, kind: "private", furniture: "bed", photoIndex: 3 },
      ],
    },
    image: "/images/unidades/casa_venta_av_3_de_abril_1000/principal_16x10.jpg",
    gallery: [
      "/images/unidades/casa_venta_av_3_de_abril_1000/principal_16x10.jpg",
      "/images/unidades/casa_venta_av_3_de_abril_1000/galeria_01_16x10.jpg",
      "/images/unidades/casa_venta_av_3_de_abril_1000/galeria_02_16x10.jpg",
      "/images/unidades/casa_venta_av_3_de_abril_1000/galeria_03_16x10.jpg",
    ],
    summary:
      "Propiedad sobre avenida principal 3 de Abril con rejas al frente, cochera cubierta, living amplio revestido en madera y cocina comedor.",
    specs: [
      { label: "Precio", value: "USD 200.000" },
      { label: "Ambientes", value: "5 (2 dorm. / 2 baños)" },
      { label: "Ubicación", value: "Av. 3 de Abril 1000" },
      { label: "Apto", value: "Vivienda / Consultorio" },
    ],
    amenities: [
      "Cochera techada",
      "Rejas perimetrales",
      "Frente sobre avenida",
      "Amplios salones",
    ],
    nearbyHighlights: [
      "Visibilidad directa sobre Av. 3 de Abril y conexión al puente",
      "Doble potencial: residencia familiar amplia o estudio profesional",
      "Acceso inmediato a transporte, bancos y centros de salud",
    ],
  },
  {
    slug: "depto_madariaga_900_piso_5_frente",
    code: "CC-05",
    title: "Depto 2 Dorm. Frente · Madariaga 900 Piso 5",
    location: "Madariaga 900, Piso 5, B° San Martín, Corrientes",
    neighborhood: "B° San Martín",
    category: "Departamentos",
    zoneFilter: "B° San Martín / 3 de Abril",
    typeFilter: "USD 55k a 119k",
    priceValue: 55000,
    priceLabel: "USD 55.000",
    hasGarage: false,
    hasOutdoor: true,
    updatedLabel: "Cartera verificada MP 20",
    legalStatus: "Ticket de entrada en USD · Listo para transferir",
    primaryMetric: "2 Dorm. · 3 Amb.",
    secondaryMetric: "Piso 5 al frente",
    tertiaryMetric: "Estado Muy Bueno",
    mapCoords: { lat: -27.48225, lng: -58.8409, streetLabel: "Madariaga 900 · Piso 5" },
    floorplan: {
      orientation: "N",
      scaleLabel: "Planta 3 ambientes al frente · Piso 5",
      rooms: [
        { id: "balcon", label: "Balcón", detail: "Balcón luminoso en 5° piso con vista despejada", x: 28, y: 14, w: 164, h: 34, kind: "exterior", furniture: "balcony", photoIndex: 0 },
        { id: "living", label: "Living comedor", detail: "Estar espacioso con excelente ingreso de luz", x: 28, y: 48, w: 164, h: 74, kind: "social", furniture: "living", photoIndex: 0 },
        { id: "cocina", label: "Cocina", detail: "Cocina luminosa independiente del living", x: 192, y: 30, w: 94, h: 86, kind: "service", furniture: "kitchen", photoIndex: 1 },
        { id: "dorm1", label: "Dormitorio 1", detail: "Dormitorio con placard de piso a techo", x: 46, y: 122, w: 100, h: 78, kind: "private", furniture: "bed", photoIndex: 2 },
        { id: "bano", label: "Baño", detail: "Baño completo en distribución central", x: 146, y: 122, w: 54, h: 64, kind: "service", furniture: "bath", photoIndex: 3 },
        { id: "dorm2", label: "Dormitorio 2", detail: "Segundo dormitorio con placard completo", x: 200, y: 116, w: 92, h: 78, kind: "private", furniture: "bed", photoIndex: 3 },
      ],
    },
    image: "/images/unidades/depto_madariaga_900_piso_5_frente/principal_16x10.jpg",
    gallery: [
      "/images/unidades/depto_madariaga_900_piso_5_frente/principal_16x10.jpg",
      "/images/unidades/depto_madariaga_900_piso_5_frente/galeria_01_16x10.jpg",
      "/images/unidades/depto_madariaga_900_piso_5_frente/galeria_02_16x10.jpg",
      "/images/unidades/depto_madariaga_900_piso_5_frente/galeria_03_16x10.jpg",
    ],
    summary:
      "Excelente oportunidad de inversión en 5° piso al frente con living espacioso, dormitorios con placares completos y cocina luminosa.",
    specs: [
      { label: "Precio", value: "USD 55.000" },
      { label: "Ambientes", value: "3 (2 dorm. / 1 baño)" },
      { label: "Orientación", value: "Frente" },
      { label: "Ubicación", value: "Madariaga 900, Piso 5" },
    ],
    amenities: [
      "Placares de piso a techo",
      "Balcón luminoso",
      "Aire split",
      "Ideal renta",
    ],
    nearbyHighlights: [
      "Quinto piso despejado con excelente entrada de luz natural",
      "Ticket competitivo para primera vivienda o renta mensual",
      "Conectividad fluida hacia facultades y centro de Corrientes",
    ],
  },
  {
    slug: "depto_torre_santa_rita_b_la_cruz",
    code: "CC-06",
    title: "Torre Santa Rita · Depto 1 Dorm. B° La Cruz",
    location: "Buenos Aires 1400, B° La Cruz, Corrientes Capital",
    neighborhood: "B° La Cruz",
    category: "Departamentos",
    zoneFilter: "B° Libertad / La Cruz",
    typeFilter: "USD 55k a 119k",
    priceValue: 100000,
    priceLabel: "USD 100.000",
    hasGarage: false,
    hasOutdoor: false,
    updatedLabel: "Cartera verificada MP 20",
    legalStatus: "Torre contemporánea · Documentación verificada",
    pinned: true,
    primaryMetric: "1 Dorm. · 2 Amb.",
    secondaryMetric: "Estado Excelente",
    tertiaryMetric: "Torre moderna",
    mapCoords: { lat: -27.4729682, lng: -58.8410199, streetLabel: "Buenos Aires 1400 · Torre Santa Rita" },
    floorplan: {
      orientation: "E",
      scaleLabel: "Planta contemporánea 2 ambientes · Torre Santa Rita",
      rooms: [
        { id: "living", label: "Living comedor", detail: "Estar contemporáneo con aberturas negras DVH y split", x: 30, y: 26, w: 172, h: 94, kind: "social", furniture: "living", photoIndex: 0 },
        { id: "cocina", label: "Cocina integrada", detail: "Amoblamiento negro y gris de diseño actual", x: 202, y: 46, w: 88, h: 74, kind: "service", furniture: "kitchen", photoIndex: 0 },
        { id: "dorm1", label: "Dormitorio", detail: "Dormitorio luminoso orientado al contrafrente tranquilo", x: 56, y: 120, w: 146, h: 80, kind: "private", furniture: "bed", photoIndex: 1 },
        { id: "bano", label: "Baño completo", detail: "Terminaciones modernas y grifería de primera línea", x: 202, y: 120, w: 72, h: 64, kind: "service", furniture: "bath", photoIndex: 2 },
      ],
    },
    image: "/images/unidades/depto_torre_santa_rita_b_la_cruz/principal_16x10.jpg",
    gallery: [
      "/images/unidades/depto_torre_santa_rita_b_la_cruz/principal_16x10.jpg",
      "/images/unidades/depto_torre_santa_rita_b_la_cruz/galeria_01_16x10.jpg",
      "/images/unidades/depto_torre_santa_rita_b_la_cruz/galeria_02_16x10.jpg",
    ],
    summary:
      "Departamento moderno en Torre Santa Rita con amoblamiento de cocina negro y gris, aberturas negras DVH y split frío-calor.",
    specs: [
      { label: "Precio", value: "USD 100.000" },
      { label: "Barrio", value: "La Cruz (Buenos Aires 1400)" },
      { label: "Disposición", value: "Contrafrente luminoso" },
      { label: "Aberturas", value: "Aluminio negro DVH" },
    ],
    amenities: [
      "Torre moderna",
      "Cocina equipada",
      "Aberturas aluminio negro",
      "Aire acondicionado",
    ],
    nearbyHighlights: [
      "Emplazamiento en B° La Cruz sobre calle Buenos Aires al 1400",
      "Carpintería DVH con aislación térmica y acústica superior",
      "Alta liquidez de reventa y alquiler en entorno céntrico",
    ],
  },
  {
    slug: "casa_doctor_bonastre_3_dormitorios",
    code: "CC-07",
    title: "Casa en Venta 3 Dormitorios · Dr. V. Bonastre",
    location: "Doctor V. Bonastre, Corrientes Capital",
    neighborhood: "B° San Martín",
    category: "Casas",
    zoneFilter: "B° San Martín / 3 de Abril",
    typeFilter: "USD 55k a 119k",
    priceValue: 100000,
    priceLabel: "USD 100.000",
    hasGarage: true,
    hasOutdoor: true,
    updatedLabel: "Cartera verificada MP 20",
    legalStatus: "Casa de una planta · Documentación verificada",
    primaryMetric: "70 m² cubiertos",
    secondaryMetric: "3 Dorm. · 4 Amb.",
    tertiaryMetric: "Entrada coche + patio",
    mapCoords: { lat: -27.4889, lng: -58.8265, streetLabel: "Calle Dr. V. Bonastre" },
    floorplan: {
      orientation: "N",
      scaleLabel: "Casa de una planta · 70 m² cubiertos + patio y garage",
      rooms: [
        { id: "jardin", label: "Jardín", detail: "Retiro verde al frente con cerramiento completo", x: 24, y: 14, w: 140, h: 38, kind: "exterior", furniture: "balcony", photoIndex: 0 },
        { id: "garage", label: "Garage semicub.", detail: "Entrada vehicular semicubierta con portón", x: 164, y: 18, w: 108, h: 68, kind: "exterior", furniture: "garage", photoIndex: 0 },
        { id: "comedor", label: "Estar comedor", detail: "Sector comedor amplio en planta baja", x: 28, y: 52, w: 136, h: 74, kind: "social", furniture: "living", photoIndex: 1 },
        { id: "cocina", label: "Cocina", detail: "Cocina funcional vinculada al comedor y patio", x: 164, y: 86, w: 70, h: 56, kind: "service", furniture: "kitchen", photoIndex: 2 },
        { id: "patio", label: "Patio lateral", detail: "Patio abierto y galería ventilada", x: 234, y: 86, w: 66, h: 116, kind: "exterior", furniture: "balcony", photoIndex: 3 },
        { id: "dorm1", label: "Dormitorio 1", detail: "Dormitorio principal en planta baja", x: 18, y: 126, w: 76, h: 76, kind: "private", furniture: "bed", photoIndex: 2 },
        { id: "dorm2", label: "Dormitorio 2", detail: "Segundo dormitorio familiar", x: 94, y: 126, w: 70, h: 76, kind: "private", furniture: "bed", photoIndex: 2 },
        { id: "dorm3", label: "Dorm. 3 / Baño", detail: "Tercer dormitorio junto al baño completo", x: 164, y: 142, w: 70, h: 60, kind: "private", furniture: "bath", photoIndex: 3 },
      ],
    },
    image: "/images/unidades/casa_doctor_bonastre_3_dormitorios/principal_16x10.jpg",
    gallery: [
      "/images/unidades/casa_doctor_bonastre_3_dormitorios/principal_16x10.jpg",
      "/images/unidades/casa_doctor_bonastre_3_dormitorios/galeria_01_16x10.jpg",
      "/images/unidades/casa_doctor_bonastre_3_dormitorios/galeria_02_16x10.jpg",
      "/images/unidades/casa_doctor_bonastre_3_dormitorios/galeria_03_16x10.jpg",
    ],
    summary:
      "Casa de una planta sobre calle Dr. Bonastre con jardín al frente, rejas, garage semicubierto, 3 dormitorios y patio lateral.",
    specs: [
      { label: "Precio", value: "USD 100.000" },
      { label: "Superficie cub.", value: "70 m²" },
      { label: "Ambientes", value: "4 (3 dorm. / 1 cochera)" },
      { label: "Exteriores", value: "Jardín y patio lateral" },
    ],
    amenities: [
      "Patio delantero y galería",
      "Rejas completas",
      "Sector comedor amplio",
      "Garage semicubierto",
    ],
    nearbyHighlights: [
      "Entorno tranquilo de casas bajas sobre calle Dr. V. Bonastre",
      "Distribución práctica en una sola planta sin expensas",
      "Jardín al frente, rejas perimetrales y patio aprovechable",
    ],
  },
];

export function getPropertyBySlug(slug) {
  return PROPERTIES.find((item) => item.slug === slug) || null;
}

export function buildWhatsAppUrl(message) {
  const defaultMessage = `Hola ${SITE_CONFIG.brandName}, me contacto desde su sitio web para realizar una consulta.`;
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    message || defaultMessage
  )}`;
}
