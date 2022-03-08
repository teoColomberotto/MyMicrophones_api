# My Microphones REST API

This is an academic purpose open source REST API.

The aim of this project is to develop a full stack web application based on the MEVN pattern.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Usage](#usage)
    -   [Download](#download)
    -   [Installation](#installation)
        -   [Requirements](#requirements)
        -   [Setup](#setup)
    -   [Run the app](#run-the-app)
    -   [Run the tests](#run-the-tests)
-   [Configuration](#configuration)
-   [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

### Download

Clone the repository, by opening the command line and executing the following command:

    `git clone https://github.com/teoColomberotto/mic_api`

### Installation

#### Requirements

-   [Node.js](https://nodejs.org) 12.x
    -   [Installation](https://nodejs.org/en/download/package-manager/)

#### Setup

-   Clone the repository
-   Install dependencies

    ```
    cd /path/to/repo
    npm install
    ```

### Run the app

    `npm run server`

### Run the tests

    `npm run test`

## Configuration

The following environment variables can be set to customize the application's behavior:

| Variable               | Default value                                                                                     | Description                     |
| :--------------------- | :------------------------------------------------------------------------------------------------ | :------------------------------ |
| `NODE_ENV` development | configuration of the working environment                                                          |
| `PORT`                 | 3000                                                                                              | Port on which to listen to.     |
| `MONGO_URL`            | mongodb+srv://username:password@teocluster.w10q2.mongodb.net/mics_api?retryWrites=true&w=majority | mongoDB Atlas configuration uri |

## License

My Microphones is licensed under the MIT license.
