"use client";

import { FormEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  DatabaseZap,
  MapPinned,
  RadioTower,
  Route,
  Sparkles,
  Workflow
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants
} from "framer-motion";

const sections = [
  { id: "hero", label: "Origin" },
  { id: "services", label: "Assets" },
  { id: "workflow", label: "Lifecycle" },
  { id: "contact", label: "Audit" }
];

const services = [
  {
    number: "01",
    eyebrow: "Content Pipelines",
    title: "Automated Content Engines",
    description:
      "Turn raw ideas into an automated digital asset that works for your brand around the clock. We architect repeatable production workflows that maintain consistent, high-impact visibility across the Toronto market without burning out your internal team. This ensures your business, restaurant, or personal brand remains top-of-mind dynamically and systematically.",
    icon: RadioTower,
    output: "Repeatable visibility"
  },
  {
    number: "02",
    eyebrow: "Digital Infrastructure",
    title: "Back-End Automation Architecture",
    description:
      "Eliminate operational friction and fragmented software ecosystems. We construct robust, synchronized CRM and database pipelines that seamlessly capture, route, and manage client inquiries and restaurant bookings. Your front-facing growth should be backed by clean, quiet, and reliable operational stability.",
    icon: DatabaseZap,
    output: "Clean routing"
  },
  {
    number: "03",
    eyebrow: "Local Market Outreach",
    title: "Hyper-Targeted Local Distribution",
    description:
      "Dominate your local geographic territory with precision outreach. We deploy targeted digital distribution systems designed to capture high-intent local buyers and route them directly into your optimized lead funnels. Turn digital traffic into physical foot traffic and predictable revenue for your business.",
    icon: MapPinned,
    output: "Local demand capture"
  }
];

const workflow = [
  {
    number: "01",
    title: "AUDIT",
    description:
      "Identify the structural bottlenecks holding your business back. We run a comprehensive diagnostics check on your current local reach, customer routing, and content workflows to pinpoint exactly where you are losing leverage, attention, and revenue."
  },
  {
    number: "02",
    title: "AUTOMATE",
    description:
      "Eliminate manual friction entirely. Our team engineers and deploys your custom digital infrastructure, connecting your data pipelines and activating your automated content asset engine to ensure continuous market presence."
  },
  {
    number: "03",
    title: "SCALE",
    description:
      "Transition into a predictable growth pattern. With your infrastructure firing seamlessly, we launch targeted local outreach campaigns, track clear system data, and feed a steady stream of verified leads directly to your operation."
  }
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
  }
};

function SplitReveal({ text, className }: { text: string; className?: string }) {
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.55 }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          className="mr-[0.24em] inline-block"
          variants={itemVariants}
          key={`${word}-${index}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

function AmbientGrid() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const gridX = useTransform(x, [-1, 1], [-16, 16]);
  const gridY = useTransform(y, [-1, 1], [-16, 16]);

  useEffect(() => {
    const onMouseMove = (event: globalThis.MouseEvent) => {
      x.set((event.clientX / window.innerWidth - 0.5) * 2);
      y.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
      style={{ x: gridX, y: gridY }}
      animate={{ opacity: [0.025, 0.045, 0.025] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="h-full w-full bg-system-grid [background-size:44px_44px]" />
    </motion.div>
  );
}

function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-frost px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-obsidian shadow-glow transition sm:w-auto"
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.985 }}
    >
      <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-cyan/40 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
      <span className="relative flex items-center gap-3">
        {children}
        <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
      </span>
    </motion.a>
  );
}

function SectionHeading({
  kicker,
  title,
  text
}: {
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      className="max-w-3xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={containerVariants}
    >
      <motion.p className="mono-label" variants={itemVariants}>
        {kicker}
      </motion.p>
      <SplitReveal
        text={title}
        className="mt-5 text-4xl font-semibold leading-[0.98] tracking-tight text-frost sm:text-5xl lg:text-6xl"
      />
      <motion.p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg" variants={itemVariants}>
        {text}
      </motion.p>
    </motion.div>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-32% 0px -42% 0px", threshold: [0.2, 0.45, 0.7] }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

export function LandingPage() {
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!event.currentTarget.checkValidity()) {
      return;
    }

    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-frost">
      <AmbientGrid />
      <motion.div
        className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-cyan via-emerald to-violet"
        style={{ scaleX }}
      />

      <header className="fixed inset-x-0 top-4 z-40 px-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/[0.08] bg-obsidian/72 px-4 py-3 backdrop-blur-xl sm:px-5">
          <a href="#hero" className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-frost">
            PARADOX INDUSTRIES
          </a>
          <nav className="hidden items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] p-1 lg:flex" aria-label="Section navigation">
            {sections.map((section) => (
              <a
                className={`rounded-full px-3 py-1.5 font-mono text-[0.63rem] uppercase tracking-[0.18em] transition ${
                  active === section.id ? "bg-cyan text-obsidian" : "text-muted hover:text-frost"
                }`}
                href={`#${section.id}`}
                key={section.id}
              >
                {section.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald" />
            </span>
            <span className="hidden sm:inline">System Status: Active</span>
            <span className="sm:hidden">Active</span>
          </div>
        </div>
      </header>

      <section id="hero" className="section-shell relative z-10 flex min-h-screen items-center pb-20 pt-32">
        <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-5xl"
          >
            <motion.p className="mono-label" variants={itemVariants}>
              Toronto Systems-Led Growth Agency
            </motion.p>
            <SplitReveal
              text="Engineered Visibility. Predictable Local Growth."
              className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.9] tracking-tight text-frost sm:text-7xl lg:text-8xl"
            />
            <motion.p className="mt-7 max-w-3xl text-lg leading-8 text-muted sm:text-xl" variants={itemVariants}>
              We build custom content pipelines and back-end digital infrastructure for Toronto businesses, restaurants,
              and creators. Stop relying on vague marketing metrics and deploy a structured system built for reliable leads.
            </motion.p>
            <motion.div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center" variants={itemVariants}>
              <MagneticButton href="#contact">Initiate Infrastructure Audit</MagneticButton>
              <p className="max-w-sm border-l border-white/10 pl-4 font-mono text-xs uppercase leading-6 tracking-[0.18em] text-muted">
                Serving operators and decision-makers across the Greater Toronto Area.
              </p>
            </motion.div>
          </motion.div>

          <motion.aside
            className="fine-border relative overflow-hidden rounded-2xl bg-white/[0.025] p-5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
            <div className="flex items-center justify-between">
              <p className="mono-label text-emerald">Infrastructure Pulse</p>
              <Workflow className="h-4 w-4 text-cyan" />
            </div>
            <div className="mt-8 space-y-4">
              {["Content Engine", "Lead Routing", "Local Distribution"].map((item, index) => (
                <div className="flex items-center gap-3" key={item}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan/25 bg-cyan/10 font-mono text-[0.65rem] text-cyan">
                    0{index + 1}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-cyan/50 to-transparent" />
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">{item}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="services" className="section-shell relative z-10 py-24 sm:py-32">
        <SectionHeading
          kicker="Operational Assets"
          title="Three systems replacing vague agency retainers."
          text="Each capability is built as infrastructure: measurable, repeatable, and quiet enough to support growth without adding chaos to the operator's day."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                className="group relative min-h-[28rem] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-500 hover:border-cyan/70"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                key={service.number}
              >
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/20 blur-3xl" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
                </div>
                <div className="relative flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">{service.number}</p>
                    <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                      {service.eyebrow}
                    </p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.03] p-3 text-cyan transition duration-500 group-hover:border-cyan/50 group-hover:bg-cyan/10">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="relative mt-10 text-2xl font-semibold tracking-tight text-frost">{service.title}</h3>
                <p className="relative mt-5 text-sm leading-7 text-muted">{service.description}</p>
                <div className="relative mt-8 inline-flex items-center gap-2 border-t border-white/10 pt-5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-emerald">
                  <Sparkles className="h-3.5 w-3.5" />
                  Output: {service.output}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="workflow" className="section-shell relative z-10 py-24 sm:py-32">
        <SectionHeading
          kicker="Audit / Automate / Scale"
          title="A lifecycle built to remove friction before adding volume."
          text="The process starts with structural diagnostics, moves into custom automation, and only scales once the operating layer can handle more demand."
        />

        <div className="relative mt-16">
          <div className="absolute left-4 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-cyan via-white/15 to-transparent md:block" />
          <div className="grid gap-5">
            {workflow.map((step, index) => (
              <motion.article
                className="relative grid gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:grid-cols-[8rem_minmax(0,1fr)] md:p-8"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.32 }}
                transition={{ delay: index * 0.08, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
                key={step.number}
              >
                <div className="flex items-center gap-4 md:block">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 font-mono text-xs text-cyan">
                    {step.number}
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald md:mt-5">{step.title}</p>
                </div>
                <p className="text-base leading-8 text-muted md:text-lg">{step.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell relative z-10 py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(360px,1fr)] lg:items-start">
          <SectionHeading
            kicker="Lead Capture"
            title="Initiate an Infrastructure Audit"
            text="Secure a diagnostic breakdown of your current content workflows and lead infrastructure. Fields are kept strictly minimal to respect your time."
          />

          <motion.form
            action="https://formsubmit.co/ima@paradoxindustries.ca"
            method="POST"
            onSubmit={onSubmit}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 shadow-glow backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <input type="hidden" name="_subject" value="New Paradox Industries Infrastructure Audit" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://www.paradoxindustries.ca/?submitted=true#contact" />
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />

            <div className="grid gap-8">
              <label className="block">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">Full Name</span>
                <input className="underline-field" name="full_name" placeholder="e.g., Marcus Vance" required />
              </label>
              <label className="block">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">Business Name</span>
                <input className="underline-field" name="business_name" placeholder="e.g., Paradox Operations" required />
              </label>
              <label className="block">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">Email Address</span>
                <input
                  className="underline-field"
                  name="email"
                  type="email"
                  placeholder="e.g., marcus@paradoxindustries.com"
                  required
                />
              </label>
              <label className="block">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">Primary Project Goals</span>
                <textarea
                  className="underline-field min-h-28 resize-y"
                  name="primary_project_goals"
                  placeholder="e.g., Automate restaurant bookings / Streamline local creator workflow"
                  required
                />
              </label>
            </div>

            <motion.button
              className="mt-10 inline-flex w-full items-center justify-center gap-3 rounded-full bg-cyan px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-obsidian transition hover:bg-frost"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              type="submit"
            >
              {submitted ? "Initializing..." : "Initialize System Audit"}
              <Route className="h-4 w-4" />
            </motion.button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
