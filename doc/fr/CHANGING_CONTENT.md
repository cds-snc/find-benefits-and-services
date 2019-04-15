## Guide de modification de contenu

### Modifier le texte et les liens dans l’application

1. Trouvez le texte ou l’hyperlien que vous voulez modifier dans l’application.
2. Copiez le texte dans le presse-papiers.
3. Examinez le tableau ci-dessous pour déterminer la feuille et la colonne d’Airtable où vous devriez apporter des modifications. Cliquez sur le lien vers la feuille.
4. Dans Airtable, faites ctrl+f (Windows) ou commande+f (Mac) pour effectuer une recherche sur la page, et collez le texte que vous avez copié.
5. Trouvez la rangée qui contient le texte que vous voulez modifier.
6. Saisissez votre nouveau texte dans les colonnes en français et en anglais.

| Texte que vous voulez modifier                                                   | Feuille               | Nom de la colonne en anglais         | Nom de la colonne en français       |
| -------------------------------------------------------------------------------- | --------------------- | ------------------------------------ | ----------------------------------- |
| Nom de l’avantage                                                                | benefits              | benefitNameEn                        | benefitNameFr                       |
| Description en une ligne                                                         | benefits              | oneLineDescriptionEn                 | oneLineDescriptionFr                |
| Lien pour en savoir plus                                                            | benefits              | benefitPageEn                        | benefitPageFr                       |
| Renseignements importants dans l’en-tête de la carte                             | benefits              | noteEn                               | noteFr                              |
| Voir davantage de description de contenu                                         | benefits              | seeMoreSentenceEn                    | seeMoreSentenceFr                   |
| Texte des questions dans le répertoire des avantages                             | questions             | display_text_english                 | display_text_french                 |
| Texte des questions dans l’expérience guidée                                     | questions             | guided_experience_english            | guided_experience_french            |
| Titre de la page de l’expérience guidée                                          | questions             | guided_experience_page_title_english | guided_experience_page_title_french |
| Texte des infobulles liées aux questions                                                      | questions             | tooltip_english                      | tooltip_french                      |
| Texte de l’option de choix multiples                                             | multipleChoiceOptions | display_text_english                 | display_text_french                 |
| Texte de la piste de navigation ou du lien de l’expérience guidée                | multipleChoiceOptions | ge_breadcrumb_english                | ge_breadcrumb_french                |
| Options de case à cocher dans l’expérience guidée et le répertoire des avantages | needs                 | nameEn                               | nameFr                              |
| Tous les autres textes                                                           | translations          | English                              | French                              |

### Modifier les critères d’admissibilité à un avantage

1. Repérez la feuille _benefitEligibility_.
2. Notez que chaque chemin d’accès est représenté par des valeurs inscrites dans des colonnes correspondant aux questions figurant sur la feuille _questions_. Les valeurs se trouvant dans les colonnes correspondent à celles qui figurent sur la feuille _multipleChoiceOptions_.
3. Insérez une ligne et indiquez-y l’avantage et les critères d’admissibilité.
4. Si vous souhaitez éliminer un chemin d’accès d’admissibilité relatif à un avantage, supprimez la ligne en question dans le tableau.

### Ajouter une catégorie (c’est-à-dire le besoin ou la question à cases à cocher) et associer la catégorie à un avantage

1. Naviguez jusqu’à la feuille _questions_.
2. Ajoutez une nouvelle rangée en bas et donnez à la catégorie un nom français et un nom anglais.
3. Sélectionnez la cellule dans la colonne des avantages et cliquez sur `+`.
4. Commencez à taper les noms des avantages auxquels vous voulez que la catégorie soit associée.

Pour modifier les avantages liés à une catégorie existante, cliquez sur l’icône "expand” (agrandir) sur le côté droit de la cellule, et vous aurez l’option de dissocier des dossiers existants ou de lier de nouveaux dossiers.

### Comment ajouter des questions et réponses à choix multiples

1. Naviguez jusqu’à la feuille _questions_.
2. Ajoutez une nouvelle rangée en bas et donnez-lui un variable_name qui décrit la question (les questions à choix multiples sont ordonnées selon leur ordre dans le tableau des questions; la question à cases à cocher sur les besoins est toujours en bas).
3. Remplissez le contenu suivant en français et en anglais : le texte des questions qui apparaîtra dans le répertoire des avantages, le texte des questions dans l’expérience guidée et le titre de la page de l’expérience guidée. Les noms des colonnes en français et en anglais se trouvent dans le tableau ci-dessus.
4. Naviguez ensuite jusqu’à la feuille _multipleChoiceOptions_.
5. Ajoutez une nouvelle rangée pour chaque option à choix multiples que vous désirez afficher sous la nouvelle question.
6. Donnez à chaque option un variable_name qui la décrit, ainsi que le texte en français et en anglais que l’utilisateur verra, et le texte en bleu de la piste de navigation dans l’expérience guidée (voir le tableau ci-dessus pour les noms de colonne).
7. Sélectionnez chaque cellule « linked_question”, cliquez sur +, et tapez ou sélectionnez le variable_name de la question que vous avez ajoutée à l’étape 2.
8. Pour voir votre question affichée dans l’application, suivez les étapes pour ajouter un nouveau chemin d’accès d’admissibilité qui est lié à votre nouvelle question. Une question est affichée seulement si sa réponse touche la liste des avantages offerts.
9. Un développeur devra maintenant ajouter une autre page sous [pages/](/pages/) pour votre question. Une page de questions existante telle que [patronAge.js](/pages/patronAge.js) peut servir de modèle. Tant que la nouvelle page n’est pas ajoutée, l’application plantera lorsque vous tenterez de répondre aux questions initiales. Cependant, vous pouvez toujours tester vos modifications sur la page du répertoire des avantages.
