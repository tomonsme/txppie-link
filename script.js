// Optional company members: change only these booleans to publish/unpublish a card.
const OPTIONAL_MEMBER_VISIBILITY = {
  yamazaki: false,
  miyake: false,
};

document.querySelectorAll("[data-optional-member]").forEach((card) => {
  const visible = OPTIONAL_MEMBER_VISIBILITY[card.dataset.optionalMember];
  card.hidden = !visible;
  if (visible) {
    const image = card.querySelector("img[data-src]");
    if (image && !image.hasAttribute("src")) image.src = image.dataset.src;
  }
});

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");

const setMenu = (open) => {
  menuButton?.setAttribute("aria-expanded", String(open));
  menuButton?.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  if (mobileNav) mobileNav.inert = !open;
  header?.classList.toggle("menu-open", open);
  document.body.classList.toggle("nav-open", open);
  if (open) mobileNav?.querySelector("a")?.focus();
};

if (mobileNav) mobileNav.inert = true;

menuButton?.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px" });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelectorAll(".footer-meta > p").forEach((copyright) => {
  copyright.textContent = copyright.textContent.replace("© 2025", "© 2026");
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
