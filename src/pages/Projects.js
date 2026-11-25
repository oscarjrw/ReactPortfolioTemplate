import React from 'react';
import {useSearchParams} from 'react-router-dom';
import {allTools, projects, tools} from '../content/projects';
import {toolNames} from '../content/journey';
import {ui} from '../content/ui';
import {useLang, useTitle} from '../i18n';
import {PageHead, ProjectCard} from '../components/parts';
import Icon from '../components/Icon';

const PER_PAGE = 6;

export default function Projects() {
    const {t} = useLang();
    const [params, setParams] = useSearchParams();
    useTitle(t(ui.projects.title));

    const type = ['data', 'software'].includes(params.get('type')) ? params.get('type') : 'all';
    const tech = allTools.includes(params.get('tech')) ? params.get('tech') : '';
    const found = projects.filter((p) => (type === 'all' || p.type === type) && (!tech || tools(p).includes(tech)));
    const pages = Math.max(1, Math.ceil(found.length / PER_PAGE));
    const page = Math.min(Math.max(1, parseInt(params.get('page'), 10) || 1), pages);
    const shown = found.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const update = (changes) => {
        const next = {type: type === 'all' ? '' : type, tech, ...changes};
        setParams(Object.fromEntries(Object.entries(next).filter(([, v]) => v)));
    };
    const goTo = (n) => {
        update({page: n > 1 ? String(n) : ''});
        window.scrollTo({top: 0});
    };
    const count = (k) => projects.filter((p) => k === 'all' || p.type === k).length;

    return (
        <div className="wrap page">
            <PageHead title={t(ui.projects.title)} intro={t(ui.projects.intro)}/>
            <div className="filters">
                <div className="seg" role="group" aria-label={t(ui.projects.kind)}>
                    {['all', 'data', 'software'].map((k) => (
                        <button key={k} type="button" aria-pressed={type === k} onClick={() => update({type: k === 'all' ? '' : k})}>
                            {t(ui.projects[k])} <small>{count(k)}</small>
                        </button>
                    ))}
                </div>
                <label className="select">{t(ui.projects.tech)}
                    <select value={tech} onChange={(e) => update({tech: e.target.value})}>
                        <option value="">{t(ui.projects.anyTech)}</option>
                        {allTools.map((x) => <option key={x} value={x}>{t(toolNames[x] || x)}</option>)}
                    </select>
                </label>
            </div>
            {found.length ? (
                <div className="grid" data-tour="projects">{shown.map((p) => <ProjectCard key={p.slug} project={p}/>)}</div>
            ) : (
                <div className="empty" data-tour="projects">
                    <p>{t(ui.projects.none)}</p>
                    <button type="button" className="btn btn--ghost" onClick={() => setParams({})}>{t(ui.projects.clear)}</button>
                </div>
            )}
            {pages > 1 && (
                <nav className="pager" aria-label={t(ui.projects.pages)}>
                    <button type="button" disabled={page === 1} onClick={() => goTo(page - 1)} aria-label={t(ui.projects.prev)}><Icon name="back"/></button>
                    {Array.from({length: pages}, (_, i) => i + 1).map((n) => (
                        <button key={n} type="button" aria-label={`${t(ui.projects.page)} ${n}`} aria-current={n === page ? 'page' : undefined} onClick={() => goTo(n)}>{n}</button>
                    ))}
                    <button type="button" disabled={page === pages} onClick={() => goTo(page + 1)} aria-label={t(ui.projects.next)}><Icon name="arrow"/></button>
                </nav>
            )}
        </div>
    );
}
