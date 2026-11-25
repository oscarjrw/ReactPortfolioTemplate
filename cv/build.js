// Builds the two CV PDFs into public/cv. Edit the text below, then run: npm run cv
// Needs Google Chrome. Set CHROME=/path/to/chrome if it is not in the default place.
const fs = require('fs');
const os = require('os');
const path = require('path');
const {execFileSync} = require('child_process');

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = path.join(__dirname, '..', 'public', 'cv');

const cv = {
    fr: {
        file: 'CV_Oscar_Wagoussi.pdf',
        headline: 'Data & Business Intelligence · Développeur full stack',
        goal: 'Stage de fin d’études à partir de mars 2027 : data engineer, data scientist, data analyst ou ingénieur BI',
        profile: 'Développeur full stack et titulaire d’un master en Business Intelligence. J’ai conçu et livré des logiciels de gestion, de l’interface à la base de données et au déploiement. La data est aujourd’hui ma passion : collecter, modéliser, contrôler, puis produire des indicateurs et des prédictions. Mon cap : l’intelligence artificielle, des données jusqu’à la mise en production.',
        h: {profile: 'Profil', edu: 'Formation', data: 'Projets data', exp: 'Expérience', soft: 'Logiciels réalisés', skills: 'Compétences'},
        edu: [
            ['Master 2 MIAGE, Data et Business Intelligence', 'Université de Rennes, ISTIC', '2026 – 2027'],
            ['Master en Business Intelligence', 'ENEAM, Université d’Abomey-Calavi, Bénin', '2022 – 2024'],
            ['Licence en informatique de gestion', 'ENEAM, Université d’Abomey-Calavi, Bénin', '2014 – 2017'],
        ],
        data: [
            ['Indice de vulnérabilité carburant des communes françaises', 'En cours, 2026', [
                'Collecte du flux national des prix et ruptures toutes les 10 minutes, croisé avec les revenus (INSEE) et le parc automobile (SDES).',
                'Historisation SCD type 2, jointure spatiale PostGIS, schéma en étoile dbt orchestré par Airflow, Docker, intégration continue.',
                'Score par commune (effort budgétaire, dépendance, accès) restitué sur une carte interactive.',
            ], 'Python, PostgreSQL / PostGIS, dbt, Airflow, Docker, Streamlit'],
            ['Observatoire de dérive des données DVF', 'Projet d’équipe, 2026 – 2027', [
                'Base PostgreSQL 16 sous Docker, chargement automatisé (psycopg, COPY), traçabilité des sources par SHA-256.',
                'Référentiel des communes INSEE et requêtes SQL de preuve automatisées ; en cours : détection de dérive, précision / rappel, Power BI.',
            ], 'PostgreSQL, Python, Docker, Makefile, Power BI'],
            ['Prévision macroéconomique du Bénin', 'Mémoire de master, 2024', [
                'PIB, chômage et inflation : régression linéaire, Random Forest, XGBoost et LSTM comparés sur RMSE, MAE, MAPE et R² ; Random Forest retenu (R² = 0,90). Projections 2024 – 2033 et interface de prédiction.',
            ], 'Python, scikit-learn, XGBoost, Keras'],
        ],
        exp: [
            ['Développeur full stack, freelance', 'clients variés, dont COSIT, Innova Sarl et Dev ITC · Bénin', '2020 – aujourd’hui', 'Conception de bases de données, développement front et back, intégration de services tiers, déploiement et intégration continue.'],
            ['Enseignant vacataire', 'ENEAM · Bénin', '', 'Introduction à l’informatique et Python, première année de licence.'],
            ['Développeur web, stages', 'Solutech Corporate, Port Autonome de Cotonou, SBEE · Bénin', '2017 – 2019', ''],
        ],
        soft: '<b>ERP Innova</b> (RH, stock, commercial, comptabilité générale, comptabilité analytique et suivi-évaluation ; Symfony, MySQL) · <b>SIG</b> (gestion intégrée, COSIT Bénin ; Symfony, MySQL) · <b>MySchool</b> (gestion scolaire, projet personnel) · <b>Sondyn</b> (sondages et analyse des réponses ; Symfony)',
        skills: [
            ['Langages', 'Python, SQL, PHP, JavaScript / TypeScript'],
            ['Back-end', 'Symfony, Laravel, Node.js'],
            ['Front-end', 'HTML / CSS, React'],
            ['Modélisation', 'UML'],
            ['Bases de données', 'PostgreSQL / PostGIS, MySQL, MongoDB, DuckDB'],
            ['Intégration', 'dbt, Airflow, Talend, pandas'],
            ['BI', 'Schéma en étoile, Power BI, Metabase'],
            ['Machine learning', 'scikit-learn, XGBoost, Keras (régression, classification, clustering)'],
            ['DevOps', 'Docker, GitLab CI/CD, Linux, nginx, VPS'],
        ],
    },
    en: {
        file: 'CV_Oscar_Wagoussi_EN.pdf',
        headline: 'Data & Business Intelligence · Full-stack developer',
        goal: 'End-of-studies internship from March 2027: data engineer, data scientist, data analyst or BI engineer',
        profile: 'Full-stack developer with a master’s degree in Business Intelligence. I designed and delivered business software, from the interface to the database and deployment. Data is now my passion: ingesting, modelling, checking, then producing indicators and predictions. Where I am heading: artificial intelligence, from the data to production.',
        h: {profile: 'Profile', edu: 'Education', data: 'Data projects', exp: 'Experience', soft: 'Software delivered', skills: 'Skills'},
        edu: [
            ['Master 2 MIAGE, Data and Business Intelligence', 'University of Rennes, ISTIC, France', '2026 – 2027'],
            ['Master’s in Business Intelligence', 'ENEAM, University of Abomey-Calavi, Benin', '2022 – 2024'],
            ['Bachelor’s in Business Computing', 'ENEAM, University of Abomey-Calavi, Benin', '2014 – 2017'],
        ],
        data: [
            ['Fuel Vulnerability Index for French Municipalities', 'In progress, 2026', [
                'Collects the national price and shortage feed every 10 minutes, combined with household income (INSEE) and the car fleet (SDES).',
                'SCD type 2 history, PostGIS spatial join, dbt star schema orchestrated by Airflow, Docker, continuous integration.',
                'Scores each municipality (budget effort, dependence, access) on an interactive map.',
            ], 'Python, PostgreSQL / PostGIS, dbt, Airflow, Docker, Streamlit'],
            ['DVF Data Drift Observatory', 'Team project, 2026 – 2027', [
                'PostgreSQL 16 database in Docker, automated loading (psycopg, COPY), source traceability with SHA-256.',
                'INSEE municipality reference and automated SQL proof queries; in progress: drift detection, precision / recall, Power BI.',
            ], 'PostgreSQL, Python, Docker, Makefile, Power BI'],
            ['Macroeconomic Forecasting for Benin', 'Master’s thesis, 2024', [
                'GDP, unemployment and inflation: linear regression, Random Forest, XGBoost and LSTM compared on RMSE, MAE, MAPE and R²; Random Forest selected (R² = 0.90). Projections for 2024 – 2033 and a prediction interface.',
            ], 'Python, scikit-learn, XGBoost, Keras'],
        ],
        exp: [
            ['Full-stack developer, freelance', 'various clients, including COSIT, Innova Sarl and Dev ITC · Benin', '2020 – present', 'Database design, front-end and back-end development, third-party integration, deployment and continuous integration.'],
            ['Part-time lecturer', 'ENEAM · Benin', '', 'Introduction to computer science and Python, first-year undergraduates.'],
            ['Web developer, internships', 'Solutech Corporate, Port Autonome de Cotonou, SBEE · Benin', '2017 – 2019', ''],
        ],
        soft: '<b>ERP Innova</b> (HR, inventory, sales, general accounting, cost accounting, and monitoring and evaluation; Symfony, MySQL) · <b>SIG</b> (integrated management, COSIT Benin; Symfony, MySQL) · <b>MySchool</b> (school management, personal project) · <b>Sondyn</b> (surveys and response analysis; Symfony)',
        skills: [
            ['Languages', 'Python, SQL, PHP, JavaScript / TypeScript'],
            ['Back-end', 'Symfony, Laravel, Node.js'],
            ['Front-end', 'HTML / CSS, React'],
            ['Modelling', 'UML'],
            ['Databases', 'PostgreSQL / PostGIS, MySQL, MongoDB, DuckDB'],
            ['Integration', 'dbt, Airflow, Talend, pandas'],
            ['BI', 'Star schema, Power BI, Metabase'],
            ['Machine learning', 'scikit-learn, XGBoost, Keras (regression, classification, clustering)'],
            ['DevOps', 'Docker, GitLab CI/CD, Linux, nginx, VPS'],
        ],
    },
};

const css = `
@page { size: A4; margin: 10mm 14mm; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font: 8.9pt/1.36 Helvetica, Arial, sans-serif; color: #14212b; }
h1 { font-size: 22pt; letter-spacing: -.02em; line-height: 1.1; }
.headline { font-size: 11.5pt; color: #006fae; font-weight: bold; margin-top: 3pt; }
.contact { margin-top: 5pt; color: #40566a; }
.contact a { color: inherit; text-decoration: none; }
.goal { margin-top: 8pt; padding: 5pt 9pt; background: #e8f3fa; font-weight: bold; }
h2 { font-size: 10.5pt; color: #006fae; border-bottom: 1pt solid #b9d3e4; padding-bottom: 2pt; margin: 8.5pt 0 4pt; }
.row { display: flex; justify-content: space-between; gap: 12pt; }
.row + .row { margin-top: 2.5pt; }
.when { color: #40566a; white-space: nowrap; }
.item { break-inside: avoid; }
.item + .item { margin-top: 6pt; }
ul { padding-left: 12pt; }
.muted { color: #40566a; }
table { border-collapse: collapse; }
th { text-align: left; padding: 0 14pt 1.5pt 0; white-space: nowrap; vertical-align: top; }
td { padding-bottom: 1.5pt; }`;

const html = (lang, c) => `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>CV Oscar Junior Wagoussi</title><style>${css}</style></head><body>
<h1>Oscar Junior Wagoussi</h1>
<p class="headline">${c.headline}</p>
<p class="contact">Rennes, France · +33 7 59 18 08 00 · <a href="mailto:oscarjrw@gmail.com">oscarjrw@gmail.com</a> · <a href="https://www.linkedin.com/in/oscarjrw">linkedin.com/in/oscarjrw</a> · <a href="https://gitlab.com/oscarjrw">gitlab.com/oscarjrw</a></p>
<p class="goal">${c.goal}</p>
<h2>${c.h.profile}</h2><p>${c.profile}</p>
<h2>${c.h.edu}</h2>${c.edu.map(([d, s, w]) => `<div class="row"><p><b>${d}</b>, ${s}</p><p class="when">${w}</p></div>`).join('')}
<h2>${c.h.data}</h2>${c.data.map(([n, w, b, s]) => `<div class="item"><div class="row"><b>${n}</b><p class="when">${w}</p></div><ul>${b.map((x) => `<li>${x}</li>`).join('')}</ul><p class="muted">${s}</p></div>`).join('')}
<h2>${c.h.exp}</h2>${c.exp.map(([r, o, w, x]) => `<div class="item"><div class="row"><p><b>${r}</b>, ${o}</p><p class="when">${w}</p></div>${x ? `<p>${x}</p>` : ''}</div>`).join('')}
<h2>${c.h.soft}</h2><p>${c.soft}</p>
<h2>${c.h.skills}</h2><table>${c.skills.map(([a, x]) => `<tr><th>${a}</th><td>${x}</td></tr>`).join('')}</table>
</body></html>`;

const french = (s) => s.replace(/ ([:;?!»])(?=\s|$)/gm, ' $1');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-'));
fs.mkdirSync(OUT, {recursive: true});
Object.entries(cv).forEach(([lang, c]) => {
    const page = path.join(tmp, `${lang}.html`);
    const markup = html(lang, c);
    fs.writeFileSync(page, lang === 'fr' ? markup.replace(/<body>[\s\S]*/, french) : markup);
    execFileSync(CHROME, ['--headless', `--user-data-dir=${path.join(tmp, 'profile')}`, '--no-pdf-header-footer', `--print-to-pdf=${path.join(OUT, c.file)}`, `file://${page}`], {stdio: 'ignore'});
    console.log(`public/cv/${c.file}`);
});
