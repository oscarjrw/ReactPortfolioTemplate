// A tiny read-only SQL engine over the portfolio content. No eval: the query is tokenised and parsed by hand.
// Grammar: SELECT * | col, COUNT(*) FROM table [WHERE col op value [AND|OR ...]] [GROUP BY col] [ORDER BY col [DESC]] [LIMIT n]

import {projects, tools} from '../content/projects';
import {education, experience, skills} from '../content/journey';
import {translate} from '../i18n';

export class SqlError extends Error {}

export function buildTables(lang) {
    const t = (v) => translate(v, lang);
    return {
        projects: {
            columns: ['title', 'type', 'year', 'stack', 'status', 'pitch', 'url'],
            rows: projects.map((p) => ({
                title: t(p.short), type: p.type, year: p.year || null, stack: tools(p).join(', ') || null,
                status: p.status ? t(p.status) : null, pitch: t(p.pitch),
                url: (p.links.find((l) => l.url && !l.soon) || {}).url || null,
            })),
        },
        skills: {
            columns: ['area', 'tool', 'projects'],
            rows: skills.flatMap((s) => s.tools.map((tool) => ({
                area: t(s.area), tool, projects: projects.filter((p) => tools(p).includes(tool)).length,
            }))),
        },
        experience: {
            columns: ['role', 'organisation', 'country', 'start_year', 'end_year'],
            rows: experience.map((e) => ({
                role: t(e.role), organisation: t(e.org), country: t(e.place), start_year: e.start, end_year: e.end,
            })),
        },
        education: {
            columns: ['degree', 'school', 'country', 'start_year', 'end_year'],
            rows: education.map((e) => ({
                degree: t(e.degree), school: t(e.school), country: t(e.place), start_year: e.start, end_year: e.end,
            })),
        },
    };
}

const MESSAGES = {
    empty: {fr: 'Écrivez une requête, par exemple SELECT * FROM projects.', en: 'Write a query, for example SELECT * FROM projects.'},
    readonly: {
        fr: (w) => `Permission refusée : ${w} demande des droits que seul Junior possède. Bien tenté.`,
        en: (w) => `Permission denied: ${w} needs rights only Junior has. Nice try.`,
    },
    char: {fr: (c) => `Caractère inattendu : ${c}`, en: (c) => `Unexpected character: ${c}`},
    expected: {
        fr: (e, g) => `J’attendais ${e}, j’ai trouvé ${g || 'la fin de la requête'}.`,
        en: (e, g) => `Expected ${e}, found ${g || 'the end of the query'}.`,
    },
    table: {
        fr: (n, l) => `La table « ${n} » n’existe pas. Tables disponibles : ${l}.`,
        en: (n, l) => `There is no table "${n}". Available tables: ${l}.`,
    },
    column: {
        fr: (n, l) => `La colonne « ${n} » n’existe pas ici. Colonnes : ${l}.`,
        en: (n, l) => `There is no column "${n}" here. Columns: ${l}.`,
    },
    group: {
        fr: (c) => `La colonne ${c} doit apparaître dans GROUP BY.`,
        en: (c) => `Column ${c} must appear in GROUP BY.`,
    },
    string: {fr: 'Il manque une apostrophe fermante.', en: 'A closing quote is missing.'},
    name: {fr: 'un nom', en: 'a name'},
    value: {fr: 'une valeur', en: 'a value'},
    operator: {fr: 'un opérateur', en: 'an operator'},
};

const KEYWORDS = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'GROUP', 'ORDER', 'BY', 'ASC', 'DESC', 'LIMIT', 'LIKE', 'ILIKE', 'IS', 'NULL', 'COUNT', 'DISTINCT'];

function tokenize(sql, fail) {
    const out = [];
    const re = /\s+|--[^\n]*|(>=|<=|<>|!=|[=<>*,();])|(\d+)|([A-Za-z_][A-Za-z0-9_]*)|'((?:[^']|'')*)'|(')|([\s\S])/y;
    let m;
    while (re.lastIndex < sql.length && (m = re.exec(sql))) {
        if (m[1]) out.push({type: 'op', value: m[1]});
        else if (m[2]) out.push({type: 'num', value: Number(m[2])});
        else if (m[3]) {
            const upper = m[3].toUpperCase();
            out.push(KEYWORDS.includes(upper) ? {type: 'kw', value: upper} : {type: 'id', value: m[3].toLowerCase()});
        } else if (m[4] !== undefined) out.push({type: 'str', value: m[4].replace(/''/g, "'")});
        else if (m[5]) fail('string');
        else if (m[6]) fail('char', m[6]);
    }
    return out;
}

const fold = (v) => (typeof v === 'string' ? v.toLowerCase().replace(/’/g, "'") : v);

function like(value, pattern) {
    if (value === null) return false;
    const source = fold(pattern).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '[\\s\\S]*').replace(/_/g, '[\\s\\S]');
    return new RegExp(`^${source}$`).test(fold(String(value)));
}

function compare(a, b) {
    if (a === null || b === null) return a === b ? 0 : a === null ? 1 : -1; // NULLs last
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    return String(fold(a)).localeCompare(String(fold(b)), undefined, {numeric: true});
}

export function runQuery(sql, lang) {
    const fail = (key, ...args) => {
        const msg = MESSAGES[key][lang];
        throw new SqlError(translate(typeof msg === 'function' ? msg(...args) : msg, lang));
    };
    const word = (key) => MESSAGES[key][lang];
    const first = (sql.trim().match(/^[A-Za-z]+/) || [''])[0].toUpperCase();
    if (!sql.trim()) fail('empty');
    if (['DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'TRUNCATE', 'CREATE', 'GRANT', 'SUDO', 'RM'].includes(first)) fail('readonly', first);

    const tokens = tokenize(sql, fail).filter((tok, i, all) => !(tok.value === ';' && i === all.length - 1));
    let pos = 0;
    const peek = () => tokens[pos];
    const is = (value) => peek() && peek().type !== 'str' && peek().value === value;
    const accept = (value) => (is(value) ? (pos += 1, true) : false);
    const got = () => peek() && String(peek().value);
    const expect = (value) => { if (!accept(value)) fail('expected', value, got()); };
    const ident = () => {
        if (!peek() || peek().type !== 'id') fail('expected', word('name'), got());
        return tokens[pos++].value;
    };

    const tables = buildTables(lang);

    expect('SELECT');
    const distinct = accept('DISTINCT');
    const items = [];
    do {
        if (accept('*')) items.push({all: true});
        else if (accept('COUNT')) { expect('('); expect('*'); expect(')'); items.push({count: true}); }
        else items.push({col: ident()});
    } while (accept(','));
    expect('FROM');
    const name = ident();
    if (!Object.prototype.hasOwnProperty.call(tables, name)) fail('table', name, Object.keys(tables).join(', '));
    const table = tables[name];
    const column = (c) => {
        if (!table.columns.includes(c)) fail('column', c, table.columns.join(', '));
        return c;
    };
    items.forEach((i) => i.col && column(i.col));

    function condition() {
        if (accept('(')) { const inner = orExpr(); expect(')'); return inner; }
        if (accept('NOT')) { const inner = condition(); return (r) => !inner(r); }
        const col = column(ident());
        if (accept('IS')) {
            const not = accept('NOT');
            expect('NULL');
            return (r) => (r[col] === null) !== not;
        }
        const not = accept('NOT');
        if (accept('LIKE') || accept('ILIKE')) {
            if (!peek() || peek().type !== 'str') fail('expected', word('value'), got());
            const pattern = tokens[pos++].value;
            return (r) => r[col] !== null && like(r[col], pattern) !== not;
        }
        const op = peek();
        if (not || !op || op.type !== 'op' || !['=', '<>', '!=', '<', '>', '<=', '>='].includes(op.value)) fail('expected', word('operator'), got());
        pos += 1;
        if (!peek() || !['str', 'num'].includes(peek().type)) fail('expected', word('value'), got());
        const value = tokens[pos++].value;
        return (r) => {
            if (r[col] === null) return false;
            const c = compare(r[col], value);
            return {'=': c === 0, '<>': c !== 0, '!=': c !== 0, '<': c < 0, '>': c > 0, '<=': c <= 0, '>=': c >= 0}[op.value];
        };
    }
    function andExpr() {
        const parts = [condition()];
        while (accept('AND')) parts.push(condition());
        return (r) => parts.every((f) => f(r));
    }
    function orExpr() {
        const parts = [andExpr()];
        while (accept('OR')) parts.push(andExpr());
        return (r) => parts.some((f) => f(r));
    }

    let rows = table.rows;
    if (accept('WHERE')) rows = rows.filter(orExpr());

    let groupBy = null;
    if (accept('GROUP')) { expect('BY'); groupBy = column(ident()); }

    let order = null;
    if (accept('ORDER')) {
        expect('BY');
        let col;
        if (accept('COUNT')) {
            if (accept('(')) { expect('*'); expect(')'); }
            col = 'count';
        } else col = ident();
        order = {col, desc: accept('DESC') || (accept('ASC') && false)};
    }
    let limit = Infinity;
    if (accept('LIMIT')) {
        if (!peek() || peek().type !== 'num') fail('expected', word('value'), got());
        limit = tokens[pos++].value;
    }
    if (pos < tokens.length) fail('expected', ';', got());

    const counting = items.some((i) => i.count);
    const aggregated = counting || groupBy !== null;
    let columns;
    if (aggregated) {
        items.forEach((i) => { if (i.all || (i.col && i.col !== groupBy)) fail('group', i.col || '*'); });
        const groups = new Map();
        if (groupBy === null) groups.set(null, 0);
        rows.forEach((r) => {
            const key = groupBy ? r[groupBy] : null;
            groups.set(key, (groups.get(key) || 0) + 1);
        });
        rows = [...groups].map(([key, count]) => ({...(groupBy ? {[groupBy]: key} : {}), count}));
        columns = items.map((i) => (i.count ? 'count' : i.col));
    } else {
        columns = items.flatMap((i) => (i.all ? table.columns : [i.col]));
    }

    if (order) {
        const allowed = aggregated ? [...(groupBy ? [groupBy] : []), 'count'] : table.columns;
        if (!allowed.includes(order.col)) fail('column', order.col, allowed.join(', '));
        rows = [...rows].sort((a, b) => {
            const [x, y] = [a[order.col], b[order.col]];
            if (x === null || y === null) return compare(x, y);
            return order.desc ? compare(y, x) : compare(x, y);
        });
    }
    let values = rows.map((r) => columns.map((c) => r[c]));
    if (distinct) {
        const seen = new Set();
        values = values.filter((v) => { const k = JSON.stringify(v); return seen.has(k) ? false : seen.add(k); });
    }
    return {columns, rows: values.slice(0, limit)};
}
