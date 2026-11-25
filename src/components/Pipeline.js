import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {pipeline} from '../content/journey';
import {ui} from '../content/ui';
import {useLang} from '../i18n';
import Icon from './Icon';

const WIDE = {
    box: '0 0 1000 260', w: 176, h: 64,
    at: {apps: [100, 66], open: [100, 194], store: [366, 130], model: [632, 130], bi: [898, 66], ml: [898, 194]},
};
const TALL = {
    box: '0 0 360 420', w: 164, h: 62,
    at: {apps: [88, 40], open: [272, 40], store: [180, 150], model: [180, 260], bi: [88, 370], ml: [272, 370]},
};

function useNarrow() {
    const query = '(max-width: 760px)';
    const [narrow, setNarrow] = useState(() => window.matchMedia(query).matches);
    useEffect(() => {
        const mq = window.matchMedia(query);
        const on = () => setNarrow(mq.matches);
        mq.addEventListener('change', on);
        return () => mq.removeEventListener('change', on);
    }, []);
    return narrow;
}

// Every node upstream or downstream of `id`.
function lineage(id) {
    const walk = (start, from, to) => {
        const seen = new Set([start]);
        const queue = [start];
        while (queue.length) {
            const cur = queue.pop();
            pipeline.edges.forEach((e) => {
                if (e[from] === cur && !seen.has(e[to])) { seen.add(e[to]); queue.push(e[to]); }
            });
        }
        return seen;
    };
    return new Set([...walk(id, 0, 1), ...walk(id, 1, 0)]);
}

export default function Pipeline() {
    const {t} = useLang();
    const narrow = useNarrow();
    const [active, setActive] = useState('apps');
    const layout = narrow ? TALL : WIDE;
    const lit = lineage(active);
    const node = pipeline.nodes.find((n) => n.id === active);
    const byId = Object.fromEntries(pipeline.nodes.map((n) => [n.id, n]));

    const edgePath = ([a, b]) => {
        const [ax, ay] = layout.at[a];
        const [bx, by] = layout.at[b];
        if (narrow) {
            const [y1, y2] = [ay + layout.h / 2, by - layout.h / 2];
            const mid = (y1 + y2) / 2;
            return `M${ax} ${y1}C${ax} ${mid} ${bx} ${mid} ${bx} ${y2}`;
        }
        const [x1, x2] = [ax + layout.w / 2, bx - layout.w / 2];
        const mid = (x1 + x2) / 2;
        return `M${x1} ${ay}C${mid} ${ay} ${mid} ${by} ${x2} ${by}`;
    };

    return (
        <div className="pipeline" data-tour="pipeline">
            <div className="pipeline__bar" aria-hidden="true"><i/><i/><i/><span>oscar_wagoussi.dag</span></div>
            <svg className="pipeline__svg" viewBox={layout.box} role="group" aria-label={t(ui.home.pipelineTitle)}>
                {pipeline.edges.map((e) => (
                    <path key={e.join('-')} d={edgePath(e)}
                          className={`edge edge--${byId[e[0]].side} ${lit.has(e[0]) && lit.has(e[1]) ? 'is-lit' : ''}`}/>
                ))}
                {pipeline.nodes.map((n) => {
                    const [x, y] = layout.at[n.id];
                    const select = () => setActive(n.id);
                    return (
                        <g key={n.id} role="button" tabIndex="0" aria-pressed={active === n.id}
                           className={`node node--${n.side} ${lit.has(n.id) ? 'is-lit' : ''} ${active === n.id ? 'is-active' : ''}`}
                           onClick={select}
                           onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); } }}>
                            <rect x={x - layout.w / 2} y={y - layout.h / 2} width={layout.w} height={layout.h} rx="10"/>
                            <text x={x} y={y - 5} className="node__label">{t(n.label)}</text>
                            <text x={x} y={y + 16} className="node__sub">{n.sub}</text>
                        </g>
                    );
                })}
            </svg>
            <div className="pipeline__note" aria-live="polite">
                <p>{t(node.text)}</p>
                <Link className="textlink" to={`/projects?${node.filter.replace(/ /g, '+')}`}>{t(ui.home.seeProjects)} <Icon name="arrow" size={16}/></Link>
            </div>
        </div>
    );
}
