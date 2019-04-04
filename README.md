[![CircleCI](https://circleci.com/gh/cds-snc/find-benefits-and-services.svg?style=svg)](https://circleci.com/gh/cds-snc/find-benefits-and-services)
[![Known Vulnerabilities](https://snyk.io/test/github/cds-snc/find-benefits-and-services/badge.svg?targetFile=package.json)](https://snyk.io/test/github/cds-snc/find-benefits-and-services?targetFile=package.json)

[La version française suit.](#---------------------------------------------------------------------)

# Find benefits and services

This is the code for _Find benefits and services_, a product developed by VAC and CDS. The app is in beta and currently deployed at https://benefits-prestations.veterans.gc.ca. It is undergoing development and is not yet publicly released for use.

To create your own instance of this service, first you will need to install Yarn: 

## Install Yarn on OS X

- Install the development environment
  - [Homebrew](https://brew.sh/)
  - node (`brew install node`)
  - yarn (`npm i yarn`)

## Install Yarn on Windows

- Download Node.JS of version 9 or newer(as .zip since .msi is blocked)
- Following steps required tp set up the newly installed Node cmd line commands such as npm globally
  > Start menu > Control Panel > User accounts > user accounts > change my environment variables >
  > select path > Edit > Now enter the location of where you have Node installed with a ; to separate
  > between any other entries here.
  > EX: C:\dev ; C:\Node
- `npm install -g yarn`

## Running the App

- Clone the repo
  - `git clone git@github.com:cds-snc/find-benefits-and-services.git`
- Change directories to /find-benefits-and-services:
  - `yarn install`
  - `yarn dev`
  - If you run into syntax errors chances are there are missing packages/dependencies and you may want to try
  running a clean yarn install. Delete node_modules folder and then re run `yarn install` in the main folder.
- Now visit http://localhost:3000/ in your web browser and you should see an app that looks like [this](https://find-benefits-and-services.herokuapp.com/). Any changes you now make to your local version of the source code will be reflected on your localhost. 
- Your local app is loading data from data/data.json. This includes which benefits are displayed, what the eligibility criteria is, which questions will be asked, and more! One way to modify this data is set up an instance of AirTable, which is described below. Another way would be to write the data to a number of csv files and then covert it into the json format shown in data/data.json.

## Airtable

By default, the application loads data from data/data.json as described in the previous section. We have also configured the application to read data from AirTable, which has an intuitive interface for entering / managing data.

We've set up a [demo airtable base](https://airtable.com/shr5bRGUxt32qiqRm) with some sample data. If you wish to enable AirTable as the source for your data, follow the instructions in this section.

- Visit our [demo airtable base](https://airtable.com/shr5bRGUxt32qiqRm) and click "Copy base"
- If you don't already have an airtable account, you'll be prompted to create one
- Add the base to one of your workspaces

Now you'll need to set up some local environment variables to get the content from your airtable base into your app. 

## Environment variables

Add the following 4 environment variables using the steps below.

| Variable                     | Use                                                                                                          | Required                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------- |
| `AIRTABLE_READ_KEY`          | load data (benefits / translations / etc) from Airtable. This value is your API Key for your account on AirTable. To generate this key, visit your account page in AirTable, and generate a key under the API section.                                                     | yes |
| `AIRTABLE_BASE_KEY`          | This tells the app which Airtable base to pull data from. To locate this key, visit the API Documentation page for your AirTable base. The key can be found in the URL for this page: https://airtable.com/AIRTABLE_BASE_KEY/api/docs | yes |
| `USE_AIRTABLE`    | `true` = pull data directly from airtable, `false` = pull data from data/data.json                                                                       | yes              |
| `AIRTABLE_WRITE_KEY`         | write feedback form data to Airtable. If the API key for your account has write permissions to your AirTable base, you can use the same value for this variable.                                                                         | only if you want the feedback feature to work           |

### Adding a new environment locally (OS X)

1.  In the terminal, run: `nano ~/.bash_profile` (or `nano ~/.zshrc` if you're using the zsh shell)
2.  Add the following line: `export AIRTABLE_READ_KEY="foo"`
3.  [ctrl] + x, and type `y` to save
4.  `source ~/.bash_profile` (or `source ~/.zshrc`)
5.  `echo $AIRTABLE_READ_KEY` to make sure it is set

### Adding a new environment locally (Windows 7)

Start Menu > Control Panel > User Accounts > User Accounts > Change my environment variables > New...

Example setup:
Variable Name = AIRTABLE_READ_KEY
Contact other developers on the project for what values we're currently using.
restart Command Prompt, echo %AIRTABLE_READ_KEY% to check if value is setup properly

## Make a content change using Airtable

- run `yarn dev`
- visit http://localhost:3000/

Congratulations! You should now be viewing content pulled directly from your new airtable base. To test that it's working, change the name of one of the benefits.

- navigate to the benefits table
- change the 1st row 1st column "Benefit 1" to "My Awesome Benefit"
- navigate to http://localhost:3000/data-validation
- click "refresh cache"
- visit http://localhost:3000/benefits-directory
- You should see your new name displayed on the 1st benefit card


## Reference

If you'd like to contribute to the project, we have more detailed documentation regarding our tech choices here: [doc](/doc/).

This application uses the following resources:

- NextJS [https://learnnextjs.com/](https://learnnextjs.com/)
- Jest [https://facebook.github.io/jest/](https://facebook.github.io/jest/)
- Prettier [https://prettier.io/](https://prettier.io/)
