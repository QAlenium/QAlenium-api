![banner](https://raw.github.com/kaapiel/Raw-content/master/api-banner.png)

![Quality Gate Status](https://sonarcloud.io/dashboard?id=QAlenium_api)

![CircleCI](https://img.shields.io/circleci/build/github/QAlenium/qalenium_api/main)

# QAlenium API
#### See also our [Flutter Mobile app](https://github.com/QAlenium/QAlenium-mobile) and [Wearable](https://github.com/QAlenium/QAlenium-wearable) repositories
API to QAlenium-related apps to use.

#### To access our PaaS (Server) access [this link](https://heroku.com/dashboard?id=QAlenium)
#### To access SonarCloud data use [this link](https://sonarcloud.io/project/overview?id=QAlenium_QAlenium-api)
#### To access the pipeline and CI data use [this link](https://circleci.com/gh/QAlenium/QAlenium_api)
#### To access the non-functional test data use [this link](https://blazemeter.com/QAlenium_api)
#### To access the functional test data use [this link](https://cypress.com/QAlenium_api)
#### To access the project board use [this link](https://github.com/orgs/QAlenium/projects/3)
#### To join our community in Slack use [this link](https://join.slack.com/t/qalenium/shared_invite/zt-c8l77uhz-80rRWRHCwb4mk82rW9cV7w)
#### To access the project's raw content use [this link](https://github.com/orgs/QAlenium/raw-content)

## Table of Contents
1. [Quick Start](#quick-start)
1. [Example usage](#examples)
1. [Questions](#report)
1. [Donate](#donate)
1. [License](#licence)
1. [Creators](#creators)

<h2 id="quick-start">Quick Start :chart_with_upwards_trend:</h2>
Download this app in the Android/iOS app store or fork this project to do your modifications.

### API
As we are using Heroku as our PaaS, all APIs can be found here:
https://qalenium-api.herokuapp.com/listMethods

We're using Node.js + Express.js + Postgres as the backend stack.
To get started, you need to run the following command to start your node project and files:
npm init
(Follow the instructions to populate the package.json file)

To use Heroku we need to install it through CLI:
brew tap heroku/brew && brew install heroku

Then verify installation running the following command:
heroku --version

Also, to run commands authenticated, you’ll need to tun the following command:
heroku login

Hence, we need to push the changes to Heroku. To do so, we need to push our code using:
git add .
git commit -m "initial commit"
git push heroku main

To test it locally to see if it worked, run:
npm install axios
npm install express
npm install pg
heroku addons:create heroku-postgresql:dobby-dev
(make sure to update postgres credentials at index.js, see heroku postgres add-on ui page)
node index.js
Then, access http://localhost:8147 and validate if you can GET at /listMethods

Note that in order to access your app through the cloud server (https://qalenium-api.herokuapp.com/listMethods) your package.json file must contain the following start script:
"scripts": {
"start": "node index.js"
}


### Unit testing
All unit tests are being run against a Heroku machine as it is our PaaS.

<br/>

<h2 id="examples">Examples :eyes:</h2>

![banner](https://raw.github.com/QAlenium/Raw-content/master/QAlenium_api/example-1.png)
![banner](https://raw.github.com/QAlenium/Raw-content/master/QAlenium_api/example-1.png)

<br/>

<h2 id="report">Questions & Issues :thinking:</h2>

This repository's issue tracker is only for bugs and feature requests.

<br/>

<h2 id="donate">Donations :heart:</h2>

*This project needs you!* If you would like to support this project's further development, the creator of this project or the continuous maintenance of this project, *feel free to donate*. Your donation is highly appreciated (and I love food experiences). Thank you!

*PayPal*

- Do you ever thought about paying a coffee, lunch or dinner for maintaining the project? [*So please click on this
  link*](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=gabriel_aguido@hotmail.com&lc=US&item_name=Donation+to+QAlenium+Flutter+app+Maintenance&no_note=0&cn=&currency_code=USD&bn=PP-DonationsBF:btn_donateCC_LG.gif:NonHosted), all donations are awesome!

<br/>

<h1 id="license">License :page_facing_up:</h1>

Copyright 2019 Gabriel Aguido Fraga

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

<br/>