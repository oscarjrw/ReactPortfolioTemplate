import React from 'react';

const paths = {
    code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
    server: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01',
    database: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    flow: 'M3 4h6v5H3zM15 4h6v5h-6zM9 15h6v5H9zM6 9v3h12V9M12 12v3',
    chart: 'M4 20V10M10 20V4M16 20v-7M21 20H3',
    spark: 'M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z',
    box: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9',
    arrow: 'M5 12h14M13 6l6 6-6 6',
    back: 'M19 12H5M11 6l-6 6 6 6',
    external: 'M14 4h6v6M20 4l-9 9M18 14v6H4V6h6',
    download: 'M12 3v12M7 10l5 5 5-5M4 20h16',
    mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
    phone: 'M5 3h4l2 5-2.5 1.5a11 11 0 005 5L15 12l5 2v4a2 2 0 01-2 2A15 15 0 013 5a2 2 0 012-2z',
    pin: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z',
    sun: 'M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5',
    moon: 'M20 14.5A8.5 8.5 0 019.5 4 8.5 8.5 0 1020 14.5z',
    menu: 'M4 7h16M4 12h16M4 17h16',
    close: 'M6 6l12 12M18 6L6 18',
    compass: 'M12 3a9 9 0 100 18 9 9 0 000-18zM15.5 8.5l-2 5-5 2 2-5z',
    play: 'M7 4l13 8-13 8z',
    linkedin: 'M4 9h3v11H4zM5.5 4v1.5M11 20V9M11 13c0-5 8-5.500 8 0v7',
    gitlab: 'M12 20.500L2.800 13.800 5.600 4l2.900 7h7l2.900-7 2.800 9.800z',
    layout: 'M3 4h18v16H3zM3 9h18M9 9v11',
    shapes: 'M4 4h7v7H4zM13 13h7v7h-7zM7.500 11v5.500H13',
};

export default function Icon({name, size = 18}) {
    return (
        <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d={paths[name]}/>
        </svg>
    );
}
