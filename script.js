// Mobile navigation toggle
const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");

if (navToggle && navLinks) {
  navToggle.setAttribute("aria-expanded", "false");

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.classList.toggle("nav__toggle--open");
    navLinks.classList.toggle("nav__links--open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navToggle.classList.remove("nav__toggle--open");
      navLinks.classList.remove("nav__links--open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Service filter chips
const chips = document.querySelectorAll(".chip");
const serviceCards = document.querySelectorAll(".service-card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;

    chips.forEach((c) => c.classList.remove("chip--active"));
    chip.classList.add("chip--active");

    serviceCards.forEach((card) => {
      const category = card.dataset.category || "";
      if (!filter || filter === "all" || category.includes(filter)) {
        card.hidden = false;
      } else {
        card.hidden = true;
      }
    });
  });
});

// Scroll-to-top button
const scrollTopBtn = document.querySelector(".scroll-top");

if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    const shouldShow = window.scrollY > 250;
    scrollTopBtn.classList.toggle("scroll-top--visible", shouldShow);
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Contact form validation and WhatsApp submission
const form = document.getElementById("contact-form");
const successEl = document.getElementById("form-success");
const submitBtn = form?.querySelector('button[type="submit"]');

function setFieldError(id, message) {
  const group = document.getElementById(id)?.closest(".form__group");
  const errorEl = document.querySelector(`.form__error[data-for="${id}"]`);
  if (!group || !errorEl) return;
  if (message) {
    group.classList.add("form__group--invalid");
    errorEl.textContent = message;
  } else {
    group.classList.remove("form__group--invalid");
    errorEl.textContent = "";
  }
}

if (form && successEl) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const service = formData.get("service")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    let hasError = false;

    if (!name) {
      setFieldError("name", "Please enter your name.");
      hasError = true;
    } else {
      setFieldError("name");
    }

    if (!phone) {
      setFieldError("phone", "Please enter a phone or WhatsApp number.");
      hasError = true;
    } else {
      setFieldError("phone");
    }

    if (!service) {
      setFieldError("service", "Please select a service of interest.");
      hasError = true;
    } else {
      setFieldError("service");
    }

    if (!message) {
      setFieldError("message", "Let us know how we can help.");
      hasError = true;
    } else {
      setFieldError("message");
    }

    if (hasError) {
      successEl.textContent = "";
      return;
    }

    const targetNumber = "254758841904";
    const serviceLabel =
      form.querySelector("#service option:checked")?.textContent?.trim() || service;
    const whatsappText = [
      "Hello On Paws, I would like to make an inquiry.",
      `Name: ${name}`,
      `Phone/WhatsApp: ${phone}`,
      `Service: ${serviceLabel}`,
      `Message: ${message}`
    ].join("\n");

    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(whatsappText)}`;
    successEl.textContent = "Opening WhatsApp...";

    if (submitBtn) {
      submitBtn.textContent = "Message Sent";
      submitBtn.classList.add("btn--sent");
      submitBtn.disabled = true;
    }

    const newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!newWindow) {
      window.location.href = whatsappUrl;
    }
  });
}

// Dynamic year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

