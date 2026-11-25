import React from 'react';
import {Link} from 'react-router-dom';
import {education, experience} from '../content/journey';
import {projects} from '../content/projects';
import {ui} from '../content/ui';
import {useLang, useTitle} from '../i18n';
import {PageHead, yearRange} from '../components/parts';

function Timeline({items, side, title}) {
    const {t} = useLang();
    return (
        <section className={`timeline timeline--${side}`}>
            <h2>{title}</h2>
            <ol>
                {items.map((x) => (
                    <li key={x.key} className={x.current ? 'is-current' : ''}>
                        {x.when && <p className="mono">{x.when}{x.current && <span className="badge">{t(ui.journey.current)}</span>}</p>}
                        <h3>{x.title}</h3>
                        <p className="timeline__org">{x.org}</p>
                        {x.text && <p>{x.text}</p>}
                        {x.related && (
                            <p className="timeline__rel"><span>{t(ui.journey.related)} </span>
                                {x.related.map((slug, i) => (
                                    <React.Fragment key={slug}>
                                        {i > 0 && ', '}
                                        <Link to={`/projects/${slug}`}>{t(projects.find((p) => p.slug === slug).short)}</Link>
                                    </React.Fragment>
                                ))}
                            </p>
                        )}
                    </li>
                ))}
            </ol>
        </section>
    );
}

export default function Journey() {
    const {t} = useLang();
    useTitle(t(ui.journey.title));
    const today = t(ui.journey.today);
    return (
        <div className="wrap page">
            <PageHead title={t(ui.journey.title)} intro={t(ui.journey.intro)}/>
            <div className="timelines" data-tour="journey">
                <Timeline side="data" title={t(ui.home.education)} items={education.map((e) => ({
                    key: e.degree.en, title: t(e.degree), org: `${t(e.school)}, ${t(e.place)}`, when: yearRange(e, today), current: e.current, related: e.related,
                }))}/>
                <Timeline side="software" title={t(ui.home.experience)} items={experience.map((e) => ({
                    key: e.role.en, title: t(e.role), org: `${t(e.org)}, ${t(e.place)}`, when: yearRange(e, today), current: false, text: t(e.text), related: e.related,
                }))}/>
            </div>
        </div>
    );
}
