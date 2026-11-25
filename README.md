# Portfolio — Oscar Junior Wagoussi

Bilingual (FR / EN) portfolio: guided tour, interactive pipeline, filterable projects and a small in-browser SQL console.

```bash
npm install
npm start        # local site
npm test         # SQL engine tests
npm run build    # production build
npm run cv       # rebuild the CV PDFs (needs Google Chrome)
```

| To change | Edit |
|---|---|
| Bio, contact, hobbies | `src/content/profile.js` |
| Projects and their links | `src/content/projects.js` |
| Skills, experience, education, home diagram | `src/content/journey.js` |
| Interface wording, guided tour | `src/content/ui.js` |
| CV | `cv/build.js` |

Deployment: see [DEPLOY.md](DEPLOY.md).

Originally started from the React portfolio template by [Payton Pierce](https://github.com/paytonjewell).
