import React, { useEffect, useMemo, useState } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import htm from "https://esm.sh/htm@3.1.1";

const html = htm.bind(React.createElement);

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

const skillGroups = [
  {
    title: "Core",
    items: ["HTML", "CSS", "JavaScript", "C++", "React", "MySQL"]
  },
  {
    title: "Growing In",
    items: ["Python", "Next.js", "Tailwind CSS", "Sass", "Bootstrap", "Node.js"]
  },
  {
    title: "Creative Strengths",
    items: ["Figma", "Canva", "UI/UX Design", "Collaboration", "Problem Solving"]
  }
];

const hobbies = [
  "Reading",
  "Writing",
  "Music",
  "Gaming",
  "Movies and shows"
];

const projects = [
  {
    title: "Guia Azul",
    category: "Campus guide",
    image: "./guiaazul.png",
    description: "A campus guide built with my groupmates to help Atenean freshies navigate student life more confidently.",
    accent: "from-[#c9b0f1]/60 via-[#f4ebff] to-transparent"
  },
  {
    title: "Minesweeper",
    category: "Game project",
    image: "./minesweeper.png",
    description: "A group-made Minesweeper project for CIT.005 that focused on logic, teamwork, and playful interaction design.",
    accent: "from-[#9f86d8]/50 via-[#efe8ff] to-transparent"
  },
  {
    title: "Simple Calculator",
    category: "Frontend exercise",
    image: "./simplecalculator.png",
    description: "A clean working calculator created with HTML and CSS as part of an activity and UI practice.",
    accent: "from-[#dfc7ff]/70 via-[#f7f2ff] to-transparent"
  },
  {
    title: "2nd Year Portfolio",
    category: "Personal website",
    image: "./2ndyearportfolio.png",
    description: "An earlier portfolio piece that helped me explore responsive design and personal branding on the web.",
    accent: "from-[#bba1f0]/60 via-[#efe7ff] to-transparent"
  },
  {
    title: "Solo Escapades",
    category: "Travel blog",
    image: "./soloescapades.png",
    description: "A travel blog created for a midterm project, designed as though I were documenting journeys as a traveler.",
    accent: "from-[#d8c1ff]/70 via-[#f6f0ff] to-transparent"
  },
  {
    title: "FFP Monitoring and Management System",
    category: "Management system",
    image: "./ffpsystem.png",
    images: ["./ffpsystem.png", "./ffpsystem2.png"],
    description: "A monitoring and management system project designed to organize records, track updates, and support a smoother workflow through a cleaner digital interface.",
    accent: "from-[#c4a4ff]/65 via-[#f5eeff] to-transparent"
  }
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/ysaadanielle/" },
  { label: "Instagram", href: "https://www.instagram.com/ysadanielle/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ysabel-danielle-atienza-890183326/" },
  { label: "GitHub", href: "https://github.com/YsaDanielle" }
];

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("ysa-theme") === "dark");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState("about");
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("ysa-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const sectionIds = ["about", "projects", "contact"];

    const onScroll = () => {
      setShowTopButton(window.scrollY > 400);

      let current = "about";
      for (const id of sectionIds) {
        const node = document.getElementById(id);
        if (!node) continue;
        const top = node.getBoundingClientRect().top;
        if (top <= 180) current = id;
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const yearLabel = useMemo(() => new Date().getFullYear(), []);

  return html`
    <div className="relative overflow-x-hidden bg-mist text-primary transition-colors duration-300 dark:bg-dusk dark:text-white">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-grain opacity-100 dark:opacity-50"></div>
      <div className="absolute left-[-8rem] top-24 -z-10 h-64 w-64 rounded-full bg-[#cdb6f6]/55 blur-3xl dark:bg-[#7b55bf]/30"></div>
      <div className="absolute right-[-6rem] top-[28rem] -z-10 h-72 w-72 rounded-full bg-[#e3d6ff]/90 blur-3xl dark:bg-[#4d2f78]/35"></div>

      <${Navbar}
        activeSection=${activeSection}
        darkMode=${darkMode}
        onToggleTheme=${() => setDarkMode((value) => !value)}
      />

      <main>
        <${Hero} />
        <${AboutSection} />
        <${ProjectsSection} onSelectProject=${setSelectedProject} />
        <${ContactSection} />
      </main>

      <footer className="text-muted px-6 pb-10 pt-4 text-center text-sm">
        Crafted with React and Tailwind. © ${yearLabel} Ysa Danielle Atienza.
      </footer>

      ${showTopButton &&
      html`
        <button
          type="button"
          aria-label="Back to top"
          onClick=${() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="btn-primary-theme fixed bottom-6 right-6 z-40 rounded-full border px-4 py-3 text-sm font-semibold shadow-soft backdrop-blur transition hover:-translate-y-1"
        >
          Top
        </button>
      `}

      ${selectedProject &&
      html`<${ProjectModal} project=${selectedProject} onClose=${() => setSelectedProject(null)} />`}
    </div>
  `;
}

function Navbar({ activeSection, darkMode, onToggleTheme }) {
  return html`
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="surface-glass mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-[2rem] border px-4 py-3 shadow-soft backdrop-blur-xl sm:px-5">
        <a href="#top" className="text-primary text-lg font-extrabold tracking-[0.2em]">
          ysadanielle.
        </a>

        <div className="order-3 flex w-full items-center justify-center gap-1 overflow-x-auto pt-1 sm:order-2 sm:w-auto sm:justify-start sm:pt-0">
          ${navItems.map(
            (item) => html`
              <a
                key=${item.href}
                href=${item.href}
                className=${`whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                  activeSection === item.href.slice(1)
                    ? "bg-plum text-white dark:bg-[#f3eaff] dark:text-[#241733]"
                    : "text-secondary hover:bg-[#f2eaff] dark:text-white/70 dark:hover:bg-white/10"
                }`}
              >
                ${item.label}
              </a>
            `
          )}
        </div>

        <button
          type="button"
          onClick=${onToggleTheme}
          className="btn-ghost-theme order-2 rounded-full border px-3 py-2 text-sm font-semibold transition hover:-translate-y-0.5 sm:order-3"
        >
          ${darkMode ? "Light" : "Dark"}
        </button>
      </nav>
    </header>
  `;
}

function Hero() {
  return html`
    <section id="top" className="px-6 pb-10 pt-10 sm:px-8 sm:pt-14">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="animate-fadeUp">
          <div className="surface-glass text-primary mb-5 inline-flex rounded-full border px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur dark:text-[#eadcff]">
            BSCS Student • Aspiring Developer • Creative Thinker
          </div>

          <p className="text-muted mb-4 text-sm font-bold uppercase tracking-[0.28em] dark:text-white/55">
            Hello, I’m Ysa Danielle Atienza
          </p>
          <h1 className="text-primary max-w-3xl font-display text-5xl leading-none sm:text-6xl lg:text-7xl dark:text-[#f7f1ff]">
            I build thoughtful, inviting digital experiences with equal care for code and design.
          </h1>
          <p className="text-secondary mt-6 max-w-2xl text-base leading-8 sm:text-lg dark:text-white/70">
            This refreshed portfolio highlights the projects, creativity, and curiosity that shape how I learn and create as a third-year Computer Science student.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="btn-primary-theme rounded-full px-6 py-3 text-sm font-bold transition hover:-translate-y-1"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="btn-ghost-theme rounded-full border px-6 py-3 text-sm font-bold transition hover:-translate-y-1"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <${StatCard} value="5+" label="featured projects" />
            <${StatCard} value="Design +" label="code-minded creativity" />
            <${StatCard} value="Always" label="learning something new" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-float">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#ccb7f3]/70 via-white/55 to-[#eddfff]/55 blur-2xl dark:from-[#6d48aa]/40 dark:via-white/5 dark:to-[#43245f]/35"></div>
          <div className="surface-glass relative overflow-hidden rounded-[2rem] border p-4 shadow-soft backdrop-blur">
            <img
              src="./portfoliopic.png"
              alt="Ysa Danielle Atienza portrait"
              className="fade-mask h-[28rem] w-full rounded-[1.5rem] object-cover object-center"
            />
            <div className="surface-deep mt-4 rounded-[1.5rem] p-4">
              <p className="text-muted text-xs font-bold uppercase tracking-[0.25em] dark:text-white/45">
                Based in the Philippines
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                Interested in frontend development, UI polish, and expressive visual storytelling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function StatCard({ value, label }) {
  return html`
    <div className="surface-card rounded-[1.5rem] border p-4 shadow-sm backdrop-blur">
      <p className="text-primary text-lg font-extrabold dark:text-[#f2e8ff]">${value}</p>
      <p className="text-secondary mt-1 text-sm dark:text-white/65">${label}</p>
    </div>
  `;
}

function AboutSection() {
  return html`
    <section id="about" className="px-6 py-12 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#7f5ab8] via-[#6f4fa3] to-[#5f4294] px-8 py-10 text-white shadow-card dark:from-[#38204f] dark:via-[#4c2e73] dark:to-[#5c3891]">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/60">About me</p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            I enjoy making things that feel useful, gentle, and well put together.
          </h2>
          <p className="mt-6 text-base leading-8 text-white/78">
            I’m a 21-year-old third-year Bachelor of Science in Computer Science student who enjoys coding, design, and creating experiences that feel warm and intentional. I love learning new tools, exploring better ways to build interfaces, and collaborating with people who care about thoughtful work.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="surface-card rounded-[2rem] border p-7 shadow-card backdrop-blur">
            <p className="text-muted text-sm font-bold uppercase tracking-[0.28em] dark:text-white/45">Skills</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              ${skillGroups.map(
                (group) => html`
                  <div key=${group.title} className="surface-strong rounded-[1.4rem] p-4">
                    <h3 className="text-primary text-sm font-extrabold uppercase tracking-[0.16em] dark:text-[#eadcff]">
                      ${group.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      ${group.items.map(
                        (item) => html`
                          <span
                            key=${item}
                            className="surface-soft text-primary rounded-full border px-3 py-1.5 text-sm font-semibold shadow-sm dark:text-white"
                          >
                            ${item}
                          </span>
                        `
                      )}
                    </div>
                  </div>
                `
              )}
            </div>
          </div>

          <div className="surface-card rounded-[2rem] border p-7 shadow-card backdrop-blur">
            <p className="text-muted text-sm font-bold uppercase tracking-[0.28em] dark:text-white/45">Outside the screen</p>
            <div className="mt-5 flex flex-wrap gap-3">
              ${hobbies.map(
                (hobby) => html`
                  <span
                    key=${hobby}
                    className="surface-soft text-primary rounded-full border px-4 py-2 text-sm font-semibold dark:text-white/80"
                  >
                    ${hobby}
                  </span>
                `
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function ProjectsSection({ onSelectProject }) {
  return html`
    <section id="projects" className="px-6 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-muted text-sm font-bold uppercase tracking-[0.28em] dark:text-white/45">Selected work</p>
            <h2 className="text-primary mt-3 font-display text-4xl sm:text-5xl dark:text-white">
              Projects that helped me grow as a builder
            </h2>
          </div>
          <p className="text-secondary max-w-xl text-sm leading-7 dark:text-white/65">
            These works reflect my interest in clean interfaces, collaborative school projects, and learning through hands-on creation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          ${projects.map(
            (project) => html`
              <article
                key=${project.title}
                className="surface-card group overflow-hidden rounded-[2rem] border shadow-card transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(111,79,163,0.18)]"
              >
                <div className=${`h-48 bg-gradient-to-br ${project.accent} p-4`}>
                  <${ProjectPreviewCarousel} project=${project} />
                </div>
                <div className="p-6">
                  <p className="text-muted text-xs font-bold uppercase tracking-[0.25em] dark:text-white/45">
                    ${project.category}
                  </p>
                  <h3 className="text-primary mt-3 text-2xl font-extrabold dark:text-white">
                    ${project.title}
                  </h3>
                  <p className="text-secondary mt-3 text-sm leading-7 dark:text-white/65">
                    ${project.description}
                  </p>
                  <button
                    type="button"
                    onClick=${() => onSelectProject(project)}
                    className="btn-primary-theme mt-6 rounded-full px-5 py-3 text-sm font-bold transition"
                  >
                    View project
                  </button>
                </div>
              </article>
            `
          )}
        </div>
      </div>
    </section>
  `;
}

function ProjectPreviewCarousel({ project }) {
  const images = project.images || [project.image];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % images.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [images.length]);

  const goTo = (index) => {
    setCurrentIndex((index + images.length) % images.length);
  };

  const handleArrow = (event, direction) => {
    event.stopPropagation();
    goTo(currentIndex + direction);
  };

  return html`
    <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] shadow-soft">
      <img
        src=${images[currentIndex]}
        alt=${`${project.title} screenshot ${currentIndex + 1}`}
        className="h-full w-full object-cover transition duration-500"
      />

      ${images.length > 1 &&
      html`
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick=${(event) => handleArrow(event, -1)}
            className="btn-ghost-theme absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border px-3 py-2 text-sm font-bold shadow-sm"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick=${(event) => handleArrow(event, 1)}
            className="btn-ghost-theme absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border px-3 py-2 text-sm font-bold shadow-sm"
          >
            →
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            ${images.map(
              (_, index) => html`
                <button
                  key=${`${project.title}-dot-${index}`}
                  type="button"
                  aria-label=${`Go to image ${index + 1}`}
                  onClick=${(event) => {
                    event.stopPropagation();
                    goTo(index);
                  }}
                  className=${`h-2.5 w-2.5 rounded-full transition ${
                    currentIndex === index ? "bg-white" : "bg-white/45"
                  }`}
                />
              `
            )}
          </div>
        </>
      `}
    </div>
  `;
}

function ContactSection() {
  return html`
    <section id="contact" className="px-6 py-12 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 rounded-[2.4rem] bg-gradient-to-br from-[#4a2f72] via-[#5a3c86] to-[#6c47a2] px-8 py-10 text-white shadow-soft dark:from-[#1c122b] dark:via-[#29163f] dark:to-[#3b1f5d] lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-white/45">Contact</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">
            Let’s connect and build something meaningful.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
            I’m always open to learning opportunities, creative collaborations, and conversations about design, development, and student projects.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/45">Email</p>
            <a className="mt-2 block text-lg font-semibold hover:text-[#f1dfff]" href="mailto:ysadani.atienza@gmail.com">
              ysadani.atienza@gmail.com
            </a>
          </div>
          <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/45">Phone</p>
            <a className="mt-2 block text-lg font-semibold hover:text-[#f1dfff]" href="tel:+639771050524">
              +63 977 105 0524
            </a>
          </div>
          <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/45">Socials</p>
            <div className="mt-4 flex flex-wrap gap-3">
              ${socialLinks.map(
                (link) => html`
                  <a
                    key=${link.label}
                    href=${link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-[#f3eaff] hover:text-[#2b1b3f]"
                  >
                    ${link.label}
                  </a>
                `
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function ProjectModal({ project, onClose }) {
  const images = project.images || [project.image];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [project.title]);

  useEffect(() => {
    if (images.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % images.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [images.length]);

  const moveImage = (direction) => {
    setCurrentIndex((index) => (index + direction + images.length) % images.length);
  };

  return html`
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
      onClick=${onClose}
      role="presentation"
    >
      <div
        className="surface-card w-full max-w-4xl overflow-hidden rounded-[2rem] border shadow-soft dark:bg-[#1d132a]"
        onClick=${(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label=${project.title}
      >
        <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-strong p-4 dark:bg-[#261838]">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <img
                src=${images[currentIndex]}
                alt=${`${project.title} preview ${currentIndex + 1}`}
                className="h-full max-h-[28rem] w-full rounded-[1.5rem] object-cover"
              />

              ${images.length > 1 &&
              html`
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick=${() => moveImage(-1)}
                    className="btn-ghost-theme absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border px-3 py-2 text-sm font-bold"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick=${() => moveImage(1)}
                    className="btn-ghost-theme absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border px-3 py-2 text-sm font-bold"
                  >
                    →
                  </button>
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/15 px-3 py-2 backdrop-blur">
                    ${images.map(
                      (_, index) => html`
                        <button
                          key=${`${project.title}-modal-dot-${index}`}
                          type="button"
                          aria-label=${`Show image ${index + 1}`}
                          onClick=${() => setCurrentIndex(index)}
                          className=${`h-2.5 w-2.5 rounded-full transition ${
                            currentIndex === index ? "bg-white" : "bg-white/45"
                          }`}
                        />
                      `
                    )}
                  </div>
                </>
              `}
            </div>
          </div>
          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-muted text-xs font-bold uppercase tracking-[0.25em] dark:text-white/45">
                  ${project.category}
                </p>
                <h3 className="text-primary mt-3 font-display text-4xl dark:text-white">
                  ${project.title}
                </h3>
              </div>
              <button
                type="button"
                onClick=${onClose}
                className="rounded-full border border-black/10 px-3 py-2 text-sm font-bold dark:border-white/10"
              >
                Close
              </button>
            </div>
            <p className="text-secondary mt-6 text-base leading-8 dark:text-white/70">
              ${project.description}
            </p>
            <div className="surface-soft mt-6 rounded-[1.4rem] border p-5">
              <p className="text-secondary text-sm leading-7 dark:text-white/68">
                This piece represents part of my growth as a student creator, combining curiosity, collaboration, and a desire to make experiences easier and more enjoyable for people.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
