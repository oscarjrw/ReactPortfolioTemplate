import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import portrait from '../img/portrait.jpg';
import {profile} from '../content/profile';
import {projects} from '../content/projects';
import {education, experience, skills} from '../content/journey';
import {ui} from '../content/ui';
import {useLang, useTitle} from '../i18n';
import Pipeline from '../components/Pipeline';
import Icon from '../components/Icon';
import {ProjectCard, Tabs, Tool, yearRange} from '../components/parts';

function Nutshell() {
    const {t} = useLang();
    const [tab, setTab] = useState('skills');
    const today = t(ui.journey.today);
    const tabs = [
        {id: 'skills', label: t(ui.nav.skills), icon: <Icon name="code"/>, to: '/skills'},
        {id: 'experience', label: t(ui.home.experience), icon: <Icon name="box"/>, to: '/journey'},
        {id: 'education', label: t(ui.home.education), icon: <Icon name="spark"/>, to: '/journey'},
    ];
    const tiles = {
        skills: skills.map((s) => ({
            key: s.area.en, icon: s.icon, side: s.side, title: t(s.area),
            text: s.tools.map((x, i) => <React.Fragment key={x}>{i > 0 && ', '}<Tool name={x}/></React.Fragment>),
        })),
        experience: experience.map((e) => ({key: e.role.en, icon: 'box', side: 'software', title: t(e.role), text: t(e.org), foot: yearRange(e, today)})),
        education: education.map((e) => ({key: e.degree.en, icon: 'spark', side: 'data', title: t(e.degree), text: t(e.school), foot: yearRange(e, today)})),
    }[tab];
    return (
        <section className="wrap section">
            <h2>{t(ui.home.nutshell)}</h2>
            <Tabs label={t(ui.home.nutshell)} tabs={tabs} value={tab} onChange={setTab}/>
            <div className="tiles" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
                {tiles.map((x) => (
                    <div key={x.key} className={`tile tile--${x.side}`}>
                        <h3><Icon name={x.icon}/>{x.title}</h3>
                        <p>{x.text}</p>
                        {x.foot && <p className="mono">{x.foot}</p>}
                    </div>
                ))}
            </div>
            <Link className="textlink" to={tabs.find((x) => x.id === tab).to}>{t(ui.home.more)} <Icon name="arrow" size={16}/></Link>
        </section>
    );
}

export default function Home() {
    const {lang, t} = useLang();
    useTitle('');
    return (
        <>
            <section className="hero">
                <div className="wrap hero__in">
                    <div className="hero__text" data-tour="hero">
                        <h1>Oscar Junior <span>Wagoussi</span></h1>
                        <p className="hero__role">{t(profile.role)}</p>
                        <p className="hero__pitch">{t(profile.pitch)}</p>
                        <div className="hero__cta">
                            <a className="btn" href={profile.cv[lang]} download><Icon name="download"/>{t(ui.home.cv)}</a>
                            <Link className="btn btn--ghost" to="/projects?type=data">{t(ui.home.dataProjects)}</Link>
                            <Link className="btn btn--ghost" to="/contact">{t(ui.home.contact)}</Link>
                        </div>
                        <p className="avail"><i aria-hidden="true"/>{t(profile.availability)}</p>
                    </div>
                    <div className="hero__photo"><img src={portrait} width="800" height="800" alt={t(ui.home.portraitAlt)}/></div>
                </div>
            </section>

            <section className="wrap section">
                <h2>{t(ui.home.pipelineTitle)}</h2>
                <p className="lede">{t(ui.home.pipelineIntro)}</p>
                <Pipeline/>
            </section>

            <section className="wrap section">
                <div className="section__head">
                    <h2>{t(ui.home.featured)}</h2>
                    <Link className="textlink" to="/projects">{t(ui.home.allProjects)} <Icon name="arrow" size={16}/></Link>
                </div>
                <div className="grid">
                    {projects.filter((p) => p.featured).map((p) => <ProjectCard key={p.slug} project={p} level={3}/>)}
                </div>
            </section>

            <Nutshell/>

            <section className="wrap section closing">
                <h2>{t(ui.contact.title)}</h2>
                <p className="lede">{t(profile.availability)}.</p>
                <div className="hero__cta">
                    <a className="btn" href={`mailto:${profile.email}`}><Icon name="mail"/>{profile.email}</a>
                    <a className="btn btn--ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin"/>LinkedIn</a>
                </div>
            </section>
        </>
    );
}
