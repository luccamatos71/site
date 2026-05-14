function setupHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const toggleHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  };

  window.addEventListener("scroll", toggleHeader, { passive: true });
  toggleHeader();
}

function setupRevealAnimations() {
  const revealTargets = document.querySelectorAll(
    ".section-head, .card, .editorial-item, .niche-item, .result-item, .dashboard-panel, .hero-copy, .final-cta-inner, .problem-quote, .method-note, .niche-note, .faq-item"
  );

  if (!revealTargets.length) return;

  revealTargets.forEach((item) => item.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function setupCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const animateCounter = (element) => {
    const target = Number(element.getAttribute("data-counter") || 0);
    const prefix = element.getAttribute("data-prefix") || "";
    const suffix = element.getAttribute("data-suffix") || "";
    const duration = 1500;
    let startTime;

    const tick = (now) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(target * easeOutCubic(progress));
      element.textContent = `${prefix}${current}${suffix}`;
      if (progress < 1) window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

function setupHeroProgressBars() {
  const panel = document.querySelector(".dashboard-panel");
  if (!panel) return;

  const panelObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        panel.classList.add("bars-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  panelObserver.observe(panel);
}

function setupFooterYear() {
  const year = document.getElementById("year");
  if (!year) return;
  year.textContent = String(new Date().getFullYear());
}

function setupFormTracking() {
  const form = document.querySelector("form");
  if (!form || typeof window.trackEvent !== "function") return;

  form.addEventListener("submit", () => {
    window.trackEvent("submit_form", { location: "site_form" });
  });
}

setupHeaderScroll();
setupRevealAnimations();
setupCounters();
setupHeroProgressBars();
setupFooterYear();
setupFormTracking();
