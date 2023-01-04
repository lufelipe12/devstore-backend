## Description

This repository was made to devnology fullstack test.

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

## Trello

I used trello as a guide for my tasks. There I still left the DER of the application.

[Trello](https://trello.com/b/EFzWyQ2t/devstore-backend)

## Documentation

[Documentation](https://devstore-backend-production.up.railway.app/api/v1/docs)

## Insomia json for endpoints testing

[Insomia](https://drive.google.com/file/d/1DfKcf2I1SKgC8hfGdsRABfC0UJ7iZHE0/view?usp=sharing)

## License

Nest is [MIT licensed](LICENSE).
