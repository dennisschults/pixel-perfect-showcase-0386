import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Is bereik het nieuwe talent? — Conferentiepitch muziekindustrie" },
      {
        name: "description",
        content:
          "Een conferentie over de veranderende verhouding tussen muzikaal talent, bereik en relevantie in de muziekindustrie.",
      },
      { property: "og:title", content: "Is bereik het nieuwe talent?" },
      {
        property: "og:description",
        content:
          "Hoe belangrijk is muzikaal talent in deze tijd? Een conferentiepitch voor studenten en young professionals in de muziekindustrie.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Opening,
});

function Opening() {
  return (
    <main className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 py-10 md:px-12 md:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[140px]"
      />

      <header className="flex items-baseline justify-between gap-6">
        <p className="label-eyebrow text-primary">Conferentiepitch · Muziekindustrie</p>
        <p className="label-eyebrow hidden text-muted-foreground md:block">Slide 01</p>
      </header>

      <div className="relative mx-auto w-full max-w-6xl py-16">
        <h1 className="display-xl text-[clamp(2.9rem,11vw,9.5rem)]">
          Is bereik het
          <br />
          <span className="text-primary">nieuwe talent?</span>
        </h1>

        <div className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-12">
          <p className="text-lg leading-relaxed text-foreground/85 md:col-span-7 md:text-xl">
            Lies Zhara wordt DJ en staat vervolgens op Paaspop. Tegelijkertijd zijn er artiesten die
            jarenlang produceren, een eigen sound ontwikkelen en alles geven voor hun muziek, maar
            nauwelijks een podium krijgen.
          </p>
          <div className="md:col-span-5 md:pl-6">
            <p className="label-eyebrow text-muted-foreground">Centrale vraag</p>
            <p className="mt-3 text-base text-foreground/70">
              Hoe belangrijk is muzikaal talent in deze tijd?
            </p>
            <Link
              to="/concept"
              className="group mt-8 inline-flex items-center gap-3 bg-primary px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              Ontdek het concept
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>

      <footer className="flex items-end justify-between gap-6">
        <p className="label-eyebrow text-muted-foreground">Studenten &amp; young professionals 18–25</p>
        <div className="flex items-center gap-3">
          <span className="label-eyebrow text-muted-foreground">Scroll / enter</span>
          <span className="block h-10 w-px animate-pulse bg-primary" aria-hidden />
        </div>
      </footer>
    </main>
  );
}
