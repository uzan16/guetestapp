## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript project for Fullstack Technical Test.
This application using sqlite database.

## Installation

```bash
$ yarn install
```

## Config
Duplicate .env.example file then rename it to .env
Put value for JWT_KEY and HOST_PORT
JWT_KEY is for JWT secret key
HOST_PORT is for on which port the app will be running


## Do a migration
```bash
# start migration & seed
$ yarn migration:run
```

this will generate employee table, then insert 1 data:
username: admin
password: admin

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## API Documentation
All api using prefix /api
Swagger documentation is on {host}/doc

## License

Nest is [MIT licensed](LICENSE).
