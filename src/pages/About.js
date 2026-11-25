import React from 'react';
import {Link} from 'react-router-dom';
import {profile} from '../content/profile';
import {ui} from '../content/ui';
import {useLang, useTitle} from '../i18n';
import {PageHead} from '../components/parts';
import Icon from '../components/Icon';

export default function About() {
    const {lang, t} = useLang();
    useTitle(t(ui.about.title));
    return (
        <div className="wrap page">
            <PageHead title={t(ui.about.title)}/>
            <p className="about__lead">{t(profile.aboutLead)}</p>
            <div className="chapters" data-tour="about">
                {profile.chapters.map((c) => (
                    <section key={c.side} className={`chapter chapter--${c.side}`}>
                        <h2>{t(c.title)}</h2>
                        <div>{c.text.map((p) => <p key={p.en}>{t(p)}</p>)}</div>
                    </section>
                ))}
            </div>
            <section className="section">
                <h2>{t(ui.about.strengths)}</h2>
                <div className="tiles tiles--four">
                    {profile.strengths.map((s) => (
                        <div key={s.title.en} className="tile tile--data"><h3>{t(s.title)}</h3><p>{t(s.text)}</p></div>
                    ))}
                </div>
            </section>
            <section className="section">
                <h2>{t(profile.closing.title)}</h2>
                <p className="lede">{t(profile.closing.text)}</p>
                <div className="hero__cta">
                    <a className="btn" href={profile.cv[lang]} download><Icon name="download"/>{t(ui.home.cv)}</a>
                    <Link className="btn btn--ghost" to="/contact">{t(ui.home.contact)}</Link>
                </div>
            </section>
            <section className="section">
                <h2>{t(ui.about.interests)}</h2>
                <ul className="hobbies">
                    {profile.hobbies.map((h) => <li key={h.label.en}><span aria-hidden="true">{h.emoji}</span>{t(h.label)}</li>)}
                </ul>
            </section>
        </div>
    );
}
