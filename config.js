window.LUMYN_SITE = {
  siteUrl: "https://lumynassessoria.com",
  brand: {
    name: "Lumyn",
    tagline: "Para negócios que querem crescer com controle.",
    description:
      "A Lumyn ajuda negócios a crescer com controle, unindo estratégia, operação, automação, CRM, IA aplicada e presença digital.",
  },
  channels: {
    whatsappNumber: "5571993752189",
    instagramUrl: "https://instagram.com/SEUPERFIL",
  },
  tracking: {
    enabled: true,
    gtmId: "GTM-XXXXXXX",
    ga4Id: "G-XXXXXXXXXX",
    metaPixelId: "26642513715441759",
  },
  linksPage: {
    buttons: [
      {
        label: "Falar no WhatsApp",
        type: "whatsapp",
        event: "click_whatsapp",
        location: "links_primary",
      },
      {
        label: "Solicitar diagnóstico",
        href: "/#contato",
        event: "click_diagnostico",
        location: "links_secondary",
      },
      {
        label: "Conhecer a Lumyn",
        href: "/#inicio",
        event: "click_diagnostico",
        location: "links_secondary",
      },
      {
        label: "Soluções para restaurantes",
        href: "/#restaurantes",
        event: "click_diagnostico",
        location: "links_secondary",
      },
      {
        label: "Ver Instagram",
        type: "instagram",
        event: "click_instagram",
        location: "links_secondary",
      },
    ],
  },
  seo: {
    defaultImagePath: "/assets/og/lumyn-og.png",
    home: {
      title: "Lumyn — Assessoria de Crescimento, Operação e Automação",
      description:
        "A Lumyn ajuda negócios a crescer com controle, unindo estratégia, operação, automação, CRM, IA aplicada e presença digital.",
      path: "/",
    },
    links: {
      title: "Lumyn Links — WhatsApp, Diagnóstico e Soluções",
      description:
        "Acesse os principais links da Lumyn: WhatsApp, diagnóstico, soluções para restaurantes e Instagram.",
      path: "/links",
    },
  },
};
