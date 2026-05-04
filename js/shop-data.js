/* ═══════════════════════════════════════════════════════════
   SAINT SEIYA — SHOP PRODUCTS DATA  /js/shop-data.js
═══════════════════════════════════════════════════════════ */

const PRODUCTS = [
  /* ─── FIGURAS ─────────────────────────────────────────── */
  {
    id: "fig-001",
    type: "figura",
    category: "Figura Myth Cloth",
    name: "Seiya — Armadura de Pegaso EX",
    desc: "Figura articulada de alta gama. Incluye partes adicionales y efecto de Cosmo iluminado.",
    price: 89900,
    oldPrice: null,
    badge: "new",
    icon: "🦅",
    img: null
  },
  {
    id: "fig-002",
    type: "figura",
    category: "Figura Myth Cloth",
    name: "Shiryu — Dragón EX",
    desc: "Santo de Bronce del Dragón con Escudo de Rosetón desmontable y base especial.",
    price: 84900,
    oldPrice: 99900,
    badge: "sale",
    icon: "🐉",
    img: null
  },
  {
    id: "fig-003",
    type: "figura",
    category: "Figura Myth Cloth",
    name: "Hyoga — Cisne EX",
    desc: "Edición limitada con efecto de hielo transparente y base de nevado ártico.",
    price: 84900,
    oldPrice: null,
    badge: null,
    icon: "🦢",
    img: null
  },
  {
    id: "fig-004",
    type: "figura",
    category: "Figura Myth Cloth",
    name: "Shun — Andrómeda EX",
    desc: "Con cadenas nebulares articuladas y cabello ondulante de resina premium.",
    price: 84900,
    oldPrice: null,
    badge: null,
    icon: "⛓️",
    img: null
  },
  {
    id: "fig-005",
    type: "figura",
    category: "Figura Myth Cloth",
    name: "Ikki — Fénix EX",
    desc: "Alas desplegables con efecto fuego. La figura más imponente de los Santos de Bronce.",
    price: 94900,
    oldPrice: null,
    badge: "new",
    icon: "🔥",
    img: null
  },
  {
    id: "fig-006",
    type: "figura",
    category: "Santo de Oro",
    name: "Saga — Géminis EX",
    desc: "Rostro doble intercambiable: maligno y benevolente. Armadura dorada completa.",
    price: 129900,
    oldPrice: 149900,
    badge: "sale",
    icon: "♊",
    img: null
  },
  {
    id: "fig-007",
    type: "figura",
    category: "Santo de Oro",
    name: "Shaka — Virgo EX",
    desc: "El hombre más cercano a los dioses. Ojos cerrados en meditación, Cosmo eterno.",
    price: 124900,
    oldPrice: null,
    badge: null,
    icon: "♍",
    img: null
  },
  {
    id: "fig-008",
    type: "figura",
    category: "Colección",
    name: "Set 5 Santos de Bronce",
    desc: "Box set completo con los 5 protagonistas. Empaque coleccionable numerado.",
    price: 379900,
    oldPrice: 449900,
    badge: "sale",
    icon: "⭐",
    img: null
  },

  /* ─── DESCARGAS ───────────────────────────────────────── */
  {
    id: "dl-001",
    type: "descarga",
    category: "Descarga HD",
    name: "Temporada 1 Completa",
    desc: "Episodios 1–26 · Gran Torneo Galáctico · 1080p · Subtitulado español",
    price: 9900,
    oldPrice: null,
    badge: null,
    icon: "📥",
    img: null
  },
  {
    id: "dl-002",
    type: "descarga",
    category: "Descarga HD",
    name: "Temporada 2 — Santuario",
    desc: "Episodios 27–73 · Las 12 Casas del Zodiaco · 1080p · Audio japonés + subs",
    price: 14900,
    oldPrice: 19900,
    badge: "sale",
    icon: "📥",
    img: null
  },
  {
    id: "dl-003",
    type: "descarga",
    category: "Descarga HD",
    name: "OVAs de Hades Completas",
    desc: "13 OVAs · Elíseo + Inframundo · 4K Remasterizado · Audio original",
    price: 12900,
    oldPrice: null,
    badge: "new",
    icon: "📥",
    img: null
  },
  {
    id: "dl-004",
    type: "descarga",
    category: "Pack Total",
    name: "Saga Completa — Todo el Anime",
    desc: "114 eps + 13 OVAs + 5 películas · HD · Incluye actualizaciones futuras",
    price: 39900,
    oldPrice: 59900,
    badge: "sale",
    icon: "🎬",
    img: null
  },
  {
    id: "dl-005",
    type: "descarga",
    category: "Arte Digital",
    name: "Artbook Digital Oficial",
    desc: "PDF de alta resolución · 200 páginas · Diseños originales de Masami Kurumada",
    price: 4900,
    oldPrice: null,
    badge: null,
    icon: "📖",
    img: null
  },
  {
    id: "dl-006",
    type: "descarga",
    category: "Banda Sonora",
    name: "OST Completo — Saint Seiya",
    desc: "FLAC lossless · 120 pistas · Incluye versiones orquestales remasterizadas",
    price: 7900,
    oldPrice: null,
    badge: "new",
    icon: "🎵",
    img: null
  },
];

/* Helper: format CLP price */
function formatPrice(n) {
  return "$" + n.toLocaleString("es-CL");
}
