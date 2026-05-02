(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  revealElements.forEach((element) => observer.observe(element));

  // PROBLEM ITEMS INTERACTION
  const problemItems = document.querySelectorAll(".problem-item");
  problemItems.forEach((item) => {
    item.addEventListener("click", () => {
      problemItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // EXAMPLES SECTION - DYNAMIC PANEL
  const exampleBtns = document.querySelectorAll(".example-btn");
  const detailSections = document.querySelectorAll(".detail-section");

  exampleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const exampleId = btn.getAttribute("data-example");
      
      // Update button state
      exampleBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update detail panel
      detailSections.forEach((section) => {
        section.removeAttribute("data-visible");
      });
      const activeSection = document.getElementById(exampleId);
      if (activeSection) {
        activeSection.setAttribute("data-visible", "true");
      }
    });
  });

  // TIMELINE INTERACTION
  const timelineSteps = document.querySelectorAll(".timeline-step");
  const timelineDescs = document.querySelectorAll(".timeline-desc");

  timelineSteps.forEach((step, index) => {
    step.addEventListener("click", () => {
      const stepNum = step.getAttribute("data-step");
      
      // Update step state
      timelineSteps.forEach((s) => s.classList.remove("active"));
      step.classList.add("active");

      // Update description
      timelineDescs.forEach((desc) => desc.classList.remove("active"));
      const activeDesc = document.getElementById(`desc-${stepNum}`);
      if (activeDesc) {
        activeDesc.classList.add("active");
      }
    });
  });

  // BUSINESS SELECTOR
  const businessBtns = document.querySelectorAll(".business-btn");
  const negocioInput = document.getElementById("negocio");

  businessBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const businessType = btn.getAttribute("data-business");
      
      // Update button state
      businessBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update hidden input
      if (negocioInput) {
        negocioInput.value = businessType;
      }
    });
  });

  // FORM SUBMISSION WITH WHATSAPP
  const form = document.getElementById("lead-form");
  const formStatus = document.getElementById("form-status");
  const whatsappNumber = "SEUNUMERO";

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const nome = (formData.get("nome") || "").toString().trim();
    const whatsapp = (formData.get("whatsapp") || "").toString().trim();
    const negocio = (formData.get("negocio") || "").toString().trim();
    const melhoria = (formData.get("melhoria") || "").toString().trim();

    if (!nome || !whatsapp || !negocio || !melhoria) {
      if (formStatus) formStatus.textContent = "Por favor, preencha todos os campos.";
      return;
    }

    const message =
      "Olá Lumyn! Quero estruturar meu sistema.%0A%0A" +
      "Nome: " + encodeURIComponent(nome) + "%0A" +
      "WhatsApp: " + encodeURIComponent(whatsapp) + "%0A" +
      "Tipo de negócio: " + encodeURIComponent(negocio) + "%0A" +
      "O que quero melhorar: " + encodeURIComponent(melhoria);

    const waUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    if (formStatus) formStatus.textContent = "Abrindo WhatsApp com sua mensagem...";
    form.reset();
    
    // Reset business selector
    businessBtns.forEach((b) => b.classList.remove("active"));
    if (negocioInput) negocioInput.value = "";
  });
})();
