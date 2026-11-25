import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

const LangContext = createContext(null);

export const storage = {
    get(key) {
        try { return window.localStorage.getItem(key); } catch (e) { return null; }
    },
    set(key, value) {
        try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ }
    },
};

const initialLang = () => {
    const saved = storage.get('lang');
    if (saved === 'fr' || saved === 'en') return saved;
    return (navigator.language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en';
};

// French puts a non-breaking space before high punctuation.
const frenchSpacing = (s) => s.replace(/ ([:;?!»])/g, '\u00a0$1').replace(/« /g, '«\u00a0');

export function translate(value, lang) {
    if (value === null || value === undefined) return '';
    const text = typeof value === 'object' ? value[lang] : value;
    return lang === 'fr' && typeof text === 'string' ? frenchSpacing(text) : text;
}

export function LangProvider({children}) {
    const [lang, setLangState] = useState(initialLang);
    useEffect(() => { document.documentElement.lang = lang; }, [lang]);
    const setLang = useCallback((next) => {
        storage.set('lang', next);
        setLangState(next);
    }, []);
    const value = useMemo(() => ({lang, setLang, t: (v) => translate(v, lang)}), [lang, setLang]);
    return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

export function useTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} · Oscar Junior Wagoussi` : 'Oscar Junior Wagoussi · Full stack, Data & BI';
    }, [title]);
}
