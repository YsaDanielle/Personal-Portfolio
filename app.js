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
    items: ["HTML", "CSS", "JavaScript", "C++", "Python", "MySQL"]
  },
  {
    title: "Growing In",
    items: ["React", "Next.js", "Tailwind CSS", "Sass", "Bootstrap", "Node.js"]
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
    accent: "from-rosewood/20 to-transparent"
  },
  {
    title: "Minesweeper",
    category: "Game project",
    image: "./minesweeper.png",
    description: "A group-made Minesweeper project for CIT.005 that focused on logic, teamwork, and playful interaction design.",
    accent: "from-pine/20 to-transparent"
  },
  {
    title: "Simple Calculator",
    category: "Frontend exercise",
    image: "./simplecalculator.png",
    description: "A clean working calculator created with HTML and CSS as part of an activity and UI practice.",
    accent: "from-amber-500/20 to-transparent"
  },
  {
    title: "2nd Year Portfolio",
    category: "Personal website",
    image: "./2ndyearportfolio.png",
    description: "An earlier portfolio piece that helped me explore responsive design and personal branding on the web.",
    accent: "from-sky-500/20 to-transparent"
  },
  {
    title: "Solo Escapades",
    category: "Travel blog",
    image: "./soloescapades.png",
    description: "A travel blog created for a midterm project, designed as though I were documenting journeys as a traveler.",
    accent: "from-emerald-500/20 to-transparent"
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
    <div className="relative overflow-x-hidden bg-mist text-ink transition-colors duration-300 dark:bg-[#181614] dark:text-white">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-grain opacity-90 dark:opacity-50"></div>
      <div className="absolute left-[-8rem] top-24 -z-10 h-64 w-64 rounded-full bg-rosewood/20 blur-3xl dark:bg-rosewood/30"></div>
      <div className="absolute right-[-6rem] top-[28rem] -z-10 h-72 w-72 rounded-full bg-pine/15 blur-3xl dark:bg-pine/30"></div>

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

      <footer className="px-6 pb-10 pt-4 text-center text-sm text-ink/60 dark:text-white/60">
        Crafted with React and Tailwind. © ${yearLabel} Ysa Danielle Atienza.
      </footer>

      ${showTopButton &&
      html`
        <button
          type="button"
          aria-label="Back to top"
          onClick=${() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 rounded-full border border-white/60 bg-white/90 px-4 py-3 text-sm font-semibold text-ink shadow-soft backdrop-blur transition hover:-translate-y-1 dark:border-white/10 dark:bg-[#26211d]/90 dark:text-white"
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
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-white/60 bg-white/75 px-4 py-3 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-[#221d19]/75 sm:px-5">
        <a href="#top" className="text-lg font-extrabold tracking-[0.2em] text-plum dark:text-white">
          YDA
        </a>

        <div className="order-3 flex w-full items-center justify-center gap-1 overflow-x-auto pt-1 sm:order-2 sm:w-auto sm:justify-start sm:pt-0">
          ${navItems.map(
            (item) => html`
              <a
                key=${item.href}
                href=${item.href}
                className=${`whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                  activeSection === item.href.slice(1)
                    ? "bg-plum text-white dark:bg-white dark:text-[#181614]"
                    : "text-ink/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
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
          className="order-2 rounded-full border border-black/10 px-3 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 dark:border-white/10 dark:text-white sm:order-3"
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
          <div className="mb-5 inline-flex rounded-full border border-rosewood/20 bg-white/80 px-4 py-2 text-sm font-semibold text-rosewood shadow-sm backdrop-blur dark:border-rosewood/40 dark:bg-white/5 dark:text-rose-200">
            BSCS Student • Aspiring Developer • Creative Thinker
          </div>

          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-ink/55 dark:text-white/55">
            Hello, I’m Ysa Danielle Atienza
          </p>
          <h1 className="max-w-3xl font-display text-5xl leading-none text-plum sm:text-6xl lg:text-7xl dark:text-white">
            I build thoughtful, inviting digital experiences with equal care for code and design.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-ink/70 sm:text-lg dark:text-white/70">
            This refreshed portfolio highlights the projects, creativity, and curiosity that shape how I learn and create as a third-year Computer Science student.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-pine px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#1a2823]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-ink/15 bg-white/70 px-6 py-3 text-sm font-bold text-ink transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/5 dark:text-white"
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
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-rosewood/20 via-white/40 to-pine/15 blur-2xl dark:from-rosewood/30 dark:via-white/5 dark:to-pine/20"></div>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/65 p-4 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
            <img
              src="./portfoliopic.png"
              alt="Ysa Danielle Atienza portrait"
              className="fade-mask h-[28rem] w-full rounded-[1.5rem] object-cover object-center"
            />
            <div className="mt-4 rounded-[1.5rem] bg-sand/80 p-4 dark:bg-[#241f1b]">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink/45 dark:text-white/45">
                Based in the Philippines
              </p>
              <p className="mt-2 text-lg font-semibold text-plum dark:text-white">
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
    <div className="rounded-[1.5rem] border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <p className="text-lg font-extrabold text-plum dark:text-white">${value}</p>
      <p className="mt-1 text-sm text-ink/65 dark:text-white/65">${label}</p>
    </div>
  `;
}

function AboutSection() {
  return html`
    <section id="about" className="px-6 py-12 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-plum px-8 py-10 text-white shadow-card">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/60">About me</p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            I enjoy making things that feel useful, gentle, and well put together.
          </h2>
          <p className="mt-6 text-base leading-8 text-white/78">
            I’m a 20-year-old third-year Bachelor of Science in Computer Science student who enjoys coding, design, and creating experiences that feel warm and intentional. I love learning new tools, exploring better ways to build interfaces, and collaborating with people who care about thoughtful work.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-black/5 bg-white/75 p-7 shadow-card backdrop-blur dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-ink/45 dark:text-white/45">Skills</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              ${skillGroups.map(
                (group) => html`
                  <div key=${group.title} className="rounded-[1.4rem] bg-sand p-4 dark:bg-[#221d19]">
                    <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-plum dark:text-rose-200">
                      ${group.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      ${group.items.map(
                        (item) => html`
                          <span
                            key=${item}
                            className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink shadow-sm dark:bg-white/10 dark:text-white"
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

          <div className="rounded-[2rem] border border-black/5 bg-white/75 p-7 shadow-card backdrop-blur dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-ink/45 dark:text-white/45">Outside the screen</p>
            <div className="mt-5 flex flex-wrap gap-3">
              ${hobbies.map(
                (hobby) => html`
                  <span
                    key=${hobby}
                    className="rounded-full border border-ink/10 bg-mist px-4 py-2 text-sm font-semibold text-ink/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
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
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-ink/45 dark:text-white/45">Selected work</p>
            <h2 className="mt-3 font-display text-4xl text-plum sm:text-5xl dark:text-white">
              Projects that helped me grow as a builder
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-ink/65 dark:text-white/65">
            These works reflect my interest in clean interfaces, collaborative school projects, and learning through hands-on creation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          ${projects.map(
            (project) => html`
              <article
                key=${project.title}
                className="group overflow-hidden rounded-[2rem] border border-black/5 bg-white/80 shadow-card transition duration-300 hover:-translate-y-2 dark:border-white/10 dark:bg-white/5"
              >
                <div className=${`h-48 bg-gradient-to-br ${project.accent} p-4`}>
                  <img
                    src=${project.image}
                    alt=${`${project.title} screenshot`}
                    className="h-full w-full rounded-[1.25rem] object-cover shadow-soft"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink/45 dark:text-white/45">
                    ${project.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-extrabold text-plum dark:text-white">
                    ${project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink/65 dark:text-white/65">
                    ${project.description}
                  </p>
                  <button
                    type="button"
                    onClick=${() => onSelectProject(project)}
                    className="mt-6 rounded-full bg-plum px-5 py-3 text-sm font-bold text-white transition hover:bg-pine"
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

function ContactSection() {
  return html`
    <section id="contact" className="px-6 py-12 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 rounded-[2.4rem] bg-[#1f221f] px-8 py-10 text-white shadow-soft lg:grid-cols-[1.05fr_0.95fr]">
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
            <a className="mt-2 block text-lg font-semibold hover:text-rose-200" href="mailto:ysadani.atienza@gmail.com">
              ysadani.atienza@gmail.com
            </a>
          </div>
          <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/45">Phone</p>
            <a className="mt-2 block text-lg font-semibold hover:text-rose-200" href="tel:+639771050524">
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
                    className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white hover:text-[#1f221f]"
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
  return html`
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
      onClick=${onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-soft dark:border-white/10 dark:bg-[#1d1916]"
        onClick=${(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label=${project.title}
      >
        <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-sand p-4 dark:bg-[#26211d]">
            <img
              src=${project.image}
              alt=${`${project.title} preview`}
              className="h-full max-h-[28rem] w-full rounded-[1.5rem] object-cover"
            />
          </div>
          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink/45 dark:text-white/45">
                  ${project.category}
                </p>
                <h3 className="mt-3 font-display text-4xl text-plum dark:text-white">
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
            <p className="mt-6 text-base leading-8 text-ink/70 dark:text-white/70">
              ${project.description}
            </p>
            <div className="mt-6 rounded-[1.4rem] bg-mist p-5 dark:bg-white/5">
              <p className="text-sm leading-7 text-ink/68 dark:text-white/68">
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
