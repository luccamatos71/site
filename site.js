(function () {
  const site = window.LUMYN_SITE || {};
  const tracking = site.tracking || {};
  const channels = site.channels || {};
  const seo = site.seo || {};
  const defaultSiteUrl = typeof site.siteUrl === "string" && site.siteUrl
    ? site.siteUrl.replace(/\/+$/, "")
    : "https://SEUDOMINIO.com";

  function ensureMeta(selector, attributeName, attributeValue) {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute(attributeName, attributeValue);
      document.head.appendChild(node);
    }
    return node;
  }

  function ensureCanonical(url) {
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }

  function getCurrentPageKey() {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    if (path === "/links" || path === "/links.html") return "links";
    return "home";
  }

  function getPageSeo() {
    const pageKey = getCurrentPageKey();
    const pageConfig = seo[pageKey] || {};
    const fallback = seo.home || {};
    const title = pageConfig.title || fallback.title || document.title;
    const description =
      pageConfig.description ||
      fallback.description ||
      site.brand?.description ||
      "";
    const path = pageConfig.path || (pageKey === "links" ? "/links" : "/");
    const canonicalUrl = `${defaultSiteUrl}${path}`;
    const imagePath = seo.defaultImagePath || "/assets/og/lumyn-og.png";
    const imageUrl = `${defaultSiteUrl}${imagePath}`;
    return { title, description, canonicalUrl, imageUrl, pageKey };
  }

  function applySeoMeta() {
    const data = getPageSeo();
    document.title = data.title;

    ensureMeta('meta[name="description"]', "name", "description").setAttribute(
      "content",
      data.description
    );
    ensureMeta('meta[name="theme-color"]', "name", "theme-color").setAttribute(
      "content",
      "#070708"
    );
    ensureMeta('meta[name="robots"]', "name", "robots").setAttribute(
      "content",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    );

    ensureMeta('meta[property="og:type"]', "property", "og:type").setAttribute(
      "content",
      "website"
    );
    ensureMeta('meta[property="og:site_name"]', "property", "og:site_name").setAttribute(
      "content",
      site.brand?.name || "Lumyn"
    );
    ensureMeta('meta[property="og:title"]', "property", "og:title").setAttribute(
      "content",
      data.title
    );
    ensureMeta(
      'meta[property="og:description"]',
      "property",
      "og:description"
    ).setAttribute("content", data.description);
    ensureMeta('meta[property="og:url"]', "property", "og:url").setAttribute(
      "content",
      data.canonicalUrl
    );
    ensureMeta('meta[property="og:image"]', "property", "og:image").setAttribute(
      "content",
      data.imageUrl
    );
    ensureMeta(
      'meta[property="og:image:alt"]',
      "property",
      "og:image:alt"
    ).setAttribute("content", "Lumyn assessoria de crescimento");
    ensureMeta('meta[property="og:locale"]', "property", "og:locale").setAttribute(
      "content",
      "pt_BR"
    );

    ensureMeta('meta[name="twitter:card"]', "name", "twitter:card").setAttribute(
      "content",
      "summary_large_image"
    );
    ensureMeta('meta[name="twitter:title"]', "name", "twitter:title").setAttribute(
      "content",
      data.title
    );
    ensureMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description"
    ).setAttribute("content", data.description);
    ensureMeta('meta[name="twitter:image"]', "name", "twitter:image").setAttribute(
      "content",
      data.imageUrl
    );
    ensureMeta(
      'meta[name="twitter:image:alt"]',
      "name",
      "twitter:image:alt"
    ).setAttribute("content", "Lumyn assessoria de crescimento");

    ensureCanonical(data.canonicalUrl);
  }

  function buildWhatsappUrl(message) {
    const number = channels.whatsappNumber || "SEUNUMERO";
    const base = `https://wa.me/${number}`;
    if (!message) return base;
    return `${base}?text=${encodeURIComponent(message)}`;
  }

  function isTrackingConfigured() {
    return (
      Boolean(tracking.enabled) &&
      typeof tracking.gtmId === "string" &&
      !tracking.gtmId.includes("XXXX")
    );
  }

  function loadTagManager() {
    if (!isTrackingConfigured()) return;
    if (document.querySelector('script[data-lumyn-gtm="true"]')) return;

    const script = document.createElement("script");
    script.async = true;
    script.dataset.lumynGtm = "true";
    script.src = `https://www.googletagmanager.com/gtm.js?id=${tracking.gtmId}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  window.trackEvent = function trackEvent(name, params = {}) {
    if (!name) return;
    window.dataLayer.push({
      event: name,
      page_path: window.location.pathname,
      page_title: document.title,
      ...params,
    });
  };

  function bindTrackedElements() {
    const tracked = document.querySelectorAll("[data-track]");
    tracked.forEach((element) => {
      element.addEventListener("click", () => {
        const eventName = element.getAttribute("data-track");
        const location = element.getAttribute("data-track-location") || "";
        window.trackEvent(eventName, { location });
      });
    });
  }

  function bindWhatsappLinks() {
    const links = document.querySelectorAll("[data-whatsapp]");
    links.forEach((link) => {
      const message = link.getAttribute("data-whatsapp") || "";
      link.setAttribute("href", buildWhatsappUrl(message));
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }

  function buildLinkHref(item) {
    if (item.type === "whatsapp") return buildWhatsappUrl("Olá, Lumyn. Quero falar sobre crescimento com controle.");
    if (item.type === "instagram") return channels.instagramUrl || "https://instagram.com/SEUPERFIL";
    return item.href || "#";
  }

  function renderLinksButtons() {
    const list = document.getElementById("links-buttons");
    if (!list) return;

    const items = Array.isArray(site.linksPage?.buttons) ? site.linksPage.buttons : [];
    list.innerHTML = "";

    items.forEach((item, index) => {
      const anchor = document.createElement("a");
      anchor.className = index === 0 ? "link-btn primary" : "link-btn";
      anchor.textContent = item.label || `Link ${index + 1}`;
      anchor.href = buildLinkHref(item);
      anchor.setAttribute("data-track", item.event || "click_diagnostico");
      anchor.setAttribute("data-track-location", item.location || "links_secondary");

      if (item.type === "whatsapp" || item.type === "instagram") {
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
      }

      list.appendChild(anchor);
    });
  }

  function updateBrandText() {
    const taglineNode = document.querySelector("[data-brand-tagline]");
    if (taglineNode && site.brand?.tagline) {
      taglineNode.textContent = site.brand.tagline;
    }
  }

  function setJsonLd(id, payload) {
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const node = document.createElement("script");
    node.type = "application/ld+json";
    node.id = id;
    node.textContent = JSON.stringify(payload);
    document.head.appendChild(node);
  }

  function extractFaqEntries() {
    const items = document.querySelectorAll(".faq-item");
    return Array.from(items)
      .map((item) => {
        const question = item.querySelector("h3")?.textContent?.trim();
        const answer = item.querySelector("p")?.textContent?.trim();
        if (!question || !answer) return null;
        return {
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        };
      })
      .filter(Boolean);
  }

  function injectSchemas() {
    const { pageKey, canonicalUrl } = getPageSeo();
    const serviceTypes = [
      "Assessoria de crescimento",
      "Estratégia",
      "Operação",
      "Automação",
      "CRM",
      "Funis",
      "IA aplicada",
      "Inteligência comercial",
      "Soluções para restaurantes e negócios locais",
    ];

    const social = [];
    if (channels.instagramUrl) social.push(channels.instagramUrl);
    if (
      channels.whatsappNumber &&
      typeof channels.whatsappNumber === "string" &&
      !channels.whatsappNumber.includes("SEUNUMERO")
    ) {
      social.push(`https://wa.me/${channels.whatsappNumber}`);
    }

    setJsonLd("lumyn-schema-organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.brand?.name || "Lumyn",
      url: defaultSiteUrl,
      description: site.brand?.description || "",
      sameAs: social,
      areaServed: "BR",
    });

    setJsonLd("lumyn-schema-website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.brand?.name || "Lumyn",
      url: defaultSiteUrl,
      inLanguage: "pt-BR",
    });

    setJsonLd("lumyn-schema-service", {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: site.brand?.name || "Lumyn",
      url: canonicalUrl,
      description: site.brand?.description || "",
      serviceType: serviceTypes,
      areaServed: {
        "@type": "Country",
        name: "Brasil",
      },
    });

    if (pageKey === "links") {
      setJsonLd("lumyn-schema-breadcrumb", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: `${defaultSiteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Links",
            item: `${defaultSiteUrl}/links`,
          },
        ],
      });
    }

    if (pageKey === "home") {
      const faqEntities = extractFaqEntries();
      if (faqEntities.length > 0) {
        setJsonLd("lumyn-schema-faq", {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntities,
        });
      }
    }
  }

  function bootstrap() {
    applySeoMeta();
    injectSchemas();
    loadTagManager();
    bindWhatsappLinks();
    updateBrandText();
    renderLinksButtons();
    bindTrackedElements();

    if (getCurrentPageKey() === "links") {
      window.trackEvent("view_links_page", { location: "links_page" });
    }
  }

  bootstrap();
})();
