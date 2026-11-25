import React from 'react';
import {Link} from 'react-router-dom';
import {ui} from '../content/ui';
import {useLang, useTitle} from '../i18n';

export default function NotFound() {
    const {t} = useLang();
    useTitle('404');
    return (
        <div className="wrap page notfound">
            <p className="mono">SELECT * FROM pages WHERE url = '{window.location.pathname}';</p>
            <h1>{t(ui.notFound.title)}</h1>
            <p className="lede">{t(ui.notFound.text)}</p>
            <Link className="btn" to="/">{t(ui.notFound.home)}</Link>
        </div>
    );
}
