import React, {createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useLocation, useNavigate} from 'react-router-dom';
import portrait from '../img/portrait-sm.jpg';
import {profile} from '../content/profile';
import {tour as copy, ui} from '../content/ui';
import {storage, useLang} from '../i18n';
import Icon from '../components/Icon';

const TourContext = createContext(null);
export const useTour = () => useContext(TourContext);

const SEEN = 'tour-seen';

export function TourProvider({children}) {
    const [welcome, setWelcome] = useState(false);
    const [run, setRun] = useState(null); // {track, index}
    const {pathname} = useLocation();
    const firstPath = useRef(pathname);

    // Offer the tour once, and only to people who arrive on the home page.
    useEffect(() => {
        if (firstPath.current !== '/' || storage.get(SEEN)) return undefined;
        const id = setTimeout(() => setWelcome(true), 700);
        return () => clearTimeout(id);
    }, []);

    const openWelcome = useCallback(() => { setRun(null); setWelcome(true); }, []);
    const close = useCallback(() => {
        storage.set(SEEN, '1');
        setWelcome(false);
        setRun(null);
    }, []);
    const start = useCallback((id) => {
        storage.set(SEEN, '1');
        setWelcome(false);
        setRun({track: copy.tracks.find((tr) => tr.id === id), index: 0});
    }, []);
    const value = useMemo(() => ({openWelcome, start}), [openWelcome, start]);

    return (
        <TourContext.Provider value={value}>
            {children}
            {welcome && <Welcome onStart={start} onClose={close}/>}
            {run && <Guide run={run} onMove={(index) => setRun({...run, index})} onClose={close}/>}
        </TourContext.Provider>
    );
}

// Keeps Tab inside the dialog, and gives focus back when it closes.
function useDialogFocus(ref) {
    useEffect(() => {
        const before = document.activeElement;
        const onKey = (e) => {
            if (e.key !== 'Tab' || !ref.current) return;
            const items = [...ref.current.querySelectorAll('a[href], button:not(:disabled)')];
            const first = items[0];
            const last = items[items.length - 1];
            const inside = ref.current.contains(document.activeElement);
            if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current || !inside)) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && (document.activeElement === last || !inside)) { e.preventDefault(); first.focus(); }
        };
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('keydown', onKey);
            if (before && document.contains(before) && before.focus) before.focus({preventScroll: true});
        };
    }, [ref]);
}

function Welcome({onStart, onClose}) {
    const {t} = useLang();
    const ref = useRef(null);
    useDialogFocus(ref);
    useEffect(() => {
        ref.current.focus({preventScroll: true});
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    return createPortal(
        <div className="welcome" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <div className="welcome__card" role="dialog" aria-modal="true" aria-labelledby="welcome-title" aria-describedby="welcome-text" tabIndex="-1" ref={ref}>
                <img src={portrait} alt="" width="72" height="72"/>
                <h2 id="welcome-title">{t(copy.welcome.title)}</h2>
                <p id="welcome-text">{t(copy.welcome.text)}</p>
                <div className="welcome__tracks">
                    {copy.tracks.map((tr) => (
                        <button key={tr.id} type="button" onClick={() => onStart(tr.id)}>
                            <Icon name={tr.icon}/>
                            <span>{t(tr.name)}</span>
                            <small>{tr.steps.length} {t(copy.welcome.steps)}</small>
                        </button>
                    ))}
                </div>
                <button type="button" className="welcome__skip" onClick={onClose}>{t(copy.welcome.skip)}</button>
            </div>
        </div>,
        document.body,
    );
}

const PAD = 10;

function Guide({run, onMove, onClose}) {
    const {lang, t} = useLang();
    const navigate = useNavigate();
    const {track, index} = run;
    const step = copy.steps[track.steps[index]];
    const [rect, setRect] = useState(null);
    const [cardSize, setCardSize] = useState({w: 360, h: 220});
    const ref = useRef(null);
    useDialogFocus(ref);

    const last = index === track.steps.length - 1;
    const prev = useCallback(() => index > 0 && onMove(index - 1), [index, onMove]);
    const next = useCallback(() => (last ? onClose() : onMove(index + 1)), [index, last, onMove, onClose]);

    // Go to the step's page, wait for its target, bring it into view, then follow it.
    useEffect(() => {
        let frame;
        let stopped = false;
        const began = performance.now();
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let target = null;
        setRect(null);
        navigate(step.path);

        const follow = () => {
            if (stopped) return;
            if (target && target.isConnected) {
                const r = target.getBoundingClientRect();
                setRect((old) => (old && old.top === r.top && old.left === r.left && old.width === r.width && old.height === r.height
                    ? old : {top: r.top, left: r.left, width: r.width, height: r.height}));
            } else {
                // Wait for the page to be the right one before looking for the target.
                const here = window.location.pathname === step.path.split('?')[0];
                target = here && performance.now() - began > 60 ? document.querySelector(`[data-tour="${step.target}"]`) : null;
                if (target) {
                    const r = target.getBoundingClientRect();
                    const header = 76;
                    const room = window.innerHeight - header;
                    const phone = window.innerWidth < 761;
                    // On a phone the card sits at the bottom, so the target goes right under the header.
                    const offset = phone || r.height > room - 260 ? header + PAD + 8 : header + Math.max(0, (room - r.height - 250) / 2);
                    window.scrollTo({top: Math.max(0, window.scrollY + r.top - offset), behavior: reduced ? 'auto' : 'smooth'});
                }
            }
            frame = requestAnimationFrame(follow);
        };
        frame = requestAnimationFrame(follow);
        return () => { stopped = true; cancelAnimationFrame(frame); };
        // `navigate` changes identity on every navigation; the step is what drives this effect.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step]);

    useEffect(() => { if (ref.current) ref.current.focus({preventScroll: true}); }, [index]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
            else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [next, prev, onClose]);

    useLayoutEffect(() => {
        const observer = new ResizeObserver(() => {
            if (ref.current) setCardSize({w: ref.current.offsetWidth, h: ref.current.offsetHeight});
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const phone = vw < 761;
    let hole = null;
    let cardStyle = {};
    if (rect) {
        const top = Math.max(rect.top - PAD, 4);
        const left = Math.max(rect.left - PAD, 4);
        const bottom = Math.min(rect.top + rect.height + PAD, vh - 4);
        const right = Math.min(rect.left + rect.width + PAD, vw - 4);
        hole = {top, left, width: Math.max(0, right - left), height: Math.max(0, bottom - top)};
        if (!phone) {
            const gap = 16;
            const clampX = (x) => Math.min(Math.max(x, 16), vw - cardSize.w - 16);
            const clampY = (y) => Math.min(Math.max(y, 88), vh - cardSize.h - 16);
            if (bottom + gap + cardSize.h < vh) cardStyle = {top: bottom + gap, left: clampX(left)};
            else if (top - gap - cardSize.h > 76) cardStyle = {top: top - gap - cardSize.h, left: clampX(left)};
            else if (right + gap + cardSize.w < vw) cardStyle = {top: clampY(top), left: right + gap};
            else if (left - gap - cardSize.w > 0) cardStyle = {top: clampY(top), left: left - gap - cardSize.w};
            else cardStyle = {top: vh - cardSize.h - 24, left: vw - cardSize.w - 24};
        }
    } else if (!phone) {
        cardStyle = {top: vh - cardSize.h - 24, left: (vw - cardSize.w) / 2};
    }

    return createPortal(
        <div className="guide">
            {hole ? <div className="guide__hole" style={hole}/> : <div className="guide__veil"/>}
            <div className="guide__card" style={cardStyle} role="dialog" aria-modal="true" aria-label={t(copy.label)} tabIndex="-1" ref={ref}>
                <button type="button" className="guide__close" onClick={onClose} aria-label={t(copy.quit)} title={t(copy.quit)}><Icon name="close" size={16}/></button>
                <div className="guide__who">
                    <img src={portrait} alt="" width="40" height="40"/>
                    <div className="guide__progress" aria-hidden="true">
                        {track.steps.map((s, i) => <i key={s} className={i <= index ? 'is-on' : ''}/>)}
                    </div>
                    <small>{index + 1} / {track.steps.length}</small>
                </div>
                <div aria-live="polite">
                    <h2>{t(step.title)}</h2>
                    <p>{t(step.text)}</p>
                </div>
                {last && <a className="btn guide__cta" href={profile.cv[lang]} download><Icon name="download"/>{t(ui.home.cv)}</a>}
                <div className="guide__nav">
                    <button type="button" className="btn btn--ghost" onClick={prev} disabled={index === 0}>{t(copy.prev)}</button>
                    <button type="button" className={last ? 'btn btn--ghost' : 'btn'} onClick={next}>{t(last ? copy.finish : copy.next)}</button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
