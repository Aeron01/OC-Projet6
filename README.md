# Portfolio architecte Sophie Bluel

Sixième projet du parcours "D'intégrateur web" chez OpenClassroom. L'objectif est de créez une page web dynamique avec JavaScript et NodeJS.

Vous pouvez retrouver la maquette [ici](https://www.figma.com/file/kfKHknHySoTibZfdolGAX6/Desktop?type=design&node-id=0-1&t=ybeVInBB1T6692ps-0)

![screenshot du site](./screenshot/Capture%20d%E2%80%99%C3%A9cran%20du%202023-06-21-1.png)

## Objectifs

Développer :

1. la page de présentation des travaux de l'architecte (à partir du HTML fourni) ;
2. la page de connexion de l'administrateur du site (le client) (code à créer de zéro) ;
3. les modales permettant d'uploader de nouveaux médias et de les supprimés (code à créer aussi de zéro) ;
4. la possibilité de supprimé toute la galerie (code à créer aussi de zéro).

## Livrables

### Pages à développer et intégrer selon les maquettes

- **Page de login**
- **Les modales permettant d'uploader de nouveau médias et de les supprimés, ainsi que la suppression de la galerie**

### Développement

**Page de login**

- **Modale**

- **Pages de présentation des travaux de l'architecte**

- **Suppression d'un médias ou du projet**

## Technologies

**Autorisés:** HTML / CSS / Sass / NodeJS

**Recommandée:** HTML / CSS / Javascript / NodeJS

**Interdit:** Frameworks CSS / Inline CSS

## Notes

**Polices :**

- Logo & titres: Syne
- Texte: Work Sans

**Couleurs :**

- Primaire: #B1663C
- Secondaire: #1D6154
- Tertiaire: #3D3D3D

**Contraintes :**

- Maquette desktop : oui
- Utilisation de NodeJS : oui
- Validation W3C HTML : pas obligatoire dans ce projet mais à passer de préférence, warning autorisés
- Validation W3C CSS : pas obligatoire dans ce projet mais à passer de préférence, warning autorisés
- Compatibilité : Dernières versions de Chrome, Firefox & Safari

## Convention nommage commit

Gitmoji https://gitmoji.dev/

## Tester le projet

Pour tester simplement & rapidement, je vous invite à :

- Récuperer le Backend [ici](https://github.com/OpenClassrooms-Student-Center/Portfolio-architecte-sophie-bluel.git)

Pour pour pouvoir effectuer vos tests sans devoir récupérer la base de données dans le fichier zip téléchargé, je vous recommande d'effectuer cette procédure qui vous permettra de sauvegarder la base de données et de la réinitialiser en cas de besoin.

- Dans le répertoire racine du Backend, faite une copie du fichier "database.sqlite" et, la renomer en "database.sqlite.bak" ;

- Ouvrez avec un editeur de texte ou votre editeur de code, le fichier "package.json" et ajouter après la ligne 8 celle ligne :

"backup": "rm -f database.sqlite && cp -f database.sqlite.bak database.sqlite"

- Rajouter une virgule à la fin de la ligne 8 et sauvegarder le fichier.

- Voici la commande a taper dans le terminal du bakend pour récupérer le projet par defaut du serveur :

```terminal
npm run backup

```

- lancer le serveur Backend :
  Ouvrir un terminal dans le repertoir du serveur backend.

Installer les dépendances du projet.

```terminal
npm install
```

- lancer le serveur :

````terminal
npm start
```

- Clonez le projet :

```terminal
git clone https://github.com/Aeron01/OC-Projet6.git
```

- Compte de test pour Sophie Bluel.

```terminal
email: sophie.bluel@test.tld

password: S0phie
````

- Lancer "liveServer" sur index.html.

_Autres capture d'écran du site terminé_

![Autre Screenshot](./screenshot/Capture%20d%E2%80%99%C3%A9cran%20du%202023-06-21-1.png)
![](./screenshot/Capture%20d%E2%80%99%C3%A9cran%20du%202023-06-21-2.png)
![](./screenshot/Capture%20d%E2%80%99%C3%A9cran%20du%202023-06-21-3.png)
![](./screenshot/Capture%20d%E2%80%99%C3%A9cran%20du%202023-06-21-4.png)
![](./screenshot/Capture%20d%E2%80%99%C3%A9cran%20du%202023-06-21-5.png)
![](./screenshot/Capture%20d%E2%80%99%C3%A9cran%20du%202023-06-21-6.png)
![](./screenshot/Capture%20d%E2%80%99%C3%A9cran%20du%202023-06-21-7.png)
![](./screenshot/Capture%20d%E2%80%99%C3%A9cran%20du%202023-06-21-8.png)
![](./screenshot/Capture%20d%E2%80%99%C3%A9cran%20du%202023-06-21-9.png)
![](./screenshot/Capture%20d%E2%80%99%C3%A9cran%20du%202023-06-21-10.png)
