(() => {
  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ---------- Theme ----------
  const THEME_KEY = "theme";
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) root.dataset.theme = saved;
  } catch {}
  $(".theme")?.addEventListener("click", () => {
    const current = root.dataset.theme ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch {}
  });

  // ---------- Nav ----------
  const nav = $(".nav");
  const toggle = $(".nav__toggle");
  const links = $("#nav-links");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("is-open", open);
  };
  toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  $$("a", links).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Counters ----------
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const format = (n) => n.toFixed(decimals) + suffix;
    if (reduceMotion) { el.textContent = format(target); return; }
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = format(target * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // ---------- Reveal on scroll ----------
  const reveals = $$(".reveal");
  const counters = $$("[data-count]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.count) animateCount(el);
        else el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
    counters.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
    counters.forEach(animateCount);
  }

  // ---------- Project filter ----------
  const chips = $$(".chip");
  chips.forEach((chip) => chip.addEventListener("click", () => {
    chips.forEach((c) => {
      c.classList.toggle("is-active", c === chip);
      c.setAttribute("aria-pressed", String(c === chip));
    });
    const filter = chip.dataset.filter;
    $$(".project").forEach((p) => {
      const show = filter === "all" || p.dataset.cat.split(" ").includes(filter);
      p.classList.toggle("is-hidden", !show);
      if (show) p.classList.add("is-visible");
    });
  }));

  // ---------- Contact form ----------
  // No backend required: this opens the visitor's email client with the
  // message pre-filled. To collect submissions instead, point the form at
  // Formspree (action="https://formspree.io/f/<id>" method="POST") or add the
  // `data-netlify="true"` attribute when hosting on Netlify, and remove this handler.
  const CONTACT_EMAIL = "nikitailab@gmail.com";
  const form = $("#contact-form");
  const note = $(".form__note", form);
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    let valid = true;
    $$("[required]", form).forEach((field) => {
      const ok = field.type === "email"
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())
        : field.value.trim() !== "";
      field.classList.toggle("is-invalid", !ok);
      field.setAttribute("aria-invalid", String(!ok));
      if (!ok) valid = false;
    });
    note.classList.remove("is-error", "is-success");
    if (!valid) {
      note.textContent = "Please fill in your name, a valid email, and a few project details.";
      note.classList.add("is-error");
      $(".is-invalid", form)?.focus();
      return;
    }
    const subject = `New project inquiry — ${data.service}`;
    const body = `Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service}\nBudget: ${data.budget}\n\n${data.message}`;
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    note.textContent = "Thanks! Your email app should open with your message ready to send.";
    note.classList.add("is-success");
    form.reset();
  });

  // ---------- Footer year ----------
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
