# AirTable

## De quoi s’agit-il?

[AirTable](https://airtable.com/) (en anglais) est un produit de feuille de calcul en ligne semblable à Google Sheets, mais ayant une meilleure interface de programmation d’applications (API), des contrôles d’accès et un historique de révision. Il permet la création des feuilles de calcul et l’ajout ou la modification de données au moyen de l’application Web Airtable ou au moyen de son API REST. Cela peut être contrôlé en configurant des comptes d’utilisateurs et en leur donnant une autorisation de lecture ou d’écriture. Vous pouvez également générer des clés d’API qui ont une autorisation de lecture ou d’écriture. Des documents personnalisés d’API sont produits à l’aide des noms de tableau ou de colonne pour votre projet, et on peut les consulter sur airtable.com.

## Pourquoi et comment l’utilisons-nous?

Nous utilisons Airtable puisqu’il permet aux non-développeurs (et aux développeurs!) de modifier facilement les données utilisées par notre application. Cela s’avère très utile pour les aspects suivants :

- Traductions : Les concepteurs de contenu et les traducteurs peuvent modifier le texte de l’interface utilisateur (IU) utilisé dans l’application en allant au tableau des traductions, en effectuant une recherche ctrl+f du texte de l’IU en français ou en anglais qu’ils veulent changer, puis le modifient.
- Logique d’admissibilité : La logique utilisée par notre application pour déterminer qui est admissible à des avantages est établie dans le tableau eligibilityPaths. Chaque rangée a une combinaison unique de réponses aux questions. Chaque rangée a aussi une liste des avantages qui est probablement disponible à un utilisateur qui répond de cette façon. La liste des avantages est liée aux rangées dans le tableau des avantages.
- Avantages : Ce tableau contient une rangée pour chaque avantage et une colonne (_eligibilityPaths_) avec une liste de liens vers des rangées dans le tableau eligibilityPaths. La mise à jour de cette liste mettra à jour les ID dans la colonne des avantages dans le tableau _eligibilityPaths_.
- Rétroaction : Le contenu présenté à partir de la barre de rétroaction dans le bas de page de l’application est rédigé dans le tableau de rétroaction sur AirTable. Pour ce faire, le serveur a un ensemble de clés d’écriture dans les variables ENV.

Les données d’AirTable sont lues par le serveur et injectées dans Redux, qui est ensuite envoyé au client.

## Comment peut-on y avoir accès?

Pour demander l’accès en vue de modifier du contenu dans AirTable, créez un compte dans le site Web puis envoyez un courriel à vac@cds-snc.ca comprenant les détails sur votre compte afin que nous puissions vous ajouter au projet.

## Apporter des modifications dans AirTable

Pour faire quoi que ce soit dans AirTable, effectuez toujours les étapes suivantes :

1. Consultez votre base de AirTable. Si vous n’avez pas d’autorisation pour y accéder, [demandez-la](#comment-peut-on-y-avoir-accès).
2. Apportez quelques modifications. Consultez les guides étape par étape ci-dessous pour vous aider dans la tâche que vous voulez effectuer.
3. Pour visualiser vos modifications dans l’application en direct, consultez la [page de validation des données](https://benefits-avantages.cds-snc.ca/data-validation?lng=fr) et cliquez sur le bouton « Rafraîchir le cache » dans le coin supérieur droit.
4. Veillez à ce qu’aucun nouveau test n’échoue en examinant les rangées sur la page de validation des données. S’il y en a, examinez et corrigez le problème dans Airtable.
5. Retournez à la page dans l’application où vous vous attendez à ce que vos modifications soient appliquées. Actualisez la page pour les voir.
