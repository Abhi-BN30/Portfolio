"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { navigation, sections, type SectionId } from "@/data/navigation";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { getJourneyProgress, navigateToSection } from "@/lib/motion/journey";
import { SceneLayer } from "@/components/three/scene-layer";

const RESUME_PATH = "/resume/Abhilash-B-N-V-S-Resume.pdf";

function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-kicker"><span>{index}</span><span>{eyebrow}</span></div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Portrait() {
  const [imageAvailable, setImageAvailable] = useState(true);

  return (
    <div className="portrait-frame">
      {imageAvailable ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/profile.jpg"
          alt="Portrait of Abhilash B N V S"
          onError={() => setImageAvailable(false)}
        />
      ) : (
        <div className="portrait-placeholder" aria-label="Portrait image slot">
          <span>AB</span>
          <small>PORTRAIT SLOT</small>
        </div>
      )}
      <span className="portrait-coordinate">PROFILE / 01</span>
      <span className="portrait-corner portrait-corner--one" />
      <span className="portrait-corner portrait-corner--two" />
    </div>
  );
}

function ProjectVisual({ motif, number }: { motif: string; number: string }) {
  return (
    <div className={`project-visual project-visual--${motif}`} aria-hidden="true">
      <span className="visual-orbit visual-orbit--one" />
      <span className="visual-orbit visual-orbit--two" />
      <span className="visual-core" />
      <span className="visual-node visual-node--one" />
      <span className="visual-node visual-node--two" />
      <span className="visual-node visual-node--three" />
      <span className="visual-data-label">SYS / {number}</span>
    </div>
  );
}

export default function PortfolioExperience() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasResume, setHasResume] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateJourney = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = getJourneyProgress(window.scrollY, scrollableHeight);
        document.documentElement.style.setProperty("--journey-progress", String(progress));

        const threshold = window.innerHeight * 0.45;
        let current: SectionId = "home";
        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (element && element.getBoundingClientRect().top <= threshold) current = section.id;
        }
        setActiveSection((previous) => (previous === current ? previous : current));
      });
    };

    updateJourney();
    window.addEventListener("scroll", updateJourney, { passive: true });
    window.addEventListener("resize", updateJourney);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateJourney);
      window.removeEventListener("resize", updateJourney);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch(RESUME_PATH, { method: "HEAD", signal: controller.signal })
      .then((response) => setHasResume(response.ok))
      .catch(() => setHasResume(false));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const goTo = (id: SectionId) => {
    navigateToSection(id, prefersReducedMotion);
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <main className="portfolio-shell">
      <a className="skip-link" href="#home">Skip to portfolio content</a>
      <SceneLayer />
      <div className="ambient-grid" aria-hidden="true" />

      <header className="site-header">
        <a className="brand-mark" href="#home" onClick={(event) => { event.preventDefault(); goTo("home"); }} aria-label="Abhilash B N V S — Home">
          <span className="brand-glyph">A<span>.</span></span>
          <span className="brand-name">ABHILASH <i>B N V S</i></span>
        </a>
        <nav className={`main-nav${menuOpen ? " main-nav--open" : ""}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? "nav-link is-active" : "nav-link"}
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={(event) => { event.preventDefault(); goTo(item.id); }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-status"><span className="status-dot" /> SOFTWARE · DATA · AI</div>
        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </header>

      <nav className="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation" data-open={menuOpen}>
        {navigation.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={(event) => { event.preventDefault(); goTo(item.id); }}>
            <span>{item.marker}</span>{item.label}<span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>

      <aside className="journey-rail" aria-label="Portfolio journey progress">
        <span className="rail-current">{sections.find((section) => section.id === activeSection)?.marker ?? "01"}</span>
        <span className="rail-line"><i style={{ "--rail-progress": `${(sections.findIndex((section) => section.id === activeSection) + 1) / sections.length * 100}%` } as React.CSSProperties} /></span>
        <span className="rail-total">07</span>
      </aside>

      <section className="journey-section hero-section" id="home" aria-labelledby="hero-title">
        <div className="hero-copy">
          <motion.div
            className="hero-overline"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="overline-rule" /> SOFTWARE ENGINEER <span className="overline-index">FULL-STACK · DATA · AI</span>
          </motion.div>
          <motion.h1
            id="hero-title"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18 }}
          >
            ABHILASH <span>B N V S</span>
          </motion.h1>
          <motion.p
            className="hero-position"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {profile.positioning}
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <button className="button button--primary" onClick={() => goTo("projects")}>
              Explore selected work <span aria-hidden="true">↗</span>
            </button>
            <button className="text-link" onClick={() => goTo("about")}>Meet the engineer <span aria-hidden="true">↓</span></button>
          </motion.div>
        </div>
        <div className="hero-coordinate coordinate-top">FIG. 01 <span>ENGINEERING CORE</span></div>
        <div className="hero-coordinate coordinate-bottom">SYSTEM / READY <span>SCROLL TO ENTER</span></div>
        <button className="scroll-cue" onClick={() => goTo("about")} aria-label="Scroll to About">
          <span className="scroll-cue-line" /><span>SCROLL TO EXPLORE</span>
        </button>
        <div className="hero-orbit-label"><span className="orbit-label-dot" /> SOFTWARE <i>·</i> DATA <i>·</i> AI</div>
      </section>

      <section className="journey-section about-section" id="about" aria-labelledby="about-title">
        <div className="section-inner about-layout">
          <div className="about-copy">
            <SectionHeading index="02" eyebrow="THE ENGINEERING CORE" title="Systems-minded.\nBuilt to connect." description="A little context behind the systems." />
            <p className="body-lead">{profile.introduction}</p>
            <div className="domain-map" aria-label="Focus areas">
              <span className="domain-center">ENGINEERING</span>
              <span>SOFTWARE</span><span>DATA</span><span>AI</span><span>SYSTEMS</span><span>CLOUD</span>
            </div>
          </div>
          <div className="about-portrait-wrap">
            <Portrait />
            <div className="portrait-caption"><span>THE PERSON BEHIND THE SYSTEM</span><span>CS / PES UNIVERSITY</span></div>
            <div className="portrait-side-note">HUMAN<br />IN THE LOOP</div>
          </div>
        </div>
      </section>

      <section className="journey-section experience-section" id="experience" aria-labelledby="experience-title">
        <div className="section-inner">
          <SectionHeading index="03" eyebrow="FIELD NOTES / EXPERIENCE" title="From systems\nto scale." description="Three environments. One through-line: making complex work easier to use and operate." />
          <div className="experience-list">
            {experience.map((item, index) => (
              <motion.article
                className="experience-item"
                key={item.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <div className="experience-date"><span>{item.year}</span><i /></div>
                <div className="experience-main">
                  <div className="experience-title-line"><h3>{item.organization}</h3><span>{item.role}</span></div>
                  <p>{item.summary}</p>
                  <ul className="experience-detail-list">{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  <div className="tag-row">{item.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                </div>
                <div className="experience-metrics">{item.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
              </motion.article>
            ))}
          </div>
          <div className="pipeline-note"><span>INPUT</span><i /> <span>ENGINEERING</span><i /> <span>OUTCOME</span></div>
        </div>
      </section>

      <section className="journey-section projects-section" id="projects" aria-labelledby="projects-title">
        <div className="section-inner">
          <SectionHeading index="04" eyebrow="PROJECT LAB / SELECTED SYSTEMS" title="Ideas, made\noperational." description="A closer look at the software, data, and machine-learning systems I have worked on." />
          <div className="project-list">
            {projects.map((project, index) => (
              <motion.article
                className="project-item"
                key={project.number}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.24) }}
              >
                <ProjectVisual motif={project.motif} number={project.number} />
                <div className="project-content">
                  <div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <div className="project-bottomline">
                    <div className="tag-row">{project.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div>
                    {project.metrics.length > 0 && <div className="project-metrics">{project.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>}
                  </div>
                  <details className="project-details">
                    <summary><span>System notes</span><span className="details-toggle" aria-hidden="true">+</span></summary>
                    <ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  </details>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="journey-section skills-section" id="skills" aria-labelledby="skills-title">
        <div className="section-inner skills-layout">
          <div className="skills-intro">
            <SectionHeading index="05" eyebrow="TECHNOLOGY / SYSTEMS" title="A toolkit for\nconnected work." description="Technologies used across my projects and engineering experience." />
            <div className="skills-core"><span>BUILD</span><b>→</b><span>CONNECT</span><b>→</b><span>LEARN</span></div>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <motion.article
                className={`skill-group skill-group--${group.id}`}
                key={group.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <div className="skill-group-heading"><span>{group.index} / {group.title}</span><small>{group.description}</small></div>
                <div className="skill-nodes">{group.skills.map((skill) => <span className="skill-node" key={skill}>{skill}</span>)}</div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="journey-section education-section" id="education" aria-labelledby="education-title">
        <div className="section-inner education-layout">
          <div>
            <SectionHeading index="06" eyebrow="EDUCATION / FOUNDATIONS" title="A strong base.\nAlways learning." description="Computer science foundations, built at PES University." />
            <div className="scholarship-stamp"><span>7×</span><small>CNR<br />SCHOLARSHIP<br />AWARDEE</small></div>
          </div>
          <div className="education-timeline">
            {education.map((item, index) => (
              <motion.article
                className="education-item"
                key={item.qualification}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="education-year"><span>{item.period}</span><i /></div>
                <div className="education-detail"><h3>{item.qualification}</h3><p>{item.institution}</p>{"distinction" in item && <span className="education-distinction">{item.distinction}</span>}</div>
                <strong className="education-result">{item.result}</strong>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="journey-section contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-inner">
          <div className="section-kicker"><span>07</span><span>END OF TRANSMISSION · START OF SOMETHING</span></div>
          <h2 id="contact-title">Let&apos;s build<br /><span>something meaningful.</span></h2>
          <p>Interested in thoughtful software, data systems, or applied AI? Find me on GitHub or LinkedIn.</p>
          <div className="contact-actions">
            <a className="button button--primary" href={profile.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a className="button button--secondary" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            {hasResume && <a className="text-link resume-link" href={RESUME_PATH} download>Download resume <span aria-hidden="true">↓</span></a>}
          </div>
          <div className="contact-footer"><a href={profile.github} target="_blank" rel="noreferrer">{profile.githubLabel}</a><span>BUILT WITH CURIOSITY &amp; CODE</span><a href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a></div>
        </div>
        <div className="contact-signal" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /></div>
      </section>

      <footer className="site-footer"><span>© {new Date().getFullYear()} {profile.name}</span><span>SOFTWARE · DATA · SYSTEMS</span><button onClick={() => goTo("home")}>BACK TO TOP ↑</button></footer>
    </main>
  );
}
