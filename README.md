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

## Project Structure

Projects DER:

![Screenshot from 2023-01-04 11-11-18](https://user-images.githubusercontent.com/90461911/210573868-908937bc-e555-46b8-8d9c-8bb481d6fdeb.png)

## Installation

Create your [env file](.env.example):

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

For the deployment, the [railway](https://railway.app/) platform was used as an infrastructure provider.

## Documentation

In this project I used trello to guide my tasks and insomnia to test the endpoints. Here are the links to the documentation,
for trello and insomnia JSON if you want to test the routes. There are `baseUrl` options for local testing and `productionUrl` for production.

- [Swagger](https://devstore-backend-production.up.railway.app/api/v1/docs)
- [Trello](https://trello.com/b/EFzWyQ2t/devstore-backend)
- [Insomia](https://drive.google.com/file/d/1DfKcf2I1SKgC8hfGdsRABfC0UJ7iZHE0/view?usp=sharing)


## License

Nest is [MIT licensed](LICENSE).
