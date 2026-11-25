import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {projects, tools} from '../content/projects';
import {ui} from '../content/ui';
import {useLang, useTitle} from '../i18n';
import Cover from '../components/Cover';
import Icon from '../components/Icon';
import {Tool} from '../components/parts';
import NotFound from './NotFound';

function ProjectView({project, index}) {
    const {t} = useLang();
    useTitle(t(project.short));
    const prev = projects[index - 1];
    const next = projects[index + 1];
    const links = project.links.filter((l) => l.url && !l.soon);
    const soon = project.links.filter((l) => l.soon);
    const team = project.slug === 'dvf-data-drift-observatory';
    return (
        <article className={`wrap page project project--${project.type}`}>
            <Link className="textlink" to="/projects"><Icon name="back" size={16}/> {t(ui.project.back)}</Link>
            <div data-tour="project">
                <header className="project__head">
                    <div>
                        <p className="card__meta">{[t(ui.projects[project.type]), t(project.status), project.year].filter(Boolean).join(' · ')}</p>
                        <h1>{t(project.title)}</h1>
                        <p className="lede">{t(project.pitch)}</p>
                        {links.length > 0 && (
                            <div className="hero__cta">
                                {links.map((l) => (
                                    <a key={l.kind} className="btn" href={l.url} target="_blank" rel="noopener noreferrer">
                                        <Icon name={l.kind === 'gitlab' ? 'gitlab' : 'external'}/>{t(ui.project.kinds[l.kind])}
                                    </a>
                                ))}
                            </div>
                        )}
                        {soon.map((l) => (
                            <p key={l.kind} className="soon"><span className="badge">{t(ui.project.soon)}</span> <span className="mono">{l.url.replace('https://', '')}</span></p>
                        ))}
                    </div>
                    <Cover slug={project.slug} type={project.type}/>
                </header>
                {project.done && (
                    <section className="project__done">
                        <h2>{t(team ? ui.project.doneTeam : ui.project.done)}</h2>
                        <ul>{project.done.map((d) => <li key={d.en}>{t(d)}</li>)}</ul>
                    </section>
                )}
                {tools(project).length > 0 && (
                    <section className="project__stack">
                        <h2>{t(ui.project.stack)}</h2>
                        <ul className="stack">
                            {tools(project).map((x) => <li key={x}><Link to={`/projects?tech=${encodeURIComponent(x)}`}><Tool name={x}/></Link></li>)}
                        </ul>
                    </section>
                )}
            </div>
            <nav className="around" aria-label={t(ui.project.around)}>
                {prev ? <Link to={`/projects/${prev.slug}`}><small>{t(ui.project.previous)}</small>{t(prev.short)}</Link> : <span/>}
                {next && <Link className="around__next" to={`/projects/${next.slug}`}><small>{t(ui.project.next)}</small>{t(next.short)}</Link>}
            </nav>
        </article>
    );
}

export default function Project() {
    const {slug} = useParams();
    const index = projects.findIndex((p) => p.slug === slug);
    return index < 0 ? <NotFound/> : <ProjectView project={projects[index]} index={index}/>;
}
