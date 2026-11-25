import React, {useMemo, useState} from 'react';
import {buildTables, runQuery, SqlError} from '../sql/engine';
import {ui} from '../content/ui';
import {useLang, useTitle} from '../i18n';
import Icon from '../components/Icon';
import {PageHead} from '../components/parts';

const EXAMPLES = [
    "SELECT title, stack FROM projects WHERE type = 'data'",
    "SELECT title, year FROM projects WHERE stack LIKE '%PostgreSQL%'",
    'SELECT area, COUNT(*) FROM skills GROUP BY area ORDER BY count DESC',
    'SELECT tool, projects FROM skills WHERE projects > 1 ORDER BY projects DESC',
    'SELECT degree, school, start_year FROM education ORDER BY start_year DESC',
    'DROP TABLE projects',
];

function execute(sql, lang) {
    try {
        return {result: runQuery(sql, lang)};
    } catch (e) {
        if (e instanceof SqlError) return {error: e.message};
        throw e;
    }
}

export default function Console() {
    const {lang, t} = useLang();
    const [text, setText] = useState(EXAMPLES[0]);
    const [ran, setRan] = useState(EXAMPLES[0]);
    useTitle(t(ui.nav.console));
    const tables = useMemo(() => buildTables(lang), [lang]);
    const {result, error} = useMemo(() => execute(ran, lang), [ran, lang]);

    const pick = (sql) => {
        setText(sql);
        setRan(sql);
    };

    return (
        <div className="wrap page">
            <PageHead title={t(ui.console.title)} intro={t(ui.console.intro)}/>
            <div className="sql" data-tour="console">
                <div className="sql__side">
                    <h2>{t(ui.console.examples)}</h2>
                    <ul className="sql__examples">
                        {EXAMPLES.map((e) => <li key={e}><button type="button" aria-pressed={e === ran} onClick={() => pick(e)}>{e}</button></li>)}
                    </ul>
                    <h2>{t(ui.console.tables)}</h2>
                    <dl className="sql__schema">
                        {Object.entries(tables).map(([name, {columns}]) => (
                            <div key={name}>
                                <dt><button type="button" onClick={() => pick(`SELECT * FROM ${name}`)}>{name}</button></dt>
                                <dd>{columns.join(', ')}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="sql__main">
                    <div className="pipeline__bar" aria-hidden="true"><i/><i/><i/><span>portfolio.db</span></div>
                    <form className="sql__form" onSubmit={(e) => { e.preventDefault(); setRan(text); }}>
                        <textarea aria-label={t(ui.console.label)} value={text} rows="3" spellCheck="false" autoCapitalize="off" autoCorrect="off"
                                  onChange={(e) => setText(e.target.value)}
                                  onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setRan(text); } }}/>
                        <div className="sql__run">
                            <button type="submit" className="btn"><Icon name="play" size={14}/>{t(ui.console.run)}</button>
                            <small>{t(ui.console.hint)}</small>
                        </div>
                    </form>
                    <div className="sql__out" aria-live="polite" role="region" aria-label={t(ui.console.result)}>
                        {error ? <p className="sql__error">{error}</p> : (
                            <>
                                <div className="sql__scroll" tabIndex="0" role="group" aria-label={t(ui.console.result)}>
                                    <table>
                                        <thead><tr>{result.columns.map((c, i) => <th key={`${c}${i}`} scope="col">{c}</th>)}</tr></thead>
                                        <tbody>
                                            {result.rows.map((r, i) => (
                                                <tr key={i}>{r.map((v, j) => (
                                                    <td key={j} className={typeof v === 'number' ? 'is-num' : ''}>
                                                        {v === null ? <em>NULL</em> : /^https?:/.test(v) ? <a href={v} target="_blank" rel="noopener noreferrer">{v}</a> : v}
                                                    </td>
                                                ))}</tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mono">{result.rows.length} {t(ui.console.rows)}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
