import type { Metadata, ResolvingMetadata } from "next";
import { ArrowDownRight } from "lucide-react";
import { ReliefMark } from "@/components/templates/relief-mark";
import { FieldNotesList } from "./_components/field-notes-list";
import { PROJECTS } from "./_data";
import styles from "./_components/field-manual.module.css";

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const inherited = await parent;
  return {
    title: "Technical Profile & Journal",
    description: "A monochrome personal-site template with an interactive relief mark, selected work, and a filterable journal.",
    openGraph: {
      ...inherited.openGraph,
      title: "Technical Profile & Journal",
      description: "Explore Field Manual: a narrow-frame portfolio with projects and complete journal pages.",
    },
    twitter: {
      ...inherited.twitter,
      title: "Technical Profile & Journal",
      description: "A monochrome portfolio and journal template from StyleKit.",
    },
  };
}

export default function TechnicalProfilePage() {
  return (
    <main className={styles.rail}>
      <section className={`${styles.hero} ${styles.ruleTop}`} aria-labelledby="profile-title">
        <div className={styles.heroCopy}>
          <p className={styles.figureLabel}>Profile / 2026</p>
          <h1 className={styles.heroTitle} id="profile-title">Alex Morgan</h1>
          <p className={styles.heroStatement}>
            Making complex tools feel clear enough to use with confidence.
          </p>
          <p className={styles.heroBody}>
            Independent product designer working across interface systems,
            interaction design, and the details that make software easier to trust.
          </p>
          <dl className={styles.profileFacts}>
            <div><dt>Based</dt><dd>Montréal, Canada</dd></div>
            <div><dt>Working on</dt><dd>Product interfaces and design systems</dd></div>
          </dl>
        </div>
        <div className={styles.heroMark}>
          <span className={styles.markCaption}>A small mark, made to move</span>
          <ReliefMark label="Field Manual mark" />
        </div>
        <aside className={styles.marginNote} aria-label="Design note">
          Keep the useful detail in view.
          <span className={styles.marginUnderline} aria-hidden="true" />
        </aside>
      </section>

      <div className={styles.hatch} aria-hidden="true" />

      <section className={`${styles.section} ${styles.sectionRule}`} aria-labelledby="practice-title">
        <div className={styles.sectionHeading}>
          <p className={styles.figureLabel}>Figure 01 / Practice</p>
          <h2 className={styles.sectionTitle} id="practice-title">
            Start with the decision someone needs to make.
          </h2>
          <p className={styles.sectionIntro}>
            The work moves between product intent and the interface people meet every day.
            Each part should make the next part easier to understand.
          </p>
        </div>
        <div className={styles.practiceGrid}>
          <article className={styles.practiceItem}>
            <span className={styles.practiceIndex}>01</span>
            <h3>Frame the work</h3>
            <p>Make the user, constraint, and useful outcome visible before choosing a screen.</p>
          </article>
          <article className={styles.practiceItem}>
            <span className={styles.practiceIndex}>02</span>
            <h3>Shape the system</h3>
            <p>Set clear rules for type, state, and components so the product stays coherent.</p>
          </article>
          <article className={styles.practiceItem}>
            <span className={styles.practiceIndex}>03</span>
            <h3>Check the edge</h3>
            <p>Review empty, waiting, error, and narrow-screen states before calling it done.</p>
          </article>
        </div>
      </section>

      <div className={styles.hatch} aria-hidden="true" />

      <section id="work" className={`${styles.section} ${styles.sectionRule}`} aria-labelledby="work-title">
        <div className={styles.sectionHeading}>
          <p className={styles.figureLabel}>Figure 02 / Selected work</p>
          <h2 className={styles.sectionTitle} id="work-title">Small systems, considered end to end.</h2>
          <p className={styles.sectionIntro}>
            A pair of sample projects showing the brief, the choices, and what changed.
            Open a record to read the working notes.
          </p>
        </div>
        <div className={styles.projectList}>
          {PROJECTS.map((project) => (
            <details className={styles.projectRecord} key={project.number}>
              <summary className={styles.projectSummary}>
                <span className={styles.projectNumber}>{project.number}</span>
                <span className={styles.projectNameGroup}>
                  <h3 className={styles.projectName}>{project.title}</h3>
                  <span className={styles.projectField}>{project.field}</span>
                </span>
                <span className={styles.projectYear}>{project.year}</span>
                <span className={styles.disclosureIcon} aria-hidden="true" />
              </summary>
              <div className={styles.projectDetails}>
                <p className={styles.projectSummaryText}>{project.summary}</p>
                <div className={styles.projectDetailGrid}>
                  <div><h4>Challenge</h4><p>{project.challenge}</p></div>
                  <div><h4>Approach</h4><p>{project.approach}</p></div>
                  <div><h4>What changed</h4><p>{project.result}</p></div>
                </div>
                <ul className={styles.toolList} aria-label={`${project.title} methods`}>
                  {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      <div className={styles.hatch} aria-hidden="true" />

      <section id="notes" className={`${styles.section} ${styles.sectionRule}`} aria-labelledby="notes-title">
        <div className={styles.notesHeading}>
          <div>
            <p className={styles.figureLabel}>Figure 03 / Field notes</p>
            <h2 className={styles.sectionTitle} id="notes-title">Notes from the work.</h2>
          </div>
        </div>
        <p className={styles.sectionIntro}>
          Short essays on product practice, interface systems, and details worth keeping.
        </p>
        <FieldNotesList />
      </section>

      <div className={styles.hatch} aria-hidden="true" />

      <section className={`${styles.contactSection} ${styles.sectionRule}`} aria-labelledby="contact-title">
        <div>
          <p className={styles.figureLabel}>Figure 04 / Next steps</p>
          <h2 className={styles.contactTitle} id="contact-title">Have a useful problem to solve?</h2>
          <p className={styles.contactCopy}>
            Share the context, the people involved, and what a better outcome would change.
          </p>
        </div>
        <a className={styles.contactLink} href="mailto:hello@example.com?subject=Project%20inquiry">
          Write to Alex <ArrowDownRight aria-hidden="true" size={16} />
        </a>
      </section>
    </main>
  );
}
