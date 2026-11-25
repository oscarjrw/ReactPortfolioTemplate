export const skills = [
    {area: {fr: 'Langages', en: 'Languages'}, icon: 'code', side: 'software', tools: ['Python', 'SQL', 'PHP', 'JavaScript', 'TypeScript']},
    {area: {fr: 'Back-end', en: 'Back-end'}, icon: 'server', side: 'software', tools: ['Symfony', 'Laravel', 'Node.js']},
    {area: {fr: 'Front-end', en: 'Front-end'}, icon: 'layout', side: 'software', tools: ['HTML / CSS', 'React']},
    {area: {fr: 'Modélisation', en: 'Modelling'}, icon: 'shapes', side: 'both', tools: ['UML']},
    {area: {fr: 'Bases de données', en: 'Databases'}, icon: 'database', side: 'both', tools: ['PostgreSQL', 'PostGIS', 'MySQL', 'MongoDB', 'DuckDB']},
    {area: {fr: 'Intégration de données', en: 'Data integration'}, icon: 'flow', side: 'data', tools: ['dbt', 'Airflow', 'Talend', 'pandas']},
    {area: {fr: 'Business intelligence', en: 'Business intelligence'}, icon: 'chart', side: 'data', tools: ['Star schema', 'Power BI', 'Metabase']},
    {area: {fr: 'Machine learning', en: 'Machine learning'}, icon: 'spark', side: 'data', tools: ['scikit-learn', 'XGBoost', 'Keras', 'Regression', 'Classification', 'Clustering']},
    {area: {fr: 'DevOps', en: 'DevOps'}, icon: 'box', side: 'both', tools: ['Docker', 'GitLab CI/CD', 'Linux', 'nginx', 'VPS']},
];

// Tools are identified by their English name; only these read differently in French.
export const toolNames = {
    'Star schema': {fr: 'Schéma en étoile', en: 'Star schema'},
    Regression: {fr: 'Régression', en: 'Regression'},
};

export const experience = [
    {
        role: {fr: 'Développeur full stack, freelance', en: 'Full-stack developer, freelance'},
        org: {fr: 'Clients variés, dont COSIT, Innova Sarl et Dev ITC', en: 'Various clients, including COSIT, Innova Sarl and Dev ITC'},
        place: {fr: 'Bénin', en: 'Benin'},
        start: 2020,
        end: null,
        text: {
            fr: 'ERP (RH, stock, commercial, comptabilité générale, comptabilité analytique et suivi-évaluation) et applications métier : conception de bases de données, développement front et back, intégration de services tiers, déploiement et intégration continue.',
            en: 'ERP (HR, inventory, sales, general accounting, cost accounting, and monitoring and evaluation) and business applications: database design, front-end and back-end development, integration of third-party services, deployment and continuous integration.',
        },
        related: ['erp-innova', 'sig'],
    },
    {
        role: {fr: 'Enseignant vacataire', en: 'Part-time lecturer'},
        org: {fr: 'ENEAM', en: 'ENEAM'},
        place: {fr: 'Bénin', en: 'Benin'},
        start: null,
        end: null,
        text: {
            fr: 'Introduction à l’informatique et Python, en première année de licence.',
            en: 'Introduction to computer science and Python, first-year undergraduates.',
        },
    },
    {
        role: {fr: 'Développeur web, stages', en: 'Web developer, internships'},
        org: {fr: 'Solutech Corporate · Port Autonome de Cotonou · SBEE', en: 'Solutech Corporate · Port Autonome de Cotonou · SBEE'},
        place: {fr: 'Bénin', en: 'Benin'},
        start: 2017,
        end: 2019,
        text: null,
        related: ['agcc', 'agtt'],
    },
];

export const education = [
    {
        degree: {fr: 'Master 2 MIAGE, Data et Business Intelligence', en: 'Master 2 MIAGE, Data and Business Intelligence'},
        school: {fr: 'Université de Rennes, ISTIC', en: 'University of Rennes, ISTIC'},
        place: {fr: 'France', en: 'France'},
        start: 2026,
        end: 2027,
        current: true,
        related: ['dvf-data-drift-observatory'],
    },
    {
        degree: {fr: 'Master en Business Intelligence', en: 'Master’s in Business Intelligence'},
        school: {fr: 'ENEAM, Université d’Abomey-Calavi', en: 'ENEAM, University of Abomey-Calavi'},
        place: {fr: 'Bénin', en: 'Benin'},
        start: 2022,
        end: 2024,
        related: ['macroeconomic-forecasting-benin'],
    },
    {
        degree: {fr: 'Licence en informatique de gestion', en: 'Bachelor’s in Business Computing'},
        school: {fr: 'ENEAM, Université d’Abomey-Calavi', en: 'ENEAM, University of Abomey-Calavi'},
        place: {fr: 'Bénin', en: 'Benin'},
        start: 2014,
        end: 2017,
    },
];

// The interactive diagram on the home page. Each node carries the tools it stands for.
export const pipeline = {
    nodes: [
        {
            id: 'apps', side: 'software', label: {fr: 'Applications', en: 'Applications'}, sub: 'Symfony · Laravel', tool: 'Laravel', filter: 'type=software',
            text: {
                fr: 'Mon point de départ : des logiciels de gestion et des applications métier. J’y ai appris comment une donnée naît, et comment elle se dégrade.',
                en: 'Where I started: management software and business applications. They taught me how a piece of data is born, and how it goes bad.',
            },
        },
        {
            id: 'open', side: 'data', label: {fr: 'Données publiques', en: 'Public data'}, sub: 'INSEE · DVF · SDES', filter: 'type=data',
            text: {
                fr: 'Prix des carburants toutes les 10 minutes, transactions immobilières, indicateurs de la Banque mondiale : je collecte et je trace chaque source.',
                en: 'Fuel prices every 10 minutes, real-estate transactions, World Bank indicators: I ingest each source and keep it traceable.',
            },
        },
        {
            id: 'store', side: 'both', label: {fr: 'Stockage', en: 'Storage'}, sub: 'PostgreSQL · PostGIS', filter: 'tech=PostgreSQL',
            text: {
                fr: 'Des bases conçues pour durer : chargement automatisé, empreintes SHA-256, jointures spatiales, historique des changements.',
                en: 'Databases designed to last: automated loading, SHA-256 fingerprints, spatial joins, history of changes.',
            },
        },
        {
            id: 'model', side: 'data', label: {fr: 'Transformation', en: 'Transformation'}, sub: 'dbt · Airflow', filter: 'tech=dbt',
            text: {
                fr: 'Un schéma en étoile construit avec dbt, orchestré par Airflow, conteneurisé, vérifié en intégration continue.',
                en: 'A star schema built with dbt, orchestrated by Airflow, containerised, checked in continuous integration.',
            },
        },
        {
            id: 'bi', side: 'data', label: {fr: 'Indicateurs', en: 'Indicators'}, sub: 'Power BI · Streamlit', filter: 'tech=Power BI',
            text: {
                fr: 'Des tableaux de bord et des cartes qui répondent à une question précise, pas à toutes à la fois.',
                en: 'Dashboards and maps that answer one precise question, not all of them at once.',
            },
        },
        {
            id: 'ml', side: 'data', label: {fr: 'Prédictions', en: 'Predictions'}, sub: 'scikit-learn · XGBoost', filter: 'tech=XGBoost',
            text: {
                fr: 'Des modèles comparés sur leurs métriques avant d’être retenus : de la régression linéaire au LSTM.',
                en: 'Models compared on their metrics before one is chosen: from linear regression to LSTM.',
            },
        },
    ],
    edges: [['apps', 'store'], ['open', 'store'], ['store', 'model'], ['model', 'bi'], ['model', 'ml']],
};
