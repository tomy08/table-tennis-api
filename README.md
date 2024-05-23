# Table Tennis API

## Description

This repository hosts a Table Tennis API built with Node.js and Express, providing endpoints for match and player data management.

The database used is MySQL, and the database schema, including the relational model and all SQL scripts, can be found in the [`database`](https://github.com/tomy08/table-tennis-db) repository.

## Installation

To install the dependencies, run the following command:

```sh
npm install
```

## Usage

To start the application, run the following command:

```sh
npm run dev
```

## Models

- [`Match`](src/models/Match.js)
- [`Player`](src/models/Player.js)
- [`Referee`](src/models/Referee.js)
- [`Tournament`](src/models/Tournament.js)
- [`Club`](src/models/Club.js)
- [`ClubScore`](src/models/ClubScore.js)
- [`PlayerStatistics`](src/models/PlayerStatistics.js)

## Controllers

- [`match`](src/controllers/match.js)
- [`player`](src/controllers/player.js)
- [`referee`](src/controllers/referee.js)
- [`tournament`](src/controllers/tournament.js)
- [`club`](src/controllers/club.js)

## Routes

- [`match`](src/routes/match.js)
- [`player`](src/routes/player.js)
- [`referee`](src/routes/referee.js)
- [`tournament`](src/routes/tournament.js)
- [`club`](src/routes/club.js)
