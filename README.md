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

Begin by making a copy of the [demo airtable base](https://airtable.com/shr5bRGUxt32qiqRm) under your own account. You will need the 

## Environment variables

Some are also required for testing. You will also need some of these set for local development
Contact other developers on the project for what values we're currently using.

| Variable                     | Use                                                                                                          | Where                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------- |
| `AIRTABLE_READ_KEY`          | load data (benefits / translations / etc) from Airtable. This value is your API Key for your account on AirTable. To generate this key, visit your account page in AirTable, and generate a key under the API section.                                                     | production / locally |
| `AIRTABLE_WRITE_KEY`         | write feedback form data to Airtable. If the API key for your account has write permissions to your AirTable base, you can use the same value for this variable.                                                                         | production           |
| `AIRTABLE_BASE_KEY`          | This tells the app which Airtable base to pull data from. To locate this key, visit the API Documentation page for your AirTable base. The key can be found in the URL for this page: https://airtable.com/COPY_THIS_VALUE/api/docs | production / locally |
| `USE_AIRTABLE`    | `true` = pull data directly from airtable, `false` = pull data from data/data.json                                                                       | production / locally              |

Note that CDS docker images are public, so you should not put any sensitive (ie write) keys in the docker image.

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

### Adding a new environment variable to the source code

To add a new ENV variable to the source code, take the following steps:

1.  Follow the steps above to add it locally
2.  Reference it in the source code with `process.env.YOUR_VARIABLE_NAME`
3.  Add the following lines to [Dockerfile](./Dockerfile):
    ```
    ARG YOUR_VARIABLE_NAME
    ENV YOUR_VARIABLE_NAME ${YOUR_VARIABLE_NAME}
    ```
4.  Add another build argument to [config.yml](./.circleci/config.yml):
    `--build-arg YOUR_VARIABLE_NAME="${YOUR_VARIABLE_NAME}"`
5.  Add the ENV variable to CircleCI through their web interface: https://circleci.com/gh/cds-snc/find-benefits-and-services -> Settings -> Environment Variables
6.  Add the ENV variable to Heroku through their web interface.
    It will need to be added to any production apps as well as the app that the pull request reviews are based on. Go to the apps, then the Settings tab, then "Reveal Config Vars"
    and set the variable.

7.  Add `"YOUR_VARIABLE_NAME": { "required": true }` to the `env` object in [app.json](./app.json)


## Reference

If you'd like to contribute to the project, we have more detailed documentation regarding our tech choices here: [doc](/doc/).

This application uses the following resources:

- NextJS [https://learnnextjs.com/](https://learnnextjs.com/)
- Jest [https://facebook.github.io/jest/](https://facebook.github.io/jest/)
- Prettier [https://prettier.io/](https://prettier.io/)
