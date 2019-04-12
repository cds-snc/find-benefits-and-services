[![CircleCI](https://circleci.com/gh/cds-snc/find-benefits-and-services.svg?style=svg)](https://circleci.com/gh/cds-snc/find-benefits-and-services)
[![Known Vulnerabilities](https://snyk.io/test/github/cds-snc/find-benefits-and-services/badge.svg?targetFile=package.json)](https://snyk.io/test/github/cds-snc/find-benefits-and-services?targetFile=package.json)

[La version française suit.](#---------------------------------------------------------------------)

# Find benefits and services

This is generic version of _Find benefits and services_, a product developed by the Canadian Digital Service (CDS) and Veterans Affairs Canada (VAC). The generic version of the app is currently deployed [here](http://benefits-avantages.cds-snc.ca), and the VAC instance of the app is [here](https://benefits-avantages.veterans.gc.ca).

To create your own instance of this service, first you will need to install Yarn:

## Install Yarn on OS X

- Install the development environment
  - [Homebrew](https://brew.sh/)
  - node (`brew install node`)
  - yarn (`npm i yarn`)

## Install Yarn on Windows

- Download Node.JS of version 9 or newer(as .zip since .msi is blocked)
- To set up your newly installed Node command line tools such as npm globally:
  - Start menu > Control Panel > User accounts > user accounts > change my environment variables > select path > Edit
  - Now enter the location where you have Node installed with a ; to separate between any other entries here. For example: `C:\dev ; C:\Node`
- Run `npm install -g yarn`

## Running the App

- Clone the repo
  - `git clone git@github.com:cds-snc/find-benefits-and-services.git`
- Change directories to /find-benefits-and-services:
  - `yarn install`
  - `yarn dev`
  - If you run into syntax errors chances are there are missing packages/dependencies and you may want to try
    running a clean yarn install. Delete node_modules folder and then re run `yarn install` in the main folder.
- Now visit http://localhost:3000/ in your web browser and you should see an app that looks like [this](http://benefits-avantages.cds-snc.ca). Any changes you now make to your local version of the source code will be reflected on your localhost.
- Your local app is loading data from [data.json](/data/data.json). This includes which benefits are displayed, what the eligibility criteria is, which questions will be asked, and more! One way to modify this data is set up an instance of AirTable, which is described below. Another way would be to write the data to a number of csv files and then covert it into the json format shown in [data.json](/data/data.json).

## Airtable

By default, the application loads data from [data.json](/data/data.json) as described in the previous section. We have also configured the application to read data from AirTable, which has an intuitive interface for entering / managing data. If you don't want to use Airtable, see [below](#what-if-i-dont-want-to-use-airtable). The rest of these set up instructions will assume that you are using Airtable.

We've set up a [demo airtable base](https://airtable.com/shr5bRGUxt32qiqRm) with some sample data. If you wish to enable AirTable as the source for your data, follow the instructions in this section.

- Visit our [demo airtable base](https://airtable.com/shr5bRGUxt32qiqRm) and click "Copy base"
- If you don't already have an airtable account, you'll be prompted to create one
- Add the base to one of your workspaces

Now you'll need to set up some local environment variables to get the content from your airtable base into your app.

## Adding environment variables

Add the following 4 environment variables using the steps below.

| Variable             | Use                                                                                                                                                                                                                                                                     | Required                                      |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `AIRTABLE_READ_KEY`  | Load data (benefits / translations / etc) from Airtable. This value is your API Key for your account on AirTable. To generate this key, visit your [account page](https://airtable.com/account) and click on the “Generate my API key”                                  | yes                                           |
| `AIRTABLE_BASE_KEY`  | This tells the app which Airtable base to pull data from. To locate this key, visit your AirTable base and click: help > API documentation. Then copy the base key from your current URL, which will have the format: `https://airtable.com/AIRTABLE_BASE_KEY/api/docs` | yes                                           |
| `USE_AIRTABLE`       | `true` = pull data directly from airtable, `false` = pull data from [data.json](/data/data.json)                                                                                                                                                                        | yes                                           |
| `AIRTABLE_WRITE_KEY` | Write feedback form data to Airtable. If the API key for your account has write permissions to your AirTable base, you can use the same value for this variable.                                                                                                        | only if you want the feedback feature to work |

### Adding a new environment locally (OS X)

1.  In the terminal, run: `nano ~/.bash_profile` (or `nano ~/.zshrc` if you're using the zsh shell)
2.  Add the following line: `export AIRTABLE_READ_KEY="foo"`
3.  [ctrl] + x, and type `y` to save
4.  `source ~/.bash_profile` (or `source ~/.zshrc`)
5.  `echo $AIRTABLE_READ_KEY` to make sure it is set

Repeat these steps for each of the 4 environment variables in the table above.

### Adding a new environment locally (Windows 7)

1. Visit: Start Menu > Control Panel > User Accounts > User Accounts > Change my environment variables > New...
2. Add a variable called `AIRTABLE_READ_KEY`
3. Restart the Command Prompt, run `echo %AIRTABLE_READ_KEY%` to check if the new varaible exists

Repeat these steps for each of the 4 environment variables in the table above.

## Make a content change using Airtable

- run `yarn dev`
- visit http://localhost:3000/

:tada: Congratulations! You should now be viewing content pulled directly from your new airtable base. To test that it's working, change the name of one of the benefits.

- navigate to the benefits table
- change the 1st row 1st column "Benefit 1" to "My Awesome Benefit"
- navigate to http://localhost:3000/data-validation
- click "refresh cache"
- visit http://localhost:3000/benefits-directory
- You should see your new name displayed on the 1st benefit card

## Adding in your new content and eligibility

You can now start customizing the content in the app to suite your use case. Our [guide to changing content](/doc/en/CHANGING_CONTENT.md) will help you get started with that. Note that there are two options for loading content into your app going forward:

1. Load content and logic directly from your airtable base (`USE_AIRTABLE = "true"`). This is great for development and quickly seeing your changes in the live app.
2. Load content from [data.json](/data/data.json). This is a good option when your app is live and and content changes may be less frequent and require more peer review. To choose this option, remove the `USE_AIRTABLE` environment variable from your environment. To make a pull new content into the app, run `yarn download`. This copies the most recent airtable data to [data.json](/data/data.json).

## What if I don't want to use Airtable?

It is also possible to not use Airtable. An alternative method would be to store and edit your content and logic in another spreadsheet application like Excel or Google Sheets. You could then export csv files and parse these into the same json format we use in [data.json](/data/data.json). If you take this approach, [d3.dsv](https://github.com/d3/d3-dsv) may be helpful.

## Reference

If you'd like to contribute to the project, we have more detailed documentation regarding our tech choices here: [doc](/doc/en/TECH_CHOICES.md).

This application uses the following resources:

- NextJS [https://learnnextjs.com/](https://learnnextjs.com/)
- Jest [https://facebook.github.io/jest/](https://facebook.github.io/jest/)
- Prettier [https://prettier.io/](https://prettier.io/)
