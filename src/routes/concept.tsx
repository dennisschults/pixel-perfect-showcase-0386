import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import placeholder1 from "@/assets/placeholder-1.png";
import placeholder2 from "@/assets/placeholder-2.png";
import placeholder3 from "@/assets/placeholder-3.png";
import placeholderModerator from "@/assets/placeholder-moderator.png";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const placeholders = [placeholder1, placeholder2, placeholder3];

export const Route = createFileRoute("/concept")({
  head: () => ({
    meta: [
      { title: "Het concept — Is bereik het nieuwe talent?" },
      {
        name: "description",
        content:
          "Anekdote, aanleiding, relevantie, doel, format, sprekers en moderator van de conferentie over talent versus bereik in de muziekindustrie.",
      },
      { property: "og:title", content: "Het concept — Is bereik het nieuwe talent?" },
      {
        property: "og:description",
        content:
          "90 minuten, 3 perspectieven, 1 centrale vraag: hoe belangrijk is muzikaal talent in deze tijd?",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Concept,
});

const sections = [
  { id: "anekdote", label: "Anekdote" },
  { id: "aanleiding", label: "Aanleiding" },
  { id: "relevantie", label: "Relevantie" },
  { id: "doel", label: "Doel" },
  { id: "format", label: "Format" },
  { id: "sprekers", label: "Sprekers" },
  { id: "moderator", label: "Moderator" },
];

function useScrollState() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(sections[0]!.id);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);

      let current = sections[0]!.id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = section.id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { progress, active };
}

function SectionShell({
  id,
  index,
  title,
  children,
  className,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 border-t border-border px-6 py-24 md:px-12 md:py-32", className)}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="label-eyebrow mb-12 text-primary">
          {index} — {title}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function Concept() {
  const { progress, active } = useScrollState();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-12">
          <Link
            to="/"
            className="max-w-[9rem] text-[0.7rem] font-semibold uppercase leading-tight tracking-[0.16em] transition-colors hover:text-primary md:max-w-none"
          >
            Is bereik het nieuwe talent?
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={cn(
                  "text-xs font-medium uppercase tracking-[0.14em] transition-colors",
                  active === section.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {section.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="label-eyebrow text-primary lg:hidden"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "Sluit" : "Menu"}
          </button>
        </div>

        {menuOpen ? (
          <nav className="grid gap-1 border-t border-border px-6 py-4 lg:hidden">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "py-2 text-sm uppercase tracking-[0.14em]",
                  active === section.id ? "text-primary" : "text-muted-foreground",
                )}
              >
                {section.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div
          className="h-px origin-left bg-primary transition-transform duration-150"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden
        />
      </header>

      <main>
        {/* 01 — ANEKDOTE */}
        <SectionShell id="anekdote" index="01" title="Anekdote" className="border-t-0">
          <Reveal as="p" className="display-xl max-w-4xl text-[clamp(2rem,6vw,4.75rem)]">
            Lies Zhara wordt DJ en staat vervolgens op Paaspop.
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground/80"
          >
            Tegelijkertijd zijn er artiesten die jarenlang produceren, een eigen sound ontwikkelen en
            alles geven voor hun muziek, maar nauwelijks een podium krijgen.
          </Reveal>

          <Reveal delay={180} className="mt-16 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
            <p className="display-xl text-[clamp(1.4rem,3.2vw,2.6rem)] text-foreground/60">
              Jarenlang produceren
            </p>
            <p className="label-eyebrow text-muted-foreground">vs.</p>
            <p className="display-xl text-[clamp(1.4rem,3.2vw,2.6rem)] text-primary md:text-right">
              Groot bereik
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="display-xl mt-20 text-[clamp(2.2rem,8vw,7rem)] text-primary">
              Is bereik het nieuwe talent?
            </p>
          </Reveal>
        </SectionShell>

        {/* 02 — AANLEIDING */}
        <SectionShell id="aanleiding" index="02" title="Aanleiding">
          <div className="grid gap-14 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal as="p" className="text-2xl leading-snug md:text-3xl">
                We zien steeds vaker influencers de muziekwereld instappen en geboekt worden als DJ.
                Hun grote <Mark>bereik</Mark> maakt hen interessant voor festivals en organisatoren.
              </Reveal>
              <Reveal as="p" delay={120} className="mt-8 text-lg text-foreground/80">
                Maar wat betekent dit voor de artiest die jarenlang investeert in zijn of haar{" "}
                <Mark>muzikaal vakmanschap</Mark>? En wat bepaalt uiteindelijk wie er{" "}
                <Mark>geboekt</Mark> wordt?
              </Reveal>
            </div>

            <div className="space-y-8 md:col-span-5">
              <Flow
                label="Route A"
                accent
                steps={["Influencer", "Bereik", "DJ", "Festival"]}
                delay={160}
              />
              <Flow
                label="Route B"
                steps={["Artiest", "Muziek", "Ontwikkeling", "Podium"]}
                delay={240}
              />
            </div>
          </div>
        </SectionShell>

        {/* 03 — RELEVANTIE */}
        <SectionShell id="relevantie" index="03" title="Relevantie">
          <div className="grid gap-12 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-5">
              <p className="display-xl text-[clamp(4.5rem,16vw,12rem)] text-primary">18–25</p>
              <p className="label-eyebrow mt-2 text-muted-foreground">Jaar · doelgroep</p>
            </Reveal>
            <div className="space-y-6 md:col-span-7">
              <Reveal as="p" className="text-xl leading-relaxed text-foreground/85">
                Voor studenten en young professionals die actief zijn of willen worden binnen de
                muziekindustrie, raakt deze ontwikkeling direct aan hun toekomst.
              </Reveal>
              <Reveal as="p" delay={120} className="text-lg leading-relaxed text-foreground/70">
                De manier waarop artiesten worden ontdekt, geboekt en gewaardeerd verandert. Dit
                maakt het relevant om te onderzoeken welke rol muzikaal talent, bereik en relevantie
                spelen in de industrie van nu.
              </Reveal>
            </div>
          </div>

          <div className="mt-20 grid border-t border-border md:grid-cols-3">
            {["Talent", "Bereik", "Relevantie"].map((word, i) => (
              <Reveal
                key={word}
                delay={i * 110}
                className={cn(
                  "border-b border-border px-1 py-10 md:border-b-0",
                  i > 0 && "md:border-l md:pl-8",
                )}
              >
                <p className="label-eyebrow text-muted-foreground">0{i + 1}</p>
                <p
                  className={cn(
                    "display-xl mt-4 text-[clamp(1.8rem,4.5vw,3.4rem)]",
                    i === 1 && "text-primary",
                  )}
                >
                  {word}
                </p>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        {/* 04 — DOEL */}
        <SectionShell id="doel" index="04" title="Doel">
          <Reveal as="p" className="max-w-3xl text-2xl leading-snug md:text-3xl">
            We willen studenten en young professionals vanuit drie perspectieven naar deze
            ontwikkelingen laten kijken.
          </Reveal>

          <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
            {[
              {
                index: "01",
                title: "De authentieke DJ",
                quote: "Ik heb jarenlang gewerkt aan mijn muziek.",
                body: "De artiest die investeert in produceren, vakmanschap en het ontwikkelen van een eigen sound.",
              },
              {
                index: "02",
                title: "De boeker / programmeur",
                quote: "Ik moet een artiest boeken die mijn publiek trekt.",
                body: "De professional die artistieke kwaliteit afweegt tegen publiekswaarde, relevantie en de realiteit van programmeren.",
              },
              {
                index: "03",
                title: "De influencer-DJ",
                quote: "Mijn bereik is óók iets wat ik heb opgebouwd.",
                body: "De creator die vanuit een bestaand publiek de muziekwereld binnenstapt.",
              },
            ].map((card, i) => (
              <Reveal
                key={card.index}
                delay={i * 120}
                className="group flex flex-col justify-between gap-10 bg-background p-8 transition-colors duration-500 hover:bg-secondary md:p-10"
              >
                <div>
                  <p className="label-eyebrow text-primary">{card.index}</p>
                  <h3 className="display-xl mt-5 text-[clamp(1.5rem,2.6vw,2.2rem)]">
                    {card.title}
                  </h3>
                </div>
                <div>
                  <p className="text-xl italic leading-snug text-primary">“{card.quote}”</p>
                  <p className="mt-6 text-base leading-relaxed text-foreground/70">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <p className="display-xl mt-20 text-[clamp(1.9rem,6.5vw,5.5rem)]">
              Hoe belangrijk is muzikaal talent in deze tijd?
            </p>
          </Reveal>
        </SectionShell>

        {/* 05 — FORMAT */}
        <SectionShell id="format" index="05" title="Format">
          <ol className="border-t border-border">
            {[
              {
                time: "15 min",
                title: "Korte interviews",
                body: "Iedere spreker krijgt de ruimte om zijn/haar perspectief en achtergrond neer te zetten.",
              },
              {
                time: "45 min",
                title: "Stellingen & schuurpunten",
                body: "We leggen stellingen voor die de verschillende perspectieven tegenover elkaar zetten en gaan hierover met elkaar in gesprek.",
              },
              {
                time: "15 min",
                title: "Q&A",
                body: "Het publiek krijgt de mogelijkheid om vragen te stellen en onderdeel te worden van het gesprek.",
              },
              {
                time: "15 min",
                title: "Live portfolio review",
                body: "Een interactief onderdeel waarbij deelnemers uit het publiek hun werk kunnen voorleggen en feedback krijgen vanuit de verschillende perspectieven.",
              },
            ].map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 100}
                className="grid gap-4 border-b border-border py-8 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <p className="display-xl text-[clamp(1.6rem,3.4vw,2.6rem)] text-primary md:col-span-3">
                  {item.time}
                </p>
                <h3 className="text-lg font-semibold uppercase tracking-[0.1em] md:col-span-4">
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-foreground/70 md:col-span-5">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={140}>
            <p className="display-xl mt-16 text-[clamp(1.5rem,5vw,4rem)]">
              90 minuten — <span className="text-primary">3 perspectieven</span> — 1 centrale vraag
            </p>
          </Reveal>
        </SectionShell>

        {/* 06 — SPREKERS */}
        <SectionShell id="sprekers" index="06" title="Sprekers">
          <Reveal as="p" className="max-w-2xl text-lg text-foreground/70">
            Onderstaande namen zijn beoogde sprekers. Er is nog niets bevestigd.
          </Reveal>

          <div className="mt-14 space-y-16">
            {[
              {
                category: "Influencer-DJ",
                note: "Creators die vanuit een bestaand publiek de muziekwereld binnenstappen.",
                people: [
                  { name: "Lies Zhara", role: "DJ & creator" },
                  { name: "Sam Hoffman", role: "DJ & creator" },
                  { name: "JOY LIANA", role: "DJ & creator" },
                ],
              },
              {
                category: "Boeker / programmeur",
                note: "Hendrik-Jan Derksen is interessant omdat hij zowel DJ als boeker is en daarmee beide kanten van het gesprek begrijpt. Sam Heegstra is interessant vanwege zijn programmeerwerk en focus op Nederlands talent.",
                people: [
                  { name: "Hendrik-Jan Derksen", role: "DJ & boeker" },
                  { name: "Sam Heegstra", role: "Doornroosje" },
                ],
              },
              {
                category: "Authentieke DJ",
                note: "Artiesten die jarenlang investeren in vakmanschap en een eigen sound.",
                people: [
                  { name: "Tell Moore", role: "Producer & DJ" },
                  { name: "Funkmoore Brothers", role: "Live & DJ" },
                  { name: "Artiest uit de Bredase / Eindhovense scene", role: "Nog te bepalen" },
                ],
              },
            ].map((group, gi) => (
              <div key={group.category}>
                <Reveal className="grid gap-4 border-b border-border pb-6 md:grid-cols-12 md:items-baseline">
                  <h3 className="display-xl text-[clamp(1.4rem,3.4vw,2.6rem)] md:col-span-5">
                    {group.category}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/60 md:col-span-7">
                    {group.note}
                  </p>
                </Reveal>
                <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
                  {group.people.map((person, pi) => (
                    <Reveal
                      key={person.name}
                      delay={pi * 90 + gi * 40}
                      className="group bg-background transition-colors duration-500 hover:bg-secondary"
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-secondary">
                        <img
                          src={placeholders[(pi + gi) % placeholders.length]}
                          alt={`Template afbeelding voor ${person.name}`}
                          width={1024}
                          height={1280}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="p-6">
                        <p className="label-eyebrow text-primary">Potentiële spreker</p>
                        <p className="mt-3 text-lg font-semibold uppercase tracking-[0.06em]">
                          {person.name}
                        </p>
                        <p className="mt-1 text-sm text-foreground/60">{person.role}</p>
                        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Template — echte foto volgt
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionShell>

        {/* 07 — MODERATOR */}
        <SectionShell id="moderator" index="07" title="Moderator">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <p className="label-eyebrow text-primary">Beoogde moderator</p>
              <h3 className="display-xl mt-5 text-[clamp(2.4rem,8vw,6rem)]">Robert Schaeffer</h3>
              <p className="mt-4 text-xl text-foreground/70">Poppodium Effenaar</p>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground/80">
                Robert Schaeffer heeft 30 jaar ervaring als hoofdprogrammeur bij Effenaar en heeft
                daarnaast een achtergrond als DJ en muziekliefhebber.
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/60">
                De moderator bewaakt een constructief gesprek en verlegt de focus van “wie verdient
                het podium?” naar “hoe verandert de muziekindustrie en welke rol speelt het publiek
                daarin?”
              </p>
            </Reveal>

            <Reveal delay={140} className="md:col-span-5">
              <div className="aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={placeholderModerator}
                  alt="Template afbeelding voor Robert Schaeffer"
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Template — echte foto volgt
              </p>
              <ul className="mt-8 border-t border-border">
                {["30 jaar programmering", "DJ-achtergrond", "Talentontwikkeling"].map((item) => (
                  <li
                    key={item}
                    className="border-b border-border py-6 text-base font-semibold uppercase tracking-[0.14em] text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </SectionShell>

        {/* SLOT */}
        <section className="border-t border-border px-6 py-32 md:px-12 md:py-48">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="display-xl text-[clamp(2.4rem,10vw,8rem)]">
                Muzikaal talent.
                <br />
                Bereik.
                <br />
                <span className="text-primary">Relevantie.</span>
              </p>
            </Reveal>
            <Reveal delay={140} className="mt-16 flex flex-wrap items-end justify-between gap-8">
              <p className="max-w-md text-lg text-foreground/70">
                Hoe belangrijk is muzikaal talent in deze tijd?
              </p>
              <Link
                to="/"
                className="group inline-flex items-center gap-3 border border-primary px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                Terug naar het begin
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}

function Mark({ children }: { children: React.ReactNode }) {
  return <span className="bg-primary px-1.5 text-primary-foreground">{children}</span>;
}

function Flow({
  label,
  steps,
  accent,
  delay = 0,
}: {
  label: string;
  steps: string[];
  accent?: boolean;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="border-t border-border pt-5">
      <p className="label-eyebrow text-muted-foreground">{label}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        {steps.map((step, i) => (
          <span key={step} className="flex items-center gap-3">
            <span
              className={cn(
                "text-sm font-semibold uppercase tracking-[0.12em]",
                accent ? "text-primary" : "text-foreground/80",
              )}
            >
              {step}
            </span>
            {i < steps.length - 1 ? (
              <span className="text-muted-foreground" aria-hidden>
                →
              </span>
            ) : null}
          </span>
        ))}
      </div>
    </Reveal>
  );
}
