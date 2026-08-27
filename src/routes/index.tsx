import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Droplets, Sparkles, ShieldCheck, Leaf, MapPin, Phone, Mail, CheckCircle2, Menu, X } from "lucide-react";
import { useState } from "react";

import logoAsset from "@/assets/luna-clean-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Luna Clean | Trash Bin Cleaning in Maple Leaf, Seattle" },
      { name: "description", content: "Professional trash bin cleaning service in Maple Leaf, Seattle. We scrub, sanitize, and deodorize your garbage bins so you don't have to." },
      { property: "og:title", content: "Luna Clean | Trash Bin Cleaning in Maple Leaf, Seattle" },
      { property: "og:description", content: "Professional trash bin cleaning service in Maple Leaf, Seattle. We scrub, sanitize, and deodorize your garbage bins so you don't have to." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Service Area", href: "#service-area" },
  { label: "Contact", href: "#contact" },
];

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="Luna Clean logo"
              className="h-14 w-auto"
            />
            <span className="hidden text-xl font-bold text-foreground sm:inline">
              Luna Clean
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="#contact">Get a Quote</a>
            </Button>
          </nav>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border bg-background px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Get a Quote</a>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-hero-gradient px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
              <div className="max-w-2xl">
                <div className="mb-6 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
                  <Sparkles className="mr-2 h-4 w-4 text-lime" />
                  Now serving Maple Leaf, Seattle
                </div>
                <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Trash bins so clean,{" "}
                  <span className="text-lime">they sparkle.</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Luna Clean is Maple Leaf's friendly neighborhood bin cleaning service. We scrub,
                  sanitize, and deodorize your garbage and recycling bins — leaving them fresh,
                  hygienic, and free from grime.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <a href="#contact">Get Your Bins Cleaned</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-navy/20 text-foreground hover:bg-accent hover:text-accent-foreground">
                    <a href="#services">See Our Services</a>
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-lime" />
                  <span>Eco-friendly cleaners</span>
                  <span className="mx-2">•</span>
                  <CheckCircle2 className="h-4 w-4 text-lime" />
                  <span>No contracts</span>
                  <span className="mx-2 hidden sm:inline">•</span>
                  <CheckCircle2 className="h-4 w-4 text-lime hidden sm:inline" />
                  <span className="hidden sm:inline">Satisfaction guaranteed</span>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-md lg:max-w-full">
                <div className="relative rounded-3xl bg-card p-8 shadow-xl ring-1 ring-border">
                  <img
                    src={logoAsset.url}
                    alt="Luna Clean mascot spraying water on a trash bin"
                    className="mx-auto w-full max-w-sm rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What we clean
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                One-time deep cleans or recurring maintenance — we handle the dirty work so your
                home stays fresh.
              </p>
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Droplets,
                  title: "Trash Bin Cleaning",
                  description:
                    "High-pressure wash and sanitize your garbage bin inside and out. Removes bacteria, odors, and built-up residue.",
                },
                {
                  icon: Sparkles,
                  title: "Recycling Bin Cleaning",
                  description:
                    "Sticky labels and leftover liquids don't stand a chance. We deodorize your recycling bins too.",
                },
                {
                  icon: Leaf,
                  title: "Compost Bin Cleaning",
                  description:
                    "Food scraps and organic waste leave stubborn buildup. We deep-clean compost bins to stop smells and pests.",
                },
                {
                  icon: ShieldCheck,
                  title: "Monthly Maintenance",
                  description:
                    "Keep bins consistently clean with our recurring service. Save money and never worry about odors again.",
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-card-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* No Bin Too Dirty */}
        <section className="bg-navy px-4 py-16 text-navy-foreground sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              No bin is too dirty for us.
            </h2>
            <p className="mt-4 text-lg text-navy-foreground/80">
              Grimy, sticky, or years overdue — we clean them all. If your bins are too dirty to handle,
              leave it to Luna Clean. We scrub, sanitize, and deodorize every bin, no matter the condition.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-navy-foreground/90">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-lime" />
                No judgment
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-lime" />
                No extra hassle
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-lime" />
                No bin turned away
              </span>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-navy px-4 py-20 text-navy-foreground sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How it works
              </h2>
              <p className="mt-4 text-lg text-navy-foreground/80">
                Simple, fast, and no mess left behind.
              </p>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Book online or call",
                  description:
                    "Pick a date that works for you. We offer flexible scheduling across Maple Leaf.",
                },
                {
                  step: "02",
                  title: "We come to you",
                  description:
                    "Our team arrives with professional equipment and eco-friendly cleaning solutions.",
                },
                {
                  step: "03",
                  title: "Enjoy clean bins",
                  description:
                    "We scrub, rinse, sanitize, and deodorize — then take all the dirty water with us.",
                },
              ].map((item) => (
                <div key={item.step} className="relative rounded-2xl bg-navy-foreground/10 p-8 backdrop-blur">
                  <span className="text-4xl font-black text-lime">{item.step}</span>
                  <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-navy-foreground/80">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section id="service-area" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Proudly serving Maple Leaf, Seattle
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  We're your neighbors. Luna Clean is based right here in Maple Leaf and focused on
                  keeping Seattle homes cleaner, one bin at a time.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Single-family homes",
                    "Townhomes & duplexes",
                    "Small apartment buildings",
                    "HOA and neighborhood cleanups",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-lime" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-card-foreground">Service area</h3>
                    <p className="mt-2 text-muted-foreground">
                      Maple Leaf and nearby Seattle neighborhoods. Not sure if we cover your street?
                      Reach out — we probably do.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact / CTA */}
        <section id="contact" className="bg-hero-gradient px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl bg-card p-8 shadow-xl ring-1 ring-border sm:p-12 lg:p-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready for fresher bins?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Get in touch for a free quote. We'll get back to you quickly with pricing and
                availability.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <a
                href="tel:+17149123682"
                className="flex items-center gap-4 rounded-2xl border border-border bg-background p-6 transition-colors hover:bg-accent"
              >
                <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Call or text</p>
                  <p className="text-lg font-semibold text-foreground">(714) 912-3682</p>
                </div>
              </a>
              <a
                href="mailto:lunacleanseattle@moderncentral.net"
                className="flex items-center gap-4 rounded-2xl border border-border bg-background p-6 transition-colors hover:bg-accent"
              >
                <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email us</p>
                  <p className="text-lg font-semibold text-foreground">lunacleanseattle@moderncentral.net</p>
                </div>
              </a>
            </div>

            <div className="mt-10 text-center">
              <Button asChild size="lg" className="bg-primary px-8 text-primary-foreground hover:bg-primary/90">
                <a href="mailto:lunacleanseattle@moderncentral.net">Request a Free Quote</a>
              </Button>
              <p className="mt-3 text-sm text-muted-foreground">
                No commitment required. We typically reply within one business day.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <img
                src={logoAsset.url}
                alt="Luna Clean logo"
                className="h-10 w-auto"
              />
              <span className="text-lg font-bold text-foreground">Luna Clean</span>
            </div>
            <p className="text-center text-sm text-muted-foreground md:text-right">
              © {new Date().getFullYear()} Luna Clean. All rights reserved.
              <br />
              Maple Leaf, Seattle, WA
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
