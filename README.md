## Description

This repository was made for devnology fullstack test. Here's an API for user registration, login, shopping, and consuming another API to show available products.

## Technologies

- TypeScript 
- Nest.js 
- TypeORM
- JWT
- Swagger
- Docker
- Postgresql 
- Railway for deploy

## Installation

Create your own env file:

```bash
$ cp .env.example .env
```
and set them.

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod

# run with docker
$ docker-compose up --build -d
```
## Deployment URL:

Link: https://devstore-backend-production.up.railway.app/api/v1/

## Documentation

In this project I used trello to guide my tasks and insomnia to test the endpoints. Here are the links to the documentation,
for trello and insomnia JSON if you want to test the routes. There are baseUrl options for local testing and productionUrl for production.

- [Documentation](https://devstore-backend-production.up.railway.app/api/v1/docs)
- [Trello](https://trello.com/b/EFzWyQ2t/devstore-backend)
- [Insomia](https://drive.google.com/file/d/1DfKcf2I1SKgC8hfGdsRABfC0UJ7iZHE0/view?usp=sharing)


## License

Nest is [MIT licensed](LICENSE).
