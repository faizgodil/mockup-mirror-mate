import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { products, type Product, type ProductStatus } from "@/content/products";
import dentalProImage from "@/assets/dentalpro.jpg";
import dentalProMobileImage from "@/assets/dentalpro-mobile.jpg";

const TITLE = "UniqManage — Intelligent Software. Built for Real Work.";
const DESC =
  "UniqManage is an independent Indian software venture building practical software for healthcare, finance and business operations.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const GITHUB = "https://github.com/Uniqmanage";
const NAV = [
  { href: "#products", label: "Products" },
  { href: "#dentalpro", label: "DentalPro" },
  { href: "#technology", label: "Technology" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Logo() {
  return (
    <a href="#top" className="flex min-w-0 items-center gap-2.5" aria-label="UniqManage home">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground">
        U
      </span>
      <span className="truncate font-display text-[1.05rem] font-semibold">UniqManage</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${scrolled || open ? "border-border bg-background/85 backdrop-blur-xl" : "border-transparent"}`}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:flex md:justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
          <a href="#contact" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
            Get in touch
          </a>
        </nav>
        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-border md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-foreground transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-foreground transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-foreground transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>
      {open && (
        <nav className="h-[calc(100dvh-4rem)] border-t border-border bg-background px-5 py-6 md:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-border py-4 font-display text-lg">
              {n.label}
            </a>
          ))}
          <a href={GITHUB} target="_blank" rel="noreferrer" className="block py-4 text-muted-foreground">
            GitHub ↗
          </a>
        </nav>
      )}
    </header>
  );
}

const statusStyle: Record<ProductStatus, string> = {
  Active: "text-primary border-primary/30 bg-primary/10",
  "In Development": "text-accent border-accent/30 bg-accent/10",
  Prototype: "text-warn border-warn/30 bg-warn/10",
};

function Status({ s, label }: { s: ProductStatus; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyle[s]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

function Illustrative() {
  return (
    <span className="absolute bottom-2 right-2 rounded-md border border-border bg-background/95 px-2 py-1 text-[11px] uppercase tracking-wider text-foreground backdrop-blur">
      Illustrative concept
    </span>
  );
}

function DentalDashboard({ loading }: { loading?: "lazy" }) {
  return (
    <picture className="block">
      <source media="(max-width: 639px)" srcSet={dentalProMobileImage} width={928} height={1083} />
      <img
        src={dentalProImage}
        alt="DentalPro dashboard illustrative concept with fictional demonstration appointments and billing data"
        loading={loading}
        width={1264}
        height={848}
        className="block h-auto w-full"
      />
    </picture>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="reveal max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-[1.75rem] font-semibold leading-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-10 sm:pb-12 sm:pt-20">
        <div className="max-w-3xl animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Independent software venture · India
          </p>
          <h1 className="mt-5 text-[2.35rem] font-semibold leading-[1.08] sm:mt-6 sm:text-6xl">
            Intelligent Software.
            <br />
            <span className="text-gradient">Built for Real Work.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:mt-6 sm:text-lg">
            UniqManage develops practical, reliable software for healthcare, finance and business operations — combining
            thoughtful design, automation and AI where it creates meaningful value.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <a href="#products" className="rounded-full bg-primary px-6 py-3 text-center font-semibold text-primary-foreground shadow-elegant transition hover:opacity-90">
              Explore Products
            </a>
            <a href="#contact" className="rounded-full border border-border px-6 py-3 text-center font-medium transition hover:bg-secondary">
              Collaborate with us
            </a>
          </div>
        </div>
        <div className="relative mt-8 animate-rise [animation-delay:200ms] sm:mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="ml-3 min-w-0 truncate text-xs text-foreground">DentalPro — practice dashboard</span>
            </div>
            <div className="relative">
              <DentalDashboard />
              <Illustrative />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <article
      className={`reveal group flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card transition hover:-translate-y-1 ${p.flagship ? "border-primary/40 md:col-span-2 md:grid md:grid-cols-2" : "border-border"}`}
    >
      <div className={`relative overflow-hidden bg-muted ${p.id === "dentalpro" ? "aspect-auto md:flex md:items-center" : "aspect-[4/3] md:aspect-auto"}`}>
        {p.id === "dentalpro" ? <DentalDashboard loading="lazy" /> : <img src={p.image} alt={`Illustrative concept of ${p.name}`} loading="lazy" width={1200} height={912} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />}
        <Illustrative />
      </div>
      <div className="flex min-w-0 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Status s={p.status} label={p.statusLabel} />
          {p.flagship && <span className="text-xs font-semibold uppercase tracking-wider text-primary">Flagship</span>}
        </div>
        <h3 className="mt-4 text-2xl font-semibold">{p.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{p.tag}</p>
        <p className="mt-4 text-muted-foreground">{p.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.points.map((t) => (
            <li key={t} className="rounded-md bg-secondary px-2.5 py-1 text-xs">{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Products() {
  return (
    <section id="products" className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:pb-28 sm:pt-16">
      <SectionHead eyebrow="Portfolio" title="Four products. One standard of craft." sub="Each product is labelled by its real stage — from active clinical use to early prototype." />
      <div className="mt-8 grid gap-5 sm:mt-12 md:grid-cols-2">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

const DENTAL_FEATURES = [
  ["Patient records", "Complete histories, notes and documents in one place."],
  ["Scheduling", "Calendar-based appointments with daily status at a glance."],
  ["Treatment workflows", "Structured plans that follow each case from start to finish."],
  ["Billing", "Invoices, payments and outstanding balances, clearly tracked."],
  ["Dental imaging", "Keep radiographs and images connected to the patient."],
  ["Operations", "Reports and tools that keep the practice running smoothly."],
];

function DentalPro() {
  return (
    <section id="dentalpro" className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="min-w-0">
          <SectionHead eyebrow="Flagship · DentalPro" title="Practice management, refined in a working clinic." sub="DentalPro is in active use in a real dental clinic, where everyday feedback shapes every release." />
          <div className="mt-10 grid gap-x-6 gap-y-6 sm:grid-cols-2">
            {DENTAL_FEATURES.map(([t, d]) => (
              <div key={t} className="reveal border-l-2 border-primary/50 pl-4">
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal relative min-w-0">
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-elegant lg:animate-floaty">
            <DentalDashboard loading="lazy" />
            <Illustrative />
          </div>
        </div>
      </div>
    </section>
  );
}

const TECH = [
  ["AI", "Applied where it saves real time — never as decoration.", "◎"],
  ["OCR", "Turning receipts and handwritten notes into structured data.", "▤"],
  ["Automation", "Removing repetitive steps from everyday workflows.", "⟳"],
  ["Cloud integration", "Reliable sync, backups and integrations with familiar tools.", "☁"],
  ["Mobile-first", "Interfaces designed for the device people actually carry.", "▯"],
];

function Technology() {
  return (
    <section id="technology" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <SectionHead eyebrow="Technology" title="Capabilities we build with." />
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {TECH.map(([t, d, i]) => (
          <div key={t} className="reveal bg-background p-6">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-lg text-primary" aria-hidden>{i}</span>
            <h3 className="mt-5 font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const APPROACH = [
  ["01", "Practical innovation", "Solve real problems first; adopt new technology when it clearly helps."],
  ["02", "Reliability", "Software people can depend on during a busy working day."],
  ["03", "Usability", "Clear, calm interfaces that need little training."],
  ["04", "Continuous improvement", "Shipping steadily, guided by feedback from real use."],
];

function Approach() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <SectionHead eyebrow="Our approach" title="How we build." />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {APPROACH.map(([n, t, d]) => (
            <li key={n} className="reveal">
              <span className="font-display text-sm text-primary">{n}</span>
              <div className="mt-3 h-px bg-border" />
              <h3 className="mt-5 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-2">
        <SectionHead eyebrow="About" title="Independent. Bootstrapped. Building for the long term." />
        <div className="reveal space-y-4 text-muted-foreground">
          <p>UniqManage is an independently developed, self-funded software venture based in India. We design, build and maintain our products in-house.</p>
          <p>Our ambitions are commercial: to grow a portfolio of dependable products for healthcare, finance and business operations, and to bring them to customers in India and beyond.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["Bootstrapped", "Product-led", "Made in India"].map((t) => (
              <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-foreground">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const items = [
    ["Customers", "Interested in DentalPro or an upcoming product for your organisation."],
    ["Technology partners", "Integrations, platforms and infrastructure collaborations."],
    ["Startup programs", "Accelerators, cloud credits and ecosystem programs."],
  ];
  return (
    <section id="contact" className="px-5 pb-20 sm:pb-28">
      <div className="reveal relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-12">
        <div className="pointer-events-none absolute inset-0 bg-glow" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contact & collaboration</p>
          <h2 className="mt-3 max-w-2xl text-[1.75rem] font-semibold leading-tight sm:text-4xl">Let's build something useful together.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {items.map(([t, d]) => (
              <div key={t} className="rounded-xl border border-border bg-background/60 p-5">
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={GITHUB} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-6 py-3 text-center font-semibold text-primary-foreground transition hover:opacity-90">
              Reach us on GitHub
            </a>
            <a href="#products" className="rounded-full border border-border px-6 py-3 text-center font-medium transition hover:bg-secondary">
              View products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">© {new Date().getFullYear()} UniqManage. Product visuals are illustrative concepts.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Footer">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-foreground">{n.label}</a>
          ))}
          <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub ↗</a>
        </nav>
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <div className="overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <Products />
        <DentalPro />
        <Technology />
        <Approach />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
