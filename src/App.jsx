import { useEffect, useRef, useState, useCallback } from "react";
import {
  Github, ExternalLink, Menu, X, Mail, Linkedin, ChevronRight, ChevronDown,
  Terminal, Database, ShieldCheck, Server, Code2, GraduationCap, Briefcase,
  BookOpen, ArrowUpRight, Copy, Check, FolderGit2, Cpu, Layers, FlaskConical,
  Send, Loader2, AlertCircle, User, MessageSquare
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* DATA — sourced directly from provided content, nothing invented        */
/* ---------------------------------------------------------------------- */

const NAV_LINKS = [
  { id: "hero", label: "index" },
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "experience", label: "experience" },
  { id: "education", label: "education" },
  { id: "research", label: "research" },
  { id: "contact", label: "contact" },
];

const FEATURED_PROJECTS = [
  {
    id: "foodbridge",
    name: "FoodBridge",
    subtitle: "Local Food Distribution System",
    type: "Final Year Project · Full-Stack Web Application",
    stack: "MERN",
    what: "A full-stack food donation coordination platform connecting donors with verified NGOs, giving administrators a centralized workflow for managing users, donations, requests, and collection status. It solves the problem of coordinating surplus food donations end to end.",
    how: "Built around three roles — Donor → NGO → Admin. A donor posts a food donation; NGOs register and submit verification info that must be admin-approved before they can participate; verified NGOs request donations; admins manage users, approve NGOs, and review requests. Each donation moves through a lifecycle: Available → Requested → Booked → Collected, with expired and cancelled states.",
    features: [
      "Donor registration & login", "Donor profile management", "Food donation posting",
      "NGO registration & document verification", "Admin approval workflow", "Role-based dashboards",
      "Donation request management", "Donation status tracking", "Email OTP verification",
      "Notifications", "Cloudinary donation & document images", "Role-specific API access",
    ],
    tech: {
      Frontend: ["React", "Vite", "React Router"],
      Backend: ["Node.js", "Express", "Controllers / Routes / Middleware / Services"],
      Database: ["MongoDB", "Mongoose"],
      Auth: ["JWT", "HTTP-only cookies", "bcrypt"],
      Other: ["Multer", "Cloudinary", "Nodemailer"],
    },
    concepts: [
      "Full-stack application architecture", "REST API development", "Authentication & Authorization",
      "Role-Based Access Control", "Database modeling", "MVC-style backend organization",
      "Secure cookie-based auth", "File handling", "Email integration", "Performance-conscious queries (.lean())",
    ],
    demo: "https://www.foodbridge.tech",
    github: "https://github.com/sehrishsiddique853/local-food-charity-system",
    icon: Layers,
  },
  {
    id: "pycee",
    name: "PYCEE Compiler",
    subtitle: "Team-Based Compiler Construction",
    type: "Compiler Design · C++",
    stack: "C++",
    what: "A team-based compiler construction project involving the design of a programming language and the implementation of core compiler components — lexical rules, grammar design, tokenization, lexical error detection, parsing, and syntax handling.",
    how: "Grammar was defined for expressions, declarations, functions, conditionals, loops, operators and operator precedence. Contributed to a finite-state-machine-based lexical analyzer responsible for tokenization, token classification and lexical error detection, then gained practical exposure to LL(1) parsing — FIRST/FOLLOW sets, parsing-table construction, token mapping, and syntax-error handling.",
    features: [
      "Language / grammar design", "Finite-state-machine lexical analyzer", "Tokenization & token classification",
      "Lexical error detection", "LL(1) parsing", "FIRST & FOLLOW set computation",
      "Parsing-table construction", "Syntax-error handling",
    ],
    tech: { Language: ["C++"], Concepts: ["Compiler Construction", "FSMs", "LL(1) Parsing"] },
    concepts: [
      "Programming Languages → Formal Grammars → Compilers → Parsing → Language Processing",
      "Demonstrates CS fundamentals beyond web development",
    ],
    demo: null,
    github: "https://github.com/sehrishsiddique853/PYCEE_COMPILER",
    icon: Cpu,
  },
  {
    id: "clinic",
    name: "Clinic Booking System",
    subtitle: "Patient & Doctor Appointment Platform",
    type: "Full-Stack Web Application",
    stack: "React · Node.js · Express · MySQL",
    what: "A full-stack clinic appointment management system connecting patients, doctors, available appointment slots, and staff through a structured booking workflow.",
    how: "Follows a three-tier architecture: React frontend → Express/Node.js API → MySQL database. The frontend talks to the backend through Axios; Express routes receive requests, auth middleware protects restricted operations, controllers handle business logic, and MySQL stores users, doctors, slots, and appointments. Patients register, authenticate, view doctors and slots, and create appointments; staff manage doctors and appointment data through protected routes.",
    features: [
      "User registration / login", "JWT authentication", "Patient & staff roles", "Doctor management",
      "Appointment slots", "Appointment booking", "Appointment confirmation & cancellation",
      "Protected staff operations", "Relational database design",
    ],
    tech: {
      Frontend: ["React", "React Router", "Axios"],
      Backend: ["Node.js", "Express.js", "REST APIs", "Auth middleware"],
      Database: ["MySQL", "Foreign keys", "Relational modeling"],
      Auth: ["JWT", "bcrypt"],
    },
    concepts: [
      "Doctor → Slots (one-to-many)", "Doctor → Appointments (one-to-many)",
      "Patient → Appointments (one-to-many)", "Slot → Appointment (one-to-one)",
      "Separated routes, controllers & middleware for maintainability",
    ],
    demo: null,
    github: "https://github.com/sehrishsiddique853/clinic-booking-sehrish",
    icon: Database,
  },
  {
    id: "voting",
    name: "Voting Management Backend",
    subtitle: "Backend / REST API Project",
    type: "Backend / REST API Project",
    stack: "Node.js · Express",
    what: "A backend-focused voting application implementation demonstrating server-side development and API-based application architecture. The repository also contains a separate grocery-management component.",
    how: "Server-side voting logic exposed through a RESTful API — routing, CRUD operations over voting data, and authentication concepts implemented independent of any frontend, showing backend work isn't limited to supporting a UI.",
    features: [
      "REST API development", "CRUD operations", "Authentication concepts",
      "Database interaction", "API routing", "Server-side application logic",
    ],
    tech: { Backend: ["Node.js", "Express.js", "REST APIs"] },
    concepts: ["Backend architecture", "API-first application design"],
    demo: null,
    github: "https://github.com/sehrishsiddique853/voting_app_backend",
    icon: Server,
  },
];

const OTHER_PROJECTS = [
  {
    name: "BazaarNet", type: "MERN E-Commerce Application",
    desc: "A full implementation of the MERN stack — React frontend, Node.js/Express backend, MongoDB persistence — built to demonstrate a complete e-commerce web application.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    github: "https://github.com/sehrishsiddique853/BazaarNet-MERN-Stack-Project",
  },
  {
    name: "Data Structures & Algorithms", type: "C++ · Algorithmic Programming",
    desc: "Detailed implementations of fundamental data structures — Stack, Queue, Forward List, Map, Unordered Map, generic templates — plus a separate sorting-algorithms collection, both focused on complexity analysis and algorithmic fundamentals.",
    tags: ["C++", "Data Structures", "Complexity Analysis", "STL"],
    github: "https://github.com/sehrishsiddique853/Data_structure_projects",
  },
  {
    name: "Backend Development Collection", type: "Backend Practice / REST APIs",
    desc: "A multi-concept backend repository covering a product management module, REST API development, user authentication and other backend implementation tasks, with a hosted project page.",
    tags: ["Node.js", "Express.js", "Authentication", "Middleware", "CRUD"],
    github: "https://github.com/sehrishsiddique853/backend_projects",
  },
  {
    name: "Grocery Management System", type: "Backend Application",
    desc: "A backend implementation of a grocery management system focused on server-side logic, data management and CRUD operations.",
    tags: ["Node.js", "JavaScript", "CRUD", "API Development"],
    github: "https://github.com/sehrishsiddique853/grocery-management-system_backend",
  },
  {
    name: "Cricket Dashboard Backend", type: "Backend / Dashboard Data Application",
    desc: "A backend implementation for a cricket dashboard, focused on managing and serving application data through REST/API concepts.",
    tags: ["Backend", "JavaScript", "REST", "Data Management"],
    github: "https://github.com/sehrishsiddique853/cricket_backend_dashboard_backend",
  },
];

const SKILLS = {
  Frontend: { icon: Code2, items: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Responsive UI"] },
  Backend: { icon: Server, items: ["Node.js", "Express.js", "Flask", "REST APIs", "MVC", "CRUD", "API Design"] },
  Databases: { icon: Database, items: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL", "Supabase", "Database Design"] },
  Security: { icon: ShieldCheck, items: ["JWT", "bcrypt", "HTTP-only Cookies", "RBAC", "Input Validation"] },
  "Software Engineering": { icon: Layers, items: ["OOP", "Design Patterns", "Software Architecture", "REST Architecture", "Modular Design"] },
  Tools: { icon: Terminal, items: ["Git", "GitHub", "Swagger / OpenAPI", "Postman"] },
};

const EDU_AREAS = [
  "Programming & Software Development", "Algorithms & Data Structures",
  "Databases & Data Systems", "Networks & Operating Systems",
  "Computer Organization", "HCI & Compilers",
];

/* ---------------------------------------------------------------------- */
/* SMALL HOOKS / UTIL COMPONENTS                                          */
/* ---------------------------------------------------------------------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useTilt(maxTilt = 8) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) translateY(-6px)`;
  }, [maxTilt]);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  }, [strength]);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

function MagneticButton({ as = "button", className = "", children, ...rest }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.25);
  const Tag = as;
  return (
    <span className="magnetic-wrap" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <Tag ref={ref} className={className} style={{ transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1)" }} {...rest}>
        {children}
      </Tag>
    </span>
  );
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      setPct(Math.min(100, Math.max(0, scrolled)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-[2px]" style={{ background: "transparent" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)", transition: "width 80ms linear" }} />
    </div>
  );
}

function Orb({ top, left, size = 340, delay = 0, opacity = 0.12 }) {
  return (
    <div
      className="orb-float pointer-events-none"
      style={{ top, left, width: size, height: size, animationDelay: `${delay}s`, opacity }}
    />
  );
}

function Reveal({ children, delay = 0, className = "", dir = "" }) {
  const [ref, visible] = useReveal();
  const dirClass = dir === "left" ? "reveal-left" : dir === "right" ? "reveal-right" : "";
  return (
    <div
      ref={ref}
      className={`reveal ${dirClass} ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionEyebrow({ index, label }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-xs tracking-widest" style={{ color: "var(--accent)" }}>{index}</span>
      <span className="h-px w-8" style={{ background: "var(--accent)" }} />
      <span className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>{label}</span>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* NAVBAR                                                                  */
/* ---------------------------------------------------------------------- */

function Navbar({ active, onNav }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          background: scrolled ? "rgba(9,11,16,0.75)" : "rgba(9,11,16,0.25)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => onNav("hero")} className="font-mono text-sm tracking-tight flex items-center gap-2" style={{ color: "var(--text)" }}>
            <span style={{ color: "var(--accent)" }}>~/</span>sehrish-siddique
            <span className="cursor-blink" style={{ background: "var(--accent)" }} />
          </button>

          <div className="hidden md:flex items-center gap-1 font-mono text-xs">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => onNav(l.id)}
                className="relative px-3 py-2 rounded-md transition-colors duration-200"
                style={{ color: active === l.id ? "var(--text)" : "var(--muted)" }}
              >
                {active === l.id && <span className="mr-1" style={{ color: "var(--accent)" }}>./</span>}
                {l.label}
                {active === l.id && (
                  <span
                    className="absolute left-3 right-3 -bottom-[1px] h-[1.5px] rounded-full"
                    style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
                  />
                )}
              </button>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setOpen((o) => !o)} style={{ color: "var(--text)" }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(6,7,10,0.97)", backdropFilter: "blur(10px)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 font-mono text-lg">
          {NAV_LINKS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => { onNav(l.id); setOpen(false); }}
              className="transition-transform duration-200"
              style={{ color: active === l.id ? "var(--accent)" : "var(--text)", transitionDelay: `${i * 30}ms` }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------------------------------------------------------------------- */
/* HERO                                                                    */
/* ---------------------------------------------------------------------- */

function TypedLine({ text, speed = 45, startDelay = 0, onDone, className = "" }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); onDone && onDone(); }
      }, speed);
    }, startDelay);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [text, speed, startDelay]);
  return <span className={className}>{shown}</span>;
}

function ParticleNetwork() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let w, h, dpr;
    let particles = [];
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(18, Math.min(46, Math.floor((w * h) / 26000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(255,138,93,${0.14 * (1 - d / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,138,93,0.55)";
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    if (!reduced) { tick(); } else { ctx.clearRect(0, 0, w, h); }
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none hidden sm:block" />;
}

function CursorPixelField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let rafId = null;
    let w = 0;
    let h = 0;
    const particles = [];
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnPixels = (x, y) => {
      const count = reduced ? 6 : 18;
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 18;
        particles.push({
          x: x + Math.cos(angle) * distance,
          y: y + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4,
          size: Math.random() * 3 + 2,
          alpha: 0.82 + Math.random() * 0.18,
          life: 24 + Math.random() * 28,
        });
      }
    };

    const onMove = (event) => {
      spawnPixels(event.clientX, event.clientY);
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.94;
        particle.vy *= 0.94;
        particle.alpha *= 0.95;
        particle.life -= 1;

        if (particle.life <= 0 || particle.alpha <= 0.08) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(255, 138, 93, ${particle.alpha})`;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      }

      rafId = requestAnimationFrame(tick);
    };

    resize();
    if (!reduced) {
      tick();
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" style={{ opacity: 0.9 }} />;
}

function Hero({ onNav }) {
  const [line2Done, setLine2Done] = useState(false);
  const wrapRef = useRef(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const handleMove = useCallback((e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }, []);

  return (
    <section
      id="hero"
      ref={wrapRef}
      onMouseMove={handleMove}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg" />
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: `radial-gradient(500px circle at ${spot.x}% ${spot.y}%, rgba(255,138,93,0.08), transparent 70%)`,
        }}
      />
      <ParticleNetwork />
      <div className="absolute inset-0 pointer-events-none">
        <div className="node-float" style={{ top: "18%", left: "10%" }} />
        <div className="node-float" style={{ top: "70%", left: "85%", animationDelay: "1.2s" }} />
        <div className="node-float" style={{ top: "30%", left: "88%", animationDelay: "2.4s" }} />
        <div className="node-float" style={{ top: "80%", left: "18%", animationDelay: "0.6s" }} />
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center fade-up">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs mb-8"
          style={{ border: "1px solid rgba(255,255,255,0.1)", color: "var(--muted)", background: "rgba(255,255,255,0.03)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ADE80", boxShadow: "0 0 6px #4ADE80" }} />
          open to opportunities
        </div>

        <div
          className="mx-auto mb-6 text-left rounded-lg overflow-hidden max-w-md"
          style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
        >
          <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF6259" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C93F" }} />
            <span className="ml-2 font-mono text-[11px]" style={{ color: "var(--muted)" }}>whoami.sh</span>
          </div>
          <div className="p-4 font-mono text-sm leading-relaxed">
            <div style={{ color: "var(--muted)" }}>
                <span style={{ color: "var(--accent)" }}>$</span> whoami
              </div>
              <div style={{ color: "var(--text)" }}>
                <TypedLine text="Sehrish Siddique — Software Developer" speed={35} onDone={() => setLine2Done(true)} />
            </div>
            {line2Done && (
              <div style={{ color: "var(--muted)" }} className="mt-1">
                  <TypedLine text="> backend systems, full-stack applications, compiler design" speed={20} />
                <span className="cursor-blink ml-1" style={{ background: "var(--accent)" }} />
              </div>
            )}
          </div>
        </div>

        <h3 className="font-display font-semibold leading-[1.05] tracking-tight text-4xl sm:text-6xl md:text-5xl mb-6" style={{ color: "var(--text)" }}>
          <span className="hero-line hero-word" style={{ animationDelay: "0.15s" }}>Software developer building</span><br />
          <span className="hero-line hero-word" style={{ animationDelay: "0.32s" }}><span className="text-shimmer hero-highlight">backend systems</span> and</span><br />
          <span className="hero-line hero-word" style={{ animationDelay: "0.48s" }}>full-stack products.</span>
        </h3>

     

        <div className="flex flex-wrap items-center justify-center gap-4">
          <MagneticButton as="button" onClick={() => onNav("projects")} className="btn-primary">
            Explore My Work <ChevronRight size={16} />
          </MagneticButton>
          <MagneticButton as="a" href="/Sehrish_Siddique_Resume.pdf" download target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} className="btn-ghost">
            Download Resume
          </MagneticButton>
        </div>
      </div>

      <button
        onClick={() => onNav("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs flex flex-col items-center gap-2 animate-bounce-slow"
        style={{ color: "var(--muted)" }}
      >
        scroll
        <ChevronDown size={14} />
      </button>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* ABOUT                                                                   */
/* ---------------------------------------------------------------------- */

const LAYERS = [
  { label: "Interface", desc: "Interactive, well-structured UI", icon: Code2 },
  { label: "Application Logic", desc: "APIs, services, business rules", icon: Server },
  { label: "Data & Security", desc: "Modeling, auth, access control", icon: ShieldCheck },
  { label: "Architecture", desc: "How it's all designed to scale", icon: Layers },
];

function About() {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      <Orb top="-10%" left="70%" size={380} opacity={0.1} />
      <div className="max-w-5xl mx-auto">
        <Reveal><SectionEyebrow index="01" label="About Me" /></Reveal>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <Reveal className="md:col-span-3" delay={80} dir="left">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6" style={{ color: "var(--text)" }}>
              Software developer focused on backend systems and full-stack applications
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
              <p>
                I focus on full-stack development, backend engineering, software architecture, and building
                secure, scalable applications — a software-engineering-oriented approach to building for the web.
              </p>
              <p>
                What drives me isn't just <span className="font-mono" style={{ color: "var(--text)" }}>"making a feature work"</span> —
                it's understanding how complete software systems are designed, structured, secured, and scaled. I enjoy
                exploring the relationship between different layers of a system rather than focusing on only one part.
              </p>
              <p className="font-mono text-sm" style={{ color: "var(--accent)" }}>
                web development → full-stack development → backend engineering → software architecture → software engineering
              </p>
              <p>
                My longer-term goal is to grow into a software engineer capable of designing systems, making
                architectural decisions, implementing complex software, and working on large-scale systems with a
                deeper understanding of how they hold together. Along the way I keep expanding across different
                areas of Computer Science — including newer areas like AI.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={160} dir="right">
            <div className="rounded-xl p-5" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
              <div className="font-mono text-[11px] tracking-widest uppercase mb-5" style={{ color: "var(--muted)" }}>
                system layers · what I think about
              </div>
              <div className="relative">
                {LAYERS.map((l, i) => (
                  <div key={l.label} className="relative flex items-start gap-3 pb-6 last:pb-0">
                    {i !== LAYERS.length - 1 && (
                      <span className="absolute left-[15px] top-8 bottom-0 w-px layer-line" />
                    )}
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 z-10"
                      style={{ background: "rgba(255,138,93,0.08)", border: "1px solid rgba(255,138,93,0.3)" }}
                    >
                      <l.icon size={15} style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: "var(--text)" }}>{l.label}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{l.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* PROJECTS                                                                */
/* ---------------------------------------------------------------------- */

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto" style={{ background: "rgba(6,7,10,0.85)", backdropFilter: "blur(6px)" }} onClick={onClose}>
      <div
        className="modal-pop w-full max-w-3xl rounded-2xl my-8 overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.1)", background: "var(--bg-elev)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,138,93,0.1)" }}>
              <project.icon size={17} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <div className="font-display font-semibold" style={{ color: "var(--text)" }}>{project.name}</div>
              <div className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>{project.type}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: "var(--muted)" }}><X size={20} /></button>
        </div>

        <div className="p-6 space-y-7 max-h-[70vh] overflow-y-auto">
          <ModalBlock title="Overview">{project.what}</ModalBlock>
          <ModalBlock title="How It Works">{project.how}</ModalBlock>

          {project.id === "foodbridge" && (
            <div>
              <ModalHeading>Donation Workflow</ModalHeading>
              <div className="flex flex-wrap items-center gap-2 mt-3 font-mono text-xs">
                {["Donor posts food", "NGO requests", "Admin approves", "Collection booked", "Donation collected"].map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="pill-sm">{step}</span>
                    {i < 4 && <ChevronRight size={13} style={{ color: "var(--accent)" }} />}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.id === "pycee" && (
            <div>
              <ModalHeading>Compiler Front End</ModalHeading>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3">
                {["Source code", "Lexer", "Tokens", "LL(1) parser", "Syntax validation"].map((step, i) => (
                  <div key={step} className="compiler-step">
                    <span className="font-mono text-[10px]" style={{ color: "var(--accent)" }}>0{i + 1}</span>
                    <span className="text-xs" style={{ color: "var(--text)" }}>{step}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-mono text-xs" style={{ color: "var(--muted)" }}>
                Grammar → FIRST/FOLLOW sets → parsing-table construction → predictive syntax analysis
              </p>
            </div>
          )}

          <div>
            <ModalHeading>Key Features</ModalHeading>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.features.map((f) => <span key={f} className="pill">{f}</span>)}
            </div>
          </div>

          <div>
            <ModalHeading>Technical Implementation</ModalHeading>
            <div className="grid sm:grid-cols-2 gap-4 mt-3">
              {Object.entries(project.tech).map(([k, v]) => (
                <div key={k}>
                  <div className="font-mono text-[11px] uppercase tracking-wider mb-1.5" style={{ color: "var(--accent)" }}>{k}</div>
                  <div className="text-sm" style={{ color: "var(--muted)" }}>{v.join(", ")}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <ModalHeading>Engineering Focus</ModalHeading>
            <ul className="mt-3 space-y-1.5">
              {project.concepts.map((c) => (
                <li key={c} className="text-sm flex items-start gap-2" style={{ color: "var(--muted)" }}>
                  <ChevronRight size={13} className="mt-1 shrink-0" style={{ color: "var(--accent)" }} /> {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-ghost !py-2">
                <Github size={15} /> GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary !py-2">
                Live Demo <ArrowUpRight size={14} />
              </a>
            )}
            {project.id === "foodbridge" && (
              <a href="/foodbridge-documentation.pdf" target="_blank" rel="noreferrer" className="btn-ghost !py-2">
                <BookOpen size={15} /> View Documentation
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalHeading({ children }) {
  return <div className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--text)" }}>{children}</div>;
}
function ModalBlock({ title, children }) {
  return (
    <div>
      <ModalHeading>{title}</ModalHeading>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{children}</p>
    </div>
  );
}

function FeaturedCard({ project, index, onOpen }) {
  const [revealRef, visible] = useReveal();
  const tilt = useTilt(6);
  const setRefs = useCallback((node) => {
    revealRef.current = node;
    tilt.ref.current = node;
  }, [revealRef, tilt.ref]);
  return (
    <div
      ref={setRefs}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onClick={(event) => {
        if (!event.target.closest("a, button")) onOpen(project);
      }}
      onKeyDown={(event) => {
        if ((event.key === "Enter" || event.key === " ") && event.target === event.currentTarget) {
          event.preventDefault();
          onOpen(project);
        }
      }}
      role="button"
      tabIndex={0}
      className={`reveal ${index % 2 === 0 ? "reveal-left" : "reveal-right"} ${visible ? "reveal-visible" : ""} project-card group`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,138,93,0.08)", border: "1px solid rgba(255,138,93,0.25)" }}>
          <project.icon size={19} style={{ color: "var(--accent)" }} />
        </div>
        <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>0{index + 1}</span>
      </div>

      <h3 className="font-display text-xl font-semibold mb-1" style={{ color: "var(--text)" }}>{project.name}</h3>
      <div className="font-mono text-xs mb-4" style={{ color: "var(--accent)" }}>{project.subtitle}</div>
      <p className="text-sm leading-relaxed mb-5 line-clamp-4" style={{ color: "var(--muted)" }}>{project.what}</p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {Object.values(project.tech).flat().slice(0, 5).map((t) => (
          <span key={t} className="pill-sm">{t}</span>
        ))}
      </div>

      <div className="flex items-center gap-4 font-mono text-xs mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button onClick={() => onOpen(project)} className="link-accent">Case Study →</button>
        <a href={project.github} target="_blank" rel="noreferrer" className="link-muted flex items-center gap-1"><Github size={13} /> GitHub</a>
        {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="link-muted flex items-center gap-1"><ExternalLink size={13} /> Demo</a>}
        {project.id === "foodbridge" && (
          <a href="/foodbridge-documentation.pdf" target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} className="link-muted flex items-center gap-1">
            <BookOpen size={13} /> View Documentation
          </a>
        )}
      </div>
    </div>
  );
}

function OtherProjectCard({ p, index }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${index % 2 === 0 ? "reveal-left" : "reveal-right"} ${visible ? "reveal-visible" : ""} other-card`} style={{ transitionDelay: `${index * 70}ms` }}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-sm" style={{ color: "var(--text)" }}>{p.name}</h4>
        <a href={p.github} target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}><Github size={15} /></a>
      </div>
      <div className="font-mono text-[11px] mb-2" style={{ color: "var(--accent)" }}>{p.type}</div>
      <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--muted)" }}>{p.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {p.tags.map((t) => <span key={t} className="pill-sm">{t}</span>)}
      </div>
    </div>
  );
}

function Projects() {
  const [openProject, setOpenProject] = useState(null);
  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal><SectionEyebrow index="02" label="Featured Projects" /></Reveal>
        <Reveal delay={60}>
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-14" style={{ color: "var(--text)" }}>
            Selected work, end to end.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 mb-20">
          {FEATURED_PROJECTS.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} onOpen={setOpenProject} />
          ))}
        </div>

        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <FolderGit2 size={16} style={{ color: "var(--accent)" }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>more projects</span>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OTHER_PROJECTS.map((p, i) => <OtherProjectCard key={p.name} p={p} index={i} />)}
        </div>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* SKILLS                                                                  */
/* ---------------------------------------------------------------------- */

function SkillPanel({ name, data, index }) {
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState(null);
  return (
    <div ref={ref} className={`reveal ${index % 2 === 0 ? "reveal-left" : "reveal-right"} ${visible ? "reveal-visible" : ""} skill-panel`} style={{ transitionDelay: `${index * 80}ms` }}>
      <div className="flex items-center gap-2.5 mb-4">
        <data.icon size={16} style={{ color: "var(--accent)" }} />
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--text)" }}>{name}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.items.map((item) => (
          <span
            key={item}
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(null)}
            className="skill-chip"
            style={hovered === item ? { color: "var(--bg)", background: "var(--accent)", borderColor: "var(--accent)" } : {}}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden" style={{ background: "var(--bg-elev-2)" }}>
      <Orb top="60%" left="-6%" size={320} opacity={0.09} delay={2} />
      <div className="max-w-6xl mx-auto">
        <Reveal><SectionEyebrow index="03" label="Technical Skills" /></Reveal>
        <Reveal delay={60}>
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-14" style={{ color: "var(--text)" }}>
            Tools I reach for, organized by layer.
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(SKILLS).map(([name, data], i) => (
            <SkillPanel key={name} name={name} data={data} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* EXPERIENCE + EDUCATION (TIMELINE)                                      */
/* ---------------------------------------------------------------------- */

function TimelineEntry({ icon: Icon, org, role, meta, body, tags, index }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`timeline-entry reveal ${index % 2 === 0 ? "reveal-left" : "reveal-right"} ${visible ? "reveal-visible" : ""} relative pl-14 pb-2`} style={{ transitionDelay: `${index * 100}ms` }}>
      <span className="absolute left-0 top-0 timeline-dot">
        <Icon size={15} style={{ color: "var(--accent)" }} />
      </span>
      <div className="rounded-xl p-6" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
          <h3 className="font-display font-semibold" style={{ color: "var(--text)" }}>{role}</h3>
          <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>{meta}</span>
        </div>
        <div className="text-sm mb-4" style={{ color: "var(--muted)" }}>{org}</div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>{body}</p>
        {tags && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => <span key={t} className="pill-sm">{t}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal><SectionEyebrow index="04" label="Experience" /></Reveal>
        <Reveal delay={60}>
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-14" style={{ color: "var(--text)" }}>
            Backend and web development experience.
          </h2>
        </Reveal>
        <div className="relative">
          <span className="absolute left-[27px] top-2 bottom-2 w-px timeline-line" />
          <TimelineEntry
            index={0}
            icon={Server}
            role="Backend Developer Intern"
            org="Techfy · Remote"
            meta="Sep 2026 – Present"
            body="Developing and maintaining backend services for a student-management application using Python, Flask, and Supabase. Designing and integrating authenticated RESTful CRUD APIs, implementing server-side business logic, managing application data, and connecting backend services with client-facing features. Testing APIs, debugging root causes, improving query and application performance, writing clean reusable code, and maintaining Swagger/OpenAPI documentation for reliable review and integration."
            tags={["Python", "Flask", "Supabase", "REST APIs", "Authentication", "CRUD", "API Testing", "Swagger / OpenAPI", "Git"]}
          />
          <TimelineEntry
            index={1}
            icon={Briefcase}
            role="Web Developer Intern"
            org="TechoHash Solutions · Rawalpindi, Pakistan"
            meta="Aug 2024 – Sep 2024"
            body="A web development internship building and improving responsive, interactive web applications in a professional development environment — developing interfaces with HTML, CSS and JavaScript, implementing frontend functionality against project requirements, improving usability across screen sizes, and adapting existing project code to meet application needs. This experience moved me from academic coursework toward practical, professional software development."
            tags={["HTML5", "CSS3", "JavaScript", "Responsive Web Design"]}
          />
        </div>
      </div>
    </section>
  );
}

function Education() {
  const [ref, visible] = useReveal();
  return (
    <section id="education" className="relative py-28 px-6" style={{ background: "var(--bg-elev-2)" }}>
      <div className="max-w-4xl mx-auto">
        <Reveal><SectionEyebrow index="05" label="Education" /></Reveal>
        <Reveal delay={60}>
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-14" style={{ color: "var(--text)" }}>
            Where it's grounded.
          </h2>
        </Reveal>

        <div ref={ref} className={`reveal reveal-left ${visible ? "reveal-visible" : ""} rounded-xl p-7`} style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-start gap-4 mb-7">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,138,93,0.08)", border: "1px solid rgba(255,138,93,0.25)" }}>
              <GraduationCap size={19} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <h3 className="font-display font-semibold" style={{ color: "var(--text)" }}>Quaid-i-Azam University</h3>
              <div className="text-sm" style={{ color: "var(--muted)" }}>BS Computer Science · 2022 — 2026 · Islamabad, Pakistan</div>
            </div>
          </div>

          <div className="font-mono text-[11px] tracking-widest uppercase mb-4" style={{ color: "var(--muted)" }}>core areas of study</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {EDU_AREAS.map((a) => (
              <div key={a} className="rounded-lg px-3 py-3 text-xs text-center leading-snug" style={{ border: "1px solid rgba(255,255,255,0.07)", color: "var(--muted)" }}>
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* RESEARCH                                                                */
/* ---------------------------------------------------------------------- */

const RESEARCH_QUESTIONS = [
  "How can physical-layer characteristics be used to authenticate communicating devices?",
  "How are machine-learning techniques being used for authentication?",
  "Which approaches are suitable for resource-constrained underwater environments?",
  "How do mobility and changing communication conditions affect authentication?",
  "What trade-offs exist between security, computational requirements, adaptability, and deployment practicality?",
  "What research gaps remain in current approaches?",
];
const TECHNIQUES = ["Support Vector Machines (SVM)", "Reinforcement Learning", "RNN / LSTM", "CNN", "Cooperative authentication", "Time-reversal approaches", "Database-based authentication"];
const FINDINGS = ["Lightweight authentication mechanisms", "Support for mobile environments", "Better benchmark datasets", "Adaptive authentication approaches", "Practical deployment considerations"];

function Research() {
  const [ref, visible] = useReveal();
  return (
    <section id="research" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal><SectionEyebrow index="06" label="Academic / Research Work" /></Reveal>
        <Reveal delay={60}>
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-14" style={{ color: "var(--text)" }}>
            Research, formally.
          </h2>
        </Reveal>

        <div ref={ref} className={`reveal reveal-right ${visible ? "reveal-visible" : ""} research-card`}>
          <div className="flex items-center gap-2 mb-3 font-mono text-[11px] tracking-widest uppercase" style={{ color: "var(--accent)" }}>
            <FlaskConical size={14} /> Internet of Underwater Things · Research Project
          </div>
          <h3 className="font-display text-xl md:text-2xl font-semibold mb-2" style={{ color: "var(--text)" }}>
            Learning-Based Physical-Layer Authentication for IoUT
          </h3>
          <div className="text-sm mb-6" style={{ color: "var(--muted)" }}>
            Cybersecurity · Machine Learning · Physical-Layer Security · Underwater Acoustic Networks
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
            This research-based academic project investigated learning-based physical-layer authentication
            techniques for defending against spoofing and impersonation attacks in underwater acoustic networks —
            reviewing and comparing existing research approaches and developing a structured framework for
            understanding how different authentication mechanisms operate under the constraints of underwater
            communication environments. It involved a comparative review of 10 research studies, examining
            authentication approaches, learning mechanisms, deployment conditions, mobility considerations, and
            resource requirements.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <ModalHeading>Research Questions</ModalHeading>
              <ul className="mt-3 space-y-2">
                {RESEARCH_QUESTIONS.map((q) => (
                  <li key={q} className="text-sm flex items-start gap-2" style={{ color: "var(--muted)" }}>
                    <ChevronRight size={13} className="mt-1 shrink-0" style={{ color: "var(--accent)" }} /> {q}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-7">
              <div>
                <ModalHeading>Methodology</ModalHeading>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  A comparative literature-review approach — analyzing existing studies and developing a
                  multidimensional taxonomy covering authentication characteristics, learning/decision mechanisms,
                  mobility support, resource requirements, and deployment conditions.
                </p>
              </div>
              <div>
                <ModalHeading>Techniques Studied</ModalHeading>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {TECHNIQUES.map((t) => <span key={t} className="pill-sm">{t}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <ModalHeading>Research Findings — areas identified for further work</ModalHeading>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {FINDINGS.map((f) => <span key={f} className="pill">{f}</span>)}
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-6 font-mono border-l-2 pl-4" style={{ color: "var(--text)", borderColor: "var(--accent)" }}>
            The core contribution: systematically organizing and comparing different research approaches to
            identify patterns, limitations, trade-offs, and research gaps across them.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="/iout-research-paper.pdf" target="_blank" rel="noreferrer" className="btn-ghost !py-2">
              <BookOpen size={15} /> View Research Paper
            </a>
            <a href="/iout-research-presentation.pptx" target="_blank" rel="noreferrer" className="btn-ghost !py-2">
              <ExternalLink size={15} /> View Presentation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* GITHUB / INTERESTS / CONTACT                                           */
/* ---------------------------------------------------------------------- */

const ALL_REPOS = [...FEATURED_PROJECTS.map((p) => ({ name: p.name, github: p.github })), ...OTHER_PROJECTS.map((p) => ({ name: p.name, github: p.github }))];

function GithubSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="github" className="relative py-28 px-6" style={{ background: "var(--bg-elev-2)" }}>
      <div className="max-w-4xl mx-auto">
        <Reveal><SectionEyebrow index="07" label="GitHub" /></Reveal>
        <Reveal delay={60}>
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-14" style={{ color: "var(--text)" }}>
            The commit history behind it all.
          </h2>
        </Reveal>

        <div ref={ref} className={`reveal reveal-left ${visible ? "reveal-visible" : ""} rounded-xl overflow-hidden`} style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#0B0D12" }}>
          <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF6259" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C93F" }} />
            <span className="ml-3 font-mono text-[11px]" style={{ color: "var(--muted)" }}>github.com/sehrishsiddique853 — repositories</span>
          </div>
          <div className="p-5 font-mono text-[13px] space-y-2 max-h-72 overflow-y-auto">
            {ALL_REPOS.map((r) => (
              <a key={r.github} href={r.github} target="_blank" rel="noreferrer" className="github-repo-link flex items-center gap-2 group py-1">
                <span style={{ color: "var(--accent)" }}>$</span>
                <span style={{ color: "var(--muted)" }}>git clone</span>
                <span className="group-hover:underline" style={{ color: "var(--text)" }}>{r.name}</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--accent)" }} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a href="https://github.com/sehrishsiddique853" target="_blank" rel="noreferrer" className="btn-primary">
            <Github size={16} /> View Full Profile
          </a>
        </div>
      </div>
    </section>
  );
}

function Interests() {
  const [ref, visible] = useReveal();
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""}`}>
          <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)" }}>currently exploring</div>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text)" }}>
            Continuously expanding my knowledge across different areas of Computer Science — exploring new
            technologies and areas such as <span style={{ color: "var(--accent)" }}>AI</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* CONTACT FORM                                                            */
/* ---------------------------------------------------------------------- */

// Formspree endpoint — replace YOUR_FORM_ID with the ID from your own
// Formspree form (https://formspree.io). Free, no backend required:
// 1. Sign up at formspree.io with sehrishsiddique853@gmail.com
// 2. Create a new form, copy its ID (looks like "abcdwxyz")
// 3. Paste it below in place of "YOUR_FORM_ID"
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnpqnblk";

function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!values.name.trim()) er.name = "Please enter your name.";
    if (!values.email.trim()) er.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) er.email = "Please enter a valid email.";
    if (!values.message.trim()) er.message = "Please write a short message.";
    else if (values.message.trim().length < 10) er.message = "Message should be at least 10 characters.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      if (res.ok) {
        setStatus("success");
        setValues({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="form-card text-center py-14 px-8">
        <div className="mx-auto mb-4 flex items-center justify-center" style={{ width: 52, height: 52, borderRadius: 999, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)" }}>
          <Check size={22} style={{ color: "#4ADE80" }} />
        </div>
        <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>Message sent</h3>
        <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
          Thanks for reaching out — I'll get back to you as soon as I can.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-ghost">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-card" noValidate>
      <div className="mb-5">
        <label htmlFor="name" className="form-label">
          <User size={13} /> Name
        </label>
        <input
          id="name" name="name" type="text" autoComplete="name"
          value={values.name} onChange={handleChange}
          placeholder="Your name" className="form-field"
          style={errors.name ? { borderColor: "#F87171" } : undefined}
        />
        {errors.name && <span className="form-error"><AlertCircle size={12} /> {errors.name}</span>}
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="form-label">
          <Mail size={13} /> Email
        </label>
        <input
          id="email" name="email" type="email" autoComplete="email"
          value={values.email} onChange={handleChange}
          placeholder="you@example.com" className="form-field"
          style={errors.email ? { borderColor: "#F87171" } : undefined}
        />
        {errors.email && <span className="form-error"><AlertCircle size={12} /> {errors.email}</span>}
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="form-label">
          <MessageSquare size={13} /> Message
        </label>
        <textarea
          id="message" name="message" rows={5}
          value={values.message} onChange={handleChange}
          placeholder="What would you like to talk about?" className="form-field"
          style={errors.message ? { borderColor: "#F87171" } : undefined}
        />
        {errors.message && <span className="form-error"><AlertCircle size={12} /> {errors.message}</span>}
      </div>

      {status === "error" && (
        <div className="form-error mb-4" style={{ justifyContent: "center" }}>
          <AlertCircle size={13} /> Something went wrong — please try again, or email me directly.
        </div>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full justify-center">
        {status === "sending" ? (
          <><Loader2 size={16} className="animate-spin" /> Sending…</>
        ) : (
          <><Send size={16} /> Send message</>
        )}
      </button>
    </form>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "sehrishsiddique853@gmail.com";
  const copy = () => {
    navigator.clipboard?.writeText(email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const [ref, visible] = useReveal();

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <Orb top="10%" left="45%" size={420} opacity={0.08} />
      <div className="relative max-w-2xl mx-auto text-center">
        <Reveal><SectionEyebrow index="08" label="Contact" /></Reveal>
        <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""}`}>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4" style={{ color: "var(--text)" }}>
            Let's build something.
          </h2>
          <p className="mb-10" style={{ color: "var(--muted)" }}>
            Open to full-stack, backend, and software engineering roles — feel free to reach out.
          </p>

          <div className="flex items-center justify-center gap-2 font-mono text-sm mb-6">
            <button onClick={copy} className="contact-pill">
              <Mail size={15} /> {email}
              {copied ? <Check size={13} style={{ color: "#4ADE80" }} /> : <Copy size={13} style={{ color: "var(--muted)" }} />}
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 mb-14">
            <MagneticButton as="a" href="https://github.com/sehrishsiddique853" target="_blank" rel="noreferrer" className="social-btn"><Github size={18} /></MagneticButton>
            <MagneticButton as="a" href="https://www.linkedin.com/in/sehrish-siddique/" target="_blank" rel="noreferrer" className="social-btn"><Linkedin size={18} /></MagneticButton>
            <MagneticButton as="a" href={`mailto:${email}`} className="social-btn"><Mail size={18} /></MagneticButton>
          </div>
        </div>

        <Reveal>
          <div className="text-left">
            <ContactForm />
          </div>
        </Reveal>
      </div>

      <div className="relative mt-24 pt-8 text-center font-mono text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "var(--muted)" }}>
        © {new Date().getFullYear()} Sehrish Siddique — built line by line.
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* APP                                                                     */
/* ---------------------------------------------------------------------- */

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFinePointer);
    if (!isFinePointer) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    document.body.classList.add("cursor-none");

    const tick = () => {
      // dot snaps instantly, ring eases behind it for a soft trailing feel
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onDown = () => ringRef.current && ringRef.current.classList.add("cursor-ring-active");
    const onUp = () => ringRef.current && ringRef.current.classList.remove("cursor-ring-active");
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}

export default function App() {
  const [active, setActive] = useState("hero");
  const sectionIds = [...NAV_LINKS.map((l) => l.id), "github"];

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --bg: #0A0B10;
          --bg-elev: #12141B;
          --bg-elev-2: #0D0F15;
          --text: #E9EBF2;
          --muted: #8C93A6;
          --accent: #FF8A5D;
        }
        #portfolio-root, #portfolio-root * { box-sizing: border-box; }
        #portfolio-root { position: relative; font-family: 'Inter', sans-serif; color: var(--text); }
        #portfolio-root .font-display { font-family: 'Space Grotesk', sans-serif; }
        #portfolio-root .font-mono { font-family: 'JetBrains Mono', monospace; }

        #portfolio-root ::selection { background: rgba(255,138,93,0.3); }
        #portfolio-root { scroll-behavior: smooth; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 44px 44px;
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%);
          mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%);
        }

        .cursor-blink { display:inline-block; width:6px; height:14px; vertical-align:middle; animation: blink 1s steps(2) infinite; border-radius:1px; }
        @keyframes blink { 50% { opacity: 0; } }

        .fade-up { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes fadeUp { from { opacity:0; transform: translateY(28px);} to {opacity:1; transform:translateY(0);} }

        .reveal { opacity: 0; transform: translateY(34px); filter: blur(4px); transition: opacity .65s cubic-bezier(0.16,1,0.3,1), transform .65s cubic-bezier(0.16,1,0.3,1), filter .65s cubic-bezier(0.16,1,0.3,1); will-change: transform, opacity; }
        .reveal-left { transform: translateX(-64px) translateY(8px); }
        .reveal-right { transform: translateX(64px) translateY(8px); }
        .reveal-visible { opacity: 1 !important; transform: translate(0,0) !important; filter: blur(0) !important; }

        .hero-line { display:inline-block; opacity:0; transform: translateY(22px); animation: heroLineIn .8s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes heroLineIn { to { opacity:1; transform: translateY(0); } }

        .hero-word {
          position: relative;
          display: inline-block;
          animation: heroWordRise .9s cubic-bezier(0.16, 1, 0.3, 1) both;
          text-shadow: 0 0 18px rgba(255, 138, 93, 0.06);
        }
        @keyframes heroWordRise {
          0% { opacity: 0; transform: translate3d(0, 18px, 0); filter: blur(6px); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
        }

        .hero-highlight {
          position: relative;
          display: inline-block;
          background: linear-gradient(100deg, var(--accent) 20%, #FFD0AF 48%, var(--accent) 75%);
          background-size: 220% auto; -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: shimmer 3.2s linear infinite, heroGlow 2.8s ease-in-out infinite alternate;
        }
        @keyframes shimmer { to { background-position: -220% center; } }
        @keyframes heroGlow {
          0% { filter: drop-shadow(0 0 0 rgba(255,138,93,0)); }
          100% { filter: drop-shadow(0 0 10px rgba(255,138,93,0.25)); }
        }

        .hero-copy {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.18em 0.35em;
        }
        .hero-copy-line {
          display: inline-block;
          opacity: 0;
          transform: translateY(10px);
          animation: heroCopyIn .8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-copy-line:nth-child(1) { animation-delay: 0.85s; }
        .hero-copy-line:nth-child(2) { animation-delay: 0.95s; }
        .hero-copy-line:nth-child(3) { animation-delay: 1.05s; }
        .hero-copy-line:nth-child(4) { animation-delay: 1.15s; }
        .hero-copy-line:nth-child(5) { animation-delay: 1.25s; }
        .hero-copy-line:nth-child(6) { animation-delay: 1.35s; }

        .hero-copy-sep {
          display: inline-block;
          opacity: 0;
          animation: heroCopyIn .8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.05s;
          color: var(--accent);
        }
        @keyframes heroCopyIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .orb-float {
          position:absolute; border-radius: 999px; filter: blur(70px);
          background: radial-gradient(circle, var(--accent), transparent 70%);
          animation: orbDrift 12s ease-in-out infinite;
        }
        @keyframes orbDrift { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(22px,-18px) scale(1.08);} }

        .magnetic-wrap { display:inline-block; }

        .timeline-dot { animation: dotPulse 2.6s ease-in-out infinite; }
        @keyframes dotPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,138,93,0.25);} 50% { box-shadow: 0 0 0 8px rgba(255,138,93,0);} }

        .node-float { position:absolute; width:6px; height:6px; border-radius:999px; background: var(--accent); opacity:0.35; box-shadow: 0 0 14px var(--accent); animation: floaty 6s ease-in-out infinite; }
        @keyframes floaty { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-18px) } }

        .animate-bounce-slow { animation: bounceSlow 2.4s ease-in-out infinite; }
        @keyframes bounceSlow { 0%,100%{ transform: translateY(0);} 50%{ transform: translateY(6px);} }

        .btn-primary {
          display:inline-flex; align-items:center; gap:8px; padding: 12px 22px; border-radius: 10px;
          background: var(--accent); color: #16110C; font-weight:600; font-size:14px;
          transition: transform .25s ease, box-shadow .25s ease; box-shadow: 0 0 0 rgba(255,138,93,0);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,138,93,0.35); }

        .btn-ghost {
          display:inline-flex; align-items:center; gap:8px; padding: 12px 22px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.14); color: var(--text); font-weight:500; font-size:14px;
          transition: border-color .25s ease, background .25s ease, transform .25s ease;
        }
        .btn-ghost:hover { border-color: var(--accent); background: rgba(255,138,93,0.06); transform: translateY(-2px); }

        .project-card {
          display:flex; flex-direction:column; padding: 28px; border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          transition: transform .35s cubic-bezier(0.16,1,0.3,1), border-color .35s ease, box-shadow .35s ease;
        }
        .project-card:hover { transform: translateY(-6px); border-color: rgba(255,138,93,0.35); box-shadow: 0 16px 40px rgba(0,0,0,0.35); }
        .line-clamp-4 { display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden; }

        .other-card {
          padding: 20px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.015); transition: transform .3s ease, border-color .3s ease;
        }
        .other-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,0.18); }

        .pill {
          font-family: 'JetBrains Mono', monospace; font-size: 11px; padding: 5px 10px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1); color: var(--muted); background: rgba(255,255,255,0.02);
        }
        .pill-sm { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; padding: 4px 9px; border-radius: 999px;
          border: 1px solid rgba(255,138,93,0.2); color: var(--accent); background: rgba(255,138,93,0.05);
        }

        .compiler-step {
          min-height: 72px; display:flex; flex-direction:column; justify-content:space-between; gap:8px;
          padding: 10px; border: 1px solid rgba(255,138,93,0.22); border-radius: 8px;
          background: rgba(255,138,93,0.04);
        }

        .link-accent { color: var(--accent); font-weight:500; transition: opacity .2s; }
        .link-accent:hover { opacity: 0.75; }
        .link-muted { color: var(--muted); transition: color .2s; }
        .link-muted:hover { color: var(--text); }

        .skill-panel { padding: 22px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); }
        .skill-chip {
          font-family:'JetBrains Mono', monospace; font-size: 12px; padding: 6px 12px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1); color: var(--text); cursor: default;
          transition: all .25s cubic-bezier(0.16,1,0.3,1);
        }
        .skill-chip:hover { transform: translateY(-2px) scale(1.03); }

        .timeline-dot {
          width: 34px; height:34px; border-radius: 999px; background: var(--bg-elev);
          border: 1px solid rgba(255,138,93,0.35); display:flex; align-items:center; justify-content:center; z-index:2;
        }
        .timeline-line { background: linear-gradient(180deg, rgba(255,138,93,0.4), rgba(255,138,93,0.05)); }
        .layer-line { background: linear-gradient(180deg, rgba(255,138,93,0.35), rgba(255,255,255,0.05)); }

        .research-card { padding: 32px; border-radius: 18px; border: 1px solid rgba(255,255,255,0.08); background: radial-gradient(circle at 0% 0%, rgba(255,138,93,0.05), transparent 60%), rgba(255,255,255,0.015); }

        .contact-pill {
          display:inline-flex; align-items:center; gap:10px; padding: 12px 18px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12); color: var(--text); transition: border-color .25s, transform .25s;
        }
        .contact-pill:hover { border-color: var(--accent); transform: translateY(-2px); }

        .form-card {
          padding: 32px; border-radius: 18px; border: 1px solid rgba(255,255,255,0.08);
          background: radial-gradient(circle at 0% 0%, rgba(255,138,93,0.05), transparent 60%), rgba(255,255,255,0.015);
        }
        .form-label {
          display:flex; align-items:center; gap:6px; font-family:'JetBrains Mono', monospace;
          font-size: 11px; text-transform:uppercase; letter-spacing:.05em; color: var(--muted); margin-bottom: 8px;
        }
        .form-field {
          width:100%; padding: 12px 14px; border-radius: 10px; font-size: 14px; font-family: inherit;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: var(--text);
          transition: border-color .2s ease, background .2s ease; resize: vertical;
        }
        .form-field::placeholder { color: rgba(200,200,210,0.35); }
        .form-field:focus { outline:none; border-color: var(--accent); background: rgba(255,138,93,0.04); }
        .form-error {
          display:flex; align-items:center; gap:5px; margin-top:6px; font-size: 12.5px; color: #F87171;
        }
        .animate-spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .social-btn {
          width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center;
          border: 1px solid rgba(255,255,255,0.1); color: var(--text); transition: all .25s ease;
        }
        .social-btn:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-3px); background: rgba(255,138,93,0.06); }

        .modal-pop { animation: modalPop .35s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes modalPop { from { opacity:0; transform: scale(0.96) translateY(12px);} to { opacity:1; transform: scale(1) translateY(0);} }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }

        body.cursor-none, body.cursor-none * { cursor: none !important; }

        .custom-cursor-dot {
          position: fixed; top:0; left:0; width: 8px; height: 8px; border-radius: 999px;
          background: var(--accent); box-shadow: 0 0 10px var(--accent), 0 0 2px var(--accent);
          pointer-events: none; z-index: 9999; will-change: transform;
        }
        .custom-cursor-ring {
          position: fixed; top:0; left:0; width: 36px; height: 36px; border-radius: 999px;
          border: 1px solid rgba(255,138,93,0.7); pointer-events: none; z-index: 9998; will-change: transform;
          transition: width .2s ease, height .2s ease, border-color .2s ease, opacity .2s ease;
        }
        .custom-cursor-ring.cursor-ring-active { width: 28px; height: 28px; border-color: var(--accent); background: rgba(255,138,93,0.08); }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: #23262f; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #2f333f; }

        @media (max-width: 640px) {
          #portfolio-root { overflow-x: hidden; }
          #portfolio-root section { padding-left: 1rem; padding-right: 1rem; }
          #portfolio-root .hero-line { max-width: 100%; }
          #portfolio-root h1 { font-size: clamp(2rem, 9vw, 2.75rem); line-height: 1.08; }
          .hero-copy { font-size: 0.9rem; line-height: 1.65; }
          .hero-copy-sep { display: none; }
          .project-card { padding: 20px; border-radius: 12px; }
          .other-card { padding: 16px; }
          .research-card, .form-card { padding: 20px; border-radius: 12px; }
          .timeline-dot { left: -2px; }
          .timeline-line { left: 15px; }
          .timeline-entry { padding-left: 2.75rem; }
          .contact-pill { max-width: 100%; padding: 10px 12px; font-size: 0.72rem; overflow-wrap: anywhere; }
          .modal-pop { margin-top: 1rem; margin-bottom: 1rem; border-radius: 12px; }
          .modal-pop > div:last-child { padding: 1rem; }
          .compiler-step { min-height: 60px; }
          .github-repo-link { align-items: flex-start; flex-wrap: wrap; overflow-wrap: anywhere; }
        }

        @media (max-width: 380px) {
          #portfolio-root h1 { font-size: 1.85rem; }
          .hero-copy { font-size: 0.84rem; }
          .timeline-entry { padding-left: 2.5rem; }
          .compiler-step { min-height: 54px; padding: 8px; }
        }
      `}</style>

      <div id="portfolio-root">
        <CursorPixelField />
        <CustomCursor />
        <ScrollProgress />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar active={active} onNav={scrollTo} />
          <Hero onNav={scrollTo} />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Education />
          <Research />
          <Interests />
          <GithubSection />
          <Contact />
        </div>
      </div>
    </div>
  );
}
