import {runQuery, SqlError} from './engine';

const q = (sql, lang = 'en') => runQuery(sql, lang);

test('selects everything', () => {
    const r = q('SELECT * FROM projects;');
    expect(r.rows).toHaveLength(9);
    expect(r.columns).toContain('title');
});

test('filters, orders and limits', () => {
    expect(q("select title from projects where stack like '%python%'").rows).toHaveLength(3);
    expect(q("SELECT title FROM projects WHERE type = 'data' AND year > '2024' ORDER BY title DESC LIMIT 1").rows).toEqual([['Fuel Vulnerability Index']]);
    expect(q("SELECT title FROM projects WHERE type = 'data' OR (stack LIKE '%Laravel%' AND type = 'software')").rows).toHaveLength(5);
    expect(q('SELECT title FROM projects WHERE url IS NOT NULL').rows).toEqual([['Fuel Vulnerability Index'], ['ERP Innova'], ['SIG']]);
});

test('counts and groups', () => {
    expect(q('SELECT COUNT(*) FROM projects')).toEqual({columns: ['count'], rows: [[9]]});
    expect(q("SELECT COUNT(*) FROM projects WHERE type = 'nope'").rows).toEqual([[0]]);
    expect(q('SELECT type, COUNT(*) FROM projects GROUP BY type ORDER BY count DESC').rows).toEqual([['software', 6], ['data', 3]]);
    expect(q('SELECT DISTINCT type FROM projects').rows).toHaveLength(2);
});

test('keeps missing dates last in both directions', () => {
    const asc = q('SELECT start_year FROM experience ORDER BY start_year').rows.flat();
    const desc = q('SELECT start_year FROM experience ORDER BY start_year DESC').rows.flat();
    expect(asc).toEqual([2017, 2020, null]);
    expect(desc).toEqual([2020, 2017, null]);
});

test('refuses writes and explains mistakes', () => {
    expect(() => q('DROP TABLE projects')).toThrow(/Permission denied/);
    ['', 'SELECT', 'SELECT * FROM nowhere', 'SELECT nope FROM projects', "SELECT * FROM projects WHERE title = 'x", 'SELECT * FROM constructor',
        'SELECT title, COUNT(*) FROM projects GROUP BY type', 'SELECT * FROM projects WHERE title', 'SELECT * FROM projects extra', 'SELECT # FROM projects']
        .forEach((sql) => {
            expect(() => q(sql)).toThrow(SqlError);
            expect(() => q(sql, 'fr')).toThrow(SqlError);
        });
});
