import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import Cover from './Cover';
import {useLang} from '../i18n';
import {toolNames} from '../content/journey';

export function Tool({name}) {
    const {t} = useLang();
    return <>{t(toolNames[name] || name)}</>;
}

export function Stack({items, max}) {
    if (!items.length) return null;
    const shown = max ? items.slice(0, max) : items;
    return (
        <ul className="stack">
            {shown.map((s) => <li key={s}><Tool name={s}/></li>)}
            {shown.length < items.length && <li>+{items.length - shown.length}</li>}
        </ul>
    );
}

export function ProjectCard({project, level = 2}) {
    const {t} = useLang();
    const H = `h${level}`;
    return (
        <article className={`card card--${project.type}`}>
            <Cover slug={project.slug} type={project.type}/>
            <div className="card__body">
                {(project.status || project.year) && (
                    <p className="card__meta">{[t(project.status), project.year].filter(Boolean).join(' · ')}</p>
                )}
                <H className="card__title"><Link to={`/projects/${project.slug}`}>{t(project.title)}</Link></H>
                <p className="card__pitch">{t(project.pitch)}</p>
                <Stack items={project.stack} max={5}/>
            </div>
        </article>
    );
}

export function Tabs({label, tabs, value, onChange}) {
    const refs = useRef({});
    const move = (e) => {
        const i = tabs.findIndex((x) => x.id === value);
        const step = {ArrowRight: 1, ArrowLeft: -1}[e.key];
        if (!step) return;
        e.preventDefault();
        const next = tabs[(i + step + tabs.length) % tabs.length].id;
        onChange(next);
        refs.current[next].focus();
    };
    return (
        <div className="tabs" role="tablist" aria-label={label} onKeyDown={move}>
            {tabs.map((tab) => (
                <button key={tab.id} type="button" role="tab" id={`tab-${tab.id}`} aria-controls={`panel-${tab.id}`}
                        aria-selected={value === tab.id} tabIndex={value === tab.id ? 0 : -1}
                        ref={(el) => { refs.current[tab.id] = el; }} onClick={() => onChange(tab.id)}>
                    {tab.icon}{tab.label}
                </button>
            ))}
        </div>
    );
}

export function PageHead({title, intro}) {
    return (
        <header className="pagehead">
            <h1>{title}</h1>
            {intro && <p>{intro}</p>}
        </header>
    );
}

export const yearRange = (item, today) => {
    if (!item.start) return '';
    return `${item.start} – ${item.end || today}`;
};
