## Guide to changing content

### Changing text and links in the app

1. Locate the text or hyperlink you want to change in the app
2. Copy the text to the clipboard
3. Look at the table below to determine which table and column you should make your change in. Click the link to the table.
4. In Airtable do a ctrl+f (Windows) or command+f (Mac) search on the page, and paste in the text you copied
5. Locate the row that contains the text you want to change
6. Enter in your new text in the English and French columns

| Text you want to change                                      | Table                 | English Column Name                  | French Column Name                  |
| ------------------------------------------------------------ | --------------------- | ------------------------------------ | ----------------------------------- |
| Benefit name                                                 | benefits              | benefitNameEn                        | benefitNameFr                       |
| one line description                                         | benefits              | oneLineDescriptionEn                 | oneLineDescriptionFr                |
| Learn more link                                              | benefits              | benefitPageEn                        | benefitPageFr                       |
| important info in card header                                | benefits              | noteEn                               | noteFr                              |
| see more content description                                 | benefits              | seeMoreSentenceEn                    | seeMoreSentenceFr                   |
| question text in benefits-directory                          | questions             | display_text_english                 | display_text_french                 |
| question text in guided experience                           | questions             | guided_experience_english            | guided_experience_french            |
| guided experience page title                                 | questions             | guided_experience_page_title_english | guided_experience_page_title_french |
| question tooltip text                                        | questions             | tooltip_english                      | tooltip_french                      |
| multiple choice option text                                  | multipleChoiceOptions | display_text_english                 | display_text_french                 |
| guided experience breadcrumb/link text                       | multipleChoiceOptions | ge_breadcrumb_english                | ge_breadcrumb_french                |
| Checkbox options in guided experience and benefits-directory | needs                 | nameEn                               | nameFr                              |
| All other text                                               | translations          | English                              | French                              |

### Changing the eligibility criteria for a benefit

1. Navigate to the _benefitEligibility_ table
2. Each path is represented by values within columns which correspond to the questions in the _questions_ table. The values which fill these columns correspond to values in the _multipleChoiceOptions_ table.
3. Create a new row and add the benefit and the eligibility criteria.
4. If you wish to remove an eligibility path from a benefit, delete the corresponding row in the table.

### Adding a category (aka need or checkbox question), associating it with a benefit

1. Navigate to the _needs_ table
2. Add a new row at the bottom and give the category an english name and french name
3. Select the cell under the benefits column and click +
4. Start typing the names of the benefits you want the category to be associated with

To change the benefits associated with an existing category, click the "expand" icon on the right of the cell and then you will have the option to either unlink existing records or link new ones.

### How to add multiple choice question and answers

1. Navigate to the _questions_ table
2. Add a new row at the bottom, and give it a variable_name that describes the question (The multiple choice questions are ordered according to their order in the questions table, the needs checkbox question is always at the bottom).
3. Fill in the following french and english content: question text that will appear in benefits-directory, question text in guided experience, and guided experience page title. The french/english column names can be found in the table above.
4. Then navigate to the _multipleChoiceOptions_ table
5. Add a new row for each multiple choice option you would like to appear under the new question.
6. Give each option a variable_name that describes it, as well as the english/french text the user will see, and the blue breadcrumb text within the guided experience (see table above for column names).
7. Select each "linked_question" cell, click +, and type/select the question variable_name you added in step 2.
8. To see your question displayed in the app, follow the steps for adding a new eligibility path that links to your new question. A question is only displayed if its answer effects the list of eligible benefits.
9. A developer will now need to add another page under [pages/](/pages/) for your question. An existing question page, such as [patronAge.js](/pages/patronAge.js) can be used as a template. Before the new page is added, the app will crash when you attempt to answer the initial questions. However, you can still test your changes on the benefits directory page.
