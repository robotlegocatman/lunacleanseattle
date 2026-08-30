import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Droplets, Sparkles, ShieldCheck, Leaf, MapPin, Phone, Mail, CheckCircle2, Menu, X, Trash2, CreditCard, Wallet, Banknote, HandCoins } from "lucide-react";
import { useState } from "react";
import { BookingForm } from "@/components/BookingForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import logoUrl from "/luna-clean-logo.png"; // Just pointing to the /public folder root, that's it.

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Luna Clean | Maple Leaf" },
      { name: "description", content: "Professional trash bin cleaning service in Maple Leaf, Seattle. We scrub, sanitize, and deodorize your garbage bins so you don't have to." },
      { property: "og:title", content: "Luna Clean | Trash Bin Cleaning in Maple Leaf, Seattle" },
      { property: "og:description", content: "Professional trash bin cleaning service in Maple Leaf, Seattle. We scrub, sanitize, and deodorize your garbage bins so you don't have to." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Payment", href: "#payment" },
  { label: "FAQ", href: "#faq" },
  { label: "Service Area", href: "#service-area" },
  { label: "Book Now", href: "#book" },
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
              src={logoUrl}
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
            <ThemeToggle className="ml-3" />
            <Button asChild className="ml-3 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="#book">Book Now</a>
            </Button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          </div>
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
                <a href="#book" onClick={() => setMobileMenuOpen(false)}>Book Now</a>
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
                    <a href="#book">Get Your Bins Cleaned</a>
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
                    src={logoUrl}
                    alt="Luna Clean mascot spraying water on a trash bin"
                    className="mx-auto w-full max-w-sm rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About the Owners */}
        <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <span className="text-3xl">🗑️</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Meet the Owners
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Hi. We're the Kids Who Clean Your Trash Cans.
              </p>
              <p className="mt-2 text-lg leading-8 text-muted-foreground">Yep. You read that right.</p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We're Dylan (10) and Elliot (13), two brothers, and the owners of Luna Clean.
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We started Luna Clean because we wanted to make some money, learn how to run a
                business, and—let's be honest—we thought cleaning garbage cans would be pretty
                funny.
              </p>
              <p className="mt-6 text-lg font-semibold text-foreground">
                Turns out… garbage cans are REALLY dirty.
              </p>
              <p className="mt-2 text-lg leading-8 text-muted-foreground">
                But somebody's gotta do it!
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-card-foreground">Meet Dylan</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Age: 10 · Job Title: Head of Getting Dirty
                </p>
                <p className="mt-4 text-muted-foreground">
                  Dylan is the youngest member of the Luna Clean team and has approximately zero
                  fear of disgusting garbage cans.
                </p>
                <p className="mt-4 text-sm font-medium text-card-foreground">His special skills include:</p>
                <ul className="mt-3 space-y-2">
                  {[
                    "Finding the grossest bin on the street",
                    "Getting dirty without complaining… usually",
                    "Asking how much money we're making",
                    "Saying, \"Ewww!\" while continuing to clean",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  <span className="font-medium text-card-foreground">Favorite part:</span> Making a
                  disgusting bin look brand new.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium text-card-foreground">Least favorite part:</span>{" "}
                  Smelling a disgusting bin before making it look brand new.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-card-foreground">Meet Elliot</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Age: 13 · Job Title: Big Brother / Boss / Professional Eye-Roller
                </p>
                <p className="mt-4 text-muted-foreground">
                  Elliot handles a lot of the business side of Luna Clean and helps make sure we
                  actually know what we're doing.
                </p>
                <p className="mt-4 text-sm font-medium text-card-foreground">His special skills include:</p>
                <ul className="mt-3 space-y-2">
                  {[
                    "Keeping track of jobs",
                    "Helping with the business stuff",
                    "Coming up with ideas",
                    "Making sure Dylan doesn't spend all the money",
                    "Being a big brother… whether Dylan asked for one or not",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  <span className="font-medium text-card-foreground">Favorite part:</span> Watching
                  the business grow.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium text-card-foreground">Least favorite part:</span>{" "}
                  Working with his little brother.
                </p>
              </div>
            </div>

            <div className="mt-14 rounded-2xl bg-navy px-6 py-10 text-navy-foreground sm:px-10">
              <h3 className="text-2xl font-bold">🗑️ How Did This Happen?</h3>
              <p className="mt-4 text-navy-foreground/80">One day we thought:</p>
              <p className="mt-2 font-medium">"People hate cleaning their garbage cans."</p>
              <p className="mt-4 text-navy-foreground/80">Then we thought:</p>
              <p className="mt-2 font-medium">"We hate cleaning our garbage cans too."</p>
              <p className="mt-4 text-navy-foreground/80">Then we thought:</p>
              <p className="mt-2 font-medium">
                "Wait… what if we cleaned OTHER people's garbage cans and got paid for it?"
              </p>
              <p className="mt-6 text-xl font-black text-lime">LUNA CLEAN WAS BORN.</p>
              <p className="mt-6 text-navy-foreground/80">
                Now we're learning how to run a real business, work with customers, manage money,
                show up on time, and do a job we're proud of.
              </p>
              <p className="mt-4 text-navy-foreground/80">And yes, we're still brothers.</p>
              <p className="mt-2 text-navy-foreground/80">So there may occasionally be some arguing.</p>
              <p className="mt-2 text-navy-foreground/80">
                But we promise we won't argue inside your garbage can.
              </p>
            </div>

            <div className="mt-14 text-center">
              <h3 className="text-2xl font-bold text-foreground">Thanks for Supporting Luna Clean!</h3>
              <p className="mt-4 text-lg text-muted-foreground">
                Every time someone books us, we're learning something new and getting one step
                closer to building something that's completely ours.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                So thanks for supporting two young entrepreneurs—and for letting us take care of
                the stinky stuff.
              </p>
              <p className="mt-8 text-lg font-semibold text-foreground">Dylan & Elliot</p>
              <p className="text-muted-foreground">The Luna Clean Crew</p>
              <p className="mt-6 text-xl font-bold text-lime">We clean it. You don't have to.</p>
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
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
                No judgment.
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-lime" />
                No extra hassle.
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-lime" />
                No bin turned away.
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
                    "We arrive with powerful equipment and eco-friendly cleaning solutions.",
                },
                {
                  step: "03",
                  title: "Enjoy clean bins",
                  description:
                    "We scrub, rinse, sanitize, and deodorize. Add a Febreze add-on to enjoy longer lasting scent!",
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

        {/* Pricing */}
        <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Simple, flat pricing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                No contracts, no hidden fees. Pay per cleaning based on how many bins you have.
              </p>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {[
                { bins: "1 Bin", count: "1", price: "15", blurb: "Perfect for a single garbage, recycling, or compost bin." },
                { bins: "2 Bins", count: "2", price: "20", blurb: "Our most popular option — pick any two of your bins.", featured: true },
                { bins: "3+ Bins", count: "3+", price: "30", blurb: "All your bins cleaned in one visit. Best value." },
              ].map((tier) => (
                <div
                  key={tier.bins}
                  className={`relative flex flex-col rounded-2xl border bg-card p-8 shadow-sm ${
                    tier.featured ? "border-primary ring-2 ring-primary/30" : "border-border"
                  }`}
                >
                  {tier.featured && (
                    <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Most popular
                    </span>
                  )}
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Trash2 className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-card-foreground">{tier.bins}</h3>
                  <p className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-foreground">${tier.price}</span>
                    <span className="text-sm text-muted-foreground">/ cleaning</span>
                  </p>
                  <p className="mt-3 flex-1 text-muted-foreground">{tier.blurb}</p>
                  <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                    <a
                      href="#book"
                      onClick={() =>
                        setBinPreset((p) => ({ value: tier.count, n: (p?.n ?? 0) + 1 }))
                      }
                    >
                      Book {tier.bins}
                    </a>
                  </Button>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Ask about recurring monthly service and Febreze scent add-ons.
            </p>
          </div>
        </section>

        {/* Payment */}
        <section id="payment" className="bg-navy px-4 py-20 text-navy-foreground sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Easy, flexible payment
              </h2>
              <p className="mt-4 text-lg text-navy-foreground/80">
                We process card payments securely through Square, and we're happy to work with
                whatever's easiest for you.
              </p>
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: CreditCard,
                  title: "All major cards",
                  description:
                    "We accept Visa, Mastercard, American Express, Discover, and more — processed securely through Square.",
                },
                {
                  icon: Wallet,
                  title: "Venmo, PayPal & Zelle",
                  description:
                    "Prefer a quick digital transfer? We accept Venmo, PayPal, and Zelle too.",
                },
                {
                  icon: Banknote,
                  title: "Cash",
                  description:
                    "Old-fashioned cash works just fine — pay your technician directly at the time of service.",
                },
                {
                  icon: HandCoins,
                  title: "Tips welcome",
                  description:
                    "If our team went above and beyond, tips are always appreciated (and never expected).",
                },
              ].map((method) => (
                <div
                  key={method.title}
                  className="rounded-2xl bg-navy-foreground/10 p-6 backdrop-blur"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime/10 text-lime">
                    <method.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{method.title}</h3>
                  <p className="mt-2 text-sm text-navy-foreground/80">{method.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-navy-foreground/70">
              Payment is due at the time of service unless other arrangements have been made.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Got a question? We've got answers. Reach out if you don't see what you're
                looking for.
              </p>
            </div>
            <Accordion type="single" collapsible className="mt-10 rounded-2xl border border-border bg-card px-6 shadow-sm sm:px-8">
              {[
                {
                  question: "Do I need to be home for my cleaning?",
                  answer:
                    "Yes! We'll need to discuss what will happen and confirm the cleaning process with you. If you're not available, we can schedule a time that works for you. Payment is after the cleaning, so make sure be present, and have your payment method ready.",
                },
                {
                  question: "Do you clean bins that still have trash in them?",
                  answer:
                    "For the best results, we ask that your bins be empty before your scheduled cleaning. We can still clean bins with minor debris, but we're not able to remove trash for you.",
                },
                {
                  question: "What if I need to reschedule or miss my cleaning day?",
                  answer:
                    "No problem — just reach out by phone, text, or email as soon as you can and we'll find a new time that works for you. There are no cancellation fees.",
                },
                {
                  question: "How often should I get my bins cleaned?",
                  answer:
                    "Most customers go with our monthly maintenance plan to keep bins consistently fresh, but one-time deep cleans are great for move-ins, spring cleaning, or a bin that's overdue for some love.",
                },
                {
                  question: "What products do you use?",
                  answer:
                    "We use the least amount of Simple Green necessary to get all grease off. Then, we use Dr. Bronner's Tea Tree Castile Soap to wash everything. Then, we'll use Method Lavender to deodorize. All of these are safe for the environment.",
                },
                {
                  question: "Do you offer contracts?",
                  answer:
                    "No contracts, ever. Book a one-time cleaning or recurring service and cancel or adjust anytime.",
                },
              ].map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-base font-semibold text-card-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
                  We're basically your neighbors. Luna Clean is based right here in Maple Leaf and focused on
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

        {/* Book a Cleaning */}
        <section id="book" className="bg-navy px-4 py-20 text-navy-foreground sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Book a cleaning
              </h2>
              <p className="mt-4 text-lg text-navy-foreground/80">
                Tell us about your bins and we'll confirm your appointment within 24 hours.
                No contracts, no hassle. Make sure your bins aren't filled with trash
                before the chosen cleaning appointment.
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-3xl">
              <BookingForm />
            </div>
          </div>
        </section>

        {/* Contact / CTA */}
        <section id="contact" className="bg-hero-gradient px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl bg-card p-6 shadow-xl ring-1 ring-border sm:p-10 lg:p-14">
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
                className="flex min-w-0 items-center gap-4 rounded-2xl border border-border bg-background p-5 transition-colors hover:bg-accent sm:p-6"
              >
                <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">Call or text</p>
                  <p className="text-lg font-semibold text-foreground">(714) 912-3682</p>
                </div>
              </a>
              <a
                href="mailto:lunacleanseattle@moderncentral.net"
                className="flex min-w-0 items-center gap-4 rounded-2xl border border-border bg-background p-5 transition-colors hover:bg-accent sm:p-6"
              >
                <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">Email us</p>
                  <p className="break-all text-base font-semibold text-foreground sm:text-lg">
                    lunacleanseattle@moderncentral.net
                  </p>
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
                src={logoUrl}
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
