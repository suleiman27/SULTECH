```javascript
/* ==================================================
   SULTECH SOLUTIONS — SHARED SERVICE PAGE JAVASCRIPT
   Reusable across all service mini-pages
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".it-page");

  // Do nothing on pages that do not use the service template.
  if (!page) return;

  /* -----------------------------------------------
     1. AUTOMATIC FOOTER YEAR
  ------------------------------------------------ */

  const yearElements = page.querySelectorAll(
    "#it-year, [data-current-year]"
  );

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  /* -----------------------------------------------
     2. SCROLL REVEAL ANIMATIONS
  ------------------------------------------------ */

  const revealItems = page.querySelectorAll(".it-reveal");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => {
      item.classList.add("it-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("it-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  }

  /* -----------------------------------------------
     3. SERVICE-SPECIFIC WHATSAPP ENQUIRIES
  ------------------------------------------------ */

  const whatsappLinks = page.querySelectorAll(
    'a[href*="wa.me/"]'
  );

  const originalWhatsappUrls = new Map();

  whatsappLinks.forEach((link) => {
    originalWhatsappUrls.set(link, link.href);
  });

  function setWhatsappMessage(serviceName) {
    const message = serviceName
      ? `Hello SulTech Solutions, I am interested in ${serviceName}. Please share more information.`
      : "Hello SulTech Solutions, I would like to enquire about your services.";

    const encodedMessage = encodeURIComponent(message);

    whatsappLinks.forEach((link) => {
      const originalUrl = originalWhatsappUrls.get(link);

      if (!originalUrl) return;

      try {
        const url = new URL(originalUrl);
        url.searchParams.set("text", message);
        link.href = url.toString();
      } catch (error) {
        // Leave the original link unchanged if it is invalid.
      }
    });
  }

  // Add the selected service to the WhatsApp enquiry.
  const serviceLinks = page.querySelectorAll("[data-service]");

  serviceLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const serviceName = link.dataset.service;

      if (serviceName) {
        setWhatsappMessage(serviceName);
      }
    });
  });

  /* -----------------------------------------------
     4. SMOOTH SCROLLING
  ------------------------------------------------ */

  const internalLinks = page.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      let target;

      try {
        target = page.querySelector(href);
      } catch (error) {
        return;
      }

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  /* -----------------------------------------------
     5. FAQ — KEEP ONE ANSWER OPEN AT A TIME
  ------------------------------------------------ */

  const faqItems = page.querySelectorAll(".it-faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });

  /* -----------------------------------------------
     6. OPTIONAL CARD POINTER EFFECT
  ------------------------------------------------ */

  const supportsHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (supportsHover) {
    const cards = page.querySelectorAll(".it-service-card");

    cards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const bounds = card.getBoundingClientRect();

        card.style.setProperty(
          "--pointer-x",
          `${event.clientX - bounds.left}px`
        );

        card.style.setProperty(
          "--pointer-y",
          `${event.clientY - bounds.top}px`
        );
      });
    });
  }
});
```
