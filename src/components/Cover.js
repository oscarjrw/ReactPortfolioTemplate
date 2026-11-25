import React from 'react';

// One abstract illustration per project. They are drawings, not data: no values, hidden from assistive tech.
const noise = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const A = 'var(--cover)';

const hex = (cx, cy, r) => Array.from({length: 6}, (_, k) => {
    const a = (Math.PI / 3) * k + Math.PI / 6;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
}).join(' ');

const bell = (mu, s, h) => `M0 160 ${Array.from({length: 81}, (_, i) => {
    const x = i * 4;
    return `L${x} ${(160 - h * Math.exp(-((x - mu) ** 2) / (2 * s * s))).toFixed(1)}`;
}).join(' ')} L320 160 Z`;

const art = {
    'fuel-vulnerability-index': () => {
        const cells = [];
        for (let row = 0; row < 9; row += 1) {
            for (let col = 0; col < 14; col += 1) {
                const cx = 12 + col * 25 + (row % 2) * 12.5;
                const cy = 8 + row * 21.6;
                const heat = Math.exp(-(((cx - 205) / 85) ** 2 + ((cy - 95) / 55) ** 2)) * 0.85 + noise(row * 17 + col) * 0.22;
                cells.push(<polygon key={`${row}-${col}`} points={hex(cx, cy, 13)} fill={A} fillOpacity={Math.min(heat, 0.95).toFixed(2)}/>);
            }
        }
        return cells;
    },
    'dvf-data-drift-observatory': () => <>
        {[40, 80, 120].map((y) => <path key={y} d={`M0 ${y}H320`} stroke={A} strokeOpacity=".14"/>)}
        <path d={bell(125, 38, 110)} fill={A} fillOpacity=".22" stroke={A} strokeOpacity=".6" strokeWidth="1.5"/>
        <path d={bell(190, 46, 92)} fill={A} fillOpacity=".5" stroke={A} strokeWidth="2"/>
        <path d="M125 34V160M190 34V160" stroke={A} strokeDasharray="3 5" strokeOpacity=".8"/>
        <path d="M132 34H182M176 29l7 5-7 5" stroke={A} strokeWidth="2" fill="none"/>
    </>,
    'macroeconomic-forecasting-benin': () => <>
        {[45, 80, 115, 150].map((y) => <path key={y} d={`M20 ${y}H300`} stroke={A} strokeOpacity=".14"/>)}
        <path d="M185 88 L300 28 L300 118 Z" fill={A} fillOpacity=".16"/>
        <path d="M185 88 L300 48 L300 94 Z" fill={A} fillOpacity=".26"/>
        <path d="M20 138 L48 130 L72 134 L98 116 L122 120 L148 100 L166 104 L185 88" fill="none" stroke={A} strokeWidth="2.500" strokeLinejoin="round"/>
        <path d="M185 88 L300 70" stroke={A} strokeWidth="2.500" strokeDasharray="5 5"/>
        <circle cx="185" cy="88" r="5" fill={A}/>
    </>,
    sig: () => {
        const pts = [[70, 45], [70, 135], [160, 25], [160, 155], [250, 45], [250, 135]];
        return <>
            {pts.map(([x, y]) => <path key={`${x}${y}`} d={`M160 90L${x} ${y}`} stroke={A} strokeOpacity=".5" strokeWidth="1.500"/>)}
            {pts.map(([x, y]) => <rect key={`b${x}-${y}`} x={x - 22} y={y - 13} width="44" height="26" rx="5" fill="var(--surface-2)"/>)}
            {pts.map(([x, y], i) => <rect key={`${x}-${y}`} x={x - 22} y={y - 13} width="44" height="26" rx="5" fill={A} fillOpacity={0.2 + (i % 3) * 0.12}/>)}
            <circle cx="160" cy="90" r="24" fill={A}/>
        </>;
    },
    'erp-innova': () => <>
        <rect x="40" y="28" width="112" height="56" rx="6" fill={A} fillOpacity=".75"/>
        <rect x="162" y="28" width="118" height="26" rx="6" fill={A} fillOpacity=".28"/>
        <rect x="162" y="62" width="54" height="62" rx="6" fill={A} fillOpacity=".45"/>
        <rect x="226" y="62" width="54" height="22" rx="6" fill={A} fillOpacity=".2"/>
        <rect x="226" y="94" width="54" height="58" rx="6" fill={A} fillOpacity=".6"/>
        <rect x="40" y="94" width="52" height="58" rx="6" fill={A} fillOpacity=".3"/>
        <rect x="102" y="94" width="50" height="58" rx="6" fill={A} fillOpacity=".16"/>
        <rect x="162" y="132" width="54" height="20" rx="6" fill={A} fillOpacity=".26"/>
    </>,
    myschool: () => Array.from({length: 35}, (_, i) => {
        const on = noise(i + 4) > 0.5;
        return <rect key={i} x={52 + (i % 7) * 32} y={20 + Math.floor(i / 7) * 29} width="26" height="23" rx="4"
                     fill={A} fillOpacity={on ? 0.3 + noise(i * 3) * 0.6 : 0.1}/>;
    }),
    agcc: () => <>
        <g transform="rotate(-6 160 90)">
            <rect x="75" y="38" width="170" height="104" rx="10" fill={A} fillOpacity=".2" stroke={A} strokeOpacity=".7"/>
            <rect x="90" y="58" width="44" height="56" rx="5" fill={A} fillOpacity=".75"/>
            {[60, 76, 92, 108].map((y, i) => <rect key={y} x="146" y={y} width={[82, 60, 74, 44][i]} height="7" rx="3.500" fill={A} fillOpacity=".55"/>)}
            <rect x="90" y="124" width="140" height="5" rx="2.500" fill={A} fillOpacity=".35"/>
        </g>
    </>,
    agtt: () => <>
        <path d="M160 0V30" stroke={A} strokeWidth="8" strokeOpacity=".4"/>
        <rect x="112" y="26" width="96" height="130" rx="10" fill={A} fillOpacity=".22" stroke={A} strokeOpacity=".7"/>
        <rect x="146" y="35" width="28" height="7" rx="3.500" fill={A}/>
        {Array.from({length: 36}, (_, i) => (noise(i + 9) > 0.45
            ? <rect key={i} x={133 + (i % 6) * 9} y={56 + Math.floor(i / 6) * 9} width="8" height="8" fill={A}/> : null))}
        <rect x="130" y="122" width="60" height="6" rx="3" fill={A} fillOpacity=".6"/>
        <rect x="130" y="135" width="38" height="6" rx="3" fill={A} fillOpacity=".4"/>
        <path d="M20 156H100M220 156H300" stroke={A} strokeOpacity=".4" strokeWidth="2"/>
    </>,
    sondyn: () => [210, 150, 96, 178, 60].map((w, i) => <g key={w}>
        <rect x="50" y={26 + i * 27} width="220" height="15" rx="7.500" fill={A} fillOpacity=".12"/>
        <rect x="50" y={26 + i * 27} width={w} height="15" rx="7.500" fill={A} fillOpacity={0.85 - i * 0.12}/>
    </g>),
};

export default function Cover({slug, type}) {
    const draw = art[slug];
    return (
        <svg className={`cover cover--${type}`} viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
            {draw && draw()}
        </svg>
    );
}
