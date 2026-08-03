import SectionHeading from "@/components/ui/section-heading";
import { education, certifications, languages } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <SectionHeading index="05" title="Education" />

      <div className="grid gap-14 sm:grid-cols-3">
        <div>
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
            Degree
          </h3>
          <p className="font-display text-2xl text-ink sm:text-3xl">
            {education.degree}
          </p>
          <p className="mt-3 max-w-xs font-sans text-sm text-ink-soft">
            {education.school}
          </p>
          <p className="mt-3 font-mono text-xs text-ink-faint">
            {education.start} — {education.end}
          </p>
        </div>

        <div>
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
            Certifications
          </h3>
          <ul className="flex flex-col gap-4">
            {certifications.map((c) => (
              <li key={c.name}>
                <p className="font-sans text-base text-ink">{c.name}</p>
                <p className="mt-0.5 font-mono text-xs text-ink-faint">
                  {c.org}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
            Languages
          </h3>
          <ul className="flex flex-col gap-3">
            {languages.map((l) => (
              <li
                key={l.name}
                className="flex items-center justify-between border-b border-line pb-3 font-sans text-sm"
              >
                <span className="text-ink">{l.name}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                  {l.level}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
