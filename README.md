# Trello API Tests

Repository to test [Trello API](https://developer.atlassian.com/cloud/trello/rest/).  
The tests are written in JavaScript and leverage the following libraries:

* ***Chai***: A powerful assertion library for JavaScript
* ***Dayjs***: A modern JavaScript date library for working with dates and times
* ***Dotenv***: A simple JavaScript library for loading environment variables from a .env file
* ***Mocha***: A feature-rich test framework for JavaScript
* ***Mochawesome***: A reporter for Mocha who generates comprehensive test reports
* ***Pactum***: A testing library that facilitates agreement testing between consumers and providers

## Installation

1. Install [Node JS](https://nodejs.org/en/download/).

2. Clone the project to your local machine:
```bash
git clone https://github.com/bartoszwalasek/Trello-API-Tests.git
```

3. To install the required dependencies, navigate to the project directory and run the following command:
```bash
npm install
```

## Configuration

1. Before running the tests, you will need to provide your individual Trello API credentials in a file named `credentials.js`
```javascript
const credentials = {
  key: process.env.KEY,
  token: process.env.TOKEN,
};

const boardMember = {
  id: process.env.ID,
  fullName: "Bartosz Walasek",
  username: "bartoszwalasek3",
};
```

2. Create a `.env` file in the project directory according to the following example:
```javascript
KEY="YOUR_TRELLO_API_KEY"
TOKEN="YOUR_TRELLO_API_TOKEN"
ID="YOUR_TRELLO_API_ID"
```

## Usage

Once the dependencies are installed and the configuration files are set up, you can run the tests using the following command:
```bash
npm test
```
This will execute the test suite using Mocha and Mochawesome, generating detailed test reports in the `mochawesome-report` directory.