import React, {useEffect, useState} from 'react';
import {Link, NavLink, Outlet, useLocation} from 'react-router-dom';
import {profile} from '../content/profile';
import {ui} from '../content/ui';
import {storage, useLang} from '../i18n';
import {useTour} from '../tour/Tour';
import Icon from './Icon';

const LINKS = ['about', 'journey', 'skills', 'projects', 'console', 'contact'];

function useTheme() {
    const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = theme === 'dark' ? '#282a36' : '#f3f7fa';
    }, [theme]);
    const toggle = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        storage.set('theme', next);
        setTheme(next);
    };
    return [theme, toggle];
}

export default function Layout() {
    const {lang, setLang, t} = useLang();
    const [theme, toggleTheme] = useTheme();
    const [open, setOpen] = useState(false);
    const {pathname} = useLocation();
    const tour = useTour();

    useEffect(() => {
        setOpen(false);
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <>
            <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main').focus(); }}>{t(ui.nav.skip)}</a>
            <header className="top">
                <div className="wrap top__in">
                    <Link to="/" className="brand" aria-label={profile.name}>oscar<b>.</b>wagoussi</Link>
                    <nav id="nav" className={`nav ${open ? 'is-open' : ''}`} aria-label={t(ui.nav.primary)}>
                        {LINKS.map((l) => <NavLink key={l} to={`/${l}`}>{t(ui.nav[l])}</NavLink>)}
                    </nav>
                    <div className="top__tools">
                        <button type="button" className="iconbtn iconbtn--tour" onClick={tour.openWelcome} aria-label={t(ui.nav.tour)} title={t(ui.nav.tour)}>
                            <Icon name="compass"/>
                        </button>
                        <div className="lang" role="group" aria-label={t(ui.nav.language)}>
                            {['fr', 'en'].map((l) => (
                                <button key={l} type="button" lang={l} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
                            ))}
                        </div>
                        <button type="button" className="iconbtn" onClick={toggleTheme}
                                aria-label={t(theme === 'dark' ? ui.nav.toLight : ui.nav.toDark)} title={t(theme === 'dark' ? ui.nav.toLight : ui.nav.toDark)}>
                            <Icon name={theme === 'dark' ? 'sun' : 'moon'}/>
                        </button>
                        <button type="button" className="iconbtn top__menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="nav" aria-label={t(ui.nav.menu)}>
                            <Icon name={open ? 'close' : 'menu'}/>
                        </button>
                    </div>
                </div>
            </header>
            <main id="main" tabIndex="-1"><Outlet/></main>
            <footer className="foot">
                <div className="wrap foot__in">
                    <p>© {new Date().getFullYear()} {profile.name}</p>
                    <p>
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href={profile.gitlab} target="_blank" rel="noopener noreferrer">GitLab</a>
                        <button type="button" onClick={tour.openWelcome}>{t(ui.nav.tour)}</button>
                    </p>
                    <p className="foot__credit">{t(ui.footer.credit)} <a href="https://paytonpierce.dev" target="_blank" rel="noopener noreferrer">Payton Pierce</a></p>
                </div>
            </footer>
        </>
    );
}
