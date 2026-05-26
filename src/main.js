const sectionIds = ["hero", "services", "workflow", "contact"];
const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
const progressBar = document.querySelector("[data-progress]");
const revealNodes = Array.from(document.querySelectorAll(".reveal"));
const yearTarget = document.querySelector("[data-year]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const submitButton = document.querySelector("[data-submit-button]");

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isMatch = link.getAttribute("href") === `#${id}`;
    link.dataset.active = String(isMatch);
    link.setAttribute("aria-current", isMatch ? "page" : "false");
  });
};

const updateScrollProgress = () => {
  const scrollTop = window.scrollY;
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const width = scrollRange > 0 ? (scrollTop / scrollRange) * 100 : 0;
  progressBar?.style.setProperty("width", `${Math.min(width, 100)}%`);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealNodes.forEach((node) => revealObserver.observe(node));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const activeEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (activeEntry?.target?.id) {
      setActiveLink(activeEntry.target.id);
    }
  },
  {
    rootMargin: "-35% 0px -40% 0px",
    threshold: [0.2, 0.45, 0.7]
  }
);

sectionIds.forEach((id) => {
  const element = document.getElementById(id);
  if (element) {
    sectionObserver.observe(element);
  }
});

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("load", updateScrollProgress);

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (new URLSearchParams(window.location.search).get("submitted") === "true" && formStatus) {
  formStatus.textContent = "Your message was sent successfully. We will follow up shortly.";
  formStatus.className = "mt-4 text-sm text-glow";
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    if (!contactForm.checkValidity()) {
      event.preventDefault();
      formStatus.textContent = "Please complete all required fields before submitting.";
      formStatus.className = "mt-4 text-sm text-amber-300";
      return;
    }

    submitButton?.setAttribute("disabled", "disabled");
    submitButton?.classList.add("opacity-70");

    if (formStatus) {
      formStatus.textContent = "Submitting your inquiry...";
      formStatus.className = "mt-4 text-sm text-mist/70";
    }
  });
}

setActiveLink("hero");
updateScrollProgress();
