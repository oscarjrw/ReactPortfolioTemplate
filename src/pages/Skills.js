import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {skills} from '../content/journey';
import {projectsUsing} from '../content/projects';
import {ui} from '../content/ui';
import {useLang, useTitle} from '../i18n';
import Icon from '../components/Icon';
import {PageHead, Tool} from '../components/parts';

export default function Skills() {
    const {t} = useLang();
    const [tool, setTool] = useState(null);
    useTitle(t(ui.skills.title));
    const found = tool ? projectsUsing(tool) : [];
    return (
        <div className="wrap page">
            <PageHead title={t(ui.skills.title)} intro={t(ui.skills.intro)}/>
            <div className="skills" data-tour="skills">
                <div className="skills__areas">
                    {skills.map((s) => (
                        <section key={s.area.en} className={`area area--${s.side}`}>
                            <h2><Icon name={s.icon}/>{t(s.area)}</h2>
                            <ul>
                                {s.tools.map((x) => {
                                    const n = projectsUsing(x).length;
                                    return (
                                        <li key={x}>
                                            {n > 0
                                                ? <button type="button" className="chip chip--on" aria-pressed={tool === x} onClick={() => setTool(tool === x ? null : x)}><Tool name={x}/> <b>{n}</b></button>
                                                : <span className="chip"><Tool name={x}/></span>}
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    ))}
                </div>
                <aside className={`evidence ${tool ? '' : 'evidence--empty'}`} aria-live="polite">
                    {tool ? (
                        <>
                            <h2><Tool name={tool}/> <small>{t(ui.skills.usedIn)}</small></h2>
                            <ul>
                                {found.map((p) => (
                                    <li key={p.slug} className={`evidence__item evidence__item--${p.type}`}>
                                        <Link to={`/projects/${p.slug}`}>{t(p.title)}</Link>
                                        <p>{t(p.pitch)}</p>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <>
                            <h2>{t(ui.skills.pick)}</h2>
                            <p>{t(ui.skills.pickText)}</p>
                        </>
                    )}
                </aside>
            </div>
        </div>
    );
}
