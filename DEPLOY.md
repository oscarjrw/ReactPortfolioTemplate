# Mise en ligne de oscarwagoussi.tech

## Le choix : pas de conteneur pour le portfolio

Constaté de l'extérieur le 25 novembre 2026 : le VPS `2.25.16.4` a déjà nginx 1.28.3 (Ubuntu) sur les ports 80 et 443, avec un certificat Let's Encrypt. Il sert `ivc.oscarwagoussi.tech`.

Le portfolio n'est que des fichiers statiques. On ajoute un site à ce nginx, à côté d'IVC. Docker sert seulement à compiler : le VPS récupère le code sur GitHub, le compile dans un conteneur Node jetable, et nginx sert le résultat. Un conteneur de plus ajouterait un proxy et de la mémoire sans rien apporter.

```text
                     nginx (VPS)
ivc.oscarwagoussi.tech  ->  Streamlit, dans Docker
oscarwagoussi.tech      ->  /var/www/portfolio/current (fichiers)
```

Remplacer `USER` par ton utilisateur SSH. **[Mac]** et **[VPS]** indiquent où taper chaque commande.

## 1. [Mac] Relire, committer, pousser sur GitHub

- [ ] Les deux CV dans `public/cv/` (texte dans `cv/build.js`, puis `npm run cv`).
- [ ] Les liens GitLab et mémoire dans `src/content/projects.js` (chercher `TODO`).
- [ ] Le site en local : `npm start`.

```bash
git add -A
git commit -m "Deploiement depuis GitHub"
git push -u origin refonte-2026
```

Ne pas pousser sur `master` tout de suite : si Netlify suit cette branche, la refonte y partirait aussi.

## 2. [VPS] Vérifier l'existant

```bash
ssh USER@2.25.16.4
sudo nginx -t
ls -l /etc/nginx/sites-enabled
sudo grep -rn "server_name" /etc/nginx/sites-enabled
```

`oscarwagoussi.tech` et `www.oscarwagoussi.tech` ne doivent être déclarés nulle part. Si l'un l'est déjà, par exemple dans le site d'IVC, le retirer de là d'abord.

## 3. DNS, dans hPanel

Domaines, `oscarwagoussi.tech`, Zone DNS :

| Type | Nom | Avant | Après |
|---|---|---|---|
| A | `@` | 2.57.91.91 (parking) | **2.25.16.4** |
| CNAME | `www` | oscarwagoussi.tech | ne rien changer |
| A | `ivc` | 2.25.16.4 | ne rien changer |

Ne pas toucher aux enregistrements MX et TXT. [Mac] Attendre que ceci réponde `2.25.16.4` :

```bash
dig +short @1.1.1.1 oscarwagoussi.tech
```

## 4. [VPS] Cloner le projet

Le dépôt GitHub est public, aucun identifiant n'est nécessaire.

```bash
sudo mkdir -p /opt/portfolio /var/www/portfolio
sudo chown -R "$(id -un):" /opt/portfolio /var/www/portfolio
git clone -b refonte-2026 https://github.com/oscarjrw/ReactPortfolioTemplate.git /opt/portfolio
```

## 5. [VPS] Compiler et publier

```bash
cd /opt/portfolio
./deploy/deploy.sh
```

La dernière ligne doit être `Published ...`. Si Docker répond « permission denied », ton utilisateur n'est pas dans le groupe `docker` : `sudo usermod -aG docker "$(id -un)"`, puis se reconnecter. Si le build est tué (« Killed »), il manque de la mémoire : vérifier avec `free -h`.

## 6. [VPS] Activer le site

```bash
sudo cp /opt/portfolio/deploy/nginx.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo nginx -t && sudo systemctl reload nginx
```

Si `nginx -t` échoue, rien n'est rechargé et IVC continue de tourner. Pour revenir en arrière : `sudo unlink /etc/nginx/sites-enabled/portfolio`.

## 7. [VPS] HTTPS

Seulement quand l'étape 3 répond bien `2.25.16.4`.

```bash
sudo certbot --nginx -d oscarwagoussi.tech -d www.oscarwagoussi.tech --redirect
sudo certbot renew --dry-run
```

Ce certificat est indépendant de celui d'IVC. Certbot modifie `/etc/nginx/sites-available/portfolio` : ne plus recopier `deploy/nginx.conf` par-dessus ensuite.

## 8. [Mac] Vérifier

```bash
curl -sI https://oscarwagoussi.tech | head -15
curl -sI https://www.oscarwagoussi.tech | grep -i location
curl -s -o /dev/null -w "%{http_code}\n" https://oscarwagoussi.tech/projects/erp-innova
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" https://oscarwagoussi.tech/cv/CV_Oscar_Wagoussi.pdf
curl -s -o /dev/null -w "%{http_code}\n" https://ivc.oscarwagoussi.tech
```

Attendu : 200 avec `content-security-policy`, redirection vers `oscarwagoussi.tech`, 200, `200 application/pdf`, 200.

- [ ] La visite guidée se lance en navigation privée, sur ordinateur et sur téléphone.
- [ ] Le bouton de démo du projet carburant ouvre IVC.

## 9. Quitter Netlify

Une fois l'étape 8 validée, et pas avant :

1. Mettre à jour l'adresse du portfolio sur LinkedIn, GitLab et ailleurs.
2. Rediriger l'ancienne adresse quelques mois : remplacer le contenu de `public/_redirects` par `/*  https://oscarwagoussi.tech/:splat  301!` et publier cela sur Netlify.
3. Désactiver le déploiement automatique Netlify, puis fusionner `refonte-2026` dans `master` et pousser.
4. [VPS] Suivre `master` : `cd /opt/portfolio && git fetch && git switch master && ./deploy/deploy.sh`.

## Ensuite : mettre à jour, revenir en arrière

[Mac] `git push`, puis [VPS] :

```bash
cd /opt/portfolio && ./deploy/deploy.sh
```

Retour arrière :

```bash
ls /var/www/portfolio/releases
ln -sfn /var/www/portfolio/releases/VERSION /var/www/portfolio/current
```
