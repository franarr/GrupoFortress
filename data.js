// Dataset Completo Grupo Fortress - Mayo 2026 (Coordenadas Oficiales Corregidas)
const fortressSedes = [
  {
    id: 1,
    name: "Fortress - Sede Pedro Vittori (Principal)",
    brand: "fortress",
    coords: [-31.632722, -60.700136],
    address: "Pedro Vittori 3759, Santa Fe, Santa Fe",
    phone: "0342 441-1816",
    whatsapp: "https://wa.me/5403424411816",
    schedule: "Lun–Vie 07:00–22:00 · Sáb 10:00–13:00 y 17:00–20:00 · Feriados consultar",
    stats: {
      socios: "1.700",
      superficie: "3.000 m²",
      especial: "Flagship"
    },
    services: [
      "Musculación",
      "CrossFit",
      "Entrenamiento Funcional",
      "Kinesiología (KIAFA)",
      "Espacio Femenino",
      "Escalada",
      "Valhalla CrossFit",
      "Levantamiento Olímpico",
      "Personal Trainer"
    ],
    instagram: "https://www.instagram.com/fortress.training.club/",
    facebook: "https://www.facebook.com/fortressoficial/",
    web: "https://fortressclub.com.ar",
    wellhub: "https://wellhub.com/es-ar/search/partners/fortress-training-club-santa-fe/",
    googleMaps: "https://maps.google.com/?q=-31.632722,-60.700136",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    description: "Sede principal y emblema del grupo. El gimnasio más grande de la provincia de Santa Fe con 3.000 m² en 3 pisos. Ecosistema completo de entrenamiento: musculación, funcional, CrossFit de élite (Valhalla), kinesiología propia, espacio exclusivo femenino y escuela de levantamiento olímpico."
  },
  {
    id: 2,
    name: "Fortress - Sede Av. Galicia",
    brand: "fortress",
    coords: [-31.606385, -60.688931],
    address: "Av. Galicia 2121, Santa Fe, Santa Fe (S3000)",
    phone: "",
    whatsapp: "",
    schedule: "Lun–Vie 07:00–21:30 · Sáb 10:00–14:00",
    stats: {
      socios: "600",
      superficie: "800 m²",
      especial: "Personalizado"
    },
    services: [
      "Musculación",
      "CrossFit",
      "Entrenamiento Funcional",
      "Clases grupales"
    ],
    instagram: "https://www.instagram.com/fortress.training.club/",
    facebook: "https://www.facebook.com/fortressoficial/",
    web: "https://fortressclub.com.ar",
    wellhub: "",
    googleMaps: "https://maps.google.com/?q=-31.606385,-60.688931",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80",
    description: "Sede sobre Av. Galicia, destacada por la calidad humana de sus entrenadores. Más compacta que la sede principal pero con ambiente cercano y seguimiento personalizado muy valorado por sus socios."
  },
  {
    id: 3,
    name: "Fortress - Sede San Jerónimo",
    brand: "fortress",
    coords: [-31.651831, -60.709426],
    address: "San Jerónimo 2052, Santa Fe, Santa Fe",
    phone: "0342 577-3413",
    whatsapp: "",
    schedule: "Lun–Vie 06:00–22:00 · Sáb 10:00–14:00",
    stats: {
      socios: "800",
      superficie: "950 m²",
      especial: "Zona Norte"
    },
    services: [
      "Musculación",
      "CrossFit",
      "Entrenamiento Funcional",
      "Levantamiento de pesas"
    ],
    instagram: "https://www.instagram.com/fortress.training.club/",
    facebook: "https://www.facebook.com/fortressoficial/",
    web: "https://fortressclub.com.ar",
    wellhub: "https://wellhub.com/es-ar/search/partners/fortress-san-jeronimo/",
    googleMaps: "https://maps.google.com/?q=-31.651831,-60.709426",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    description: "Sede de servicio completo en barrio San Jerónimo. Horario extendido desde las 6 AM, con reserva previa para actividades. Ideal para la zona norte de la ciudad."
  },
  {
    id: 4,
    name: "Fortress - Sede Piedras Blancas",
    brand: "fortress",
    coords: [-31.640375, -60.678672],
    address: "Ruta 168, Costanera Este, Santa Fe",
    phone: "",
    whatsapp: "",
    schedule: "Horarios de temporada y eventos especiales",
    stats: {
      socios: "Variable",
      superficie: "Zona Lacustre",
      especial: "Pileta & Kayak"
    },
    services: [
      "Musculación",
      "Funcional",
      "CrossFit",
      "Pileta",
      "Kayak (surfski)",
      "Outdoor"
    ],
    instagram: "https://www.instagram.com/fortress.training.club/",
    facebook: "https://www.facebook.com/fortressoficial/",
    web: "https://fortressclub.com.ar",
    wellhub: "https://wellhub.com/es-ar/search/partners/fortress-piedras-blancas/",
    googleMaps: "https://maps.google.com/?q=-31.640375,-60.678672",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=600&q=80",
    description: "La sede más singular del grupo. Sobre las lagunas de Piedras Blancas, combina entrenamiento con actividades acuáticas. Única en el ecosistema Fortress con pileta y kayak. Referencia de entrenamiento outdoor en la temporada de verano."
  },
  {
    id: 5,
    name: "Fortress - Sede Santo Tomé",
    brand: "fortress",
    coords: [-31.667305, -60.760090],
    address: "Av. 7 de Marzo 1803, Santo Tomé, Santa Fe",
    phone: "",
    whatsapp: "",
    schedule: "Lun–Vie 07:00–22:00 · Sáb 09:00–13:00",
    stats: {
      socios: "750",
      superficie: "900 m²",
      especial: "Gran Santa Fe"
    },
    services: [
      "Musculación",
      "Entrenamiento Funcional",
      "Clases grupales"
    ],
    instagram: "https://www.instagram.com/fortress.training.club/",
    facebook: "https://www.facebook.com/fortressoficial/",
    web: "https://fortressclub.com.ar",
    wellhub: "",
    googleMaps: "https://maps.google.com/?q=-31.667305,-60.760090",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
    description: "Primera expansión del grupo al Gran Santa Fe. Lleva el estándar Fortress a Santo Tomé (65.000+ habitantes), ciudad ubicada a 9 km de la capital provincial, con propuesta completa de musculación y clases grupales."
  },
  {
    id: 6,
    name: "Fortress - Sede Guadalupe (Preventa)",
    brand: "fortress",
    coords: [-31.5850, -60.6820], // Coordenadas aproximadas en barrio Guadalupe
    address: "Barrio Guadalupe, Santa Fe (Ubicación a confirmar)",
    phone: "",
    whatsapp: "",
    schedule: "Apertura próximamente - Preventa Activa",
    stats: {
      socios: "Preventa",
      superficie: "+1.000 m²",
      especial: "Preventa 2025"
    },
    services: [
      "Musculación Premium",
      "Funcional Inteligente",
      "Clases Grupales"
    ],
    instagram: "https://www.instagram.com/fortress.training.club/",
    web: "https://grupofortress.com/fortress-llega-a-guadalupe-todo-sobre-la-apertura-y-preventa-especial/",
    wellhub: "",
    googleMaps: "https://maps.google.com/?q=-31.5850,-60.6820",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=600&q=80",
    description: "Nueva sede en Guadalupe, uno de los barrios de mayor crecimiento en Santa Fe. Más de 1.000 m² diseñados desde cero. La preventa permite sumarse antes de la apertura y entrenar desde hoy en cualquier sede Fortress o Krafit."
  },
  {
    id: 7,
    name: "Krafit - Urquiza (Sede Central)",
    brand: "krafit",
    coords: [-31.640315, -60.711358],
    address: "Urquiza 2963, Santa Fe, Santa Fe",
    phone: "0342 581-6083",
    whatsapp: "",
    schedule: "Lun–Vie 07:00–22:00 · Sáb 09:00–13:00",
    stats: {
      socios: "700",
      superficie: "700 m²",
      especial: "Constituyentes"
    },
    services: [
      "Musculación",
      "Funcional",
      "CrossFit",
      "Boxeo",
      "Fitness"
    ],
    instagram: "https://www.instagram.com/krafit.center/",
    web: "http://krafitcenter.com",
    wellhub: "https://wellhub.com/es-ar/search/partners/krafit-center-santa-fe/",
    googleMaps: "https://maps.google.com/?q=-31.640315,-60.711358",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80",
    description: "Sede histórica de Krafit y referente del barrio Constituyentes, a 500 m de la Plaza Los Constituyentes. Centro de fitness integral con foco en musculación, funcional, boxeo y crosstraining. Sin reserva previa. 700 socios activos."
  },
  {
    id: 8,
    name: "Krafit - Colastiné",
    brand: "krafit",
    coords: [-31.628003, -60.608308],
    address: "Ruta 1, Km 2,5, Colastiné, Santa Fe",
    phone: "",
    whatsapp: "",
    schedule: "Lun–Vie 07:30–21:30 · Sáb 10:00–13:00",
    stats: {
      socios: "450",
      superficie: "550 m²",
      especial: "Costa"
    },
    services: [
      "Musculación",
      "Funcional",
      "Fitness"
    ],
    instagram: "https://www.instagram.com/krafit.center/",
    web: "http://krafitcenter.com",
    wellhub: "https://wellhub.com/es-ar/search/partners/krafit-center-colastine/",
    googleMaps: "https://maps.google.com/?q=-31.628003,-60.608308",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=600&q=80",
    description: "Sede sobre Ruta 1 en la zona costera de Colastiné, al norte de Santa Fe. Musculación y funcional para los residentes de la zona ribereña. Requiere reserva previa."
  },
  {
    id: 9,
    name: "Krafit - Paraná",
    brand: "krafit",
    coords: [-31.724802, -60.524738],
    address: "Corrientes 670, Paraná, Entre Ríos",
    phone: "",
    whatsapp: "",
    schedule: "Lun–Sáb 08:00–22:00",
    stats: {
      socios: "500",
      superficie: "450 m²",
      especial: "Paraná"
    },
    services: [
      "Fitness",
      "Musculación",
      "Parque Aeróbico",
      "Maquinaria Starke"
    ],
    instagram: "https://www.instagram.com/krafit.center/",
    wellhub: "https://wellhub.com/es-ar/search/partners/krafit-parana/",
    googleMaps: "https://maps.google.com/?q=-31.724802,-60.524738",
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=600&q=80",
    description: "Primera sede del Grupo Fortress fuera de Santa Fe. Inaugurada en Paraná con 450 m² y equipamiento Starke. Apunta a un público amplio en una ubicación de alto tráfico comercial."
  },
  {
    id: 10,
    name: "Krafit - Coronda",
    brand: "krafit",
    coords: [-31.971411, -60.926303],
    address: "Av. Lisandro de la Torre 1591, Coronda, Santa Fe",
    phone: "",
    whatsapp: "",
    schedule: "Lun–Vie 07:00–21:30 · Sáb 09:00–13:00",
    stats: {
      socios: "400",
      superficie: "500 m²",
      especial: "Coronda"
    },
    services: [
      "Musculación",
      "Fitness",
      "Funcional"
    ],
    instagram: "https://www.instagram.com/krafit.center/",
    googleMaps: "https://maps.google.com/?q=-31.971411,-60.926303",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
    description: "Sede inaugurada en 2025 en Coronda, cabecera del Departamento San Jerónimo (~17.000 hab.). Expansión hacia el interior de la provincia, consolidando a Krafit como la marca de fitness del grupo para ciudades medianas."
  },
  {
    id: 11,
    name: "Valhalla - Comunidad CrossFit",
    brand: "valhalla",
    coords: [-31.632722, -60.700136],
    address: "Pedro Vittori 3759, Santa Fe (Dentro de Sede Vittori)",
    phone: "0342 441-1816",
    whatsapp: "",
    schedule: "Lun–Vie 07:00–22:00 · Sáb 10:00–13:00",
    stats: {
      socios: "300 Atletas",
      superficie: "+800 m² exclusivos",
      especial: "Box CrossFit"
    },
    services: [
      "CrossFit",
      "Gimnasia Deportiva",
      "Levantamiento Olímpico",
      "Open Box",
      "Programación para competidores",
      "Salidas al aire libre"
    ],
    instagram: "https://www.instagram.com/fortress.training.club/",
    web: "https://fortressclub.com.ar",
    googleMaps: "https://maps.google.com/?q=-31.632722,-60.700136",
    image: "https://images.unsplash.com/photo-1534367524952-47e82c26d2e3?auto=format&fit=crop&w=600&q=80",
    description: "Comunidad de élite CrossFit dentro del complejo Fortress Pedro Vittori. Clases de hasta 28 personas con 2 coaches en horarios pico. Incluye programación para atletas competidores, talleres de gimnasia deportiva y escuela de levantamiento olímpico sin cargo adicional."
  },
  {
    id: 12,
    name: "Wasabi Sushi & More - GO!",
    brand: "wasabi",
    coords: [-31.636281, -60.710732],
    address: "Santiago del Estero 3116, Santa Fe",
    phone: "",
    whatsapp: "https://wa.me/5403424411816",
    schedule: "Mar–Dom 19:30–23:30",
    stats: {
      socios: "Delivery & Take",
      superficie: "GO! Express",
      especial: "Sushi & More"
    },
    services: [
      "Sushi Premium",
      "Poke Bowls",
      "Rolls, Nigiri, Temaki",
      "Wok y Opciones calientes"
    ],
    instagram: "https://www.instagram.com/wasabisantafe/",
    facebook: "https://www.facebook.com/wasabisantafe/",
    web: "https://linktr.ee/wasabisantafe",
    googleMaps: "https://maps.google.com/?q=-31.636281,-60.710732",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    description: "Punto de delivery y take away de la marca gastronómica del Grupo Fortress. Sushi artesanal con ingredientes seleccionados. Carta variada: rolls, poke bowls, temakis, geishas, tablas y opciones calientes. Más de 14.000 seguidores en Instagram."
  },
  {
    id: 13,
    name: "Wasabi Sushi & More - Restó",
    brand: "wasabi",
    coords: [-31.647255, -60.697487],
    address: "Remolcador Meteoro s/n, Puerto Santa Fe",
    phone: "",
    whatsapp: "https://wa.me/5403424411816",
    schedule: "Mar–Dom 12:00–15:00 · 19:30–23:30",
    stats: {
      socios: "Salón & Terraza",
      superficie: "Puerto Plaza Restó",
      especial: "Nikkei & Ramen"
    },
    services: [
      "Servicio en mesa",
      "Sushi Bar",
      "Poke Bowls",
      "Wok y Ramen"
    ],
    instagram: "https://www.instagram.com/wasabisantafe/",
    facebook: "https://www.facebook.com/wasabisantafe/",
    web: "https://linktr.ee/wasabisantafe",
    googleMaps: "https://maps.google.com/?q=-31.647255,-60.697487",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80",
    description: "Versión restaurante de Wasabi en Puerto Plaza. Experiencia de mesa completa con sushi, platos calientes y propuesta premium. Con potencial de expansión declarado por el grupo en nuevas locaciones."
  },
  {
    id: 14,
    name: "Polpo Nero Restó",
    brand: "polponero",
    coords: [-31.639704, -60.684899],
    address: "Blvd. Gálvez 911, Santa Fe",
    phone: "342 430-9504",
    whatsapp: "",
    schedule: "Dom–Jue 07:30–01:00 · Vie–Sáb 08:30–02:00",
    stats: {
      socios: "Cafetería & Restó",
      superficie: "Fusión Nikkei",
      especial: "Blvd. Gálvez"
    },
    services: [
      "Cocina Nikkei",
      "Cafetería de especialidad",
      "Cócteles de autor",
      "Tataki, Ramen y Mariscos"
    ],
    instagram: "https://www.instagram.com/polpo.nero.resto/",
    web: "https://polponero.com.ar",
    googleMaps: "https://maps.google.com/?q=-31.639704,-60.684899",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80",
    description: "Propuesta gastronómica multifacética del Grupo Fortress sobre el Boulevard Gálvez, a pasos del Puente Oroño. Opera de mañana a madrugada como cafetería, restaurante y bar de cócteles. Cocina Nikkei (fusión japonesa-peruana) en ambiente sofisticado."
  }
];

// Datos adicionales sobre el ecosistema no mapeable físicamente (enlaces directos)
const ecosistemaEspecial = [
  {
    name: "Éter Estética",
    category: "Estética & Cuidado",
    instagram: "https://www.instagram.com/eter.estetica_/",
    details: "Tratamientos estéticos avanzados, kinesiología dermatofuncional y cuidado personal."
  },
  {
    name: "Festejos Rokiroll",
    category: "Salón de Eventos",
    instagram: "https://www.instagram.com/festejosrokiroll/",
    details: "Salón infantil y de eventos sociales totalmente acondicionado para celebraciones únicas."
  },
  {
    name: "Fortress Store",
    category: "Indumentaria Deportiva",
    web: "https://www.fortress-store.com",
    details: "Tienda de ropa de entrenamiento oficial de Fortress y Krafit con los mejores materiales técnicos."
  }
];

// Timeline de Hitos (Historial de Expansión)
const expansionTimeline = [
  { year: "2018", title: "Fundación Fortress Vittori", desc: "Se inaugura la sede de 3.000m², revolucionando la oferta de gimnasios en la provincia de Santa Fe." },
  { year: "2020", title: "Lanzamiento de Krafit Urquiza", desc: "Nace Krafit para atender a un público de cercanía con entrenamiento funcional enfocado en la comunidad." },
  { year: "2022", title: "Valhalla & Expansiones", desc: "Apertura oficial de la zona de CrossFit premium de 800m² y las sedes de Av. Galicia y San Jerónimo." },
  { year: "2023", title: "Wasabi Restó & Piedras Blancas", desc: "Incursión en gastronomía con Wasabi Sushi en Puerto Plaza y la sede fluvial en Piedras Blancas." },
  { year: "2024", title: "Cruze a Entre Ríos (Krafit Paraná)", desc: "Apertura en el Shopping Paso del Paraná, expandiendo el grupo fuera de la provincia." },
  { year: "2025", title: "Krafit Coronda & Wasabi GO!", desc: "Apertura en el interior provincial con Coronda y ampliación de la cocina express en Santiago del Estero." },
  { year: "2026", title: "Próxima Sede Guadalupe", desc: "Inauguración de más de 1.000 m² de primer nivel en la zona costera residencial." }
];

// Anuncios para la sección de Notificaciones
const fortressAnuncios = [
  {
    id: 1,
    type: "new",
    title: "Nueva Sede Guadalupe 2026",
    desc: "¡Preventa activa para Sede Guadalupe! Inscríbete hoy con descuento exclusivo y entrena desde ahora en cualquiera de nuestras sedes activas.",
    action: "Ver Preventa",
    link: "https://grupofortress.com/fortress-llega-a-guadalupe-todo-sobre-la-apertura-y-preventa-especial/"
  },
  {
    id: 2,
    type: "opening",
    title: "Krafit Coronda ya abrió",
    desc: "Nuestras puertas en L. de la Torre 1591 están abiertas. Acércate a probar una clase de musculación o funcional totalmente gratis.",
    action: "Ubicación en Coronda",
    coords: [-31.971411, -60.926303]
  },
  {
    id: 3,
    type: "promo",
    title: "Promo Wasabi Sushi & Restó",
    desc: "15% de descuento en sushi rolls y poke bowls de Martes a Jueves presentando tu credencial de socio activo del grupo en Puerto Plaza.",
    action: "Ver Menú",
    link: "https://linktr.ee/wasabisantafe"
  }
];
