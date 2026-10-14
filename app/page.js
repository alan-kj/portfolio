import { profile, projects, skills } from "./data";

const L = ({ i, children }) => <span className="ln" style={{ "--i": i }}>{children}</span>;

export default function Home() {
  return (
    <>
      <div className="bg" aria-hidden="true"><div className="grid" /><i className="glow g1" /><i className="glow g2" /><i className="beam" /></div>

      <header className="bar">
        <div className="wrap bar-in">
          <a href="#top" className="logo">{profile.name}</a>
          <nav aria-label="Main">
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top" className="wrap">
        <section className="hero">
          <div>
            <h1>{profile.name}</h1>
            <p className="role">{profile.role}</p>
            <p className="lead">{profile.headline}</p>
            <p className="sub">{profile.intro}</p>
            <div className="actions">
              <a className="btn primary" href="#projects">View projects</a>
              <a className="btn" href={profile.github}>GitHub profile</a>
            </div>
          </div>

          <figure className="code" aria-label="Summary of Alan's skills as code">
            <figcaption><i /><i /><i /><span>alan.ts</span></figcaption>
            <pre><code>
              <L i={0}><b className="k">const</b> alan = {"{"}</L>
              <L i={1}>  role: <b className="s">"Software engineer"</b>,</L>
              <L i={2}>  focus: [<b className="s">"APIs"</b>, <b className="s">"databases"</b>, <b className="s">"web apps"</b>],</L>
              <L i={3}>  stack: [<b className="s">"TypeScript"</b>, <b className="s">"Node.js"</b>,</L>
              <L i={4}>    <b className="s">"Go"</b>, <b className="s">"PostgreSQL"</b>],</L>
              <L i={5}>  values: [<b className="s">"simple"</b>, <b className="s">"tested"</b>],</L>
              <L i={6}>  github: <b className="s">"{profile.githubLabel}"</b>,</L>
              <L i={7}>{"};"}</L>
            </code></pre>
          </figure>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <ul className="list">
            {projects.map((p) => (
              <li key={p.title} className="proj">
                <span className="yr">{p.year}</span>
                <div>
                  <h3><a href={p.href}>{p.title}</a></h3>
                  <p>{p.text}</p>
                </div>
                <span className="stack">{p.stack}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className="two">
          <div>
            <h2>About</h2>
            {profile.about.map((t) => <p key={t} className="about">{t}</p>)}
          </div>
          <div>
            <h2>Skills</h2>
            <dl className="skills">
              {skills.map((s) => (
                <div key={s.group}><dt>{s.group}</dt><dd>{s.items}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <p className="about">Want to talk about a project or a role? The best place to find me is GitHub.</p>
          <p className="mail"><a href={profile.github}>{profile.githubLabel}</a></p>
          {profile.email && <p className="about"><a href={`mailto:${profile.email}`}>{profile.email}</a></p>}
        </section>
      </main>

      <footer className="wrap">© 2026 {profile.name}</footer>
    </>
  );
}
