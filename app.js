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
    items: ["HTML", "CSS", "JavaScript", "C++", "React", "Tailwind CSS", "Bootstrap", "MySQL"]
  },
  {
    title: "Growing In",
    items: ["Python", "Next.js", "Sass", "MongoDB", "Node.js"]
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
    whyItMatters:
      "This project shows how I can design around real student needs and turn campus information into something clearer, friendlier, and easier to use.",
    accent: "from-[#c9b0f1]/60 via-[#f4ebff] to-transparent"
  },
  {
    title: "Minesweeper",
    category: "Game project",
    image: "./minesweeper.png",
    description: "A group-made Minesweeper project for CIT.005 that focused on logic, teamwork, and playful interaction design.",
    whyItMatters:
      "It was the first game project my group and I built together, and it helped me experience how collaboration, logic, and playful design come together in a working interactive project.",
    accent: "from-[#9f86d8]/50 via-[#efe8ff] to-transparent"
  },
  {
    title: "Simple Calculator",
    category: "Frontend exercise",
    image: "./simplecalculator.png",
    description: "A clean working calculator created with HTML and CSS as part of an activity and UI practice.",
    whyItMatters:
      "Even as a smaller build, it helped me practice visual clarity, clean structure, and the discipline of making simple tools feel polished.",
    accent: "from-[#dfc7ff]/70 via-[#f7f2ff] to-transparent"
  },
  {
    title: "2nd Year Portfolio",
    category: "Personal website",
    image: "./2ndyearportfolio.png",
    description: "An earlier portfolio piece that helped me explore responsive design and personal branding on the web.",
    whyItMatters:
      "This piece marks an important step in how I learned to present myself online and think more intentionally about responsiveness and visual identity.",
    accent: "from-[#bba1f0]/60 via-[#efe7ff] to-transparent"
  },
  {
    title: "Solo Escapades",
    category: "Travel blog",
    image: "./soloescapades.png",
    description: "A travel blog created for a midterm project, designed as though I were documenting journeys as a traveler.",
    whyItMatters:
      "It gave me space to explore storytelling through layout, imagery, and mood, not just functionality, which is still a big part of how I design.",
    accent: "from-[#d8c1ff]/70 via-[#f6f0ff] to-transparent"
  },
  {
    title: "FFP Monitoring and Management System",
    category: "Management system",
    image: "./ffpsystem.png",
    images: ["./ffpsystem.png", "./ffpsystem2.png"],
    description: "A monitoring and management system project designed to organize records, track updates, and support a smoother workflow through a cleaner digital interface.",
    whyItMatters:
      "This project highlights how I approach more structured systems work by organizing complex information into a workflow that feels more manageable.",
    accent: "from-[#c4a4ff]/65 via-[#f5eeff] to-transparent"
  },
  {
    title: "AdZU TaskHub",
    category: "Student productivity web app",
    image: "./AdZUTaskHub1.png",
    images: [
      "./AdZUTaskHub1.png",
      "./AdZUTaskHub2.png",
      "./AdZUTaskHub3.png",
      "./AdZUTaskHub4.png",
      "./AdZUTaskHub5.png",
      "./AdZUTaskHub6.png"
    ],
    description:
      "A clean web app where students can add subjects, track deadlines, and mark tasks done. Built like a university-themed Notion-lite, it highlights my React and Tailwind skills through priority tags, a calendar view, and color-coded subjects designed around real student workflows.",
    whyItMatters:
      "This project reflects how I think about useful student-centered interfaces: clear visuals, organized information, and features that solve real day-to-day needs without making the experience feel heavy.",
    accent: "from-[#b6cef9]/75 via-[#eef4ff] to-transparent"
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

      <footer className="text-muted px-4 pb-10 pt-4 text-center text-sm sm:px-6 lg:px-8">
        Designed & Built with React and Tailwind. © ${yearLabel} Ysa Danielle Atienza. All rights reserved.
      </footer>

      ${showTopButton &&
      html`
        <button
          type="button"
          aria-label="Back to top"
          onClick=${() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="btn-primary-theme fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold shadow-soft backdrop-blur transition hover:-translate-y-1"
        >
          <${ArrowUpIcon} />
        </button>
      `}

      ${selectedProject &&
      html`<${ProjectModal} project=${selectedProject} onClose=${() => setSelectedProject(null)} />`}
    </div>
  `;
}

function Navbar({ activeSection, darkMode, onToggleTheme }) {
  return html`
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="surface-glass mx-auto max-w-6xl rounded-[2rem] border px-3 py-3 shadow-soft backdrop-blur-xl sm:px-4 md:flex md:items-center md:justify-between md:gap-4 md:py-2.5">
        <div className="flex items-center justify-between gap-3 md:flex-none">
          <a
            href="#top"
            className="text-primary font-display text-xl font-semibold tracking-[0.08em] sm:text-2xl md:text-[1.45rem]"
          >
            YSCode
          </a>

          <button
            type="button"
            onClick=${onToggleTheme}
            aria-label=${darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="btn-ghost-theme inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition hover:-translate-y-0.5 sm:h-11 sm:w-11 md:hidden"
          >
            ${darkMode ? html`<${SunIcon} />` : html`<${MoonIcon} />`}
          </button>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-2 md:mt-0 md:flex-1 md:justify-center">
          ${navItems.map(
            (item) => html`
              <a
                key=${item.href}
                href=${item.href}
                className=${`inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-3 py-2 text-center text-sm font-semibold transition sm:min-h-0 sm:px-4 md:px-4 md:py-2 ${
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
          aria-label=${darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="btn-ghost-theme hidden md:inline-flex md:h-11 md:w-11 md:flex-none md:items-center md:justify-center rounded-full border text-sm font-semibold transition hover:-translate-y-0.5"
        >
          ${darkMode ? html`<${SunIcon} />` : html`<${MoonIcon} />`}
        </button>
      </nav>
    </header>
  `;
}

function SunIcon() {
  return html`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8"></circle>
      <path
        d="M12 2.8V5.2M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2L5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      ></path>
    </svg>
  `;
}

function MoonIcon() {
  return html`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M19.2 14.8A7.8 7.8 0 1 1 9.2 4.8a6.6 6.6 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  `;
}

function ArrowUpIcon() {
  return html`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M12 19V5M12 5l-5 5M12 5l5 5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  `;
}

function ExternalLinkIcon() {
  return html`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M14 5h5v5M10 14 19 5M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  `;
}

function FacebookIcon() {
  return html`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M13.2 20v-7h2.5l.4-3h-2.9V8.2c0-.9.3-1.5 1.6-1.5H16V4.1c-.2 0-.9-.1-1.9-.1-2.6 0-4.1 1.5-4.1 4.3V10H7.5v3H10v7h3.2Z"
        fill="currentColor"
      ></path>
    </svg>
  `;
}

function InstagramIcon() {
  return html`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.8"></rect>
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.8"></circle>
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor"></circle>
    </svg>
  `;
}

function LinkedInIcon() {
  return html`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M6.8 9.4V18M6.8 6.7a.95.95 0 1 0 0 1.9.95.95 0 0 0 0-1.9ZM11 18v-4.8c0-1.6 1.1-2.7 2.5-2.7 1.5 0 2.3 1 2.3 2.9V18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  `;
}

function GitHubIcon() {
  return html`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M9.2 18.8c-4 .9-4-2-5.6-2.4m11.2 4v-2.3c0-.7 0-1.2-.3-1.6 2.3-.3 4.7-1.1 4.7-5.2 0-1.2-.4-2.1-1.1-2.9.1-.3.5-1.4-.1-2.8 0 0-.9-.3-3 .9a10.4 10.4 0 0 0-5.4 0c-2.1-1.2-3-.9-3-.9-.6 1.4-.2 2.5-.1 2.8-.7.8-1.1 1.7-1.1 2.9 0 4.1 2.4 4.9 4.7 5.2-.3.4-.4 1-.4 1.6v2.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  `;
}

function MailIcon() {
  return html`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M4 7.5 12 13l8-5.5M5.5 19h13A1.5 1.5 0 0 0 20 17.5v-11A1.5 1.5 0 0 0 18.5 5h-13A1.5 1.5 0 0 0 4 6.5v11A1.5 1.5 0 0 0 5.5 19Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  `;
}

function PhoneIcon() {
  return html`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M6.9 5.8h2.6l1.3 3.2-1.6 1.4a14 14 0 0 0 4.6 4.6l1.4-1.6 3.2 1.3v2.6c0 .7-.6 1.3-1.3 1.3A13.4 13.4 0 0 1 5.6 7.1c0-.7.6-1.3 1.3-1.3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  `;
}

function LocationIcon() {
  return html`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M12 20s6-5.7 6-10.2A6 6 0 1 0 6 9.8C6 14.3 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <circle cx="12" cy="9.8" r="2.2" stroke="currentColor" strokeWidth="1.8"></circle>
    </svg>
  `;
}

function CopyIcon() {
  return html`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M9 9.5h8.5a1.5 1.5 0 0 1 1.5 1.5v8.5a1.5 1.5 0 0 1-1.5 1.5H9A1.5 1.5 0 0 1 7.5 19.5V11A1.5 1.5 0 0 1 9 9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      ></path>
      <path
        d="M15 9V6.5A1.5 1.5 0 0 0 13.5 5H5.5A1.5 1.5 0 0 0 4 6.5v8A1.5 1.5 0 0 0 5.5 16H8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  `;
}

function SocialIcon({ label }) {
  if (label === "Facebook") return html`<${FacebookIcon} />`;
  if (label === "Instagram") return html`<${InstagramIcon} />`;
  if (label === "LinkedIn") return html`<${LinkedInIcon} />`;
  if (label === "GitHub") return html`<${GitHubIcon} />`;
  return label;
}

function Hero() {
  return html`
    <section id="top" className="px-4 pb-10 pt-10 sm:px-6 sm:pt-14 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="animate-fadeUp">
          <div className="surface-glass text-primary mb-5 inline-flex max-w-full rounded-full border px-4 py-2 text-center text-sm font-semibold shadow-sm backdrop-blur dark:text-[#eadcff]">
            BSCS Student • Front-End Developer • Creative Thinker
          </div>

          <p className="text-muted mb-4 text-sm font-bold uppercase tracking-[0.28em] dark:text-white/55">
            Hello, I’m Ysa Danielle Atienza
          </p>
          <h1 className="text-primary max-w-3xl font-display text-4xl leading-none sm:text-6xl lg:text-7xl dark:text-[#f7f1ff]">
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
            <a
              href="./Ysabel_Danielle_Atienza_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border-b border-current pb-1 text-base font-bold text-primary transition hover:opacity-80 dark:text-white"
            > 
              <span>View CV</span>
              <span className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <${ExternalLinkIcon} />
              </span>
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
              className="fade-mask h-[22rem] w-full rounded-[1.5rem] object-cover object-center sm:h-[28rem]"
            />
            <div className="surface-feature-panel mt-4 rounded-[1.5rem] p-4">
              <p className="feature-panel-label text-xs font-bold uppercase tracking-[0.25em]">
                Based in the Philippines
              </p>
              <p className="mt-2 text-lg font-semibold">
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
    <section id="about" className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-feature-panel rounded-[2rem] px-6 py-8 shadow-card sm:px-8 sm:py-10">
          <p className="feature-panel-label text-sm font-bold uppercase tracking-[0.3em]">About me</p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            I enjoy making things that feel useful, gentle, and well put together.
          </h2>
          <p className="feature-panel-copy mt-6 text-base leading-8">
            I’m a 21-year-old third-year Bachelor of Science in Computer Science student who enjoys coding, design, and creating experiences that feel warm and intentional. I love learning new tools, exploring better ways to build interfaces, and collaborating with people who care about thoughtful work.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="surface-card rounded-[2rem] border p-5 shadow-card backdrop-blur sm:p-7">
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

          <div className="surface-card rounded-[2rem] border p-5 shadow-card backdrop-blur sm:p-7">
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
    <section id="projects" className="px-4 py-12 sm:px-6 lg:px-8">
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
                <div className="relative h-48 overflow-hidden p-4">
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
      ${images.map(
        (image, index) => html`
          <img
            key=${`${project.title}-preview-${index}`}
            src=${image}
            alt=${`${project.title} screenshot ${index + 1}`}
            className=${`carousel-slide ${currentIndex === index ? "is-active" : ""}`}
          />
        `
      )}

      ${images.length > 1
        ? [
            html`
              <button
                key="prev"
                type="button"
                aria-label="Previous image"
                onClick=${(event) => handleArrow(event, -1)}
                className="btn-ghost-theme absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border px-3 py-2 text-sm font-bold shadow-sm"
              >
                ←
              </button>
            `,
            html`
              <button
                key="next"
                type="button"
                aria-label="Next image"
                onClick=${(event) => handleArrow(event, 1)}
                className="btn-ghost-theme absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border px-3 py-2 text-sm font-bold shadow-sm"
              >
                →
              </button>
            `,
            html`
              <div key="dots" className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
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
            `
          ]
        : null}
    </div>
  `;
}

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const resetForm = () => {
    setForm({ name: "", email: "", message: "" });
  };

  const draftEmail = () => {
    const subjectBase = form.name ? `Portfolio inquiry from ${form.name}` : "Portfolio inquiry";
    const bodyLines = [
      form.name ? `Name: ${form.name}` : "",
      form.email ? `Email: ${form.email}` : "",
      "",
      form.message || "Hi Ysa, I'd love to connect with you."
    ].filter(Boolean);

    const mailto = `mailto:ysadani.atienza@gmail.com?subject=${encodeURIComponent(
      subjectBase
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
  };

  const copyText = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (_error) {
      // Ignore clipboard failures in restricted browsers.
    }
  };

  return html`
    <section id="contact" className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="surface-contact-panel mx-auto grid max-w-6xl gap-6 rounded-[2.4rem] px-4 py-5 shadow-soft sm:px-6 sm:py-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-8">
        <div>
          <p className="feature-panel-label text-sm font-bold uppercase tracking-[0.28em]">Contact</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">
            Let’s talk about ideas, projects, or opportunities.
          </h2>
          <p className="feature-panel-copy mt-5 max-w-xl text-base leading-8">
            I’m always open to learning opportunities, creative collaborations, and conversations about design, development, and student projects.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="surface-contact-card flex flex-col items-start gap-4 rounded-[1.6rem] border p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 w-full items-center gap-4 sm:w-auto">
                <div className="social-orb inline-flex h-11 w-11 items-center justify-center rounded-full border">
                  <${MailIcon} />
                </div>
                <div className="min-w-0">
                  <p className="feature-panel-label text-xs font-bold uppercase tracking-[0.25em]">Email</p>
                  <a className="mt-1 block break-all text-base font-semibold hover:text-[#f1dfff] sm:text-lg sm:break-normal sm:truncate" href="mailto:ysadani.atienza@gmail.com">
                    ysadani.atienza@gmail.com
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick=${() => copyText("ysadani.atienza@gmail.com")}
                className="contact-copy inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] sm:w-auto sm:shrink-0"
              >
                <${CopyIcon} />
                <span>Copy</span>
              </button>
            </div>

            <div className="surface-contact-card flex flex-col items-start gap-4 rounded-[1.6rem] border p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 w-full items-center gap-4 sm:w-auto">
                <div className="social-orb inline-flex h-11 w-11 items-center justify-center rounded-full border">
                  <${PhoneIcon} />
                </div>
                <div className="min-w-0">
                  <p className="feature-panel-label text-xs font-bold uppercase tracking-[0.25em]">Phone</p>
                  <a className="mt-1 block text-base font-semibold hover:text-[#f1dfff] sm:text-lg" href="tel:+639771050524">
                    +63 977 105 0524
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick=${() => copyText("+63 977 105 0524")}
                className="contact-copy inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] sm:w-auto sm:shrink-0"
              >
                <${CopyIcon} />
                <span>Copy</span>
              </button>
            </div>

            <div className="surface-contact-card flex items-center gap-4 rounded-[1.6rem] border p-5">
              <div className="social-orb inline-flex h-11 w-11 items-center justify-center rounded-full border">
                <${LocationIcon} />
              </div>
              <div>
                <p className="feature-panel-label text-xs font-bold uppercase tracking-[0.25em]">Location</p>
                <p className="mt-1 text-lg font-semibold">Based in the Philippines</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="feature-panel-label text-xs font-bold uppercase tracking-[0.25em]">Connect With Me</p>
            <div className="mt-4 flex flex-wrap gap-3">
              ${socialLinks.map(
                (link) => html`
                  <a
                    key=${link.label}
                    href=${link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label=${link.label}
                    title=${link.label}
                    className="social-orb inline-flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold transition hover:-translate-y-0.5"
                  >
                    <${SocialIcon} label=${link.label} />
                  </a>
                `
              )}
            </div>
          </div>
        </div>

        <div className="surface-contact-form rounded-[2rem] border p-5 sm:p-6">
          <p className="feature-panel-label text-sm font-bold uppercase tracking-[0.28em]">Quick Message</p>
          <h3 className="mt-3 font-display text-3xl sm:text-4xl">Draft a clean intro email</h3>

          <div className="mt-6 grid gap-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Name</span>
              <input
                type="text"
                value=${form.name}
                onInput=${updateField("name")}
                placeholder="Your name"
                className="contact-input w-full rounded-[1.25rem] border px-5 py-4 outline-none transition focus:ring-2 focus:ring-plum/30"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Email</span>
              <input
                type="email"
                value=${form.email}
                onInput=${updateField("email")}
                placeholder="your@email.com"
                className="contact-input w-full rounded-[1.25rem] border px-5 py-4 outline-none transition focus:ring-2 focus:ring-plum/30"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Message</span>
              <textarea
                value=${form.message}
                onInput=${updateField("message")}
                placeholder="Tell me a bit about what you'd like to discuss."
                rows="6"
                className="contact-input w-full rounded-[1.5rem] border px-5 py-4 outline-none transition focus:ring-2 focus:ring-plum/30"
              ></textarea>
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick=${draftEmail}
              className="btn-primary-theme inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-bold transition hover:-translate-y-1 sm:w-auto"
            >
              <span>Draft Email Message</span>
              <span>→</span>
            </button>
            <button
              type="button"
              onClick=${resetForm}
              className="btn-ghost-theme w-full rounded-full border px-6 py-3 text-sm font-bold transition hover:-translate-y-1 sm:w-auto"
            >
              Clear Form
            </button>
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
      className="modal-scroll fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/55 p-3 backdrop-blur-sm sm:items-center sm:p-4"
      onClick=${onClose}
      role="presentation"
    >
      <div
        className="surface-card modal-scroll my-4 max-h-[calc(100dvh-2rem)] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-[2rem] border shadow-soft dark:bg-[#1d132a] sm:my-8 sm:max-h-[calc(100dvh-4rem)]"
        onClick=${(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label=${project.title}
      >
        <div className="flex flex-col">
          <div className="surface-strong p-4 sm:p-5 dark:bg-[#261838]">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <img
                src=${images[currentIndex]}
                alt=${`${project.title} preview ${currentIndex + 1}`}
                className="h-full max-h-[16rem] w-full rounded-[1.5rem] object-cover sm:max-h-[24rem] lg:max-h-[32rem]"
              />

              ${images.length > 1
                ? [
                    html`
                      <button
                        key="modal-prev"
                        type="button"
                        aria-label="Previous image"
                        onClick=${() => moveImage(-1)}
                        className="btn-ghost-theme absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border px-3 py-2 text-sm font-bold sm:left-4"
                      >
                        ←
                      </button>
                    `,
                    html`
                      <button
                        key="modal-next"
                        type="button"
                        aria-label="Next image"
                        onClick=${() => moveImage(1)}
                        className="btn-ghost-theme absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border px-3 py-2 text-sm font-bold sm:right-4"
                      >
                        →
                      </button>
                    `,
                    html`
                      <div
                        key="modal-dots"
                        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/15 px-3 py-2 backdrop-blur"
                      >
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
                    `,
                    html`
                      <div
                        key="modal-count"
                        className="absolute right-3 top-3 rounded-full bg-black/18 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur sm:right-4 sm:top-4"
                      >
                        ${currentIndex + 1} / ${images.length}
                      </div>
                    `
                  ]
                : null}
            </div>
          </div>
          <div className="surface-modal-panel flex flex-col p-5 sm:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
              <div>
                <p className="modal-panel-label text-xs font-bold uppercase tracking-[0.25em]">
                  ${project.category}
                </p>
                <h3 className="modal-panel-heading mt-3 font-display text-3xl sm:text-4xl">
                  ${project.title}
                </h3>
              </div>
              <button
                type="button"
                onClick=${onClose}
                className="modal-panel-close w-full rounded-full border px-3 py-2 text-sm font-bold sm:w-auto"
              >
                Close
              </button>
            </div>
            <p className="modal-panel-copy mt-6 text-base leading-8">
              ${project.description}
            </p>
            <div className="surface-modal-soft mt-6 rounded-[1.4rem] border p-5">
              <p className="modal-panel-label text-xs font-bold uppercase tracking-[0.22em]">
                Why It Matters
              </p>
              <p className="modal-panel-copy mt-3 text-sm leading-7">
                ${project.whyItMatters ||
                "This project reflects part of my growth as a student creator and how I think about making digital experiences more useful and intentional."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
