const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");

// このサイトをリンク索引として1タブ内で閲覧できるよう、全リンクを同一タブ遷移に統一。
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.removeAttribute("target");
  link.removeAttribute("rel");
});

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  header?.classList.toggle("menu-open", open);
});

header?.querySelectorAll('nav a').forEach((link) => link.addEventListener("click", () => {
  menuButton?.setAttribute("aria-expanded", "false");
  header.classList.remove("menu-open");
}));

window.addEventListener("scroll", () => header?.classList.toggle("is-scrolled", scrollY > 20), { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.08, rootMargin: "0px 0px -30px" });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const filterButtons = document.querySelectorAll("[data-filter]");
const articles = document.querySelectorAll("[data-category]");
const emptyState = document.querySelector("[data-filter-empty]");

filterButtons.forEach((button) => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  let visible = 0;

  filterButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });

  articles.forEach((article) => {
    const show = filter === "all" || article.dataset.category === filter;
    article.hidden = !show;
    if (show) visible += 1;
  });

  if (emptyState) emptyState.hidden = visible !== 0;
}));
