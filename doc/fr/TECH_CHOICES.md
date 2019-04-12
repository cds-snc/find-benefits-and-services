## (fra) Tech choices

### Table des matières

- [Next.JS et le rendu côté serveur](#nextjs-et-le-rendu-côté-serveur)
- [AirTable](/doc/fr/AIRTABLE.md)
- [Heroku](#heroku)
- [CircleCI](#circleci)
- [Développement piloté par les tests](#développement-piloté-par-les-tests)
- [BrowserStack](#browserstack)
- [Déploiement](#déploiement)
- [Traductions](#traductions)
- [Snyk](#snyk)
- [Tests](#tests)
- [Documentation sur le code](#documentation-sur-le-code)
- [Contribuer au répertoire de GitHub](#contribuer-au-répertoire-de-github)
- [Programmation en binôme](#programmation-en-binôme)
- [Notifications de déploiement](#notifications-de-déploiement)

### Next.JS et le rendu côté serveur

#### De quoi s’agit-il?

[Next.JS](https://github.com/zeit/next.js/ "Next.JS") (en anglais) est un cadre JavaScript pour des applications React rendues côté serveur.

#### Pourquoi l’utilisons-nous?

La justification du choix de Next.JS découle des critères suivants :

- utilisation de JavaScript à la fois dans la partie frontale (_front-end_) et la partie dorsale (_back-end_);
- capacité de rendre des pages entièrement au format HTML et CSS sur le serveur;
- soutien solide des développeurs et vaste environnement tiers.

Pour fournir l’expérience utilisateur la plus élégante et moderne possible, [ReactJS](https://reactjs.org/ "ReactJS") a été choisi comme le cadre frontal principal. Traditionnellement, les applications ReactJS sont élaborées comme deux services distincts, l’un du côté serveur et l’autre du côté client, avec des bases de code individuelles et souvent dans différents langages de programmation. Lorsqu’un utilisateur fait une demande par rapport à une application avec une telle architecture, il télécharge généralement un fichier JavaScript groupé, prérempli avec des données, qui s’élargit par la suite et rend tous les fichiers HTML et CSS dans le navigateur de l’utilisateur.

Next.JS diffère dans cette approche en ce sens qu’il peut rendre au préalable ou « rendre au moyen du serveur » les fichiers HTML et CSS avant que le groupe JavaScript soit envoyé au navigateur, et donc fournir une expérience utilisateur plus solide en envoyant des fichiers HTML et CSS avec le JavaScript. Le fichier JavaScript groupé est ensuite élargi en plus des fichiers HTML et CSS déjà existants, permettant la forte interactivité offerte au moyen de ReactJS.

Les avantages sont importants : par exemple, l’expérience de téléchargement est plus rapide puisque les fichiers HTML et CSS venant du serveur s’affichent tout de suite, par rapport à l’attente du fichier JavaScript pour dégrouper et rendre les fichiers HTML et CSS. De plus, si le navigateur n’est pas en mesure d’exécuter le groupe JavaScript à cause d’une incompatibilité (par exemple, l’utilisation d’anciens navigateurs comme IE 10), nous pouvons créer des solutions de rechange à l’aide des fichiers HTML et CSS déjà rendus. Toutefois, le plus important est que l’utilisation de Next.JS permet aux développeurs d’utiliser dans la partie dorsale la même base de code qu’ils utilisent dans la partie frontale de leur application, ce qui permet de réduire considérablement le niveau de complexité.

Enfin, notre évaluation initiale de NextJS a montré qu’il fonctionnait bien avec un certain nombre d’autres composantes de JavaScript, comme les bibliothèques d’interface utilisateur, la recherche et la traduction.

#### Comment puis-je commencer?

Consultez la documentation de démarrage rapide dans notre fichier README.md. Vous pouvez aussi consulter le site du tutoriel de [Next.JS](https://nextjs.org/learn/ "Next.JS") pour en apprendre davantage.

### [AirTable](/doc/fr/AIRTABLE.md)

### Heroku

#### De quoi s’agit-il?

[Heroku](https://www.heroku.com) (en anglais) est une « plateforme comme service » qui permet aux développeurs de développer, d’exécuter et d’exploiter des applications entièrement dans le nuage. En particulier, Heroku permet le déploiement rapide et facile d’applications, soit manuellement au moyen d’une interface de ligne de commandes ou de l’interface Web de Heroku.

#### Pourquoi et comment l’utilisons-nous?

Nous utilisons Heroku à deux fins :

- pour nous permettre de déployer rapidement une branche fixe dans le Web (pour les tests d’utilisation et d’accessibilité, et le Groupe de travail d’ACC);
- pour créer des applications à partir des branches en vue de faciliter l’examen des demandes de tirage.

Pour créer une application ponctuelle :

- Utilisez le bouton « New », dans le coin supérieur droit, et cliquez sur « Create new app ».
- Donnez un nom à l’application et cliquez sur « Create app ».
- La page de l’application s’ouvre. Sous Deploy, connectez l’application à GitHub et à un répertoire précis.
- Sélectionnez une branche à déployer.

De même, Heroku crée automatiquement une application pour chaque demande de tirage dans notre répertoire. Cela est extrêmement utile pour l’examen des codes. Heroku ajoutera un lien vers l’application dans la demande de tirage de GitHub.

Pour configurer des applications d’examen des demandes de tirage, nous utilisons un pipeline Heroku. Dans le tableau de bord :

- Cliquez sur New / Create new pipeline.
- Donnez un nom au pipeline, connectez-le à un répertoire et cliquez sur « Create pipeline ».
- Ajoutez une application existante (ou créez-en une nouvelle) dans les sections Staging ou Production. Les applications d’examen hériteront des variables d’environnement de cette application.
- Cliquez sur « Enable Review Apps ».
- Cochez la case à côté de « Create new review apps for new pull requests automatically ».
- Cliquez sur « Enable ».

#### Comment peut-on y avoir accès?

Pour vous joindre à l’équipe Heroku du SNC, créez un compte Heroku (gratuit) et envoyez un courriel à vac@cds-snc.ca comprenant les détails sur votre compte afin que nous puissions vous ajouter à l’équipe. Veuillez noter que nos applications de demande de tirage sont automatiquement créées par Heroku, par conséquent les développeurs n’ont pas besoin d’un accès Heroku pour que des applications d’examen soient créées pour leurs demandes de tirage.

### CircleCI

#### De quoi s’agit-il?

[CircleCI](https://circleci.com/) (en anglais) est un service infonuagique qui effectue des tests d’intégration continus et un déploiement continu.

#### Pourquoi et comment l’utilisons-nous?

CircleCI est relié à notre répertoire GitHub (voir la [page CircleCI](https://circleci.com/gh/veteransaffairscanada/vac-benefits-directory)) (en anglais) du projet). Pour chaque nouvelle validation (_commit_), CircleCI exécute notre série de tests et signale tous les échecs. Si une validation de la branche maître échoue aux tests, nous en sommes informés sur le canal Slack du SNC `vac-devs`.
Si une validation de la branche maître réussit, CircleCI élabore un dockerfile à partir de la branche maître et l’envoie dans DockerHub. CircleCI est configuré au moyen de [`config.yml`](/.circleci/config.yml).

#### Comment peut-on y avoir accès?

Vous pouvez consulter le rapport de test de validation sans avoir un accès administrateur à notre compte CircleCI, mais vous aurez besoin de cet accès pour modifier certaines parties de la configuration de CircleCI (en particulier, pour ajouter des variables d’environnement à CircleCI). Parlez à l’un des autres développeurs pour obtenir l’accès.

### Développement piloté par les tests

#### De quoi s’agit-il?

Le [développement piloté par les tests](https://fr.wikipedia.org/wiki/Test_driven_development) et d’autres pratiques liées à [Agile](https://fr.wikipedia.org/wiki/M%C3%A9thode_agile) avec un « petit a » constituent un ensemble de cadres et d’outils pour gérer le développement d’un produit logiciel.

#### Pourquoi l’utilisons-nous?

Le développement piloté par les tests permet une approche itérative et continue qui est préférable aux cycles de lancement répartis. Pour faciliter ce processus, nous avons choisi d’utiliser un processus d’[intégration continue](https://fr.wikipedia.org/wiki/Int%C3%A9gration_continue) et de [livraison continue](https://fr.wikipedia.org/wiki/Livraison_continue) selon lequel de nouvelles fonctionnalités et de nouveaux codes sont fréquemment ajoutés au produit, examinés et vérifiés, puis expédiés dès qu’ils sont achevés. On utilise actuellement [https://circleci.com](https://circleci.com) (en anglais) comme plateforme pour exécuter tous nos tests unitaires avant le déploiement. Avec cela, nous utilisons également [https://heroku.com](https://heroku.com) (en anglais) pour créer des versions intermédiaires de notre application aux fins d’examen manuel.

#### Quel est notre processus de développement?

1. On donne aux sprints de développement des périodes de deux semaines.
2. Au début d’un sprint, l’équipe de développement se réunit avec les autres membres de la grande équipe afin de discuter des priorités de développement des nouvelles fonctionnalités.
3. L’équipe de développement examine les problèmes non résolus depuis le dernier sprint et leur accorde la priorité dans les prochains objectifs de développement.
4. Les fonctionnalités sont réparties en problèmes sur GitHub, et les développeurs s’entendent sur le temps que chaque problème pourrait prendre.
5. Les développeurs s’attribuent des problèmes à partir de la liste de problèmes non résolus dans GitHub.
6. Pour résoudre un problème, un développeur :

- consulte une nouvelle branche du `master`;
- élabore la fonctionnalité ou résout le bogue décrit dans le problème;
- valide continuellement le code dans sa branche à des intervalles raisonnables;
- écrit des tests unitaires et d’intégration pour le code qu’il a ajouté;
- modifie ou supprime les tests unitaires et d’intégration pour le code qu’il a modifié;
- exécute une série de tests pour s’assurer que tous les tests sont réussis;
- utilise un outil de couverture de code pour s’assurer que toute la logique importante a été testée;
- valide le code final, pousse le code dans GitHub et ouvre une demande de tirage dans GitHub;
- attend CircleCI pour vérifier que tous nos tests seront réussis;
- effectue des vérifications ponctuelles à l’aide des applications d’examen d’Heroku;
- demande aux autres membres de l’équipe d’examiner la demande de tirage – un seul examen est requis, mais on invite tous les membres de l’équipe à examiner la demande de tirage;
- si d’autres membres de l’équipe ont des commentaires, ils les indiqueront dans GitHub pour que le développeur corrige des erreurs ou en discute;
- d’autres membres de l’équipe approuvent la demande de tirage une fois que toutes les discussions en suspens ont été résolues;
- les demandes de tirage sont ensuite fusionnées dans `master`;
- CircleCI vérifie encore une fois que tous les tests sont réussis sur le `master` à jour et déploie le code en production.

7. Ce processus est répété de façon itérative jusqu’à ce que tous les problèmes pour un sprint soient réglés et qu’une nouvelle série de problèmes puisse être créée ou jusqu’à ce qu’un nouveau sprint démarre.
8. À la fin d’un sprint, l’équipe de développement examine les problèmes et suggère des améliorations pour le prochain sprint.

#### Quels sont les avantages?

Les avantages de ce processus sont que les fonctionnalités sont réparties et examinées par l’ensemble de l’équipe de développement avant le travail. Cela donne la ligne de visée à toute l’équipe sur le travail en cours. De plus, tout le travail en cours est facilement gérable par la personne qui écrit le code, et compréhensible pour la personne qui l’examine. L’utilisation des tests comme pratique de base permet un niveau élevé de confiance dans la fonctionnalité de la base de code. Cela permet également une rétroaction instantanée si un développeur brise la fonctionnalité existante. En fonction de ce niveau de confiance élevé, ce processus favorise un modèle de livraison continue qui veille à ce que les parties prenantes et les clients reçoivent les fonctionnalités une fois qu’elles sont prêtes par rapport au moment où l’on peut planifier leur lancement.

### BrowserStack

#### De quoi s’agit-il?

[BrowserStack](https://www.browserstack.com) (en anglais) est un service infonuagique qui permet l’accès instantané à plus de 1000 appareils et navigateurs réels.

#### Pourquoi et comment l’utilisons-nous?

Nous utilisons BrowserStack pour tester notre application sur d’autres appareils et navigateurs. En particulier, étant donné que nos machines de développement sont des MacBook, nous avons besoin d’une méthode facile pour effectuer des tests sur Windows/Internet Explorer. Nous utilisons BrowserStack de deux façons :

- comme une plateforme en direct pour évaluer l’application manuellement;
- comme un hôte pour les tests automatisés (décrits ci-dessous).

#### Comment peut-on y avoir accès?

Créez un compte personnel sur BrowserStack puis communiquez avec un développeur pour associer votre compte au compte du SNC.

### Déploiement

#### Comment déployons-nous l’application?

Afin de normaliser les environnements entre les tests et la production, nous utilisons [Docker](https://www.docker.com/) (en anglais), qui nous permet de créer les mêmes conditions logicielles dans le pipeline de mise en production. Docker nous permet de créer un environnement précis dans lequel l’application doit s’exécuter, défini au moyen du [Dockerfile](https://github.com/veteransaffairscanada/vac-benefits-directory/blob/master/Dockerfile) (en anglais) dans notre répertoire principal. Docker exécute ce fichier et construit une image de conteneur, que l’on peut ensuite déployer sur n’importe quelle infrastructure qui prend en charge des images de conteneur (Azure, AWS, Google Cloud, entre autres).

#### Quel est le flux de production actuel du déploiement?

Lorsqu’une demande de tirage est approuvée, le développeur fusionne la branche à `master`. CircleCI reçoit un avis et commence à exécuter tous les tests pour l’application. Si tous les tests sont réussis, CircleCI utilise ensuite le fichier exécutable Docker pour construire une image Docker. Il pousse ensuite l’image Docker dans un registre conteneur. Un registre conteneur est tout simplement une collection d’images disponibles à une organisation ou à un utilisateur particulier. Une fois que le registre a reçu l’image, il informe la plateforme de déploiement (Azure dans ce cas) qu’une nouvelle image est disponible. Par la suite, Azure télécharge l’image du registre conteneur et la déploie dans son propre service conteneur. Le service conteneur a déjà été configuré pour accepter certaines demandes de DNS et pour acheminer les demandes de façon appropriée (cela se trouve généralement hors de la portée de cette configuration de déploiement des applications).

#### Comment cela diffère-t-il du flux de production de tests?

Le flux de production de tests est différent du déploiement, mais est aussi lancé par les actions du développeur dans GitHub. Lorsqu’un développeur crée une nouvelle branche de bogues ou de fonctionnalités, il indique à CircleCI d’exécuter des tests sur le code qui se trouve dans la branche. Il déclenche également un développement Heroku afin que d’autres développeurs puissent voir les changements en action sans devoir exécuter la branche localement. Dans l’autre scénario, le développeur fusionne une branche à `master`. Cela avise également CircleCI, mais parce que master déclenche le processus de développement Docker si tous les tests sont réussis. Le résultat du processus de développement Docker est ensuite ce qui est déployé au serveur de production.

Le diagramme suivant démontre les deux flux :

![Test and deploy workflow](https://user-images.githubusercontent.com/867334/44407480-31f3b780-a52c-11e8-97d7-6cf8ad046019.png "Test and deploy workflows")

### Traductions

#### Pourquoi traduisons-nous notre contenu?

Étant donné que le mandat du gouvernement du Canada est d’appuyer les deux langues officielles, nous utilisons `react-18next` [https://react.i18next.com](https://react.i18next.com/ "react-18next") (en anglais) pour nous permettre d’effectuer des traductions à la volée de tout le texte visible sur une page donnée.

#### Comment fonctionne-t-il?

Le processus de traduction de texte consiste à tirer des chaînes `key`-`value` traduites des fichiers JSON statiques qui correspondent aux paramètres régionaux établis pour le navigateur, ou un paramètre `lng` GET établi dans l’adresse URL. Cela exige que des modifications ou des ajouts de chaînes de traduction passent par un cycle `commit` dans Git, ce qui limite l’accessibilité aux propriétaires d’entreprise et aux autres utilisateurs non techniques. Au lieu de cela, nous stockons toutes les chaînes traduisibles dans `AirTable` où l’on peut facilement les modifier à l’aide d’une interface utilisateur semblable à Excel.

Au démarrage, et chaque heure par la suite, le serveur téléchargera et mettra en cache toutes les chaînes de traduction dans la mémoire (une actualisation de la mémoire cache peut également être exigée sur demande). Les chaînes sont ensuite stockées dans `redux` et mises à la disposition de toutes les composantes `react`. Une fonctionnalité `translation` prend alors la clé d’une chaîne et examine la valeur correspondante dans les paramètres régionaux correspondants.

Lorsqu’une nouvelle chaîne est ajoutée à `AirTable`, une version anglaise et une version française sont incluses. Si la personne qui ajoute la chaîne n’est pas à l’aise dans les deux langues officielles, on l’encourage à ajouter un `[fra]` devant la traduction avec laquelle elle n’est pas à l’aise. Cela permet aux autres membres de l’équipe de voir la traduction incomplète dans `AirTable` et dans l’application réelle, ce qui leur permet de corriger la chaîne s’ils ont une compétence suffisante.

### Snyk

#### De quoi s’agit-il?

[Snyk](https://snyk.io/) (en anglais) est un service infonuagique qui automatise la recherche et la correction des vulnérabilités dans nos dépendances.

#### Pourquoi et comment l’utilisons-nous?

Snyk nous donne une évaluation en temps réel des modules que nous utilisons dans notre application. Snyk est intégré à notre répertoire GitHub et nous fournit des renseignements de deux façons :

- Snyk s’exécute sur la branche maître avec chaque fusion, et les résultats sont rapportés sur un badge dans la partie supérieure de [README.md](/README.md) (en anglais). De plus, l’équipe de développement reçoit un courriel hebdomadaire de Snyk décrivant toutes les vulnérabilités trouvées.
- Snyk s’exécute sur chaque demande de tirage, et les résultats sont communiqués dans la demande de tirage.

#### Comment peut-on y avoir accès?

Parlez à un développeur pour avoir accès à notre compte Snyk.

### Examen bihebdomadaire des codes

Comme nous l’avons mentionné plus haut, nous utilisons Snyk pour surveiller constamment notre code pour trouver des vulnérabilités, et intervenir au besoin à toutes nouvelles vulnérabilités dans notre application. De plus, au début de chaque sprint bihebdomadaire, nous effectuons un examen de sécurité et une mise à jour. À l’heure actuelle, cela comprend :

- énumérer tout nouvel outil de développement de logiciel que nous utilisons, et nous abonner aux bulletins de sécurité appropriés;
- examiner et mettre à jour les progiciels que nous utilisons dans le projet;
- exécuter des tests de bout en bout sur Windows (à l’aide de BrowserStack) et signaler tous les problèmes qui se présentent (`yarn test:e2e_windows`).

Consultez [SECURITE.md](/fr/SECURITE.md) pour plus de renseignements.

### Tests

Nous utilisons une combinaison de tests unitaires et de tests de bout en bout pour valider la base de code. Les tests unitaires sont rédigés à l’aide de [`jest`](https://jestjs.io/) et [`enzyme`](https://airbnb.io/enzyme/). Nous avons décidé de ne pas tester le style approprié, mais plutôt de nous concentrer sur la logique dans les composantes. À l’heure actuelle, nous avons plus de 200 tests qui sont exécutés par CircleCI sur chaque validation. Les demandes de tirage ne sont pas approuvées si le code est ajouté à l’application sans assez de tests. Les demandes de tirage ne doivent pas être fusionnées si les tests ne sont pas réussis.

Nous utilisons [Cypress](https://www.cypress.io) (en anglais) pour écrire des tests de bout en bout. La série de tests e2e peut être exécutée localement au moyen de `yarn cypress:run` (avec l’exécution de `yarn start`).

### Documentation sur le code

Nous utilisons actuellement [React Styleguidist](https://react-styleguidist.js.org/) (en anglais) pour créer facilement une sortie HTML accessible de nos commentaires sur le code des composantes de React. Cette documentation se trouve dans le répertoire `documentation`. En vue de produire la documentation de façon interactive, vous pouvez exécuter `yarn docs`, qui lancera un serveur Web à partir duquel vous pouvez visualiser la sortie produite. La sortie sera mise à jour à mesure que vous ajusterez les commentaires dans les composantes de React. Afin de produire une sortie HTML statique, veuillez exécuter `yarn docs:build`.

### Contribuer au répertoire de GitHub

Téléchargez GitHub Desktop à l’adresse https://desktop.github.com/ (en anglais).
Allez à https://github.com/veteransaffairscanada/vac-benefits-directory (en anglais), cliquez sur le bouton « Clone or download » et sélectionnez ouvrir sur le bureau. Sélectionner l’emplacement local où vous souhaitez enregistrer le projet.

Au moment d’apporter des modifications, créez d’abord une nouvelle branche. Cliquez sur Branch dans le coin supérieur gauche, puis cliquez nouvelle branche.

Après avoir apporté vos modifications, validez-les dans GitHub Desktop puis sélectionnez « push changes » dans le coin supérieur droit. Naviguez jusqu’à la page GitHub https://github.com/veteransaffairscanada/vac-benefits-directory (en anglais) et trouvez la branche. Ensuite, créez une nouvelle demande de tirage pour mieux expliquer les changements que vous avez mis en œuvre. Par la suite, la demande de tirage sera disponible pour que les réviseurs l’examinent et s’assurent que tout est en bon état avant de la fusionner au fichier maître.

### Programmation en binôme

#### De quoi s’agit-il?

La [programmation en binôme ](https://fr.wikipedia.org/wiki/Programmation_en_bin%C3%B4me) est la technique où deux développeurs travaillent ensemble sur la même tâche en utilisant le même poste de travail.

#### Pourquoi et comment l’utilisons-nous?

- pour intégrer rapidement des développeurs dans le projet – le transfert des connaissances se produit rapidement lors du jumelage avec un développeur qui connaît la base de code;
- pour travailler sur des fonctionnalités difficiles où deux cerveaux constituent un avantage;
- pour le plaisir!

Lorsque deux développeurs ne se trouvent pas dans le même emplacement, nous avons effectué le jumelage à l’aide des moyens suivants :

- Appel téléphonique pour voix – il s’agit du moyen le plus fiable s’il y a une connexion réseau lente à une ou plusieurs extrémités;
- [Atom](https://atom.io/) (en anglais) avec Teletype pour l’écriture du code;
- [Slack](https://slack.com/) (en anglais) pour le partage d’écran, afin que l’observateur puisse voir les choses à l’extérieur de l’éditeur de texte comme des tests en cours d’exécution dans le terminal et leur affichage dans le navigateur, entre autres.

#### Comment peut-on effectuer la configuration?

Pour configurer Atom aux fins de la programmation en binôme, effectuez ce qui suit :

1. Téléchargez et installez Atom : https://atom.io/ (en anglais)
2. Ouvrez Atom -> Preferences (Préférences) -> Install (Installer), et recherchez « Teletype »
3. Installez Teletype. Une icône Teletype (ressemble à une tour de radio) doit apparaître au bas de votre écran.
4. Cliquez sur l’icône Teletype et autorisez l’application à l’aide de vos justificatifs d’identité de GitHub.
5. Retournez à Atom, cliquez sur l’icône Teletype à nouveau, et vous devriez maintenant pouvoir partager votre espace de travail ou vous joindre à un portail en collant le lien dans l’espace de travail d’une autre personne.

### Notifications de déploiement

#### De quoi s’agit-il?

Les notifications de déploiement sont des messages automatisés que nous envoyons à notre canal interne Slack pour nous informer du déploiement de l’application.

#### Comment fonctionnent-ils?

Au démarrage du serveur, l’application enverra une charge utile JSON à un [webhook Slack entrant](https://api.slack.com/incoming-webhooks "Incoming Webhook"). (en anglais). Le webhook traduit ensuite les renseignements dans un message Slack bien formaté que tous les développeurs peuvent voir. Vous pouvez en apprendre davantage sur la façon dont ils fonctionnent exactement [ici](https://github.com/veteransaffairscanada/vac-benefits-directory/blob/master/utils/deploy_notification.js) (en anglais). L’important est d’établir une variable environnementale `WEBHOOK_URL` qui est l’adresse URL de votre Webhook Slack.

#### Quel est l’objectif de leur utilisation?

Nous utilisons principalement la notification de déploiement pour veiller à ce que notre version de production se rende dans le serveur de production. Chaque notification comprend un lien vers la demande de tirage qui a été fusionnée dans `master` ainsi qu’un horodatage de la fin du démarrage du serveur. Cela nous permet de déterminer la durée d’un déploiement en production après que nous ayons lancé une version de production. À l’heure actuelle, cela prend environ huit minutes de la conception au déploiement.
