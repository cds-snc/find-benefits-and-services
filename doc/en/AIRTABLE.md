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

## Changing Content

For step by step guides to changing content, see our [guide to changing content](/doc/en/CHANGING_CONTENT.md).
