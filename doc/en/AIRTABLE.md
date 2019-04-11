# AirTable

## What is it?

[AirTable](https://airtable.com/) is an online spreadsheet product similar to Google Sheets but with a better API, access controls, and revision history. It allows spreadsheets to be created and data added or changed through the Airtable web application or through its REST API. This can be controlled by setting up user accounts and giving them read and/or write permission. You can also generate API keys that have read and/or write permission. Custom API documentation is generated using the table/column names for your project, and can be viewed on airtable.com.

## Why and how are we using it?

We're using Airtable because it allows non-developers (and developers!) to easily edit the data used by our app. This is very useful for:

- Translations: Content designers and translators can edit the UI text used in the app by going to the _translations_ table, doing a ctrl+f search for the English or French UI text they want to change, and then modifying it.
- Eligibility logic: The logic used by our app to determine who is eligible for what benefits is set in the _eligibilityPaths_ table. Each row has a unique combination of answers to the questions. Each row also has a list of benefits that are likely available to a user who answers in this way. The list of benefits are linked to rows in the _benefits_ table.
- Benefits: This table contains a row for each benefit, and a column (_eligibilityPaths_) with a list of links to rows in the _eligibilityPaths_ table. Updating this list will update the ids in the benefits column in the _eligibilityPaths_ table.
- Feedback: Content submitted from the feedback bar in the app footer is written to the feedback table on Airtable. To do this, the server has a write key set in ENV variables.

Airtable data is read by the server and injected into Redux, which is then sent to the client.

## Making changes to Airtable

To do anything in Airtable, always take the following steps:

1. Visit your Airtable base.
2. Make some changes. See the step-by-step guides below to help you with the task you want to perform.
3. View your changes in the live app by visiting the data validation page and clicking the "refresh cache" button at the top right.
4. Make sure no new tests have failed by looking through the rows on the data-validation page. If they have, investigate and fix the problem in Airtable.
5. Navigate back to the page in the app where you expect your changes to have occurred. Refresh the page to see them.

## Step by step guides

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
| VAC Learn more link                                          | benefits              | benefitPageEn                        | benefitPageFr                       |
| important info in card header                                | benefits              | noteEn                               | noteFr                              |
| see more content description                                 | benefits              | seeMoreSentenceEn                    | seeMoreSentenceFr                   |
| question text in benefits-directory                          | questions             | display_text_english                 | display_text_french                 |
| question text in guided experience                           | questions             | guided_experience_english            | guided_experience_french            |
| guided experience page title                                 | questions             | guided_experience_page_title_english | guided_experience_page_title_french |
| health issue tooltip text                                    | questions             | tooltip_english                      | tooltip_french                      |
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
