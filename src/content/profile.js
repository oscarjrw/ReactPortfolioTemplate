// Identity, contact details and biography. Every {fr, en} pair is picked by t() in src/i18n.js.

export const profile = {
    name: 'Oscar Junior Wagoussi',
    email: 'oscarjrw@gmail.com',
    phone: '+33 7 59 18 08 00',
    phoneHref: 'tel:+33759180800',
    location: {fr: 'Rennes, France', en: 'Rennes, France'},
    linkedin: 'https://www.linkedin.com/in/oscarjrw',
    gitlab: 'https://gitlab.com/oscarjrw',
    otherSocials: [
        {label: 'X / Twitter', link: 'https://twitter.com/oscarjrw'},
        {label: 'Instagram', link: 'https://www.instagram.com/osk.junior/'},
        {label: 'Facebook', link: 'https://web.facebook.com/profile.php?id=100073238625607'},
    ],
    cv: {
        fr: `${process.env.PUBLIC_URL}/cv/CV_Oscar_Wagoussi.pdf`,
        en: `${process.env.PUBLIC_URL}/cv/CV_Oscar_Wagoussi_EN.pdf`,
    },
    role: {
        fr: 'Développeur full stack · Data & Business Intelligence',
        en: 'Full-stack developer · Data & Business Intelligence',
    },
    pitch: {
        fr: 'J’ai construit des logiciels qui font tourner des organisations, dont un ERP complet : RH, stock, commercial, comptabilité générale, comptabilité analytique et suivi-évaluation. Je construis maintenant les pipelines et les modèles qui les aident à décider.',
        en: 'I built software organisations run on, including a complete ERP: HR, inventory, sales, general accounting, cost accounting, and monitoring and evaluation. Now I build the pipelines and models that help them decide.',
    },
    availability: {
        fr: 'Je cherche un stage de data engineer, data scientist, data analyst ou ingénieur BI, à partir de mars 2027',
        en: 'Looking for an internship as a data engineer, data scientist, data analyst or BI engineer, from March 2027',
    },
    aboutLead: {
        fr: 'J’ai construit les logiciels qui produisent les données. Ma passion, aujourd’hui, c’est tout ce qu’elles peuvent nous apprendre.',
        en: 'I built the software that produces the data. What drives me today is everything that data can teach us.',
    },
    chapters: [
        {
            side: 'software',
            title: {fr: 'Le logiciel, mes fondations', en: 'Software, my foundations'},
            text: [
                {
                    fr: 'Développeur full stack, je travaille surtout en freelance ces dernières années, pour des clients et des secteurs variés : COSIT et Innova Sarl, mais aussi d’autres entreprises et porteurs de projets. J’ai conçu et livré des logiciels de gestion complets, dont un ERP (RH, stock, commercial, comptabilité générale, comptabilité analytique et suivi-évaluation), un système intégré de gestion et une plateforme scolaire.',
                    en: 'As a full-stack developer, I have mostly worked freelance in recent years, for a range of clients and sectors: COSIT and Innova Sarl, but also other companies and project owners. I designed and delivered complete business software, including an ERP (HR, inventory, sales, general accounting, cost accounting, and monitoring and evaluation), an integrated management system and a school platform.',
                },
                {
                    fr: 'J’en garde une force rare en data : je sais mener un produit du premier échange avec le client jusqu’à sa mise en production.',
                    en: 'It left me with a strength that is rare in data: I can take a product from the first conversation with the client all the way to production.',
                },
            ],
        },
        {
            side: 'data',
            title: {fr: 'La data, ma passion', en: 'Data, my passion'},
            text: [
                {
                    fr: 'Derrière chaque facture, chaque mouvement de stock, chaque écriture comptable, il y a une question : que disent ces chiffres, et que peut-on anticiper ? J’ai voulu savoir y répondre. J’ai obtenu un master en Business Intelligence, avec un mémoire qui compare quatre familles de modèles pour prévoir le PIB, le chômage et l’inflation du Bénin.',
                    en: 'Behind every invoice, every stock movement, every accounting entry, there is a question: what do these numbers say, and what can we anticipate? I wanted to be able to answer it. I earned a master’s degree in Business Intelligence, with a thesis comparing four families of models to forecast GDP, unemployment and inflation in Benin.',
                },
                {
                    fr: 'Depuis, je construis des pipelines de bout en bout. Mon indice de vulnérabilité carburant suit les prix toutes les 10 minutes pour montrer où le plein pèse le plus sur les ménages. C’est ce que j’aime : partir de données brutes et arriver à une réponse que tout le monde comprend.',
                    en: 'Since then, I have been building pipelines end to end. My fuel vulnerability index follows prices every 10 minutes to show where filling up weighs most on households. That is what I love: starting from raw data and reaching an answer everyone understands.',
                },
            ],
        },
        {
            side: 'ai',
            title: {fr: 'L’IA, mon cap', en: 'AI, where I am heading'},
            text: [
                {
                    fr: 'Une IA ne vaut que par les données qui la nourrissent et par le logiciel qui la met entre les mains des gens. Je travaille déjà à ces deux extrémités. Après la régression, les forêts aléatoires, XGBoost et les réseaux LSTM, je veux aller plus loin : concevoir des systèmes d’IA fiables, utiles, et qui tiennent en production.',
                    en: 'An AI is only as good as the data that feeds it and the software that puts it in people’s hands. I already work at both ends. After regression, random forests, XGBoost and LSTM networks, I want to go further: designing AI systems that are reliable, useful, and hold up in production.',
                },
            ],
        },
    ],
    closing: {
        title: {fr: 'Travaillons ensemble', en: 'Let’s work together'},
        text: {
            fr: 'Je cherche un stage de data engineer, data scientist, data analyst ou ingénieur BI, à partir de mars 2027. Si vous voulez quelqu’un qui comprend le métier, sait coder et prend les données au sérieux, écrivez-moi.',
            en: 'I am looking for an internship as a data engineer, data scientist, data analyst or BI engineer, from March 2027. If you want someone who understands the business, can code and takes data seriously, write to me.',
        },
    },
    strengths: [
        {
            title: {fr: 'Je pense système', en: 'I think in systems'},
            text: {
                fr: 'Un pipeline est un logiciel : versionné, testé, conteneurisé, déployé. C’est mon métier d’origine.',
                en: 'A pipeline is software: versioned, tested, containerised, deployed. That is the trade I come from.',
            },
        },
        {
            title: {fr: 'Je connais le métier', en: 'I know the business side'},
            text: {
                fr: 'RH, stock, commercial, comptabilité, suivi-évaluation, scolarité : j’ai modélisé ces domaines avant d’en analyser les chiffres.',
                en: 'HR, inventory, sales, accounting, monitoring and evaluation, schooling: I modelled these domains before analysing their numbers.',
            },
        },
        {
            title: {fr: 'Je vérifie', en: 'I check'},
            text: {
                fr: 'Empreintes des sources, requêtes de preuve, métriques comparées : un chiffre doit pouvoir se défendre.',
                en: 'Source fingerprints, proof queries, compared metrics: a number has to be able to defend itself.',
            },
        },
        {
            title: {fr: 'Je transmets', en: 'I pass it on'},
            text: {
                fr: 'J’ai enseigné l’informatique et Python à l’université. Expliquer simplement une chose compliquée fait partie du métier.',
                en: 'I taught computer science and Python at university. Explaining a complicated thing simply is part of the job.',
            },
        },
    ],
    hobbies: [
        {emoji: '🎥', label: {fr: 'Cinéma', en: 'Movies'}},
        {emoji: '🌶', label: {fr: 'Cuisine', en: 'Cooking'}},
        {emoji: '⚽', label: {fr: 'Football', en: 'Football'}},
        {emoji: '🎾', label: {fr: 'Tennis', en: 'Tennis'}},
        {emoji: '🧩', label: {fr: 'Rubik’s cube', en: 'Rubik’s cube'}},
        {emoji: '♟️', label: {fr: 'Jeu de dames', en: 'Draughts'}},
        {emoji: '🔤', label: {fr: 'Scrabble', en: 'Scrabble'}},
        {emoji: '📺', label: {fr: 'Des chiffres et des lettres', en: 'Des chiffres et des lettres (TV quiz)'}},
        {emoji: '💻', label: {fr: 'Découvrir de nouvelles technos', en: 'Learning new tech'}},
    ],
};
