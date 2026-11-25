// type: 'data' | 'software'.  links: only entries with a url are shown.
// `soon: true` announces an address without linking to it.
// To publish a link later, fill in its url. Nothing else needs to change.

export const projects = [
    {
        slug: 'fuel-vulnerability-index',
        type: 'data',
        featured: true,
        year: '2026',
        title: {fr: 'Indice de vulnérabilité carburant des communes françaises', en: 'Fuel Vulnerability Index for French Municipalities'},
        short: {fr: 'Vulnérabilité carburant', en: 'Fuel Vulnerability Index'},
        status: {fr: 'En cours', en: 'In progress'},
        pitch: {
            fr: 'Où le plein pèse-t-il le plus sur le budget des ménages, et où l’accès au carburant est-il le plus fragile ?',
            en: 'Where does filling up the tank weigh most on household budgets, and where is access to fuel most fragile?',
        },
        done: [
            {
                fr: 'Collecte toutes les 10 minutes du flux national des prix et des ruptures de carburant, croisé avec le revenu des ménages (INSEE) et le parc automobile local par type de carburant (SDES).',
                en: 'Collects the national fuel price and shortage feed every 10 minutes, and combines it with household income (INSEE) and the local car fleet by fuel type (SDES).',
            },
            {
                fr: 'Historisation des stations (SCD type 2), jointure spatiale station–commune (PostGIS) et schéma en étoile avec dbt, orchestré par Airflow, sous Docker, avec intégration continue.',
                en: 'Historises stations (SCD type 2), joins stations to municipalities spatially (PostGIS), and builds a star schema with dbt, orchestrated by Airflow, in Docker, with CI.',
            },
            {
                fr: 'Score de chaque commune sur l’effort budgétaire, la dépendance aux énergies fossiles et l’accès aux stations, sur une carte interactive.',
                en: 'Scores each municipality on budget effort, dependence on fossil fuel and access to stations, on an interactive map.',
            },
        ],
        stack: ['Python', 'PostgreSQL', 'PostGIS', 'dbt', 'Airflow', 'Docker', 'Streamlit'],
        methods: ['Star schema'],
        links: [
            {kind: 'gitlab', url: ''}, // TODO: GitLab repository
            {kind: 'demo', url: 'https://ivc.oscarwagoussi.tech'},
        ],
    },
    {
        slug: 'dvf-data-drift-observatory',
        type: 'data',
        featured: true,
        year: '2026 – 2027',
        title: {fr: 'Observatoire de dérive des données DVF', en: 'DVF Data Drift Observatory'},
        short: {fr: 'Dérive des données DVF', en: 'DVF Data Drift'},
        status: {fr: 'Projet d’équipe', en: 'Team project'},
        pitch: {
            fr: 'Détecter la dérive dans les données françaises de transactions immobilières (DVF, 2022 – 2025).',
            en: 'Detecting drift in French real-estate transaction data (DVF, 2022 – 2025).',
        },
        done: [
            {
                fr: 'Base PostgreSQL 16 sous Docker, chargement automatisé en Python (psycopg, COPY), traçabilité des sources par empreintes SHA-256.',
                en: 'PostgreSQL 16 database in Docker, automated loading in Python (psycopg, COPY), source traceability with SHA-256 fingerprints.',
            },
            {
                fr: 'Intégration du référentiel des communes de l’INSEE (COG) et requêtes SQL de preuve exécutées automatiquement (Makefile).',
                en: 'Integration of the INSEE municipality reference (COG) and SQL proof queries run automatically (Makefile).',
            },
            {
                fr: 'En cours : détection automatique de la dérive, mesure de précision et de rappel, tableau de bord Power BI.',
                en: 'In progress: automatic drift detection, precision / recall measurement, Power BI dashboard.',
            },
        ],
        stack: ['PostgreSQL', 'Python', 'SQL', 'Docker', 'Makefile', 'Power BI'],
        links: [
            {kind: 'gitlab', url: ''}, // TODO: GitLab repository
        ],
    },
    {
        slug: 'macroeconomic-forecasting-benin',
        type: 'data',
        featured: true,
        year: '2024',
        title: {fr: 'Prévision macroéconomique du Bénin', en: 'Macroeconomic Forecasting for Benin'},
        short: {fr: 'Prévision macroéconomique', en: 'Macroeconomic Forecasting'},
        status: {fr: 'Mémoire de master, ENEAM', en: 'Master’s thesis, ENEAM'},
        pitch: {
            fr: 'Prévoir le PIB, le chômage et l’inflation (IPC) du Bénin.',
            en: 'Forecasting GDP, unemployment and inflation (CPI) for Benin.',
        },
        done: [
            {
                fr: 'Données de l’API de la Banque mondiale, projections 2024 – 2033 et interface de prédiction.',
                en: 'Data from the World Bank API, projections for 2024 – 2033 and a prediction interface.',
            },
            {
                fr: 'Comparaison de la régression linéaire, de Random Forest, XGBoost et LSTM sur RMSE, MAE, MAPE et R² ; Random Forest retenu (R² = 0,90).',
                en: 'Compared linear regression, Random Forest, XGBoost and LSTM on RMSE, MAE, MAPE and R²; Random Forest selected (R² = 0.90).',
            },
        ],
        stack: ['Python', 'scikit-learn', 'XGBoost', 'Keras'],
        methods: ['Regression'],
        links: [
            {kind: 'thesis', url: ''}, // TODO: thesis PDF
            {kind: 'gitlab', url: ''}, // TODO: GitLab repository
        ],
    },
    {
        slug: 'erp-innova',
        type: 'software',
        title: {fr: 'ERP Innova', en: 'ERP Innova'},
        short: {fr: 'ERP Innova', en: 'ERP Innova'},
        status: {fr: 'En ligne', en: 'Live'},
        pitch: {
            fr: 'Un ERP modulaire : RH, stock, commercial, comptabilité générale, comptabilité analytique et suivi-évaluation, chaque module avec ses tableaux de bord de gestion.',
            en: 'A modular ERP: HR, inventory, sales, general accounting, cost accounting, and monitoring and evaluation, each module with its management dashboards.',
        },
        stack: ['Symfony', 'PHP', 'MySQL'],
        links: [{kind: 'site', url: 'https://innova.bj/focus-erp.html'}],
    },
    {
        slug: 'sig',
        type: 'software',
        title: {fr: 'SIG — Système intégré de gestion', en: 'SIG — Integrated Management System'},
        short: {fr: 'SIG', en: 'SIG'},
        pitch: {
            fr: 'Un système de gestion pour COSIT Bénin, qui réunit les ressources, les processus et les données de l’organisation sur une seule plateforme.',
            en: 'A management system for COSIT Benin that brings together the organisation’s resources, processes and data in one platform.',
        },
        stack: ['Symfony', 'PHP', 'MySQL'],
        links: [{kind: 'site', url: 'https://cosit-benin.com/#overview'}],
    },
    {
        slug: 'myschool',
        type: 'software',
        title: {fr: 'MySchool', en: 'MySchool'},
        short: {fr: 'MySchool', en: 'MySchool'},
        status: {fr: 'Projet personnel', en: 'Personal project'},
        pitch: {
            fr: 'Un logiciel de gestion scolaire pour tous les niveaux, du primaire à l’université : administration, pédagogie et logistique.',
            en: 'School management software for every level, from primary school to university: administration, teaching and logistics.',
        },
        stack: [],
        links: [],
    },
    {
        slug: 'sondyn',
        type: 'software',
        title: {fr: 'Sondyn', en: 'Sondyn'},
        short: {fr: 'Sondyn', en: 'Sondyn'},
        status: {fr: 'Commande, en collaboration', en: 'Commissioned, in collaboration'},
        pitch: {
            fr: 'Une application de sondage, y compris électoral : collecte les réponses et les analyse.',
            en: 'A survey application, including election polls: collects responses and analyses them.',
        },
        stack: ['Symfony', 'PHP'],
        links: [],
    },
    {
        slug: 'agcc',
        type: 'software',
        title: {fr: 'AGCC — Gestion des cartes consulaires', en: 'AGCC — Consular Card Management'},
        short: {fr: 'AGCC', en: 'AGCC'},
        status: {fr: 'Projet de fin de stage', en: 'End-of-internship project'},
        pitch: {
            fr: 'Édite et imprime les cartes consulaires des ressortissants burkinabè entrant au Bénin. Déployé sur l’intranet du client.',
            en: 'Issues and prints consular cards for Burkinabé citizens entering Benin. Deployed on the client’s intranet.',
        },
        stack: ['Laravel', 'PHP', 'MySQL'],
        links: [],
    },
    {
        slug: 'agtt',
        type: 'software',
        title: {fr: 'AGTT — Gestion des titres d’accès temporaires', en: 'AGTT — Temporary Access Pass Management'},
        short: {fr: 'AGTT', en: 'AGTT'},
        status: {fr: 'Projet de fin de stage', en: 'End-of-internship project'},
        pitch: {
            fr: 'Délivre rapidement les titres d’accès temporaires au Port Autonome de Cotonou.',
            en: 'Quickly issues temporary access passes to the Port Autonome de Cotonou.',
        },
        stack: ['Laravel', 'PHP', 'MySQL'],
        links: [],
    },
];

export const tools = (p) => [...p.stack, ...(p.methods || [])];
export const projectsUsing = (tool) => projects.filter((p) => tools(p).includes(tool));
export const allTools = [...new Set(projects.flatMap(tools))].sort((a, b) => a.localeCompare(b));
